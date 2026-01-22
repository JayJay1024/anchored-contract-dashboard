"use client";

import { Sparkles } from "lucide-react";

import { ConnectButton } from "@/components/connect-button";
import { ModeToggle } from "@/components/mode-toggle";

export function HeaderHero() {
  return (
    <header className="relative overflow-hidden rounded-2xl border bg-gradient-to-br from-background via-card to-muted/50 p-8 shadow-sm">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.08),transparent_35%)]" />
      <div className="relative flex flex-col gap-5">
        <div className="inline-flex w-fit items-center gap-2 rounded-full border bg-card/80 px-4 py-2 text-xs font-medium text-muted-foreground shadow-sm backdrop-blur">
          <Sparkles className="h-4 w-4 text-primary" />
          <span>Live Sepolia snapshot</span>
        </div>
        <div className="flex flex-col gap-3">
          <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
            Anchored Contract Dashboard
          </h1>
          <p className="max-w-3xl text-lg text-muted-foreground">
            Router endpoints, stock token metadata, ERC-20 balances, and cashier token config in one glance.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <ModeToggle />
          <ConnectButton />
        </div>
      </div>
    </header>
  );
}
