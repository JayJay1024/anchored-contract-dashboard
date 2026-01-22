# Anchored Contract Dashboard

Next.js (App Router) dashboard with Tailwind v4 + shadcn/ui, wagmi + viem for Sepolia on-chain reads/writes, and router tooling (place/deposit/withdraw).

## Setup

1) Install deps
```bash
pnpm install
```
2) Env (`.env.local`), examples:
```bash
RPC_URL=https://sepolia.infura.io/v3/...
ROUTER_ADDRESS=0x...
STOCK_TOKEN_ADDRESS=0x...
ERC20_TOKEN_ADDRESS=0x...
# client-side overrides if needed
NEXT_PUBLIC_ROUTER_ADDRESS=0x...
NEXT_PUBLIC_STOCK_TOKEN_ADDRESS=0x...
NEXT_PUBLIC_ERC20_TOKEN_ADDRESS=0x...
```
3) Run
```bash
pnpm dev
```

## Features
- Sepolia snapshot cards: router endpoints, stock token metadata/balance, generic ERC-20 info/balance/approve, cashier token config, cashier balance/pending.
- Router actions: place (qty/price/slippage%, TIF select), deposit, withdraw.
- Wallet connect (wagmi) with chain guard + switch to Sepolia.
- UI primitives via `components/ui/*` (button, input, select).

## Notes
- Amounts parsed with token decimals (`parseUnits`); slippage input is percent -> converted to ppm.
- Keep lint clean: `pnpm lint`.
- See `AGENTS.md` for coding patterns and on-chain conventions.
