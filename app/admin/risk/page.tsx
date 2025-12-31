import { DashboardShell } from "@/components/dashboard/shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShieldAlert, Activity, Search, Filter, ArrowRight, ShieldCheck, AlertTriangle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"

export default function RiskCenter() {
  return (
    <DashboardShell role="admin">
      <div className="space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-5xl font-black tracking-tighter leading-none">Risk Intelligence</h1>
            <p className="text-lg text-muted-foreground font-medium">
              AI-driven fraud detection and on-chain anomaly monitoring.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="relative w-72">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search Entity ID or Wallet..." className="pl-11 h-12 rounded-xl bg-card/30" />
            </div>
            <Button variant="outline" className="h-12 rounded-xl px-5 border-2 bg-transparent">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="border-border/50 bg-card/30 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground">
                Critical Anomalies
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-5xl font-black tracking-tighter text-destructive">02</div>
              <p className="text-xs font-bold text-destructive mt-4 uppercase tracking-tighter">
                Requires manual block
              </p>
            </CardContent>
          </Card>
          <Card className="border-border/50 bg-card/30 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground">
                Average Risk Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-5xl font-black tracking-tighter text-accent">14.2</div>
              <p className="text-xs font-bold text-accent mt-4 uppercase tracking-tighter">Safe Network Status</p>
            </CardContent>
          </Card>
          <Card className="border-border/50 bg-card/30 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground">
                Synced Transactions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-5xl font-black tracking-tighter">84.2k</div>
              <p className="text-xs font-bold text-muted-foreground mt-4 uppercase tracking-tighter">
                Last Sync: 12 seconds ago
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <Card className="lg:col-span-2 border-border/50 bg-card/30 backdrop-blur-sm overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between py-6 px-8 border-b border-border/50">
              <CardTitle className="text-xl font-black flex items-center gap-3">
                <Activity className="h-6 w-6 text-primary" />
                Live Anomaly Stream
              </CardTitle>
              <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border/50">
                {[
                  {
                    entity: "Merchant #882",
                    risk: 85,
                    reason: "High Velocity Spike",
                    time: "2 mins ago",
                    severity: "Critical",
                  },
                  {
                    entity: "Beneficiary #1042",
                    risk: 62,
                    reason: "Unusual Volume Concentration",
                    time: "15 mins ago",
                    severity: "High",
                  },
                  {
                    entity: "Merchant #441",
                    risk: 28,
                    reason: "New Operation Hours",
                    time: "1 hour ago",
                    severity: "Low",
                  },
                  {
                    entity: "Merchant #902",
                    risk: 12,
                    reason: "Standard Transaction",
                    time: "2 hours ago",
                    severity: "Safe",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-6 hover:bg-muted/30 transition-all group">
                    <div className="flex items-center gap-5">
                      <div
                        className={`h-14 w-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 ${
                          item.risk > 70 ? "bg-destructive/10 text-destructive" : "bg-primary/10 text-primary"
                        }`}
                      >
                        {item.risk > 70 ? <ShieldAlert className="h-7 w-7" /> : <ShieldCheck className="h-7 w-7" />}
                      </div>
                      <div>
                        <p className="text-lg font-black leading-none mb-1">{item.entity}</p>
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                          {item.reason} • {item.time}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-8">
                      <div className="w-32 text-right">
                        <div className="flex justify-between text-[10px] font-bold uppercase mb-1">
                          <span>Risk Score</span>
                          <span className={item.risk > 70 ? "text-destructive" : "text-accent"}>{item.risk}%</span>
                        </div>
                        <Progress
                          value={item.risk}
                          className="h-1.5"
                          // @ts-ignore
                          indicatorClassName={item.risk > 70 ? "bg-destructive" : "bg-accent"}
                        />
                      </div>
                      <Button size="icon" variant="ghost" className="h-10 w-10 rounded-xl hover:bg-primary/10">
                        <ArrowRight className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/30 backdrop-blur-sm">
            <CardHeader className="py-6 px-8 border-b border-border/50">
              <CardTitle className="text-xl font-black flex items-center gap-2 text-destructive">
                <AlertTriangle className="h-5 w-5" />
                Priority Audits
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <p className="text-sm text-muted-foreground font-medium">
                The following entities have surpassed the automated risk threshold and require manual intervention.
              </p>
              <div className="space-y-4">
                {[
                  { name: "Sector 4 Logistics Hub", risk: 92, id: "M-9910" },
                  { name: "North-West Distribution", risk: 88, id: "M-4421" },
                ].map((audit) => (
                  <div key={audit.id} className="p-5 border-2 border-destructive/20 rounded-2xl bg-destructive/5 group">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="font-black text-lg leading-tight">{audit.name}</p>
                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                          ID: {audit.id}
                        </p>
                      </div>
                      <span className="px-2 py-1 bg-destructive text-destructive-foreground text-[10px] font-black rounded uppercase">
                        {audit.risk}%
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1 bg-destructive hover:bg-destructive/90 rounded-xl font-bold">
                        Block Entity
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 rounded-xl font-bold border-2 bg-transparent"
                      >
                        Investigate
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="ghost" className="w-full font-bold text-muted-foreground hover:bg-muted/50 py-6">
                View all archived audits
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardShell>
  )
}
