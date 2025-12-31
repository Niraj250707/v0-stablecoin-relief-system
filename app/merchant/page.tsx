import { DashboardShell } from "@/components/dashboard/shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TrendingUp, QrCode, ArrowUpRight, ShieldAlert, DollarSign, ArrowRightLeft } from "lucide-react"

export default function MerchantDashboard() {
  return (
    <DashboardShell role="merchant">
      <div className="space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-5xl font-black tracking-tighter leading-none">Merchant Portal</h1>
            <p className="text-lg text-muted-foreground font-medium">Registered Vendor: Vignesh General Store</p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="h-14 px-6 rounded-2xl border-destructive/30 text-destructive bg-destructive/5 font-bold hover:bg-destructive/10"
            >
              <ShieldAlert className="h-5 w-5 mr-2" />
              Risk: Low
            </Button>
            <Button className="h-14 px-8 rounded-2xl font-black gap-3 shadow-xl shadow-primary/20">
              <QrCode className="h-6 w-6" />
              Receive Payment
            </Button>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Card className="bg-accent text-accent-foreground border-0 shadow-2xl shadow-accent/20 overflow-hidden relative group">
            <CardHeader className="relative z-10">
              <CardTitle className="text-sm font-black uppercase tracking-[0.2em] opacity-80">
                Pending Settlement
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="flex items-baseline gap-2 mb-6">
                <div className="text-6xl font-black tracking-tighter">12,450.00</div>
                <div className="text-xl font-bold opacity-80 uppercase tracking-widest">Relief</div>
              </div>
              <Button className="w-full h-12 rounded-xl font-black bg-white text-accent hover:bg-white/90 shadow-lg shadow-black/10">
                Request Immediate Payout
              </Button>
            </CardContent>
            <div className="absolute top-0 right-0 h-full w-1/2 bg-white/10 skew-x-12 transform translate-x-1/2 group-hover:bg-white/15 transition-colors" />
          </Card>

          <Card className="border-border/50 bg-card/30 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-accent" />
                Sales Today
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-black tracking-tighter">1,840.00</div>
              <p className="text-xs font-bold text-accent mt-1 flex items-center gap-1">
                14 New Transactions
                <span className="opacity-50 font-medium">• +22% vs yesterday</span>
              </p>

              <div className="mt-8 pt-6 border-t border-border/50">
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-3">
                  Popular Categories
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-lg text-[10px] font-bold">
                    Flour & Grains
                  </span>
                  <span className="px-3 py-1 bg-accent/10 text-accent rounded-lg text-[10px] font-bold">Medicines</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/30 backdrop-blur-sm relative overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-primary" />
                Settled to Bank
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-black tracking-tighter">45,000.00</div>
              <p className="text-xs font-bold text-muted-foreground mt-1 flex items-center gap-2">
                Last payout: 2 days ago
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              </p>

              <div className="mt-10">
                <Button variant="ghost" className="p-0 h-auto font-bold text-primary hover:bg-transparent">
                  View payout schedule
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
            <div className="absolute -bottom-8 -right-8 h-32 w-32 bg-primary/5 rounded-full blur-3xl" />
          </Card>
        </div>

        <Card className="border-border/50 bg-card/30 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between py-6">
            <CardTitle className="text-xl font-black flex items-center gap-2">
              <ArrowRightLeft className="h-5 w-5 text-accent" />
              Incoming Aid Payments
            </CardTitle>
            <Button variant="ghost" size="sm" className="font-bold text-accent hover:bg-accent/5">
              History Filter
            </Button>
          </CardHeader>
          <CardContent className="pb-8 px-6">
            <div className="space-y-4">
              {[
                { id: "TX-901", amount: "120.00", category: "Food Items", time: "5 mins ago", status: "Confirmed" },
                {
                  id: "TX-899",
                  amount: "450.00",
                  category: "Medical Supplies",
                  time: "1 hour ago",
                  status: "Pending Settlement",
                },
                { id: "TX-895", amount: "80.00", category: "Dairy & Eggs", time: "3 hours ago", status: "Confirmed" },
              ].map((tx, i) => (
                <div
                  key={i}
                  className="flex items-center gap-5 p-5 rounded-2xl bg-muted/20 border border-border/10 hover:border-accent/20 transition-all group"
                >
                  <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <TrendingUp className="h-6 w-6 text-accent" />
                  </div>
                  <div className="flex-1">
                    <p className="text-base font-black leading-none mb-1">Payment {tx.id}</p>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                      {tx.category} • {tx.time}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-black text-accent tracking-tight">+{tx.amount}</p>
                    <p className="text-[10px] font-black uppercase tracking-[0.1em] opacity-60">{tx.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  )
}
