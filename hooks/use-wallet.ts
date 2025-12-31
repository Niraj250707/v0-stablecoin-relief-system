"use client"

import { useState, useEffect, useCallback } from "react"
import { ethers } from "ethers"

export function useWallet() {
  const [address, setAddress] = useState<string | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const connect = useCallback(async () => {
    if (!window.ethereum) {
      setError("Please install MetaMask")
      return
    }

    setIsConnecting(true)
    try {
      const provider = new ethers.BrowserProvider(window.ethereum)
      const accounts = await provider.send("eth_requestAccounts", [])
      setAddress(accounts[0])
      setError(null)
    } catch (err: any) {
      setError(err.message || "Failed to connect")
    } finally {
      setIsConnecting(false)
    }
  }, [])

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts: string[]) => {
        setAddress(accounts[0] || null)
      })
    }
  }, [])

  return { address, connect, isConnecting, error }
}
