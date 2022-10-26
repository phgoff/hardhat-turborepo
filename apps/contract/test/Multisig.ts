import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
// import { signMessage, signMessages, getEthBalance } from "../util/signing-util";

import { Multisig, Token, Token__factory } from "../typechain";
import { getEthBalance, signMessage, signMessages } from "../utils/sign";
const { expect } = require("chai");

describe("EIP712 Multisig Wallet", () => {
  let first: SignerWithAddress;
  let second: SignerWithAddress;
  let third: SignerWithAddress;
  let fourth: SignerWithAddress;
  let fifth: SignerWithAddress;
  let erc20Receiver: SignerWithAddress;
  let ethReceiver: SignerWithAddress;
  let Multisig: Multisig;
  let Token: Token;

  const deployContracts = async (signer: string[], theshold: number) => {
    try {
      const multisigFactory = await ethers.getContractFactory("Multisig");
      const tokenFactory = await ethers.getContractFactory("Token");

      Multisig = await multisigFactory.deploy(signer, theshold);
      Token = await tokenFactory.deploy();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw error;
    }
  };

  beforeEach(async () => {
    [first, second, third, fourth, fifth, erc20Receiver, ethReceiver] =
      await ethers.getSigners();

    const signers = [first.address];
    await deployContracts(signers, signers.length);
  });

  describe("Signing Logic", () => {
    it("should recover off-chain signer's message", async () => {
      const params = {
        to: Multisig.address,
        value: ethers.utils.parseEther("10").toString(),
        data: "0x",
      };

      const originalSigner = await first.getAddress();
      const signature = await signMessage(first, Multisig.address, params);

      const recoveredSigner = await Multisig.recoverSigner(
        params.to,
        params.value,
        params.data,
        signature
      );

      expect(recoveredSigner).to.equal(originalSigner);
    });
  });

  describe("Access / Control", () => {
    it("should add a second signer to create a 1-of-2 multisig", async () => {
      const newSignersAddress = await second.getAddress();
      await expect(
        await Multisig.connect(first).addSigner(newSignersAddress, 1)
      )
        .to.emit(Multisig, "AddSigner")
        .withArgs(newSignersAddress, 1);
    });

    it("should create 2-of-3 multisig", async () => {
      const [secondSigner, thirdSigner] = [
        await second.getAddress(),
        await third.getAddress(),
      ];
      await Multisig.connect(first).addSigner(secondSigner, 2);
      await Multisig.connect(first).addSigner(thirdSigner, 2);

      expect(await Multisig.threshold()).to.equal(2);
      expect(await Multisig.getSignerCount()).to.equal(3);
    });

    it("should revert when m > n", async () => {
      // attempt to create 3-of-2 multisig
      await Multisig.connect(first).addSigner(await second.getAddress(), 1); // 1 of two
      await Multisig.connect(first).addSigner(await third.getAddress(), 2); // two of three

      await expect(
        Multisig.connect(first).addSigner(await fourth.getAddress(), 10)
      ).to.be.revertedWith("Threshold cannot exceed number of signers");
    });

    it("should revert when non-owner calls addSigner()", async () => {
      // attempt to add signer from a non-signer account
      await expect(
        Multisig.connect(second).addSigner(await second.getAddress(), 1)
      ).to.be.revertedWith("Unauthorized signer");
    });

    it("should revert when adding an already existing signer", async () => {
      const duplicateAddress = await second.getAddress();
      await expect(await Multisig.connect(first).addSigner(duplicateAddress, 1))
        .to.emit(Multisig, "AddSigner")
        .withArgs(duplicateAddress, 1);

      // attempt to add signer again
      await expect(
        Multisig.connect(first).addSigner(duplicateAddress, 1)
      ).to.be.revertedWith("Signer already existed");
    });
  });

  describe("Execution", () => {
    it("should send ETH from 1-of-3 multisig", async () => {
      const ethReceiverAddress = await ethReceiver.getAddress();

      if (!ethReceiver.provider) return;

      const beforeBalance = await getEthBalance(
        ethReceiver.provider,
        ethReceiverAddress
      );
      expect(beforeBalance).to.equal("10000000000000000000000"); // 10k ETH

      // send 10 eth to the multisig wallet
      const tx = await first.sendTransaction({
        to: Multisig.address,
        value: ethers.utils.parseEther("10.0"),
      });
      await tx.wait();

      // construct multisig transaction payload
      const params = {
        to: ethReceiverAddress,
        value: ethers.utils.parseEther("5").toString(),
        data: "0x",
      };

      const signatures = await signMessages(
        [first, second, third],
        Multisig.address,
        params
      );

      // add signers to the multisig wallet, create 1-of-3 multisig
      await Multisig.connect(first).addSigner(await second.getAddress(), 1);
      expect(await Multisig.threshold()).to.equal(1);

      await expect(
        await Multisig.connect(first).executeTransaction(
          signatures,
          params.to,
          params.value,
          params.data
        )
      )
        .to.emit(Multisig, "Execution")
        .withArgs(ethReceiverAddress, true, "0x");

      const afterBalance = await getEthBalance(
        ethReceiver.provider,
        ethReceiverAddress
      );
      expect(afterBalance).to.equal("10005000000000000000000"); // 10k + 5 ETH
    });

    it("should call function selector from a 2-of-3 multisig", async () => {
      expect(await Token.balanceOf(second.address)).to.equal(0);

      // Goal: transfer 100 tokens from the multisig wallet to second signer
      let tx = await Token.connect(first).transfer(Multisig.address, 1000);
      tx.wait();

      const calldata = Token__factory.createInterface().encodeFunctionData(
        "transfer",
        [second.address, "100"]
      );

      // construct txn params to call a contract function
      const params = {
        to: Token.address,
        value: "0",
        data: calldata,
      };

      // create the array of signatures
      const signatures = await signMessages(
        [first, second],
        Multisig.address,
        params
      );

      //   // create 2 of 3 multisig
      await Multisig.connect(first).addSigner(await second.getAddress(), 1);
      await Multisig.connect(first).addSigner(await third.getAddress(), 2);

      expect(await Multisig.threshold()).to.equal(2);

      tx = await Multisig.connect(second).executeTransaction(
        signatures,
        params.to,
        params.value,
        params.data
      );

      await tx.wait();

      expect(await Token.balanceOf(second.address)).to.equal(100);
      expect(await Token.balanceOf(Multisig.address)).to.equal(900);
    });
  });
});
