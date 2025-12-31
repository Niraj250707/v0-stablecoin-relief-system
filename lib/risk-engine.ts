import { createClient } from "@/lib/supabase/server"

export async function calculateRiskScore(entityId: string, entityType: "profile" | "merchant") {
  const supabase = await createClient()

  // Heuristic Logic: Check transaction frequency in last 1 hour
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString()

  const { data: transactions, error } = await supabase
    .from("transactions")
    .select("*")
    .eq(entityType === "profile" ? "sender_id" : "receiver_id", entityId)
    .gt("created_at", oneHourAgo)

  if (error) return { score: 0, reason: "Internal sync error" }

  let score = 10 // Base low risk
  let reason = "Normal transaction pattern"

  // Factor 1: Transaction Frequency (Velocity)
  if (transactions && transactions.length > 5) {
    score += 40
    reason = "High transaction velocity detected"
  }

  // Factor 2: High amount concentration
  const totalAmount = transactions?.reduce((sum, tx) => sum + Number(tx.amount), 0) || 0
  if (totalAmount > 5000) {
    score += 30
    reason = "Large volume concentration in short period"
  }

  // Update DB
  await supabase.from("risk_scores").upsert({
    entity_id: entityId,
    entity_type: entityType,
    score: Math.min(score, 100),
    risk_reason: reason,
    last_updated: new Date().toISOString(),
  })

  return { score, reason }
}
