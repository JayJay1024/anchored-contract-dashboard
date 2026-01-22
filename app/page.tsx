import { CashierTokenConfig } from "@/components/cashier-token-config";
import { Erc20Card } from "@/components/erc20-card";
import { CashierBalance } from "@/components/cashier-balance";
import { RouterCard } from "@/components/router-card";
import { StockTokenCard } from "@/components/stock-token-card";
import { HeaderHero } from "@/components/header-hero";
import { getOnchainSnapshot } from "@/lib/onchain";

export default async function Home() {
  const onchain = await getOnchainSnapshot();
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6 py-16 sm:px-10">
        <HeaderHero />

        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
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
            tokenAddress={onchain.erc20Address}
            tokenDecimals={onchain.erc20Decimals}
          />
        </section>
      </div>
    </main>
  );
}
