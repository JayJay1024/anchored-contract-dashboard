"use client";

import { formatUnits, type Address } from "viem";
import { useConnection, useReadContract } from "wagmi";

import { stockTokenAbi } from "@/lib/abi/stock-token";
import { formatWithGrouping } from "@/lib/utils";

type Props = {
  tokenAddress?: Address;
  tokenSymbol?: string;
  tokenDecimals?: number;
};

export function StockTokenBalance({
  tokenAddress,
  tokenSymbol,
  tokenDecimals = 18,
}: Props) {
  const { address, isConnected } = useConnection();

  const balance = useReadContract({
    address: tokenAddress,
    abi: stockTokenAbi,
    functionName: "balanceOf",
    args: address && tokenAddress ? [address] : undefined,
    query: {
      enabled: isConnected && Boolean(address && tokenAddress),
    },
  });

  const formatted =
    balance.data !== undefined
      ? formatWithGrouping(formatUnits(balance.data as bigint, tokenDecimals))
      : "—";

  if (!tokenAddress) {
    return (
      <p className="text-sm text-muted-foreground">
        Stock token address missing.
      </p>
    );
  }

  return (
    <div className="space-y-1 text-sm text-muted-foreground">
      <p className="font-medium text-foreground">Wallet balance</p>
      {balance.isLoading ? (
        <p>Loading…</p>
      ) : balance.error ? (
        <p className="text-xs text-destructive">{balance.error.message}</p>
      ) : (
        <p className="text-sm font-medium text-foreground">
          {formatted}
          {tokenSymbol ? ` ${tokenSymbol}` : ""}
        </p>
      )}
    </div>
  );
}
