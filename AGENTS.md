# AGENTS

## Project context
- Framework: Next.js (App Router) with Tailwind v4, shadcn/ui primitives (custom `components/ui/*`), wagmi + viem for EVM reads/writes.
- Chain: Sepolia. RPC is read from `RPC_URL`/`SEPOLIA_RPC_URL` (`NEXT_PUBLIC_*` for client-side).
- Env-driven addresses: `ROUTER_ADDRESS`, `STOCK_TOKEN_ADDRESS`, `ERC20_TOKEN_ADDRESS` (server or `NEXT_PUBLIC_*` variants).

## Frontend patterns
- Use existing shadcn wrappers (`components/ui/button.tsx`, `components/ui/input.tsx`, `components/ui/select.tsx`) for form controls. Prefer extracting new UI into components under `components/`.
- Layout cards already exist: `router-card`, `stock-token-card`, `cashier-token-config`, `erc20-card`, `cashier-balance`, `router-place`, `router-deposit`, `router-withdraw`, `header-hero`.
- Keep card grid responsive (`md:grid-cols-2`, `xl:grid-cols-4+`) and typography consistent with existing styles.

## On-chain conventions
- Reads use `lib/onchain.ts` (server) where possible; client actions use wagmi hooks.
- Writes: enforce Sepolia (`useSwitchChain`), parse amounts with correct decimals (`parseUnits`), handle tx hash/status/errors in UI.
- Token decimals: use provided ABI decimals; slippage inputs are percent -> convert to ppm before contract calls.

## Safety & lint
- Run `pnpm lint` before committing; avoid unused imports/vars.
- Use `apply_patch` for edits; avoid touching files outside the repo.

## Commit style
- Descriptive present-tense messages, grouped by logical change (e.g., “Add router deposit/withdraw forms using shadcn inputs”).
