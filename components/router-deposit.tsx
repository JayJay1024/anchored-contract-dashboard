"use client";

import { useMemo, useState } from "react";
import { parseUnits, type Address } from "viem";
import { useConnection, useSwitchChain, useWriteContract } from "wagmi";
import { sepolia } from "wagmi/chains";

import { routerAbi } from "@/lib/abi/router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Props = {
  routerAddress?: Address;
  tokenAddress?: Address;
  tokenDecimals?: number;
  tokenSymbol?: string;
};

export function RouterDeposit({
  routerAddress,
  tokenAddress,
  tokenDecimals = 18,
  tokenSymbol,
}: Props) {
  const { chainId, isConnected } = useConnection();
  const { switchChain, isPending: isSwitching } = useSwitchChain();
  const {
    writeContract,
    isPending,
    data: txHash,
    error: writeError,
  } = useWriteContract();

  const [amount, setAmount] = useState("");
  const wrongChain = chainId !== undefined && chainId !== sepolia.id;

  const canSubmit =
    isConnected && !wrongChain && routerAddress && tokenAddress && amount !== "";

  const statusLabel = useMemo(() => {
    if (!isConnected) return "Connect wallet to deposit";
    if (wrongChain) return "Switch to Sepolia";
    if (!routerAddress) return "Router address missing";
    if (!tokenAddress) return "Token address missing";
    return undefined;
  }, [isConnected, wrongChain, routerAddress, tokenAddress]);

  const onSubmit = () => {
    if (!canSubmit) return;
    try {
      const amt = parseUnits(amount, tokenDecimals);
      writeContract({
        address: routerAddress as Address,
        abi: routerAbi,
        functionName: "deposit",
        args: [tokenAddress as Address, amt],
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="rounded-2xl border bg-card p-6 shadow-sm space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-muted-foreground">
            Deposit to router
          </p>
          <p className="text-xs text-muted-foreground">
            Amount parsed with {tokenDecimals} decimals
          </p>
        </div>
        {wrongChain ? (
          <Button
            variant="secondary"
            size="sm"
            onClick={() => switchChain?.({ chainId: sepolia.id })}
            disabled={isSwitching}
          >
            {isSwitching ? "Switching…" : "Switch"}
          </Button>
        ) : null}
      </div>

      <div className="space-y-1 text-sm">
        <label className="block text-muted-foreground">Amount</label>
        <Input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder={`Amount ${tokenSymbol ?? ""}`}
          className="h-9"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Button
          size="sm"
          disabled={!canSubmit || isPending}
          onClick={onSubmit}
          className="h-10 w-full justify-center"
        >
          {isPending ? "Submitting…" : "Deposit"}
        </Button>
        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          {txHash ? <span className="break-all">Tx: {txHash}</span> : null}
          {statusLabel ? <span>{statusLabel}</span> : null}
        </div>
      </div>

      {writeError ? (
        <p className="text-xs text-destructive">{writeError.message}</p>
      ) : null}
    </div>
  );
}
