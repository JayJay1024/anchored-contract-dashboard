import { ArrowRight, MoonStar, Sparkles } from "lucide-react";
import { formatUnits, isAddress, type Address } from "viem";

import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { ConnectButton } from "@/components/connect-button";
import { erc20Abi } from "@/lib/abi/erc20";
import { routerAbi } from "@/lib/abi/router";
import { stockTokenAbi } from "@/lib/abi/stock-token";
import { publicClient } from "@/lib/viem/client";

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
  error?: string;
  tokenError?: string;
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
      <div className="mx-auto flex max-w-5xl flex-col gap-12 px-6 py-20 sm:px-10">
        <header className="flex flex-col gap-5">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border bg-card px-4 py-2 text-xs font-medium text-muted-foreground shadow-sm">
            <Sparkles className="h-4 w-4 text-primary" />
            <span>shadcn/ui is wired up</span>
          </div>
          <div className="flex flex-col gap-3">
            <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
              Anchored Contract Dashboard
            </h1>
            <p className="max-w-2xl text-lg text-muted-foreground">
              On-chain snapshot from Sepolia: router-sourced addresses and
              stock token metadata pulled live with viem.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button className="gap-2">
              Get started
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button variant="secondary">View components</Button>
            <Button variant="ghost" size="icon" aria-label="Minimal action">
              <Sparkles className="h-4 w-4" />
            </Button>
            <ModeToggle />
            <ConnectButton />
          </div>
        </header>

        <section className="grid gap-6 md:grid-cols-2">
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
                      {onchain.tokenSupply ?? "—"}
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

            <div className="rounded-lg border bg-card/60 p-4 shadow-sm">
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold text-muted-foreground">
                  Generic ERC-20
                </p>
                <span className="rounded-full bg-muted px-2 py-0.5 text-[11px] text-foreground">
                  From env
                </span>
              </div>
              {onchain.tokenError ? (
                <p className="mt-3 text-xs text-destructive">
                  {onchain.tokenError}
                </p>
              ) : onchain.error ? (
                <p className="mt-3 text-xs text-destructive">{onchain.error}</p>
              ) : (
                <dl className="mt-3 space-y-2 text-sm text-muted-foreground">
                  <div>
                    <dt className="font-medium text-foreground">Address</dt>
                    <dd className="break-all">{onchain.erc20Address ?? "—"}</dd>
                  </div>
                  <div className="flex items-center gap-2">
                    <dt className="font-medium text-foreground">Name</dt>
                    <dd>{onchain.erc20Name ?? "—"}</dd>
                    {onchain.erc20Symbol ? (
                      <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-foreground">
                        {onchain.erc20Symbol}
                      </span>
                    ) : null}
                  </div>
                  <div>
                    <dt className="font-medium text-foreground">
                      Total supply
                    </dt>
                    <dd>
                      {onchain.erc20Supply ?? "—"}
                      {onchain.erc20Symbol ? ` ${onchain.erc20Symbol}` : ""}
                    </dd>
                    {onchain.erc20Decimals !== undefined ? (
                      <p className="text-xs">
                        Decimals: {onchain.erc20Decimals}
                      </p>
                    ) : null}
                  </div>
                </dl>
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
