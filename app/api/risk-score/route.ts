import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

/**
 * AI Risk Scoring Endpoint (Rule-based Heuristics for Prototype)
 * Flags suspicious transaction patterns to prevent aid leakage.
 */
export async function POST(request: Request) {
  const supabase = await createClient()
  const { merchant_id, transactions } = await request.json()

  // Heuristic-based AI Scoring
  let score = 0
  const factors: string[] = []

  // Factor 1: High frequency of small transactions (Velocity Check)
  const recentTx = transactions.filter((t: any) => {
    const txDate = new Date(t.created_at)
    const fiveMinsAgo = new Date(Date.now() - 5 * 60 * 1000)
    return txDate > fiveMinsAgo
  })

  if (recentTx.length > 10) {
    score += 40
    factors.push("Unusual transaction velocity: >10 tx in 5 mins")
  }

  // Factor 2: Repeat beneficiaries at same merchant in short window
  const uniqueBeneficiaries = new Set(recentTx.map((t: any) => t.beneficiary_id))
  if (uniqueBeneficiaries.size < recentTx.length * 0.5) {
    score += 30
    factors.push("Pattern detection: Repeated beneficiary usage")
  }

  // Factor 3: Odd hours (e.g., 2 AM)
  const hour = new Date().getHours()
  if (hour >= 0 && hour <= 4) {
    score += 20
    factors.push("Transaction outside typical business hours")
  }

  // Store in DB
  const { error } = await supabase.from("risk_scores").insert({
    entity_id: merchant_id,
    entity_type: "merchant",
    score: Math.min(score, 100),
    risk_factors: factors,
  })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ score, factors })
}
