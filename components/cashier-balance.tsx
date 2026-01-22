"use client";

import { formatUnits, type Address } from "viem";
import { useConnection, useReadContract } from "wagmi";

import { cashierAbi } from "@/lib/abi/cashier";
import { formatWithGrouping } from "@/lib/utils";

type Props = {
  cashierAddress?: Address;
  tokenSymbol?: string;
  label?: string;
};

export function CashierBalance({
  cashierAddress,
  tokenSymbol,
  label = "Cashier balance (wad)",
}: Props) {
  const { address, isConnected } = useConnection();
  const decimals = 18;

  const balance = useReadContract({
    address: cashierAddress,
    abi: cashierAbi,
    functionName: "balanceWad",
    args: address && cashierAddress ? [address] : undefined,
    query: {
      enabled: isConnected && Boolean(address && cashierAddress),
    },
  });

  const formattedBalance =
    balance.data !== undefined
      ? formatWithGrouping(formatUnits(balance.data as bigint, decimals))
      : "—";

  return (
    <div className="rounded-xl border bg-card p-6 shadow-sm space-y-3">
      <p className="text-sm font-semibold text-muted-foreground">{label}</p>
      <div className="space-y-1 text-sm text-muted-foreground">
        <p className="font-medium text-foreground">User</p>
        <p className="break-all">{address ?? "Connect wallet"}</p>
      </div>
      <div className="space-y-1 text-sm text-muted-foreground">
        <p className="font-medium text-foreground">Balance</p>
        {balance.isLoading ? (
          <p>Loading…</p>
        ) : balance.error ? (
          <p className="text-destructive text-xs">
            {balance.error.message}
          </p>
        ) : (
          <p className="text-lg font-semibold text-foreground">
            {formattedBalance}
            {tokenSymbol ? ` ${tokenSymbol}` : ""}
          </p>
        )}
      </div>
    </div>
  );
}
