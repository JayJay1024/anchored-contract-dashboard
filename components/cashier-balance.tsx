"use client";

import { formatUnits, type Address } from "viem";
import { useConnection, useReadContract } from "wagmi";

import { cashierAbi } from "@/lib/abi/cashier";
import { formatWithGrouping } from "@/lib/utils";

type Props = {
  cashierAddress?: Address;
  tokenSymbol?: string;
  label?: string;
  tokenAddress?: Address;
  tokenDecimals?: number;
};

export function CashierBalance({
  cashierAddress,
  tokenSymbol,
  label = "Cashier balance",
  tokenAddress,
  tokenDecimals = 18,
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

  const pending = useReadContract({
    address: cashierAddress,
    abi: cashierAbi,
    functionName: "pending",
    args:
      address && cashierAddress && tokenAddress
        ? [address, tokenAddress]
        : undefined,
    query: {
      enabled: isConnected && Boolean(address && cashierAddress && tokenAddress),
    },
  });

  const formattedBalance =
    balance.data !== undefined
      ? formatWithGrouping(formatUnits(balance.data as bigint, decimals))
      : "—";

  const formattedPendingDeposit =
    pending.data && Array.isArray(pending.data)
      ? formatWithGrouping(
          formatUnits(pending.data[0] as bigint, tokenDecimals),
        )
      : "—";
  const formattedPendingWithdrawal =
    pending.data && Array.isArray(pending.data)
      ? formatWithGrouping(formatUnits(pending.data[1] as bigint, decimals))
      : "—";

  return (
    <div className="rounded-xl border bg-card p-6 shadow-sm space-y-3">
      <p className="text-sm font-semibold text-muted-foreground">{label}</p>
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
      <div className="space-y-1 text-sm text-muted-foreground">
        <p className="font-medium text-foreground">Pending</p>
        {pending.isLoading ? (
          <p>Loading…</p>
        ) : pending.error ? (
          <p className="text-destructive text-xs">{pending.error.message}</p>
        ) : (
          <div className="grid grid-cols-2 gap-2">
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                Deposit
              </p>
              <p className="text-sm font-medium text-foreground">
                {formattedPendingDeposit}
                {tokenSymbol ? ` ${tokenSymbol}` : ""}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                Withdraw
              </p>
              <p className="text-sm font-medium text-foreground">
                {formattedPendingWithdrawal}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
