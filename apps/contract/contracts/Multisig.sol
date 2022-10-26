// SPDX-License-Identifier: MIT
pragma solidity 0.8.11;

import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/cryptography/draft-EIP712.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Multisig is EIP712, Ownable, ReentrancyGuard {
    using ECDSA for bytes32;

    event Deposit(address indexed sender, uint256 amount, uint256 balance);
    event AddSigner(address indexed signer, uint256 threshold);
    event RemoveSigner(address indexed signer);
    event ReplaceSigner(address indexed signer, address indexed newSigner);
    event Execution(address destination, bool success, bytes returndata);

    // Multisig transaction payload
    struct TransactionRequest {
        address to;
        uint256 value;
        bytes data;
    }

    address[] public signers;
    mapping(address => bool) isSigner;
    uint256 public threshold;

    constructor(address[] memory _signers, uint256 _threshold) EIP712("Multisig", "1.0.0") {
        require(_signers.length > 0, "signers required");
        require(
            _threshold > 0 &&
                _threshold <= _signers.length,
            "invalid number of threshold"
        );

        for (uint256 i = 0; i < _signers.length; i++) {
            address signer = _signers[i];

            require(_signers[i] != address(0), "invalid signer address");
            require(!isSigner[_signers[i]], "duplicate signer");

            isSigner[_signers[i]] = true;
            signers.push(signer);
        }

        threshold = _threshold;
    }

    receive() external payable {
        emit Deposit(msg.sender, msg.value, address(this).balance);
    }

    modifier signerExists(address _signer) {
        require(isSigner[_signer], "Signer not exist");
        _;
    }

    modifier signerDoesNotExist(address _signer) {
        require(!isSigner[_signer], "Signer already existed");
        _;
    }

    /// @dev - returns hash of data to be signed
    /// @param params - struct containing transaction data
    /// @return - packed hash that is to be signed
    function typedDataHash(TransactionRequest memory params) public view returns (bytes32) {
        bytes32 digest = _hashTypedDataV4(
            keccak256(
                abi.encode(
                    keccak256("TransactionRequest(address to,uint256 value,bytes data)"),
                    params.to,
                    params.value,
                    keccak256(params.data)
                )
            )
        );
        return digest;
    }

    /// @dev - util function to recover a signer given a signatures
    /// @param _to - to address of the transaction
    /// @param _value - transaction value
    /// @param _data - transaction calldata
    function recoverSigner(address _to, uint256 _value, bytes memory _data, bytes memory userSignature) external view returns (address) {
        TransactionRequest memory params = TransactionRequest({
            to: _to,
            value: _value,
            data: _data
        });
        bytes32 digest = typedDataHash(params);
        return ECDSA.recover(digest, userSignature);
    }

    /// @dev - adds additional signer to the multisig
    /// @param _signer - address to be added to the signers list
    /// @param _threshold - new signature threshold (inclusive of new signer)
    function addSigner(address _signer, uint _threshold) external onlySigner signerDoesNotExist(_signer) {
        require(_threshold <= signers.length + 1, "Threshold cannot exceed number of signers");
        require(_threshold >= 1, "Threshold cannot be < 1");
        signers.push(_signer);
        threshold = _threshold;
        isSigner[_signer] = true;

        emit AddSigner(_signer, _threshold);
    }

    /// @dev Allows to remove an signer.
    /// @param _signer Address of signer.
    function removeSigner(address _signer)
        public
        onlySigner
        signerExists(_signer)
    {
        isSigner[_signer] = false;
        for (uint256 i = 0; i < signers.length - 1; i++) {
            if (signers[i] == _signer) {
                signers[i] = signers[signers.length - 1];
                break;
            }
        }
        signers.pop();
        if (threshold > signers.length)
            threshold = signers.length;
        emit RemoveSigner(_signer);
    }

    /// @dev Allows to replace an signer with a new signer. Transaction has to be sent by wallet.
    /// @param _signer Address of signer to be replaced.
    /// @param _newSigner Address of new signer.
    function replaceSigner(address _signer, address _newSigner)
        public
        onlySigner
        signerExists(_signer)
        signerDoesNotExist(_newSigner)
    {
        for (uint256 i = 0; i < signers.length; i++) {
            if (signers[i] == _signer) {
                signers[i] = _newSigner;
                break;
            }
        }
        isSigner[_signer] = false;
        isSigner[_newSigner] = true;

        emit ReplaceSigner(_signer, _newSigner);
    }

    /// @dev - Execute a multisig transaction given an array of signatures, and TransactionRequest params
    /// @param signatures - array of signatures from multisig holders
    /// @param _to - address a transaction should be sent to
    /// @param _value - transaction value
    /// @param _data - data to be sent with the transaction (e.g: to call a contract function)
    function executeTransaction(bytes[] memory signatures, address _to, uint256 _value, bytes memory _data) external onlySigner nonReentrant {
        // require minimum # of signatures (m-of-n)
        require(signatures.length >= threshold, "Invalid number of signatures");
        require(_to != address(0), "Cannot send to zero address.");
        // construct transaction
        TransactionRequest memory txn = TransactionRequest({
            to: _to,
            value: _value,
            data: _data
        });
        // create typed hash
        bytes32 digest = typedDataHash(txn);
        // get the signer of the message
        for (uint i = 0; i < threshold; i ++) {
            // recover signer address
            address signer = ECDSA.recover(digest, signatures[i]);
            // verify that signer is owner (any signer can execute the transaction given a set of off-chain signatures)
            require(isSigner[signer], "Invalid signer");
        }

        // execute transaction
        (bool success, bytes memory returndata) = txn.to.call{value: txn.value}(_data);
        require(success, "Failed transaction");
        emit Execution(txn.to, success, returndata);
    }

    function getSignerCount() external view returns (uint256) {
        return signers.length;
    }

    modifier onlySigner() {
        require(
            isSigner[msg.sender],
            "Unauthorized signer"
        );
        _;
    }
} 
