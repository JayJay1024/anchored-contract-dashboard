import { ArrowRight, MoonStar, Sparkles } from "lucide-react";
import { formatUnits, isAddress, type Address } from "viem";

import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { ConnectButton } from "@/components/connect-button";
import { CashierTokenConfig } from "@/components/cashier-token-config";
import { Erc20Card } from "@/components/erc20-card";
import { cashierAbi } from "@/lib/abi/cashier";
import { erc20Abi } from "@/lib/abi/erc20";
import { routerAbi } from "@/lib/abi/router";
import { stockTokenAbi } from "@/lib/abi/stock-token";
import { publicClient } from "@/lib/viem/client";
import { formatWithGrouping } from "@/lib/utils";

type OnchainSnapshot = {
  routerAddress?: Address;
  stockTokenAddress?: Address;
  cashier?: Address;
  exchange?: Address;
  tokenName?: string;
  tokenSymbol?: string;
  tokenSupply?: string;
  tokenDecimals?: number;
  erc20Address?: Address;
  erc20Name?: string;
  erc20Symbol?: string;
  erc20Supply?: string;
  erc20Decimals?: number;
  cashierConfig?: {
    minAmount: string;
    decimals: number;
    depositPaused: boolean;
    withdrawPaused: boolean;
    usdRate: string;
    withdrawBuffer: string;
    withdrawBufferCapacity: string;
  };
  error?: string;
  tokenError?: string;
  cashierConfigError?: string;
};

async function getOnchainSnapshot(): Promise<OnchainSnapshot> {
  const routerEnv =
    process.env.ROUTER_ADDRESS ?? process.env.NEXT_PUBLIC_ROUTER_ADDRESS;
  const stockTokenEnv =
    process.env.STOCK_TOKEN_ADDRESS ??
    process.env.NEXT_PUBLIC_STOCK_TOKEN_ADDRESS;
  const erc20Env =
    process.env.ERC20_TOKEN_ADDRESS ??
    process.env.NEXT_PUBLIC_ERC20_TOKEN_ADDRESS;

  if (!routerEnv || !isAddress(routerEnv)) {
    return { error: "Missing or invalid ROUTER_ADDRESS env" };
  }
  if (!stockTokenEnv || !isAddress(stockTokenEnv)) {
    return { error: "Missing or invalid STOCK_TOKEN_ADDRESS env" };
  }
  if (!publicClient) {
    return { error: "Missing RPC_URL (or SEPOLIA_RPC_URL) for viem client" };
  }

  const routerAddress = routerEnv as Address;
  const stockTokenAddress = stockTokenEnv as Address;
  const erc20Address =
    erc20Env && isAddress(erc20Env) ? (erc20Env as Address) : undefined;

  try {
    const [routerReads, tokenReads, erc20Reads] = await Promise.all([
      publicClient.multicall({
        contracts: [
          {
            address: routerAddress,
            abi: routerAbi,
            functionName: "cashier",
          },
          {
            address: routerAddress,
            abi: routerAbi,
            functionName: "exchange",
          },
        ],
        allowFailure: false,
      }),
      publicClient.multicall({
        contracts: [
          {
            address: stockTokenAddress,
            abi: stockTokenAbi,
            functionName: "name",
          },
          {
            address: stockTokenAddress,
            abi: stockTokenAbi,
            functionName: "symbol",
          },
          {
            address: stockTokenAddress,
            abi: stockTokenAbi,
            functionName: "decimals",
          },
          {
            address: stockTokenAddress,
            abi: stockTokenAbi,
            functionName: "totalSupply",
          },
        ],
        allowFailure: false,
      }),
      erc20Address
        ? publicClient.multicall({
            contracts: [
              { address: erc20Address, abi: erc20Abi, functionName: "name" },
              { address: erc20Address, abi: erc20Abi, functionName: "symbol" },
              {
                address: erc20Address,
                abi: erc20Abi,
                functionName: "decimals",
              },
              {
                address: erc20Address,
                abi: erc20Abi,
                functionName: "totalSupply",
              },
            ],
            allowFailure: false,
          })
        : Promise.resolve(undefined),
    ]);

    const [cashier, exchange] = routerReads;
    const [tokenName, tokenSymbol, tokenDecimals, tokenSupply] = tokenReads;
    const erc20Values = erc20Reads ?? [];
    const erc20Name = erc20Values[0] as string | undefined;
    const erc20Symbol = erc20Values[1] as string | undefined;
    const erc20Decimals = erc20Values[2] as bigint | number | undefined;
    const erc20SupplyRaw = erc20Values[3] as bigint | undefined;

    let cashierConfig:
      | OnchainSnapshot["cashierConfig"]
      | undefined = undefined;
    let cashierConfigError: string | undefined;

    if (erc20Address && cashier) {
      try {
        const config = await publicClient.readContract({
          address: cashier as Address,
          abi: cashierAbi,
          functionName: "tokenConfig",
          args: [erc20Address],
        });
        const [
          minAmount,
          decimals,
          depositPaused,
          withdrawPaused,
          usdRate,
          withdrawBuffer,
          withdrawBufferCapacity,
        ] = config as [
          bigint | number,
          number,
          boolean,
          boolean,
          bigint | number,
          bigint,
          bigint,
        ];
        cashierConfig = {
          minAmount: formatWithGrouping(minAmount.toString()),
          decimals: Number(decimals),
          depositPaused,
          withdrawPaused,
          usdRate: formatWithGrouping(usdRate.toString()),
          withdrawBuffer: formatWithGrouping(withdrawBuffer.toString()),
          withdrawBufferCapacity: formatWithGrouping(
            withdrawBufferCapacity.toString(),
          ),
        };
      } catch (err) {
        cashierConfigError =
          err instanceof Error ? err.message : "Failed to read token config";
      }
    }

    return {
      routerAddress,
      stockTokenAddress,
      cashier: cashier as Address,
      exchange: exchange as Address,
      tokenName: tokenName as string,
      tokenSymbol: tokenSymbol as string,
      tokenDecimals: Number(tokenDecimals),
      tokenSupply: formatUnits(
        tokenSupply as bigint,
        Number(tokenDecimals ?? 18),
      ),
      erc20Address,
      erc20Name,
      erc20Symbol,
      erc20Decimals: erc20Decimals ? Number(erc20Decimals) : undefined,
      erc20Supply:
        erc20SupplyRaw && erc20Decimals !== undefined
          ? formatUnits(erc20SupplyRaw, Number(erc20Decimals))
          : undefined,
      tokenError:
        !erc20Address && erc20Env
          ? "ERC20_TOKEN_ADDRESS is invalid"
          : !erc20Env
            ? "ERC20_TOKEN_ADDRESS not set"
            : undefined,
      cashierConfig,
      cashierConfigError,
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch onchain data";
    return {
      routerAddress,
      stockTokenAddress,
      erc20Address,
      error: message,
    };
  }
}

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
        </section>
      </div>
    </main>
  );
}
