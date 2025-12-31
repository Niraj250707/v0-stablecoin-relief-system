import { cn } from "@/lib/utils"
import { DashboardShell } from "@/components/dashboard/shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlusCircle, Users, QrCode, MapPin, Activity, CheckCircle2 } from "lucide-react"

export default function FieldAgentDashboard() {
  return (
    <DashboardShell role="field_agent">
      <div className="space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3 text-primary">
              <MapPin className="h-5 w-5" />
              <p className="font-black uppercase tracking-widest text-xs">Bihar District • Sector 7</p>
            </div>
            <h1 className="text-5xl font-black tracking-tighter leading-none">Field Agent Hub</h1>
            <p className="text-lg text-muted-foreground font-medium">
              Managing household verification and credit enrollment.
            </p>
          </div>
          <Button className="h-16 px-8 rounded-2xl font-black text-lg gap-3 shadow-2xl shadow-primary/20 hover:shadow-primary/40 active:scale-95 transition-all">
            <PlusCircle className="h-6 w-6" />
            Onboard Household
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="border-border/50 bg-card/30 backdrop-blur-sm relative overflow-hidden group">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground">
                Onboarded Today
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-5xl font-black tracking-tighter">24</div>
              <div className="mt-4 flex items-center justify-between">
                <p className="text-[10px] font-bold text-muted-foreground">Target: 40 Units</p>
                <div className="h-1.5 w-24 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-[60%]" />
                </div>
              </div>
            </CardContent>
            <div className="absolute -top-6 -right-6 h-24 w-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors" />
          </Card>

          <Card className="border-border/50 bg-card/30 backdrop-blur-sm relative overflow-hidden group">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground">
                Verified Wallets
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-5xl font-black tracking-tighter">18</div>
              <p className="text-[10px] font-bold text-accent mt-4 flex items-center gap-1 uppercase">
                <CheckCircle2 className="h-3 w-3" />
                75% Success Rate
              </p>
            </CardContent>
            <div className="absolute -top-6 -right-6 h-24 w-24 bg-accent/5 rounded-full blur-2xl group-hover:bg-accent/10 transition-colors" />
          </Card>

          <Card className="border-border/50 bg-card/30 backdrop-blur-sm relative overflow-hidden group">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground">
                Needs Sync
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-5xl font-black tracking-tighter text-destructive">6</div>
              <p className="text-[10px] font-bold text-muted-foreground mt-4 uppercase tracking-tight">
                Requires physical print
              </p>
            </CardContent>
            <div className="absolute -top-6 -right-6 h-24 w-24 bg-destructive/5 rounded-full blur-2xl group-hover:bg-destructive/10 transition-colors" />
          </Card>
        </div>

        <Card className="border-border/50 bg-card/30 backdrop-blur-sm overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between py-6 px-8 border-b border-border/50">
            <CardTitle className="text-xl font-black flex items-center gap-3">
              <Activity className="h-6 w-6 text-primary" />
              Real-time Enrollment Log
            </CardTitle>
            <Button variant="ghost" size="sm" className="font-bold">
              View full log
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border/50">
              {[
                {
                  name: "Rahul Kumar",
                  status: "Verified",
                  time: "10 mins ago",
                  role: "Head of Household",
                  priority: "High",
                },
                {
                  name: "Sita Devi",
                  status: "Pending Sync",
                  time: "25 mins ago",
                  role: "Self-Employed",
                  priority: "Medium",
                },
                {
                  name: "Amit Singh",
                  status: "Verified",
                  time: "1 hour ago",
                  role: "Disabled Dependent",
                  priority: "Critical",
                },
                {
                  name: "Sunita Roy",
                  status: "Verified",
                  time: "3 hours ago",
                  role: "Single Mother",
                  priority: "High",
                },
              ].map((person, i) => (
                <div key={i} className="flex items-center justify-between p-6 hover:bg-muted/30 transition-all group">
                  <div className="flex items-center gap-5">
                    <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center transition-transform group-hover:scale-110">
                      <Users className="h-7 w-7 text-primary" />
                    </div>
                    <div>
                      <p className="text-lg font-black leading-none mb-1">{person.name}</p>
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                        {person.role} • {person.time}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <span
                        className={cn(
                          "text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-lg border",
                          person.status === "Verified"
                            ? "bg-accent/10 text-accent border-accent/20"
                            : "bg-muted/50 text-muted-foreground border-border",
                        )}
                      >
                        {person.status}
                      </span>
                      <p className="text-[9px] font-bold text-muted-foreground mt-1 uppercase tracking-tighter">
                        Priority: {person.priority}
                      </p>
                    </div>
                    <Button
                      size="icon"
                      variant="outline"
                      className="h-12 w-12 rounded-xl border-2 hover:bg-primary hover:text-primary-foreground transition-all bg-transparent"
                    >
                      <QrCode className="h-6 w-6" />
                    </Button>
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
