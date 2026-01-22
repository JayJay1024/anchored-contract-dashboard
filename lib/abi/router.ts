export const routerAbi = [
  {
    type: 'constructor',
    inputs: [
      {
        name: 'trustedForwarder_',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'admin_',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'compliance_',
        type: 'address',
        internalType: 'address',
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'acceptOwnership',
    inputs: [],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'cancel',
    inputs: [
      {
        name: 'orderId',
        type: 'bytes32',
        internalType: 'bytes32',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'cashier',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'address',
        internalType: 'address',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'compliance',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'address',
        internalType: 'address',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'configure',
    inputs: [
      {
        name: 'cashier_',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'exchange_',
        type: 'address',
        internalType: 'address',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'deposit',
    inputs: [
      {
        name: 'token',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'amount',
        type: 'uint96',
        internalType: 'uint96',
      },
    ],
    outputs: [
      {
        name: 'opId',
        type: 'bytes32',
        internalType: 'bytes32',
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'depositAndBuy',
    inputs: [
      {
        name: 'depositToken',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'depositAmount',
        type: 'uint96',
        internalType: 'uint96',
      },
      {
        name: 'stockToken',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'quantity',
        type: 'int96',
        internalType: 'int96',
      },
      {
        name: 'price',
        type: 'uint96',
        internalType: 'uint96',
      },
      {
        name: 'slippagePpm',
        type: 'uint24',
        internalType: 'uint24',
      },
      {
        name: 'tif',
        type: 'uint8',
        internalType: 'enum IStockExchange.TimeInForce',
      },
    ],
    outputs: [
      {
        name: 'depositOpId',
        type: 'bytes32',
        internalType: 'bytes32',
      },
      {
        name: 'orderId',
        type: 'bytes32',
        internalType: 'bytes32',
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'depositStock',
    inputs: [
      {
        name: 'token',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'amount',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'depositStockAndSell',
    inputs: [
      {
        name: 'stockToken',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'depositAmount',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'quantity',
        type: 'int96',
        internalType: 'int96',
      },
      {
        name: 'price',
        type: 'uint96',
        internalType: 'uint96',
      },
      {
        name: 'slippagePpm',
        type: 'uint24',
        internalType: 'uint24',
      },
      {
        name: 'tif',
        type: 'uint8',
        internalType: 'enum IStockExchange.TimeInForce',
      },
    ],
    outputs: [
      {
        name: 'orderId',
        type: 'bytes32',
        internalType: 'bytes32',
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'exchange',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'address',
        internalType: 'address',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'isTrustedForwarder',
    inputs: [
      {
        name: 'forwarder',
        type: 'address',
        internalType: 'address',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'bool',
        internalType: 'bool',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'owner',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'address',
        internalType: 'address',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'pendingOwner',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'address',
        internalType: 'address',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'place',
    inputs: [
      {
        name: 'token',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'quantity',
        type: 'int96',
        internalType: 'int96',
      },
      {
        name: 'price',
        type: 'uint96',
        internalType: 'uint96',
      },
      {
        name: 'slippagePpm',
        type: 'uint24',
        internalType: 'uint24',
      },
      {
        name: 'tif',
        type: 'uint8',
        internalType: 'enum IStockExchange.TimeInForce',
      },
    ],
    outputs: [
      {
        name: 'orderId',
        type: 'bytes32',
        internalType: 'bytes32',
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'renounceOwnership',
    inputs: [],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'setCompliance',
    inputs: [
      {
        name: 'compliance_',
        type: 'address',
        internalType: 'address',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'transferOwnership',
    inputs: [
      {
        name: 'newOwner',
        type: 'address',
        internalType: 'address',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'trustedForwarder',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'address',
        internalType: 'address',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'withdraw',
    inputs: [
      {
        name: 'token',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'amountWad',
        type: 'uint96',
        internalType: 'uint96',
      },
    ],
    outputs: [
      {
        name: 'opId',
        type: 'bytes32',
        internalType: 'bytes32',
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'withdrawStock',
    inputs: [
      {
        name: 'token',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'amount',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    name: 'ComplianceSet',
    inputs: [
      {
        name: 'oldCompliance',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'newCompliance',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'DepositAndBuy',
    inputs: [
      {
        name: 'depositOpId',
        type: 'bytes32',
        indexed: true,
        internalType: 'bytes32',
      },
      {
        name: 'orderId',
        type: 'bytes32',
        indexed: true,
        internalType: 'bytes32',
      },
      {
        name: 'user',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'depositToken',
        type: 'address',
        indexed: false,
        internalType: 'address',
      },
      {
        name: 'depositAmount',
        type: 'uint96',
        indexed: false,
        internalType: 'uint96',
      },
      {
        name: 'stockToken',
        type: 'address',
        indexed: false,
        internalType: 'address',
      },
      {
        name: 'quantity',
        type: 'int96',
        indexed: false,
        internalType: 'int96',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'DepositStockAndSell',
    inputs: [
      {
        name: 'orderId',
        type: 'bytes32',
        indexed: true,
        internalType: 'bytes32',
      },
      {
        name: 'user',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'stockToken',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'depositAmount',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
      {
        name: 'quantity',
        type: 'int96',
        indexed: false,
        internalType: 'int96',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'OwnershipTransferStarted',
    inputs: [
      {
        name: 'previousOwner',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'newOwner',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'OwnershipTransferred',
    inputs: [
      {
        name: 'previousOwner',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'newOwner',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'RouterConfigured',
    inputs: [
      {
        name: 'cashier',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'exchange',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
    ],
    anonymous: false,
  },
  {
    type: 'error',
    name: 'AddressCannotBeZero',
    inputs: [],
  },
  {
    type: 'error',
    name: 'AmountCannotBeZero',
    inputs: [],
  },
  {
    type: 'error',
    name: 'CallerNotOwner',
    inputs: [],
  },
  {
    type: 'error',
    name: 'ComplianceAddressZero',
    inputs: [],
  },
  {
    type: 'error',
    name: 'InsufficientDepositForOrder',
    inputs: [],
  },
  {
    type: 'error',
    name: 'OrderNotFound',
    inputs: [],
  },
  {
    type: 'error',
    name: 'OwnableInvalidOwner',
    inputs: [
      {
        name: 'owner',
        type: 'address',
        internalType: 'address',
      },
    ],
  },
  {
    type: 'error',
    name: 'OwnableUnauthorizedAccount',
    inputs: [
      {
        name: 'account',
        type: 'address',
        internalType: 'address',
      },
    ],
  },
  {
    type: 'error',
    name: 'QuantityMustBeNegative',
    inputs: [],
  },
  {
    type: 'error',
    name: 'QuantityMustBePositive',
    inputs: [],
  },
  {
    type: 'error',
    name: 'ReentrancyGuardReentrantCall',
    inputs: [],
  },
  {
    type: 'error',
    name: 'RouterAlreadyConfigured',
    inputs: [],
  },
  {
    type: 'error',
    name: 'RouterNotConfigured',
    inputs: [],
  },
  {
    type: 'error',
    name: 'SafeERC20FailedOperation',
    inputs: [
      {
        name: 'token',
        type: 'address',
        internalType: 'address',
      },
    ],
  },
] as const

export type RouterAbi = typeof routerAbi
