"use client";

import { coinbaseWallet, injected, walletConnect } from "@wagmi/connectors";
import { createConfig, http, type CreateConnectorFn } from "wagmi";
import { sepolia } from "wagmi/chains";

const rpcUrl = process.env.NEXT_PUBLIC_RPC_URL ?? process.env.SEPOLIA_RPC_URL;
const projectId = process.env.NEXT_PUBLIC_WC_PROJECT_ID;

const connectors: CreateConnectorFn[] = [
  injected({ shimDisconnect: true }),
  // OKX injects a separate provider flag; target helps discover it.
  injected({ shimDisconnect: true, target: "okxwallet" }),
  coinbaseWallet({ appName: "Anchored Dashboard" }),
];

if (projectId) {
  connectors.push(walletConnect({ projectId }));
}

export const wagmiConfig = createConfig({
  chains: [sepolia],
  transports: {
    [sepolia.id]: http(rpcUrl ?? undefined),
  },
  connectors,
  ssr: true,
});
