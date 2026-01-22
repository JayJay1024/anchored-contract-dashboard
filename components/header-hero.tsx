"use client";

import { Sparkles } from "lucide-react";

import { ConnectButton } from "@/components/connect-button";
import { ModeToggle } from "@/components/mode-toggle";

export function HeaderHero() {
  return (
    <header className="flex items-center justify-between rounded-xl border bg-card px-4 py-3 shadow-sm">
      <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
        <Sparkles className="h-4 w-4 text-primary" />
        <span>Live Sepolia snapshot</span>
      </div>
      <div className="flex items-center gap-3">
        <ConnectButton />
        <ModeToggle />
      </div>
    </header>
  );
}
