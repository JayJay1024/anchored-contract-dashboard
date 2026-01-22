"use client";

import { MoonStar } from "lucide-react";

type Props = {
  tokenAddress?: string;
  tokenSymbol?: string;
  config?:
    | {
        minAmount: string;
        decimals: number;
        depositPaused: boolean;
        withdrawPaused: boolean;
        usdRate: string;
        withdrawBuffer: string;
        withdrawBufferCapacity: string;
      }
    | undefined;
  error?: string;
};

export function CashierTokenConfig({ tokenAddress, tokenSymbol, config, error }: Props) {
  return (
    <div className="rounded-xl border bg-card p-6 shadow-sm">
      <div className="flex items-center gap-2">
        <p className="text-sm font-semibold text-muted-foreground">
          Cashier token config
        </p>
        <span className="rounded-full bg-muted px-2 py-0.5 text-[11px] text-foreground">
          {tokenSymbol ?? "Token"}
        </span>
      </div>
      <p className="mt-2 text-xs text-muted-foreground break-all">
        {tokenAddress ?? "—"}
      </p>

      {error ? (
        <p className="mt-4 text-sm text-destructive">{error}</p>
      ) : config ? (
        <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-muted-foreground">
          <div>
            <p className="font-medium text-foreground">Min amount</p>
            <p>{config.minAmount}</p>
          </div>
          <div>
            <p className="font-medium text-foreground">Decimals</p>
            <p>{config.decimals}</p>
          </div>
          <div>
            <p className="font-medium text-foreground">Deposit paused</p>
            <p>{config.depositPaused ? "Yes" : "No"}</p>
          </div>
          <div>
            <p className="font-medium text-foreground">Withdraw paused</p>
            <p>{config.withdrawPaused ? "Yes" : "No"}</p>
          </div>
          <div>
            <p className="font-medium text-foreground">USD rate</p>
            <p>{config.usdRate}</p>
          </div>
          <div>
            <p className="font-medium text-foreground">Buffer</p>
            <p>{config.withdrawBuffer}</p>
          </div>
          <div>
            <p className="font-medium text-foreground">Buffer cap</p>
            <p>{config.withdrawBufferCapacity}</p>
          </div>
        </div>
      ) : (
        <div className="mt-4 inline-flex items-center gap-2 rounded-md border bg-muted px-3 py-2 text-xs font-medium text-muted-foreground">
          <MoonStar className="h-4 w-4" />
          Waiting for config…
        </div>
      )}
    </div>
  );
}
