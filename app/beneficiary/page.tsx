import { DashboardShell } from "@/components/dashboard/shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Wallet, ScanBarcode as ScanQrCode, ShoppingBag, Zap, ShieldCheck, ArrowRightLeft } from "lucide-react"

export default function BeneficiaryDashboard() {
  return (
    <DashboardShell role="beneficiary">
      <div className="space-y-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 backdrop-blur-sm">
              <ShieldCheck className="h-10 w-10" />
            </div>
            <div>
              <h1 className="text-4xl font-black tracking-tight leading-none">Relief Wallet</h1>
              <p className="text-muted-foreground font-medium mt-1">Verified Humanitarian Credits</p>
            </div>
          </div>
          <Button
            size="lg"
            className="gap-4 h-20 px-10 text-2xl font-black shadow-2xl shadow-primary/30 hover:shadow-primary/50 active:scale-95 transition-all rounded-3xl group"
          >
            <ScanQrCode className="h-8 w-8 group-hover:scale-110 transition-transform" />
            Pay Merchant
          </Button>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <Card className="md:col-span-2 bg-primary text-primary-foreground overflow-hidden relative shadow-2xl shadow-primary/20 border-0 group">
            <CardHeader className="relative z-10">
              <CardTitle className="flex items-center gap-3 opacity-90 text-lg font-bold">
                <Wallet className="h-6 w-6" />
                Available Balance
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="flex items-baseline gap-2">
                <div className="text-7xl font-black tracking-tighter">2,450.00</div>
                <div className="text-2xl font-bold opacity-80 uppercase">Relief</div>
              </div>

              <div className="mt-12 grid grid-cols-2 gap-6">
                <div className="p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 group-hover:bg-white/15 transition-colors">
                  <p className="text-xs font-bold uppercase tracking-widest opacity-70 mb-2">Daily Limit</p>
                  <p className="text-2xl font-black">500.00</p>
                </div>
                <div className="p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 group-hover:bg-white/15 transition-colors">
                  <p className="text-xs font-bold uppercase tracking-widest opacity-70 mb-2">Spent Today</p>
                  <p className="text-2xl font-black">120.00</p>
                </div>
              </div>
            </CardContent>
            {/* Decorative mesh background */}
            <div className="absolute top-0 right-0 h-full w-full bg-[radial-gradient(circle_at_70%_20%,rgba(255,255,255,0.15),transparent_50%)]" />
            <div className="absolute -bottom-24 -right-24 h-64 w-64 bg-accent/20 rounded-full blur-[80px]" />
          </Card>

          <Card className="bg-card/30 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
                Active Assistance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-5 border border-accent/20 rounded-2xl bg-accent/5 relative overflow-hidden group">
                <div className="relative z-10">
                  <h3 className="font-black text-xl mb-1">Bihar Flood Aid</h3>
                  <p className="text-xs font-medium text-muted-foreground mb-5 flex items-center gap-2">
                    <Zap className="h-3 w-3 text-accent" />
                    Priority Sector: Food & Health
                  </p>
                  <div className="w-full bg-muted/30 rounded-full h-3 overflow-hidden border border-border/10">
                    <div className="bg-accent h-full w-3/4 animate-pulse-slow shadow-[0_0_15px_rgba(16,185,129,0.3)]" />
                  </div>
                  <div className="flex justify-between text-[11px] mt-2 font-bold uppercase tracking-tight">
                    <span className="text-muted-foreground">Utilized</span>
                    <span className="text-accent">75% Complete</span>
                  </div>
                </div>
              </div>
              <Button
                variant="outline"
                className="w-full h-12 rounded-xl font-bold border-2 hover:bg-muted/50 transition-all bg-transparent"
              >
                View Allocation Rules
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card className="border-border/50 bg-card/30 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between py-6">
            <CardTitle className="text-xl font-black flex items-center gap-2">
              <ArrowRightLeft className="h-5 w-5 text-primary" />
              Recent Transactions
            </CardTitle>
            <Button variant="ghost" size="sm" className="font-bold text-primary hover:bg-primary/5">
              View All History
            </Button>
          </CardHeader>
          <CardContent className="pb-8 px-6">
            <div className="space-y-4">
              {[
                {
                  name: "Prakash General Store",
                  type: "Purchase",
                  amount: "-120.00",
                  icon: ShoppingBag,
                  color: "text-destructive",
                  bg: "bg-destructive/10",
                },
                {
                  name: "Airdrop Distribution",
                  type: "Airdrop",
                  amount: "+500.00",
                  icon: Zap,
                  color: "text-accent",
                  bg: "bg-accent/10",
                },
                {
                  name: "Health Services Unit 4",
                  type: "Purchase",
                  amount: "-45.00",
                  icon: ShoppingBag,
                  color: "text-destructive",
                  bg: "bg-destructive/10",
                },
              ].map((tx, i) => (
                <div
                  key={i}
                  className="flex items-center gap-5 p-4 rounded-2xl bg-muted/20 border border-border/10 hover:border-primary/20 transition-all group"
                >
                  <div
                    className={`h-12 w-12 rounded-xl ${tx.bg} flex items-center justify-center transition-transform group-hover:scale-110`}
                  >
                    <tx.icon className={`h-6 w-6 ${tx.color}`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-base font-black leading-none mb-1">{tx.name}</p>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                      {tx.type} • Today, 2:30 PM
                    </p>
                  </div>
                  <div className={`text-xl font-black ${tx.color} tracking-tight`}>{tx.amount}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  )
}
