import { formatUnits, isAddress, type Address } from "viem";

import { cashierAbi } from "@/lib/abi/cashier";
import { erc20Abi } from "@/lib/abi/erc20";
import { routerAbi } from "@/lib/abi/router";
import { stockTokenAbi } from "@/lib/abi/stock-token";
import { publicClient } from "@/lib/viem/client";
import { formatWithGrouping } from "@/lib/utils";

export type OnchainSnapshot = {
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

export async function getOnchainSnapshot(): Promise<OnchainSnapshot> {
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

    let cashierConfig: OnchainSnapshot["cashierConfig"] | undefined =
      undefined;
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
