import { DashboardShell } from "@/components/dashboard/shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, DollarSign, Activity, ShieldAlert, ArrowUpRight } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export default function AdminDashboard() {
  return (
    <DashboardShell role="admin">
      <div className="space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-5xl font-black tracking-tighter leading-none">Command Center</h1>
            <p className="text-lg text-muted-foreground font-medium">
              Monitoring real-time humanitarian liquidity and fraud signals.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-card/50 p-2 rounded-2xl border border-border/50 backdrop-blur-sm">
            <div className="px-4 py-2 bg-primary/10 rounded-xl border border-primary/20">
              <p className="text-[10px] font-bold uppercase text-primary">System Health</p>
              <p className="text-sm font-black">Optimum</p>
            </div>
            <div className="px-4 py-2 bg-accent/10 rounded-xl border border-accent/20">
              <p className="text-[10px] font-bold uppercase text-accent">Active Nodes</p>
              <p className="text-sm font-black">128</p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="border-border/50 bg-card/30 backdrop-blur-sm hover:border-primary/50 transition-colors duration-500 shadow-xl shadow-black/5">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-bold uppercase tracking-wider opacity-70">Total Airdropped</CardTitle>
              <DollarSign className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black">1.2M+</div>
              <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                <span className="text-accent font-bold">↑ 12%</span> since last cycle
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Distributed</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,284,500 RELIEF</div>
              <p className="text-xs text-muted-foreground">+20.1% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Verified Households</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12,482</div>
              <p className="text-xs text-muted-foreground">+482 in last 24h</p>
            </CardContent>
          </Card>
          <Card className="col-span-4 shadow-md border-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Active Programs</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">Real-time budget utilization</p>
              </div>
              <Activity className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent className="space-y-6">
              {[
                { name: "Bihar Flood Relief", spent: 234560, total: 1000000, color: "bg-primary" },
                { name: "Assam Landslide Support", spent: 89120, total: 500000, color: "bg-accent" },
                { name: "Odisha Cyclone Aid", spent: 456000, total: 600000, color: "bg-primary" },
              ].map((program) => (
                <div key={program.name} className="space-y-2">
                  <div className="flex justify-between text-sm font-medium">
                    <span>{program.name}</span>
                    <span className="text-muted-foreground">{((program.spent / program.total) * 100).toFixed(1)}%</span>
                  </div>
                  <Progress value={(program.spent / program.total) * 100} className="h-2" />
                  <div className="flex justify-between text-[10px] text-muted-foreground">
                    <span>{program.spent.toLocaleString()} RELIEF Distributed</span>
                    <span>Goal: {program.total.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Fraud Alerts</CardTitle>
              <ShieldAlert className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">Requires immediate review</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4 shadow-md border-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Program Funding Flow</CardTitle>
              </div>
              <ArrowUpRight className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent className="pl-2">
              <div className="h-[300px] flex items-center justify-center border-2 border-dashed rounded-lg bg-muted/50">
                Chart Placeholder: Distribution over time
              </div>
            </CardContent>
          </Card>
          <Card className="col-span-3 shadow-md border-2">
            <CardHeader>
              <CardTitle>Risk Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { merchant: "Merchant #882", risk: 85, reason: "Velocity Spike" },
                  { merchant: "Merchant #104", risk: 42, reason: "Manual Audit Req" },
                ].map((alert) => (
                  <div
                    key={alert.merchant}
                    className="flex items-center justify-between p-3 border rounded-xl bg-destructive/5 border-destructive/10"
                  >
                    <div className="flex items-center gap-3">
                      <ShieldAlert className="h-5 w-5 text-destructive" />
                      <div>
                        <p className="text-sm font-bold">{alert.merchant}</p>
                        <p className="text-xs text-muted-foreground">{alert.reason}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-destructive">{alert.risk}%</p>
                      <p className="text-[10px] text-muted-foreground underline cursor-pointer">Review</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardShell>
  )
}
