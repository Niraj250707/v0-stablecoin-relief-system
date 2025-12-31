import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Store, Download, RefreshCw, AlertTriangle, IndianRupee } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export default async function MerchantPortal() {
  const supabase = await createClient()

  const pendingSettlement = 4250.75
  const isFlagged = false

  const recentPayments = [
    { id: "TX-101", customer: "John Doe", amount: 450, time: "2 hours ago", status: "confirmed" },
    { id: "TX-102", customer: "Priya Sharma", amount: 120, time: "5 hours ago", status: "confirmed" },
    { id: "TX-103", customer: "Amit Kumar", amount: 890, time: "Yesterday", status: "confirmed" },
  ]

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
            <Store className="h-7 w-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Ganesh Kirana Store</h1>
            <p className="text-muted-foreground text-sm">Verified Merchant #M-889</p>
          </div>
        </div>
        {isFlagged && (
          <Badge variant="destructive" className="gap-1 px-3 py-1">
            <AlertTriangle className="h-3 w-3" /> Risk Flagged
          </Badge>
        )}
      </div>

      {/* Settlement Card */}
      <Card className="border-2 border-primary/20 bg-muted/30">
        <CardHeader className="text-center">
          <CardDescription className="text-muted-foreground font-medium uppercase tracking-wider text-xs">
            Unsettled RELIEF Balance
          </CardDescription>
          <CardTitle className="text-5xl font-extrabold flex items-center justify-center gap-1">
            <IndianRupee className="h-10 w-10 text-primary" />
            {pendingSettlement.toLocaleString()}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row gap-3">
          <Button className="w-full gap-2 py-6 text-lg">
            <Download className="h-5 w-5" /> Request Cash-out
          </Button>
          <Button variant="outline" className="w-full gap-2 py-6 text-lg bg-transparent">
            <RefreshCw className="h-5 w-5" /> View Settlements
          </Button>
        </CardContent>
      </Card>

      {/* QR Section */}
      <Card className="bg-background border">
        <CardHeader>
          <CardTitle className="text-lg">Accept Payments</CardTitle>
          <CardDescription>Beneficiaries scan this code to pay using their vouchers.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4 py-8">
          <div className="p-4 bg-white rounded-2xl border-2 border-primary shadow-lg">
            <img src="/qr-code-payment.png" alt="Payment QR" className="h-48 w-48" />
          </div>
          <Button variant="ghost" className="text-primary font-bold">
            Download Printable QR Kit
          </Button>
        </CardContent>
      </Card>

      {/* Transaction List */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Recent Customer Payments</CardTitle>
          <Button variant="link" className="text-primary p-0">
            View All
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Transaction ID</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentPayments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell>
                    <p className="font-semibold">{payment.customer}</p>
                    <p className="text-xs text-muted-foreground">{payment.time}</p>
                  </TableCell>
                  <TableCell className="font-mono text-xs">{payment.id}</TableCell>
                  <TableCell className="text-right font-bold">₹{payment.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
