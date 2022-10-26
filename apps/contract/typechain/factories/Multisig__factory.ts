/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  Signer,
  utils,
  BigNumberish,
  Contract,
  ContractFactory,
  Overrides,
} from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { Multisig, MultisigInterface } from "../Multisig";

const _abi = [
  {
    inputs: [
      {
        internalType: "address[]",
        name: "_signers",
        type: "address[]",
      },
      {
        internalType: "uint256",
        name: "_threshold",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "signer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "threshold",
        type: "uint256",
      },
    ],
    name: "AddSigner",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "balance",
        type: "uint256",
      },
    ],
    name: "Deposit",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "destination",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "success",
        type: "bool",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "returndata",
        type: "bytes",
      },
    ],
    name: "Execution",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "signer",
        type: "address",
      },
    ],
    name: "RemoveSigner",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "signer",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newSigner",
        type: "address",
      },
    ],
    name: "ReplaceSigner",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_signer",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_threshold",
        type: "uint256",
      },
    ],
    name: "addSigner",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes[]",
        name: "signatures",
        type: "bytes[]",
      },
      {
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_value",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_data",
        type: "bytes",
      },
    ],
    name: "executeTransaction",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getSignerCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_value",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_data",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "userSignature",
        type: "bytes",
      },
    ],
    name: "recoverSigner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_signer",
        type: "address",
      },
    ],
    name: "removeSigner",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_signer",
        type: "address",
      },
      {
        internalType: "address",
        name: "_newSigner",
        type: "address",
      },
    ],
    name: "replaceSigner",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "signers",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "threshold",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "value",
            type: "uint256",
          },
          {
            internalType: "bytes",
            name: "data",
            type: "bytes",
          },
        ],
        internalType: "struct Multisig.TransactionRequest",
        name: "params",
        type: "tuple",
      },
    ],
    name: "typedDataHash",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
];

const _bytecode =
  "0x6101406040523480156200001257600080fd5b5060405162001e3138038062001e31833981016040819052620000359162000452565b60408051808201825260088152674d756c746973696760c01b6020808301918252835180850190945260058452640312e302e360dc1b908401528151902060e08190527f06c015bd22b4c69690933c1058878ebdfef31f9aaae40bbe86d8a09fe1b2972c6101008190524660a0529192917f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f620001178184846040805160208101859052908101839052606081018290524660808201523060a082015260009060c0016040516020818303038152906040528051906020012090509392505050565b6080523060c05261012052506200013a9250620001349150503390565b620003cf565b600180558151620001855760405162461bcd60e51b815260206004820152601060248201526f1cda59db995c9cc81c995c5d5a5c995960821b60448201526064015b60405180910390fd5b60008111801562000197575081518111155b620001e55760405162461bcd60e51b815260206004820152601b60248201527f696e76616c6964206e756d626572206f66207468726573686f6c64000000000060448201526064016200017c565b60005b8251811015620003c45760008382815181106200020957620002096200052c565b6020026020010151905060006001600160a01b03168483815181106200023357620002336200052c565b60200260200101516001600160a01b03161415620002945760405162461bcd60e51b815260206004820152601660248201527f696e76616c6964207369676e657220616464726573730000000000000000000060448201526064016200017c565b60036000858481518110620002ad57620002ad6200052c565b6020908102919091018101516001600160a01b031682528101919091526040016000205460ff1615620003165760405162461bcd60e51b815260206004820152601060248201526f323ab83634b1b0ba329039b4b3b732b960811b60448201526064016200017c565b6001600360008685815181106200033157620003316200052c565b6020908102919091018101516001600160a01b039081168352908201929092526040016000908120805460ff1916931515939093179092556002805460018101825592527f405787fa12a823e0f2b7631cc41b3ba8828b3321ca811111fa75cd3aa3bb5ace90910180546001600160a01b0319169290911691909117905580620003bb8162000542565b915050620001e8565b50600455506200056c565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b634e487b7160e01b600052604160045260246000fd5b80516001600160a01b03811681146200044d57600080fd5b919050565b600080604083850312156200046657600080fd5b82516001600160401b03808211156200047e57600080fd5b818501915085601f8301126200049357600080fd5b8151602082821115620004aa57620004aa6200041f565b8160051b604051601f19603f83011681018181108682111715620004d257620004d26200041f565b604052928352818301935084810182019289841115620004f157600080fd5b948201945b838610156200051a576200050a8662000435565b85529482019493820193620004f6565b97909101519698969750505050505050565b634e487b7160e01b600052603260045260246000fd5b60006000198214156200056557634e487b7160e01b600052601160045260246000fd5b5060010190565b60805160a05160c05160e0516101005161012051611875620005bc6000396000611211015260006112600152600061123b01526000611194015260006111be015260006111e801526118756000f3fe6080604052600436106100cb5760003560e01c80638da5cb5b11610074578063cf6ace8a1161004e578063cf6ace8a1461023c578063e3d9109f1461025c578063f2fde38b1461027c57600080fd5b80638da5cb5b146101e95780639f55bd7314610207578063b715be811461022757600080fd5b80634d317290116100a55780634d3172901461019457806365af1bed146101b4578063715018a6146101d457600080fd5b80630e316ab7146101115780632079fb9a1461013357806342cde4e81461017057600080fd5b3661010c576040805134815247602082015233917f90890809c654f11d6e72a28fa60149770a0d11ec6c92319d6ceb2bb0a4ea1a15910160405180910390a2005b600080fd5b34801561011d57600080fd5b5061013161012c3660046113b7565b61029c565b005b34801561013f57600080fd5b5061015361014e3660046113d2565b6104ec565b6040516001600160a01b0390911681526020015b60405180910390f35b34801561017c57600080fd5b5061018660045481565b604051908152602001610167565b3480156101a057600080fd5b506101536101af3660046114a2565b610516565b3480156101c057600080fd5b506101316101cf366004611520565b61055d565b3480156101e057600080fd5b506101316107a1565b3480156101f557600080fd5b506000546001600160a01b0316610153565b34801561021357600080fd5b5061013161022236600461154a565b6107b5565b34801561023357600080fd5b50600254610186565b34801561024857600080fd5b50610186610257366004611634565b610aee565b34801561026857600080fd5b506101316102773660046116d2565b610b7f565b34801561028857600080fd5b506101316102973660046113b7565b610dac565b3360009081526003602052604090205460ff166102f65760405162461bcd60e51b81526020600482015260136024820152722ab730baba3437b934bd32b21039b4b3b732b960691b60448201526064015b60405180910390fd5b6001600160a01b038116600090815260036020526040902054819060ff166103605760405162461bcd60e51b815260206004820152601060248201527f5369676e6572206e6f742065786973740000000000000000000000000000000060448201526064016102ed565b6001600160a01b0382166000908152600360205260408120805460ff191690555b6002546103909060019061171b565b81101561046057826001600160a01b0316600282815481106103b4576103b4611732565b6000918252602090912001546001600160a01b0316141561044e57600280546103df9060019061171b565b815481106103ef576103ef611732565b600091825260209091200154600280546001600160a01b03909216918390811061041b5761041b611732565b9060005260206000200160006101000a8154816001600160a01b0302191690836001600160a01b03160217905550610460565b8061045881611748565b915050610381565b50600280548061047257610472611763565b6000828152602090208101600019908101805473ffffffffffffffffffffffffffffffffffffffff1916905501905560025460045411156104b4576002546004555b6040516001600160a01b038316907f1803740ef72fc16e647c10fe2d31cf61a1578081960c2e3fb7f5aa957e82f55090600090a25050565b600281815481106104fc57600080fd5b6000918252602090912001546001600160a01b0316905081565b604080516060810182526001600160a01b0386168152602081018590529081018390526000908161054682610aee565b90506105528185610e3c565b979650505050505050565b3360009081526003602052604090205460ff166105b25760405162461bcd60e51b81526020600482015260136024820152722ab730baba3437b934bd32b21039b4b3b732b960691b60448201526064016102ed565b6001600160a01b038216600090815260036020526040902054829060ff161561061d5760405162461bcd60e51b815260206004820152601660248201527f5369676e657220616c726561647920657869737465640000000000000000000060448201526064016102ed565b60025461062b906001611779565b8211156106a05760405162461bcd60e51b815260206004820152602960248201527f5468726573686f6c642063616e6e6f7420657863656564206e756d626572206f60448201527f66207369676e657273000000000000000000000000000000000000000000000060648201526084016102ed565b60018210156106f15760405162461bcd60e51b815260206004820152601760248201527f5468726573686f6c642063616e6e6f74206265203c203100000000000000000060448201526064016102ed565b6002805460018082019092557f405787fa12a823e0f2b7631cc41b3ba8828b3321ca811111fa75cd3aa3bb5ace01805473ffffffffffffffffffffffffffffffffffffffff19166001600160a01b0386169081179091556004849055600081815260036020908152604091829020805460ff19169094179093555184815290917ff9a3b2c9bc1f8ead8d9e72ca4c7ba3ec55f2e4a128a8fccdec03f577d64637b6910160405180910390a2505050565b6107a9610e60565b6107b36000610eba565b565b3360009081526003602052604090205460ff1661080a5760405162461bcd60e51b81526020600482015260136024820152722ab730baba3437b934bd32b21039b4b3b732b960691b60448201526064016102ed565b6002600154141561085d5760405162461bcd60e51b815260206004820152601f60248201527f5265656e7472616e637947756172643a207265656e7472616e742063616c6c0060448201526064016102ed565b6002600155600454845110156108b55760405162461bcd60e51b815260206004820152601c60248201527f496e76616c6964206e756d626572206f66207369676e6174757265730000000060448201526064016102ed565b6001600160a01b03831661090b5760405162461bcd60e51b815260206004820152601c60248201527f43616e6e6f742073656e6420746f207a65726f20616464726573732e0000000060448201526064016102ed565b604080516060810182526001600160a01b038516815260208101849052908101829052600061093982610aee565b905060005b6004548110156109eb57600061096d8389848151811061096057610960611732565b6020026020010151610e3c565b6001600160a01b03811660009081526003602052604090205490915060ff166109d85760405162461bcd60e51b815260206004820152600e60248201527f496e76616c6964207369676e657200000000000000000000000000000000000060448201526064016102ed565b50806109e381611748565b91505061093e565b5060008083600001516001600160a01b0316846020015186604051610a1091906117c1565b60006040518083038185875af1925050503d8060008114610a4d576040519150601f19603f3d011682016040523d82523d6000602084013e610a52565b606091505b509150915081610aa45760405162461bcd60e51b815260206004820152601260248201527f4661696c6564207472616e73616374696f6e000000000000000000000000000060448201526064016102ed565b83516040517f2fcaca726dcb634cc7f4efab00d0aaeb98bdc63521e21c2dff0127d9d237a98691610ad891859085906117dd565b60405180910390a1505060018055505050505050565b600080610b787fdde2b37a06aeddf4c41e437fbfd88741867cf4db3d8d6324fbd91ca4edbecd0e84600001518560200151866040015180519060200120604051602001610b5d94939291909384526001600160a01b039290921660208401526040830152606082015260800190565b60405160208183030381529060405280519060200120610f17565b9392505050565b3360009081526003602052604090205460ff16610bd45760405162461bcd60e51b81526020600482015260136024820152722ab730baba3437b934bd32b21039b4b3b732b960691b60448201526064016102ed565b6001600160a01b038216600090815260036020526040902054829060ff16610c3e5760405162461bcd60e51b815260206004820152601060248201527f5369676e6572206e6f742065786973740000000000000000000000000000000060448201526064016102ed565b6001600160a01b038216600090815260036020526040902054829060ff1615610ca95760405162461bcd60e51b815260206004820152601660248201527f5369676e657220616c726561647920657869737465640000000000000000000060448201526064016102ed565b60005b600254811015610d4757846001600160a01b031660028281548110610cd357610cd3611732565b6000918252602090912001546001600160a01b03161415610d35578360028281548110610d0257610d02611732565b9060005260206000200160006101000a8154816001600160a01b0302191690836001600160a01b03160217905550610d47565b80610d3f81611748565b915050610cac565b506001600160a01b03808516600081815260036020526040808220805460ff199081169091559387168083528183208054909516600117909455517f677ec216994e9b9ba18ab33272ddb34096d03180bfa5f79b1af3bcfedc1ac95a9190a350505050565b610db4610e60565b6001600160a01b038116610e305760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201527f646472657373000000000000000000000000000000000000000000000000000060648201526084016102ed565b610e3981610eba565b50565b6000806000610e4b8585610f86565b91509150610e5881610fcc565b509392505050565b6000546001600160a01b031633146107b35760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016102ed565b600080546001600160a01b0383811673ffffffffffffffffffffffffffffffffffffffff19831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b6000610f80610f24611187565b836040517f19010000000000000000000000000000000000000000000000000000000000006020820152602281018390526042810182905260009060620160405160208183030381529060405280519060200120905092915050565b92915050565b600080825160411415610fbd5760208301516040840151606085015160001a610fb1878285856112ae565b94509450505050610fc5565b506000905060025b9250929050565b6000816004811115610fe057610fe0611829565b1415610fe95750565b6001816004811115610ffd57610ffd611829565b141561104b5760405162461bcd60e51b815260206004820152601860248201527f45434453413a20696e76616c6964207369676e6174757265000000000000000060448201526064016102ed565b600281600481111561105f5761105f611829565b14156110ad5760405162461bcd60e51b815260206004820152601f60248201527f45434453413a20696e76616c6964207369676e6174757265206c656e6774680060448201526064016102ed565b60038160048111156110c1576110c1611829565b141561111a5760405162461bcd60e51b815260206004820152602260248201527f45434453413a20696e76616c6964207369676e6174757265202773272076616c604482015261756560f01b60648201526084016102ed565b600481600481111561112e5761112e611829565b1415610e395760405162461bcd60e51b815260206004820152602260248201527f45434453413a20696e76616c6964207369676e6174757265202776272076616c604482015261756560f01b60648201526084016102ed565b6000306001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000161480156111e057507f000000000000000000000000000000000000000000000000000000000000000046145b1561120a57507f000000000000000000000000000000000000000000000000000000000000000090565b50604080517f00000000000000000000000000000000000000000000000000000000000000006020808301919091527f0000000000000000000000000000000000000000000000000000000000000000828401527f000000000000000000000000000000000000000000000000000000000000000060608301524660808301523060a0808401919091528351808403909101815260c0909201909252805191012090565b6000807f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a08311156112e55750600090506003611392565b8460ff16601b141580156112fd57508460ff16601c14155b1561130e5750600090506004611392565b6040805160008082526020820180845289905260ff881692820192909252606081018690526080810185905260019060a0016020604051602081039080840390855afa158015611362573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b03811661138b57600060019250925050611392565b9150600090505b94509492505050565b80356001600160a01b03811681146113b257600080fd5b919050565b6000602082840312156113c957600080fd5b610b788261139b565b6000602082840312156113e457600080fd5b5035919050565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f1916810167ffffffffffffffff8111828210171561142a5761142a6113eb565b604052919050565b600082601f83011261144357600080fd5b813567ffffffffffffffff81111561145d5761145d6113eb565b611470601f8201601f1916602001611401565b81815284602083860101111561148557600080fd5b816020850160208301376000918101602001919091529392505050565b600080600080608085870312156114b857600080fd5b6114c18561139b565b935060208501359250604085013567ffffffffffffffff808211156114e557600080fd5b6114f188838901611432565b9350606087013591508082111561150757600080fd5b5061151487828801611432565b91505092959194509250565b6000806040838503121561153357600080fd5b61153c8361139b565b946020939093013593505050565b6000806000806080858703121561156057600080fd5b843567ffffffffffffffff8082111561157857600080fd5b818701915087601f83011261158c57600080fd5b81356020828211156115a0576115a06113eb565b8160051b6115af828201611401565b928352848101820192828101908c8511156115c957600080fd5b83870192505b84831015611605578235868111156115e75760008081fd5b6115f58e86838b0101611432565b83525091830191908301906115cf565b995061161591505089820161139b565b9650505060408701359350606087013591508082111561150757600080fd5b60006020828403121561164657600080fd5b813567ffffffffffffffff8082111561165e57600080fd5b908301906060828603121561167257600080fd5b60405160608101818110838211171561168d5761168d6113eb565b6040526116998361139b565b8152602083013560208201526040830135828111156116b757600080fd5b6116c387828601611432565b60408301525095945050505050565b600080604083850312156116e557600080fd5b6116ee8361139b565b91506116fc6020840161139b565b90509250929050565b634e487b7160e01b600052601160045260246000fd5b60008282101561172d5761172d611705565b500390565b634e487b7160e01b600052603260045260246000fd5b600060001982141561175c5761175c611705565b5060010190565b634e487b7160e01b600052603160045260246000fd5b6000821982111561178c5761178c611705565b500190565b60005b838110156117ac578181015183820152602001611794565b838111156117bb576000848401525b50505050565b600082516117d3818460208701611791565b9190910192915050565b6001600160a01b038416815282151560208201526060604082015260008251806060840152611813816080850160208701611791565b601f01601f191691909101608001949350505050565b634e487b7160e01b600052602160045260246000fdfea264697066735822122039460b3d4513b2ffa5a9816c168bc4bdca9aad2a9d9daea54be0f655895d2c6664736f6c634300080b0033";

export class Multisig__factory extends ContractFactory {
  constructor(
    ...args: [signer: Signer] | ConstructorParameters<typeof ContractFactory>
  ) {
    if (args.length === 1) {
      super(_abi, _bytecode, args[0]);
    } else {
      super(...args);
    }
  }

  deploy(
    _signers: string[],
    _threshold: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<Multisig> {
    return super.deploy(
      _signers,
      _threshold,
      overrides || {}
    ) as Promise<Multisig>;
  }
  getDeployTransaction(
    _signers: string[],
    _threshold: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_signers, _threshold, overrides || {});
  }
  attach(address: string): Multisig {
    return super.attach(address) as Multisig;
  }
  connect(signer: Signer): Multisig__factory {
    return super.connect(signer) as Multisig__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): MultisigInterface {
    return new utils.Interface(_abi) as MultisigInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Multisig {
    return new Contract(address, _abi, signerOrProvider) as Multisig;
  }
}