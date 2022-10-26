import { ethers } from "ethers";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
const structTypes = {
  EIP712Domain: [
    {
      name: "name",
      type: "string",
    },
    {
      name: "version",
      type: "string",
    },
    {
      name: "chainId",
      type: "uint256",
    },
    {
      name: "verifyingContract",
      type: "address",
    },
  ],
  TransactionRequest: [
    {
      name: "to",
      type: "address",
    },
    {
      name: "value",
      type: "uint256",
    },
    {
      name: "data",
      type: "bytes",
    },
  ],
};

const getDomain = (chainId: number, contractAddress: string) => {
  return {
    name: "Multisig",
    version: "1.0.0",
    chainId: chainId || "1",
    verifyingContract: contractAddress || ethers.constants.AddressZero,
  };
};

const EIP712 = (
  contractAddress: string,
  chainId = 1,
  params: Record<string, unknown>
) => {
  return {
    types: structTypes,
    domain: getDomain(chainId, contractAddress),
    message: {
      to: params.to,
      value: params.value,
      data: params.data,
    },
    primaryType: "TransactionRequest",
  };
};

export const signMessage = async (
  signer: ethers.Signer,
  contractAddress: string,
  params: Record<string, string>
): Promise<string> => {
  const provider = signer.provider as ethers.providers.JsonRpcProvider;
  const { chainId } = await provider.getNetwork();

  try {
    return await provider.send("eth_signTypedData_v4", [
      await signer.getAddress(),
      EIP712(contractAddress, chainId, params),
    ]);
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(e.message);
    }
    throw e;
  }
};

export const signMessages = async (
  signers: ethers.Signer[],
  contractAddress: string,
  params: Record<any, string>
): Promise<string[]> => {
  if (signers.length === 0) {
    throw new Error("Please supply an array of signers");
  }

  const signatures: string[] = [];

  for (let index = 0; index < signers.length; index++) {
    const signer = signers[index];
    const signature = await signMessage(signer, contractAddress, params);
    signatures.push(signature);
  }

  return signatures;
};

export const getEthBalance = async (
  provider: ethers.providers.JsonRpcProvider | ethers.providers.Provider,
  address: string
) => {
  return await provider.getBalance(address);
};
