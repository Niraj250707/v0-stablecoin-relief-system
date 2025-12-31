import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { calculateRiskScore } from "@/lib/risk-engine"

export async function POST(request: Request) {
  const supabase = await createClient()
  const { tx_hash, sender_id, receiver_id, amount, campaign_id, type } = await request.json()

  // 1. Log Transaction in DB (Cache)
  const { data: tx, error } = await supabase
    .from("transactions")
    .insert({
      tx_hash,
      sender_id,
      receiver_id,
      amount,
      campaign_id,
      type,
      status: "confirmed",
    })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 400 })

  // 2. Trigger Risk Engine
  if (type === "purchase") {
    await calculateRiskScore(sender_id, "profile")
    await calculateRiskScore(receiver_id, "merchant")
  }

  return NextResponse.json({ success: true, transaction: tx })
}
