import { createClient } from "@/lib/supabase/server"

export type RiskResult = {
  score: number
  factors: string[]
  reason: string
}

/**
 * Analyzes an entity (merchant or beneficiary) for potential fraud or risk.
 * Heuristic-based approach for the prototype.
 */
export async function calculateRiskScore(
  entityId: string,
  entityType: "merchant" | "beneficiary",
): Promise<RiskResult> {
  const supabase = await createClient()

  // [v0] Starting risk analysis for entity: entityId
  const { data: txs } = await supabase
    .from("transactions")
    .select("*")
    .or(`sender_id.eq.${entityId},receiver_id.eq.${entityId}`)
    .order("created_at", { ascending: false })
    .limit(50)

  if (!txs || txs.length === 0) {
    return { score: 12, factors: ["New Entity Profile"], reason: "Entity is currently in initial sync." }
  }

  let score = 15 // Base score for active entities
  const factors: string[] = []

  const now = Date.now()
  const burstWindow = txs.filter((t) => now - new Date(t.created_at).getTime() < 5 * 60 * 1000)
  if (burstWindow.length > 8) {
    score += 45
    factors.push("Unusual burst activity (>8 tx in 5 mins)")
  }

  const nightTxs = txs.filter((t) => {
    const hour = new Date(t.created_at).getHours()
    return hour < 5 || hour > 23
  })
  if (nightTxs.length > txs.length * 0.3) {
    score += 20
    factors.push("Significant out-of-hours operation (>30% at night)")
  }

  // Factor 3: Transaction Velocity (Frequency)
  const last24h = txs.filter((t) => new Date(t.created_at) > new Date(Date.now() - 24 * 60 * 60 * 1000))
  if (last24h.length > 20) {
    score += 40
    factors.push("High transaction velocity (>20 tx/24h)")
  }

  // Factor 4: Unusual Volumes
  const averageAmount = txs.reduce((sum, t) => sum + Number(t.amount), 0) / txs.length
  const highValueTxs = txs.filter((t) => Number(t.amount) > averageAmount * 5)
  if (highValueTxs.length > 2) {
    score += 30
    factors.push("Frequent high-value anomalies")
  }

  // Factor 5: Repetitive Pairs (Potential collusion)
  const recipientCounts: Record<string, number> = {}
  txs.forEach((t) => {
    const pair = entityType === "merchant" ? t.sender_id : t.receiver_id
    recipientCounts[pair] = (recipientCounts[pair] || 0) + 1
  })
  const repeatUsers = Object.values(recipientCounts).filter((c) => c > 5)
  if (repeatUsers.length > 0) {
    score += 25
    factors.push("Repetitive transaction clusters")
  }

  // Cap score at 100
  score = Math.min(score, 100)

  let reason = "Low risk detected."
  if (score > 70) reason = "Highly suspicious activity flagged."
  else if (score > 40) reason = "Moderate risk, requires periodic audit."

  return { score, factors, reason }
}
