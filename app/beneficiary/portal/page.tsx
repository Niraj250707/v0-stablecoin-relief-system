import { cn } from "@/lib/utils"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Wallet, QrCode, ArrowUpRight, ArrowDownLeft, History } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default async function BeneficiaryPortal() {
  const supabase = await createClient()

  // Simulated balance and transaction data for prototype
  const balance = 1200.5
  const householdId = "HH-4402"

  const transactions = [
    { id: 1, type: "purchase", amount: 450, merchant: "Ganesh Kirana Store", date: "2024-05-12", status: "confirmed" },
    { id: 2, type: "purchase", amount: 200, merchant: "Arogya Medicals", date: "2024-05-11", status: "confirmed" },
    {
      id: 3,
      type: "allocation",
      amount: 1500,
      merchant: " Bihar Monsoon Relief",
      date: "2024-05-10",
      status: "confirmed",
    },
  ]

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Namaste, John Doe</h1>
          <p className="text-muted-foreground text-sm">Household ID: {householdId}</p>
        </div>
        <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 px-3 py-1">
          Verified Household
        </Badge>
      </div>

      {/* Balance Card */}
      <Card className="bg-primary text-primary-foreground overflow-hidden relative">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Wallet className="h-32 w-32" />
        </div>
        <CardHeader>
          <CardDescription className="text-primary-foreground/80 font-medium">Available Balance</CardDescription>
          <CardTitle className="text-4xl font-bold">₹{balance.toLocaleString()}</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-3">
          <Button variant="secondary" className="w-full gap-2 py-6 text-lg" asChild>
            <Link href="/beneficiary/pay">
              <QrCode className="h-6 w-6" /> Pay Merchant
            </Link>
          </Button>
        </CardContent>
      </Card>

      {/* Active Enrollments */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-bold">Active Program</CardTitle>
            <History className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="font-semibold">Bihar Monsoon Flood Relief 2024</p>
            <p className="text-sm text-muted-foreground mt-1">Allocation: ₹500/day</p>
            <div className="mt-4 flex items-center justify-between text-sm">
              <span>Daily Limit Used</span>
              <span className="font-medium">₹0 / ₹500</span>
            </div>
            <div className="w-full bg-muted rounded-full h-1.5 mt-2">
              <div className="bg-primary h-full rounded-full" style={{ width: "0%" }} />
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="flex flex-col items-center justify-center p-4 text-center">
            <div className="h-10 w-10 bg-accent/10 text-accent rounded-full flex items-center justify-center mb-2">
              <ArrowDownLeft className="h-5 w-5" />
            </div>
            <p className="text-xs text-muted-foreground">Total Aid</p>
            <p className="text-lg font-bold">₹1,500</p>
          </Card>
          <Card className="flex flex-col items-center justify-center p-4 text-center">
            <div className="h-10 w-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-2">
              <ArrowUpRight className="h-5 w-5" />
            </div>
            <p className="text-xs text-muted-foreground">Total Spent</p>
            <p className="text-lg font-bold">₹650</p>
          </Card>
        </div>
      </div>

      {/* Transaction History */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Recipient/Source</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((tx) => (
                <TableRow key={tx.id}>
                  <TableCell>
                    <Badge variant={tx.type === "allocation" ? "default" : "secondary"} className="capitalize">
                      {tx.type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <p className="font-medium text-sm">{tx.merchant}</p>
                    <p className="text-xs text-muted-foreground">{tx.date}</p>
                  </TableCell>
                  <TableCell className={cn("text-right font-bold", tx.type === "allocation" ? "text-accent" : "")}>
                    {tx.type === "allocation" ? "+" : "-"}₹{tx.amount}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
