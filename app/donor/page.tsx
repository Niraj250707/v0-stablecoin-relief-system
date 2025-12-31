import { DashboardShell } from "@/components/dashboard/shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, Globe, BarChart2, Vote, Zap, Target } from "lucide-react"

export default function DonorDashboard() {
  return (
    <DashboardShell role="donor">
      <div className="space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-5xl font-black tracking-tighter leading-none">Impact Hub</h1>
            <p className="text-lg text-muted-foreground font-medium">Global Aid Network • Philanthropic Tier: Silver</p>
          </div>
          <Button
            size="lg"
            className="h-16 px-10 rounded-2xl font-black text-xl gap-3 shadow-2xl shadow-primary/20 hover:shadow-primary/40 active:scale-95 transition-all"
          >
            <Heart className="h-6 w-6 fill-current" />
            New Contribution
          </Button>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <Card className="bg-primary text-primary-foreground border-0 shadow-2xl shadow-primary/20 relative overflow-hidden group">
            <CardHeader className="relative z-10">
              <CardTitle className="text-xs font-black uppercase tracking-[0.2em] opacity-80 flex items-center gap-2">
                <Globe className="h-4 w-4" />
                Global Impact
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="flex items-baseline gap-2 mb-4">
                <div className="text-5xl font-black tracking-tighter">250,000</div>
                <div className="text-xl font-bold opacity-80 uppercase tracking-widest">Relief</div>
              </div>
              <p className="text-xs font-bold opacity-90 flex items-center gap-2 uppercase tracking-wide">
                <Target className="h-4 w-4" />
                Serving ~500 Households
              </p>
            </CardContent>
            <div className="absolute top-0 right-0 h-full w-1/3 bg-white/10 skew-x-12 transform translate-x-1/2 group-hover:bg-white/20 transition-colors" />
          </Card>

          <Card className="border-border/50 bg-card/30 backdrop-blur-sm group hover:border-accent/50 transition-colors">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2">
                <BarChart2 className="h-4 w-4 text-accent" />
                Transparency
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-5xl font-black tracking-tighter">100%</div>
              <p className="text-xs font-bold text-accent mt-4 flex items-center gap-2 uppercase tracking-tighter">
                <Zap className="h-3 w-3 fill-current" />
                Verified on Polygon
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/30 backdrop-blur-sm group hover:border-primary/50 transition-colors">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2">
                <Vote className="h-4 w-4 text-primary" />
                DAO Power
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-5xl font-black tracking-tighter">2.5k</div>
              <p className="text-xs font-bold text-muted-foreground mt-4 uppercase tracking-widest">
                Active Proposals: 3
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <Card className="border-border/50 bg-card/30 backdrop-blur-sm">
            <CardHeader className="py-6 px-8 border-b border-border/50">
              <CardTitle className="text-xl font-black">Utilization Analytics</CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="h-[280px] flex items-center justify-center border-4 border-dashed border-border/30 rounded-3xl bg-muted/20 hover:bg-muted/30 transition-colors">
                <div className="text-center space-y-2">
                  <BarChart2 className="h-12 w-12 text-muted-foreground mx-auto opacity-20" />
                  <p className="text-sm font-black text-muted-foreground uppercase tracking-widest">
                    Category Distribution Chart
                  </p>
                  <p className="text-[10px] text-muted-foreground font-bold italic">
                    Real-time data from smart contract events
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/30 backdrop-blur-sm">
            <CardHeader className="py-6 px-8 border-b border-border/50">
              <CardTitle className="text-xl font-black">Governance Proposals</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border/50">
                {[
                  { title: "Increase Bihar Budget by 15%", votes: "85% For", status: "Active", time: "Ends in 2 days" },
                  {
                    title: "Onboard 20 more Health Centers",
                    votes: "92% For",
                    status: "Critical",
                    time: "Ends in 6 hours",
                  },
                  { title: "Expansion to Coastal Sectors", votes: "12% For", status: "New", time: "Starts tomorrow" },
                ].map((prop, i) => (
                  <div key={i} className="p-6 hover:bg-muted/30 transition-all group flex items-center justify-between">
                    <div className="space-y-1">
                      <h4 className="font-black text-base group-hover:text-primary transition-colors">{prop.title}</h4>
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                        {prop.time}
                        <span className="h-1 w-1 rounded-full bg-muted-foreground" />
                        {prop.votes}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      className="rounded-xl font-bold border-2 h-11 px-6 group-hover:bg-primary group-hover:text-primary-foreground transition-all bg-transparent"
                    >
                      Vote
                    </Button>
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
