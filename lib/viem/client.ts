import { createPublicClient, http } from "viem";
import { sepolia } from "viem/chains";

const rpcUrl =
  process.env.RPC_URL ??
  process.env.SEPOLIA_RPC_URL ??
  process.env.NEXT_PUBLIC_RPC_URL;

export const publicClient = rpcUrl
  ? createPublicClient({
      chain: sepolia,
      transport: http(rpcUrl),
      batch: {
        multicall: true,
      },
    })
  : undefined;
