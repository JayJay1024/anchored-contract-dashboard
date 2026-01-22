"use client";

import { useMemo } from "react";
import {
  useConnect,
  useConnection,
  useConnectors,
  useDisconnect,
} from "wagmi";

import { Button } from "@/components/ui/button";

export function ConnectButton() {
  const { address, isConnected } = useConnection();
  const connectors = useConnectors();
  const { mutate: connect, isPending, error } = useConnect();
  const { mutate: disconnect, isPending: isDisconnecting } = useDisconnect();

  const primaryConnector = useMemo(
    () => connectors.find((c) => c.ready) ?? connectors[0],
    [connectors],
  );
  const noConnector = connectors.length === 0;

  if (isConnected && address) {
    return (
      <div className="flex h-10 items-center gap-2 rounded-full border bg-card px-3 text-sm">
        <span className="text-muted-foreground whitespace-nowrap">
          {address.slice(0, 6)}…{address.slice(-4)}
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => disconnect()}
          disabled={isDisconnecting}
        >
          {isDisconnecting ? "Disconnecting…" : "Disconnect"}
        </Button>
      </div>
    );
  }

  return (
    <div className="flex min-w-[180px] flex-col gap-1">
      <Button
        variant="outline"
        size="sm"
        className="h-10 w-full justify-center"
        onClick={() => primaryConnector && connect({ connector: primaryConnector })}
        disabled={!primaryConnector || isPending}
      >
        {isPending ? "Connecting…" : "Connect Wallet"}
      </Button>
      {noConnector ? (
        <p className="text-xs text-destructive">No wallet connectors found.</p>
      ) : null}
      {error ? (
        <p className="text-xs text-destructive">{error.message}</p>
      ) : null}
    </div>
  );
}
