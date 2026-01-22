"use client";

import { type Address } from "viem";

import { StockTokenBalance } from "@/components/stock-token-balance";

type Props = {
  address?: Address;
  name?: string;
  symbol?: string;
  decimals?: number;
  error?: string;
};

export function StockTokenCard({
  address,
  name,
  symbol,
  decimals,
  error,
}: Props) {
  return (
    <div className="rounded-xl border bg-card p-6 shadow-sm space-y-4">
      <div>
        <p className="text-sm font-semibold text-muted-foreground">
          Stock token
        </p>
        <h2 className="mt-2 text-xl font-semibold">Metadata</h2>
      </div>
      {error ? (
        <p className="text-sm text-destructive">{error}</p>
      ) : (
        <dl className="space-y-2 text-sm text-muted-foreground">
          <div>
            <dt className="font-medium text-foreground">Address</dt>
            <dd className="break-all">{address ?? "—"}</dd>
          </div>
          <div className="flex items-center gap-2">
            <dt className="font-medium text-foreground">Name</dt>
            <dd>{name ?? "—"}</dd>
            {symbol ? (
              <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-foreground">
                {symbol}
              </span>
            ) : null}
          </div>
          <StockTokenBalance
            tokenAddress={address}
            tokenSymbol={symbol}
            tokenDecimals={decimals}
          />
        </dl>
      )}
    </div>
  );
}
