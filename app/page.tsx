import { Sparkles } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { ConnectButton } from "@/components/connect-button";
import { CashierTokenConfig } from "@/components/cashier-token-config";
import { Erc20Card } from "@/components/erc20-card";
import { CashierBalance } from "@/components/cashier-balance";
import { formatWithGrouping } from "@/lib/utils";
import { getOnchainSnapshot } from "@/lib/onchain";
import { useConnection, useReadContract } from "wagmi";
import { cashierAbi } from "@/lib/abi/cashier";

export default async function Home() {
  const onchain = await getOnchainSnapshot();
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6 py-16 sm:px-10">
        <header className="relative overflow-hidden rounded-2xl border bg-gradient-to-br from-background via-card to-muted/50 p-8 shadow-sm">
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.08),transparent_35%)]" />
          <div className="relative flex flex-col gap-5">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border bg-card/80 px-4 py-2 text-xs font-medium text-muted-foreground shadow-sm backdrop-blur">
              <Sparkles className="h-4 w-4 text-primary" />
              <span>Live Sepolia snapshot</span>
            </div>
            <div className="flex flex-col gap-3">
              <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
                Anchored Contract Dashboard
              </h1>
              <p className="max-w-3xl text-lg text-muted-foreground">
                Router endpoints, stock token metadata, ERC-20 balances, and cashier token config in one glance.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <ModeToggle />
              <ConnectButton />
            </div>
          </div>
        </header>

        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <p className="text-sm font-semibold text-muted-foreground">
              Router (Sepolia)
            </p>
            <h2 className="mt-2 text-xl font-semibold">Core endpoints</h2>
            {onchain.error ? (
              <p className="mt-3 text-sm text-destructive">
                {onchain.error}
              </p>
            ) : (
              <dl className="mt-3 space-y-2 text-sm text-muted-foreground">
                <div>
                  <dt className="font-medium text-foreground">Router</dt>
                  <dd className="break-all">
                    {onchain.routerAddress ?? "—"}
                  </dd>
                </div>
                <div>
                  <dt className="font-medium text-foreground">Cashier</dt>
                  <dd className="break-all">{onchain.cashier ?? "—"}</dd>
                </div>
                <div>
                  <dt className="font-medium text-foreground">Exchange</dt>
                  <dd className="break-all">{onchain.exchange ?? "—"}</dd>
                </div>
              </dl>
            )}
          </div>
          <div className="rounded-xl border bg-card p-6 shadow-sm space-y-6">
            <div>
              <p className="text-sm font-semibold text-muted-foreground">
                Stock token
              </p>
              <h2 className="mt-2 text-xl font-semibold">Metadata</h2>
              {onchain.error ? (
                <p className="mt-3 text-sm text-destructive">
                  {onchain.error}
                </p>
              ) : (
                <dl className="mt-3 space-y-2 text-sm text-muted-foreground">
                  <div>
                    <dt className="font-medium text-foreground">Address</dt>
                    <dd className="break-all">
                      {onchain.stockTokenAddress ?? "—"}
                    </dd>
                  </div>
                  <div className="flex items-center gap-2">
                    <dt className="font-medium text-foreground">Name</dt>
                    <dd>{onchain.tokenName ?? "—"}</dd>
                    {onchain.tokenSymbol ? (
                      <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-foreground">
                        {onchain.tokenSymbol}
                      </span>
                    ) : null}
                  </div>
                  <div>
                    <dt className="font-medium text-foreground">
                      Total supply
                    </dt>
                    <dd>
                      {formatWithGrouping(onchain.tokenSupply)}
                      {onchain.tokenSymbol ? ` ${onchain.tokenSymbol}` : ""}
                    </dd>
                    {onchain.tokenDecimals !== undefined ? (
                      <p className="text-xs">
                        Decimals: {onchain.tokenDecimals}
                      </p>
                    ) : null}
                  </div>
                </dl>
              )}
            </div>
          </div>
          <Erc20Card
            tokenAddress={onchain.erc20Address}
            tokenName={onchain.erc20Name}
            tokenSymbol={onchain.erc20Symbol}
            tokenDecimals={onchain.erc20Decimals}
            tokenError={onchain.tokenError}
            globalError={onchain.error}
            spenderAddress={onchain.cashier}
          />
          <CashierTokenConfig
            tokenAddress={onchain.erc20Address}
            tokenSymbol={onchain.erc20Symbol}
            config={onchain.cashierConfig}
            error={onchain.cashierConfigError}
          />
          <CashierBalance
            cashierAddress={onchain.cashier}
            tokenSymbol={onchain.erc20Symbol}
          />
        </section>
      </div>
    </main>
  );
}
