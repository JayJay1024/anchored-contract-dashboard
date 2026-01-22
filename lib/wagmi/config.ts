"use client";

import { coinbaseWallet, injected, walletConnect } from "@wagmi/connectors";
import { createConfig, http } from "wagmi";
import { sepolia } from "wagmi/chains";
import type { Chain, Connector } from "wagmi";

const rpcUrl = process.env.NEXT_PUBLIC_RPC_URL ?? process.env.SEPOLIA_RPC_URL;
const projectId = process.env.NEXT_PUBLIC_WC_PROJECT_ID;

const connectors = [
  injected({ shimDisconnect: true }),
  projectId ? walletConnect({ projectId }) : null,
  coinbaseWallet({ appName: "Anchored Dashboard" }),
].filter(Boolean) as Connector[];

export const wagmiConfig = createConfig({
  chains: [sepolia] as [Chain, ...Chain[]],
  transports: {
    [sepolia.id]: http(rpcUrl ?? undefined),
  },
  connectors,
  ssr: true,
});
