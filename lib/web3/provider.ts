import { ethers } from "ethers"

export const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL || "https://rpc-amoy.polygon.technology"

export function getProvider() {
  return new ethers.JsonRpcProvider(RPC_URL)
}

export function getContract(address: string, abi: any, signer?: ethers.Signer) {
  const provider = getProvider()
  return new ethers.Contract(address, abi, signer || provider)
}
