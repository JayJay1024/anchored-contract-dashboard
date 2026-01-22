import { CashierTokenConfig } from "@/components/cashier-token-config";
import { Erc20Card } from "@/components/erc20-card";
import { CashierBalance } from "@/components/cashier-balance";
import { RouterCard } from "@/components/router-card";
import { StockTokenCard } from "@/components/stock-token-card";
import { HeaderHero } from "@/components/header-hero";
import { RouterPlace } from "@/components/router-place";
import { RouterDeposit } from "@/components/router-deposit";
import { RouterWithdraw } from "@/components/router-withdraw";
import { getOnchainSnapshot } from "@/lib/onchain";

export default async function Home() {
  const onchain = await getOnchainSnapshot();
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex max-w-6xl flex-col gap-5 px-4 py-8 sm:px-8">
        <HeaderHero />

        <section className="grid grid-cols-12 gap-4">
          <div className="col-span-12 lg:col-span-8 space-y-4">
            <div className="grid gap-3 md:grid-cols-2">
              <RouterCard
                router={onchain.routerAddress}
                cashier={onchain.cashier}
                exchange={onchain.exchange}
                error={onchain.error}
              />
              <StockTokenCard
                address={onchain.stockTokenAddress}
                name={onchain.tokenName}
                symbol={onchain.tokenSymbol}
                decimals={onchain.tokenDecimals}
                error={onchain.error}
              />
            </div>

            <div className="rounded-xl border bg-card p-4 shadow-sm">
              <div className="mb-3 flex flex-col gap-1">
                <h2 className="text-lg font-semibold">Router actions</h2>
                <p className="text-xs text-muted-foreground">
                  Place orders, deposit, and withdraw via the router.
                </p>
              </div>
              <div className="grid gap-3 lg:grid-cols-2">
                <RouterPlace
                  routerAddress={onchain.routerAddress}
                  stockTokenAddress={onchain.stockTokenAddress}
                  tokenDecimals={onchain.tokenDecimals}
                />
                <div className="grid gap-3">
                  <RouterDeposit
                    routerAddress={onchain.routerAddress}
                    tokenAddress={onchain.erc20Address}
                    tokenDecimals={onchain.erc20Decimals}
                    tokenSymbol={onchain.erc20Symbol}
                  />
                  <RouterWithdraw
                    routerAddress={onchain.routerAddress}
                    tokenAddress={onchain.erc20Address}
                    tokenDecimals={onchain.erc20Decimals}
                    tokenSymbol={onchain.erc20Symbol}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-4 space-y-3">
            <Erc20Card
              tokenAddress={onchain.erc20Address}
              tokenName={onchain.erc20Name}
              tokenSymbol={onchain.erc20Symbol}
              tokenDecimals={onchain.erc20Decimals}
              tokenError={onchain.tokenError}
              globalError={onchain.error}
              spenderAddress={onchain.cashier}
            />
            <CashierBalance
              cashierAddress={onchain.cashier}
              tokenSymbol={onchain.erc20Symbol}
              tokenAddress={onchain.erc20Address}
              tokenDecimals={onchain.erc20Decimals}
            />
            <CashierTokenConfig
              tokenAddress={onchain.erc20Address}
              tokenSymbol={onchain.erc20Symbol}
              config={onchain.cashierConfig}
              error={onchain.cashierConfigError}
            />
          </div>
        </section>
      </div>
    </main>
  );
}
