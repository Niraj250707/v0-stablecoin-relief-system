import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ShieldAlert, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react"

export default async function RiskCenter() {
  const supabase = await createClient()

  const { data: riskScores } = await supabase
    .from("risk_scores")
    .select("*")
    .order("last_updated", { ascending: false })

  return (
    <div className="p-6 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">AI Risk Analytics</h1>
          <p className="text-muted-foreground">Heuristic-based fraud detection for relief distribution.</p>
        </div>
        <Badge variant="outline" className="gap-2 px-4 py-2 border-primary text-primary bg-primary/5">
          <ShieldAlert className="h-4 w-4" /> Live Monitoring Active
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-destructive/20 bg-destructive/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-destructive" /> High Risk Merchants
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">2</div>
            <p className="text-xs text-muted-foreground mt-1">Requires immediate manual audit</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2 text-primary">
              <TrendingUp className="h-4 w-4" /> Avg Risk Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">12.4</div>
            <p className="text-xs text-muted-foreground mt-1">Well within safety threshold (40)</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2 text-accent">
              <CheckCircle className="h-4 w-4" /> Trusted Nodes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">48</div>
            <p className="text-xs text-muted-foreground mt-1">Verified local merchants</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Fraud Detection Ledger</CardTitle>
          <CardDescription>AI-identified anomalies in merchant and beneficiary behavior.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Entity</TableHead>
                <TableHead>Risk Score</TableHead>
                <TableHead>Primary Factors</TableHead>
                <TableHead>Last Flagged</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {riskScores?.map((risk) => (
                <TableRow key={risk.id}>
                  <TableCell className="font-medium">Merchant #M-889</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className={risk.score > 50 ? "text-destructive font-bold" : "text-primary font-bold"}>
                        {risk.score}
                      </span>
                      <div className="w-24 bg-muted rounded-full h-1.5 overflow-hidden">
                        <div
                          className={risk.score > 50 ? "bg-destructive h-full" : "bg-primary h-full"}
                          style={{ width: `${risk.score}%` }}
                        />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="max-w-xs truncate text-xs italic">
                    {risk.risk_factors?.join(", ") || "No significant factors"}
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    {new Date(risk.last_updated).toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge variant={risk.score > 50 ? "destructive" : "secondary"}>
                      {risk.score > 50 ? "Review" : "Safe"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
              {(!riskScores || riskScores.length === 0) && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground italic">
                    No risk anomalies detected in current cycle.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
