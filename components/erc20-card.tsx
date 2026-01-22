"use client";

import { useMemo, useState } from "react";
import { formatUnits, parseUnits, type Address } from "viem";
import {
  useConnection,
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";

import { Button } from "@/components/ui/button";
import { erc20Abi } from "@/lib/abi/erc20";
import { formatWithGrouping } from "@/lib/utils";

type Props = {
  tokenAddress?: Address;
  tokenName?: string;
  tokenSymbol?: string;
  tokenDecimals?: number;
  tokenSupply?: string;
  tokenError?: string;
  globalError?: string;
  spenderAddress?: Address;
};

export function Erc20Card({
  tokenAddress,
  tokenName,
  tokenSymbol,
  tokenDecimals,
  tokenSupply,
  tokenError,
  globalError,
  spenderAddress,
}: Props) {
  const { address, isConnected } = useConnection();
  const decimals = tokenDecimals ?? 18;
  const [approveAmount, setApproveAmount] = useState("");

  const balance = useReadContract({
    address: tokenAddress,
    abi: erc20Abi,
    functionName: "balanceOf",
    args: address && tokenAddress ? [address] : undefined,
    query: {
      enabled: isConnected && Boolean(address && tokenAddress),
    },
  });

  const allowance = useReadContract({
    address: tokenAddress,
    abi: erc20Abi,
    functionName: "allowance",
    args:
      address && spenderAddress && tokenAddress
        ? [address, spenderAddress]
        : undefined,
    query: {
      enabled: isConnected && Boolean(address && spenderAddress && tokenAddress),
    },
  });

  const { writeContract, data: hash, isPending, error: writeError } =
    useWriteContract();

  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
    error: confirmError,
  } = useWaitForTransactionReceipt({
    hash,
  });

  const formattedBalance = useMemo(() => {
    if (balance.data === undefined) return "—";
    try {
      return formatWithGrouping(
        formatUnits(balance.data as bigint, decimals),
        { fractionDigits: 4 },
      );
    } catch {
      return "—";
    }
  }, [balance.data, decimals]);

  const formattedAllowance = useMemo(() => {
    if (allowance.data === undefined) return "—";
    try {
      return formatWithGrouping(
        formatUnits(allowance.data as bigint, decimals),
        { fractionDigits: 4 },
      );
    } catch {
      return "—";
    }
  }, [allowance.data, decimals]);

  const onApprove = () => {
    if (!tokenAddress || !spenderAddress) return;
    try {
      const value = parseUnits(approveAmount || "0", decimals);
      writeContract({
        address: tokenAddress,
        abi: erc20Abi,
        functionName: "approve",
        args: [spenderAddress, value],
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="rounded-xl border bg-card p-6 shadow-sm space-y-4">
      <div className="flex items-center gap-2">
        <p className="text-sm font-semibold text-muted-foreground">
          Generic ERC-20
        </p>
        <span className="rounded-full bg-muted px-2 py-0.5 text-[11px] text-foreground">
          From env
        </span>
      </div>
      <div className="space-y-2 text-sm text-muted-foreground">
        <div>
          <p className="font-medium text-foreground">Address</p>
          <p className="break-all">{tokenAddress ?? "—"}</p>
        </div>
        <div className="flex items-center gap-2">
          <p className="font-medium text-foreground">Name</p>
          <p>{tokenName ?? "—"}</p>
          {tokenSymbol ? (
            <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-foreground">
              {tokenSymbol}
            </span>
          ) : null}
        </div>
        <div>
          <p className="font-medium text-foreground">Total supply</p>
          <p>
            {formatWithGrouping(tokenSupply)}
            {tokenSymbol ? ` ${tokenSymbol}` : ""}
          </p>
          {tokenDecimals !== undefined ? (
            <p className="text-xs">Decimals: {tokenDecimals}</p>
          ) : null}
        </div>
      </div>

      {globalError ? (
        <p className="text-sm text-destructive">{globalError}</p>
      ) : tokenError ? (
        <p className="text-sm text-destructive">{tokenError}</p>
      ) : (
        <div className="space-y-3 text-sm text-muted-foreground">
          <div>
            <p className="font-medium text-foreground">Balance</p>
            <p>
              {formattedBalance}
              {tokenSymbol ? ` ${tokenSymbol}` : ""}
            </p>
          </div>
          <div>
            <p className="font-medium text-foreground">
              Allowance (spender)
            </p>
            <p className="break-all text-xs">
              {spenderAddress ?? "No spender"}
            </p>
            <p>
              {formattedAllowance}
              {tokenSymbol ? ` ${tokenSymbol}` : ""}
            </p>
          </div>
          <div className="space-y-2">
            <p className="font-medium text-foreground">Approve</p>
            <div className="flex items-center gap-2">
              <input
                className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                placeholder={`Amount (${tokenSymbol ?? ""})`}
                value={approveAmount}
                onChange={(e) => setApproveAmount(e.target.value)}
              />
              <Button
                size="sm"
                disabled={
                  !approveAmount ||
                  !spenderAddress ||
                  !tokenAddress ||
                  isPending ||
                  isConfirming
                }
                onClick={onApprove}
              >
                {isConfirming ? "Confirming…" : isPending ? "Approving…" : "Approve"}
              </Button>
            </div>
            {writeError ? (
              <p className="text-xs text-destructive">{writeError.message}</p>
            ) : null}
            {confirmError ? (
              <p className="text-xs text-destructive">{confirmError.message}</p>
            ) : null}
            {isConfirmed ? (
              <p className="text-xs text-green-600">Approval confirmed.</p>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}
