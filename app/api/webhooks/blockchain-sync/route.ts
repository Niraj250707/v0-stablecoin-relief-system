import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

/**
 * MOCK: Simulates a webhook that listens to blockchain events (e.g., via Alchemy/QuickNode)
 * and syncs them to our internal transparency database.
 */
export async function POST(req: Request) {
  try {
    const body = await req.json()
    const supabase = await createClient()

    // Example payload: { txHash: '0x...', sender: '0x...', amount: 500, type: 'disbursement' }
    const { txHash, senderWallet, receiverWallet, amount, type, campaignId } = body

    // 1. Resolve profiles from wallets
    const { data: sender } = await supabase.from("profiles").select("id").eq("wallet_address", senderWallet).single()

    const { data: receiver } = await supabase
      .from("profiles")
      .select("id")
      .eq("wallet_address", receiverWallet)
      .single()

    // 2. Log the transaction
    const { error } = await supabase.from("transactions").insert({
      tx_hash: txHash,
      sender_id: sender?.id,
      receiver_id: receiver?.id,
      amount,
      type,
      campaign_id: campaignId,
      status: "confirmed",
    })

    if (error) throw error

    // 3. Update campaign spend
    if (campaignId) {
      await supabase.rpc("increment_campaign_spent", {
        camp_id: campaignId,
        amt: amount,
      })
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
