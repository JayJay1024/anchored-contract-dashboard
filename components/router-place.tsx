"use client";

import { useMemo, useState } from "react";
import { parseUnits, type Address } from "viem";
import { useConnection, useSwitchChain, useWriteContract } from "wagmi";
import { sepolia } from "wagmi/chains";

import { routerAbi } from "@/lib/abi/router";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  routerAddress?: Address;
  stockTokenAddress?: Address;
  tokenDecimals?: number;
};

export function RouterPlace({
  routerAddress,
  stockTokenAddress,
  tokenDecimals = 18,
}: Props) {
  const { chainId, isConnected } = useConnection();
  const { switchChain, isPending: isSwitching } = useSwitchChain();
  const {
    writeContract,
    data: txHash,
    isPending,
    error: writeError,
  } = useWriteContract();

  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [slippagePct, setSlippagePct] = useState("0.1"); // percent
  const [tif, setTif] = useState("0");

  const wrongChain = chainId !== undefined && chainId !== sepolia.id;

  const canSubmit =
    isConnected &&
    !wrongChain &&
    routerAddress &&
    stockTokenAddress &&
    quantity !== "" &&
    price !== "";

  const onSubmit = () => {
    if (!canSubmit) return;
    try {
      const slipPercent = Number(slippagePct || "0");
      if (Number.isNaN(slipPercent) || slipPercent < 0) return;
      const slip = BigInt(Math.round(slipPercent * 10_000)); // percent -> ppm
      const qty = parseUnits(quantity, tokenDecimals);
      const pr = parseUnits(price, tokenDecimals);
      const tifValue = Number(tif) as number;
      writeContract({
        address: routerAddress as Address,
        abi: routerAbi,
        functionName: "place",
        args: [stockTokenAddress as Address, qty, pr, slip, tifValue],
      });
    } catch (err) {
      console.error(err);
    }
  };

  const statusLabel = useMemo(() => {
    if (!isConnected) return "Connect wallet to place";
    if (wrongChain) return "Switch to Sepolia";
    if (!routerAddress) return "Router address missing";
    if (!stockTokenAddress) return "Stock token address missing";
    return undefined;
  }, [isConnected, wrongChain, routerAddress, stockTokenAddress]);

  return (
    <div className="rounded-2xl border bg-card p-6 shadow-sm space-y-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-muted-foreground">Place order</p>
          <p className="text-xs text-muted-foreground">
            Quantity/price parsed with {tokenDecimals} decimals
          </p>
        </div>
        {wrongChain ? (
          <Button
            variant="secondary"
            size="sm"
            onClick={() => switchChain?.({ chainId: sepolia.id })}
            disabled={isSwitching}
          >
            {isSwitching ? "Switching…" : "Switch to Sepolia"}
          </Button>
        ) : null}
      </div>

      <div className="space-y-3 text-sm">
        <div className="space-y-1">
          <label className="text-muted-foreground">Quantity</label>
          <input
            className="w-full rounded-lg border border-border bg-background px-3 py-2 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="e.g. 1.5"
          />
        </div>
        <div className="space-y-1">
          <label className="text-muted-foreground">Price</label>
          <input
            className="w-full rounded-lg border border-border bg-background px-3 py-2 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="e.g. 10"
          />
        </div>
        <div className="space-y-1">
          <label className="text-muted-foreground">Slippage (%)</label>
          <input
            className="w-full rounded-lg border border-border bg-background px-3 py-2 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            value={slippagePct}
            onChange={(e) => setSlippagePct(e.target.value)}
            placeholder="0.1"
          />
        </div>
        <div className="space-y-1">
          <label className="text-muted-foreground">Time in force (tif)</label>
          <Select value={tif} onValueChange={setTif}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select TIF" />
            </SelectTrigger>
            <SelectContent sideOffset={6} position="popper">
              <SelectItem value="0">DAY</SelectItem>
              <SelectItem value="1">GTC</SelectItem>
              <SelectItem value="2">OPG</SelectItem>
              <SelectItem value="3">IOC</SelectItem>
              <SelectItem value="4">FOK</SelectItem>
              <SelectItem value="5">GTX</SelectItem>
              <SelectItem value="6">GTD</SelectItem>
              <SelectItem value="7">CLS</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Button
          size="sm"
          onClick={onSubmit}
          disabled={!canSubmit || isPending}
          className="h-10 w-full justify-center"
        >
          {isPending ? "Submitting…" : "Place order"}
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
