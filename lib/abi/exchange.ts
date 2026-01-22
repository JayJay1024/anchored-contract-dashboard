export const exchangeAbi = [
  {
    type: 'constructor',
    inputs: [
      {
        name: 'cashier_',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'ancStockTokenFactory_',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'orderSettler_',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'stockRouter_',
        type: 'address',
        internalType: 'address',
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'DEFAULT_ADMIN_ROLE',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'bytes32',
        internalType: 'bytes32',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'ORDER_SETTLER_ROLE',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'bytes32',
        internalType: 'bytes32',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'ancStockTokenFactory',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'address',
        internalType: 'contract IAncStockTokenFactory',
      },
    ],
    stateMutability: 'view',
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
        internalType: 'contract ICashier',
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
    name: 'depositStock',
    inputs: [
      {
        name: 'user',
        type: 'address',
        internalType: 'address',
      },
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
    name: 'getOrder',
    inputs: [
      {
        name: 'orderId',
        type: 'bytes32',
        internalType: 'bytes32',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'tuple',
        internalType: 'struct IStockExchange.Order',
        components: [
          {
            name: 'tokenIndex',
            type: 'uint16',
            internalType: 'uint16',
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
          {
            name: 'cancelRequested',
            type: 'bool',
            internalType: 'bool',
          },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getOrders',
    inputs: [
      {
        name: 'orderIds',
        type: 'bytes32[]',
        internalType: 'bytes32[]',
      },
    ],
    outputs: [
      {
        name: 'orders',
        type: 'tuple[]',
        internalType: 'struct IStockExchange.Order[]',
        components: [
          {
            name: 'tokenIndex',
            type: 'uint16',
            internalType: 'uint16',
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
          {
            name: 'cancelRequested',
            type: 'bool',
            internalType: 'bool',
          },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getRoleAdmin',
    inputs: [
      {
        name: 'role',
        type: 'bytes32',
        internalType: 'bytes32',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'bytes32',
        internalType: 'bytes32',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getRoleMember',
    inputs: [
      {
        name: 'role',
        type: 'bytes32',
        internalType: 'bytes32',
      },
      {
        name: 'index',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
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
    name: 'getRoleMemberCount',
    inputs: [
      {
        name: 'role',
        type: 'bytes32',
        internalType: 'bytes32',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getRoleMembers',
    inputs: [
      {
        name: 'role',
        type: 'bytes32',
        internalType: 'bytes32',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'address[]',
        internalType: 'address[]',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'grantRole',
    inputs: [
      {
        name: 'role',
        type: 'bytes32',
        internalType: 'bytes32',
      },
      {
        name: 'account',
        type: 'address',
        internalType: 'address',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'hasRole',
    inputs: [
      {
        name: 'role',
        type: 'bytes32',
        internalType: 'bytes32',
      },
      {
        name: 'account',
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
    name: 'initialize',
    inputs: [
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
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'operationCounter',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'uint64',
        internalType: 'uint64',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'orderSettler',
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
        name: 'user',
        type: 'address',
        internalType: 'address',
      },
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
    name: 'renounceRole',
    inputs: [
      {
        name: 'role',
        type: 'bytes32',
        internalType: 'bytes32',
      },
      {
        name: 'callerConfirmation',
        type: 'address',
        internalType: 'address',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'revokeRole',
    inputs: [
      {
        name: 'role',
        type: 'bytes32',
        internalType: 'bytes32',
      },
      {
        name: 'account',
        type: 'address',
        internalType: 'address',
      },
    ],
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
    name: 'settleBuyCancels',
    inputs: [
      {
        name: 'token',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'orderIds',
        type: 'bytes32[]',
        internalType: 'bytes32[]',
      },
      {
        name: 'filledQtys',
        type: 'uint96[]',
        internalType: 'uint96[]',
      },
      {
        name: 'fillPrices',
        type: 'uint96[]',
        internalType: 'uint96[]',
      },
      {
        name: 'isBrokerInitiated',
        type: 'bool',
        internalType: 'bool',
      },
    ],
    outputs: [
      {
        name: 'totalFilledQuantity',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'totalUsdRefunded',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'settleBuyOrders',
    inputs: [
      {
        name: 'token',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'orderIds',
        type: 'bytes32[]',
        internalType: 'bytes32[]',
      },
      {
        name: 'fillPrices',
        type: 'uint96[]',
        internalType: 'uint96[]',
      },
    ],
    outputs: [
      {
        name: 'totalQuantity',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'totalCost',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'settleSellCancels',
    inputs: [
      {
        name: 'token',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'orderIds',
        type: 'bytes32[]',
        internalType: 'bytes32[]',
      },
      {
        name: 'filledQtys',
        type: 'uint96[]',
        internalType: 'uint96[]',
      },
      {
        name: 'fillPrices',
        type: 'uint96[]',
        internalType: 'uint96[]',
      },
      {
        name: 'isBrokerInitiated',
        type: 'bool',
        internalType: 'bool',
      },
    ],
    outputs: [
      {
        name: 'totalFilledQuantity',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'totalUsdCredited',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'settleSellOrders',
    inputs: [
      {
        name: 'token',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'orderIds',
        type: 'bytes32[]',
        internalType: 'bytes32[]',
      },
      {
        name: 'fillPrices',
        type: 'uint96[]',
        internalType: 'uint96[]',
      },
    ],
    outputs: [
      {
        name: 'totalQuantity',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'totalProceeds',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'stockBalance',
    inputs: [
      {
        name: 'user',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'token',
        type: 'address',
        internalType: 'address',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'stockRouter',
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
    name: 'supportsInterface',
    inputs: [
      {
        name: 'interfaceId',
        type: 'bytes4',
        internalType: 'bytes4',
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
    name: 'tokenAt',
    inputs: [
      {
        name: 'index',
        type: 'uint16',
        internalType: 'uint16',
      },
    ],
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
    name: 'tokenIndex',
    inputs: [
      {
        name: 'token',
        type: 'address',
        internalType: 'address',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'uint16',
        internalType: 'uint16',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'withdrawStock',
    inputs: [
      {
        name: 'user',
        type: 'address',
        internalType: 'address',
      },
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
    name: 'CancelRequested',
    inputs: [
      {
        name: 'orderId',
        type: 'bytes32',
        indexed: true,
        internalType: 'bytes32',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'CancelSettled',
    inputs: [
      {
        name: 'orderId',
        type: 'bytes32',
        indexed: true,
        internalType: 'bytes32',
      },
      {
        name: 'filledQuantity',
        type: 'uint96',
        indexed: false,
        internalType: 'uint96',
      },
      {
        name: 'unfilledQuantity',
        type: 'uint96',
        indexed: false,
        internalType: 'uint96',
      },
      {
        name: 'fillPrice',
        type: 'uint96',
        indexed: false,
        internalType: 'uint96',
      },
      {
        name: 'usdDelta',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
      {
        name: 'isBrokerInitiated',
        type: 'bool',
        indexed: false,
        internalType: 'bool',
      },
    ],
    anonymous: false,
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
    name: 'Initialized',
    inputs: [
      {
        name: 'version',
        type: 'uint64',
        indexed: false,
        internalType: 'uint64',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'OrderRequested',
    inputs: [
      {
        name: 'token',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'orderId',
        type: 'bytes32',
        indexed: true,
        internalType: 'bytes32',
      },
      {
        name: 'quantity',
        type: 'int96',
        indexed: false,
        internalType: 'int96',
      },
      {
        name: 'price',
        type: 'uint96',
        indexed: false,
        internalType: 'uint96',
      },
      {
        name: 'slippagePpm',
        type: 'uint24',
        indexed: false,
        internalType: 'uint24',
      },
      {
        name: 'tif',
        type: 'uint8',
        indexed: false,
        internalType: 'enum IStockExchange.TimeInForce',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'OrderSettled',
    inputs: [
      {
        name: 'orderId',
        type: 'bytes32',
        indexed: true,
        internalType: 'bytes32',
      },
      {
        name: 'quantity',
        type: 'int96',
        indexed: false,
        internalType: 'int96',
      },
      {
        name: 'fillPrice',
        type: 'uint96',
        indexed: false,
        internalType: 'uint96',
      },
      {
        name: 'usdDelta',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'RoleAdminChanged',
    inputs: [
      {
        name: 'role',
        type: 'bytes32',
        indexed: true,
        internalType: 'bytes32',
      },
      {
        name: 'previousAdminRole',
        type: 'bytes32',
        indexed: true,
        internalType: 'bytes32',
      },
      {
        name: 'newAdminRole',
        type: 'bytes32',
        indexed: true,
        internalType: 'bytes32',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'RoleGranted',
    inputs: [
      {
        name: 'role',
        type: 'bytes32',
        indexed: true,
        internalType: 'bytes32',
      },
      {
        name: 'account',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'sender',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'RoleRevoked',
    inputs: [
      {
        name: 'role',
        type: 'bytes32',
        indexed: true,
        internalType: 'bytes32',
      },
      {
        name: 'account',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'sender',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'StockBalanceCredited',
    inputs: [
      {
        name: 'token',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'user',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'amount',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'StockDeposited',
    inputs: [
      {
        name: 'token',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'user',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'amount',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'StockReturned',
    inputs: [
      {
        name: 'token',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'user',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'amount',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'StockWithdrawn',
    inputs: [
      {
        name: 'token',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'user',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'amount',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
    ],
    anonymous: false,
  },
  {
    type: 'error',
    name: 'AccessControlBadConfirmation',
    inputs: [],
  },
  {
    type: 'error',
    name: 'AccessControlUnauthorizedAccount',
    inputs: [
      {
        name: 'account',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'neededRole',
        type: 'bytes32',
        internalType: 'bytes32',
      },
    ],
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
    name: 'CancelAlreadyRequested',
    inputs: [],
  },
  {
    type: 'error',
    name: 'CancelNotRequested',
    inputs: [],
  },
  {
    type: 'error',
    name: 'FillPriceCannotBeZero',
    inputs: [],
  },
  {
    type: 'error',
    name: 'FillPriceExceedsSlippage',
    inputs: [],
  },
  {
    type: 'error',
    name: 'FilledQuantityExceedsOrderQuantity',
    inputs: [],
  },
  {
    type: 'error',
    name: 'InsufficientStockBalance',
    inputs: [],
  },
  {
    type: 'error',
    name: 'InvalidInitialization',
    inputs: [],
  },
  {
    type: 'error',
    name: 'InvalidStockToken',
    inputs: [],
  },
  {
    type: 'error',
    name: 'LengthMismatch',
    inputs: [],
  },
  {
    type: 'error',
    name: 'LimitPriceMismatch',
    inputs: [],
  },
  {
    type: 'error',
    name: 'NotBuyOrder',
    inputs: [],
  },
  {
    type: 'error',
    name: 'NotInitializing',
    inputs: [],
  },
  {
    type: 'error',
    name: 'NotSellOrder',
    inputs: [],
  },
  {
    type: 'error',
    name: 'OrderNotFound',
    inputs: [],
  },
  {
    type: 'error',
    name: 'PriceBelowSlippage',
    inputs: [],
  },
  {
    type: 'error',
    name: 'QuantityCannotBeZero',
    inputs: [],
  },
  {
    type: 'error',
    name: 'ReentrancyGuardReentrantCall',
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
  {
    type: 'error',
    name: 'SlippagePpmTooHigh',
    inputs: [],
  },
  {
    type: 'error',
    name: 'TokenMismatch',
    inputs: [],
  },
  {
    type: 'error',
    name: 'TransferFailed',
    inputs: [],
  },
  {
    type: 'error',
    name: 'TransferFromFailed',
    inputs: [],
  },
  {
    type: 'error',
    name: 'Unauthorized',
    inputs: [],
  },
] as const

export type ExchangeAbi = typeof exchangeAbi
