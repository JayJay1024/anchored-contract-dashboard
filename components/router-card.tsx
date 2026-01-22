"use client";

import { type Address } from "viem";
type Props = {
  router?: Address;
  cashier?: Address;
  exchange?: Address;
  error?: string;
};

export function RouterCard({ router, cashier, exchange, error }: Props) {
  return (
    <div className="rounded-xl border bg-card p-6 shadow-sm">
      <p className="text-sm font-semibold text-muted-foreground">
        Router (Sepolia)
      </p>
      <h2 className="mt-2 text-xl font-semibold">Core endpoints</h2>
      {error ? (
        <p className="mt-3 text-sm text-destructive">{error}</p>
      ) : (
        <dl className="mt-3 space-y-2 text-sm text-muted-foreground">
          <div>
            <dt className="font-medium text-foreground">Router</dt>
            <dd className="break-all">{router ?? "—"}</dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">Cashier</dt>
            <dd className="break-all">{cashier ?? "—"}</dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">Exchange</dt>
            <dd className="break-all">{exchange ?? "—"}</dd>
          </div>
        </dl>
      )}
    </div>
  );
}
