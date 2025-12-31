import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Zap, ArrowRight, ShieldCheck } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export default function ProgramsPage() {
  const programs = [
    {
      id: 1,
      name: "Bihar Flood Relief 2025",
      location: "Bihar, India",
      households: "12,000",
      funded: 1200000,
      target: 2000000,
      status: "Active",
      category: "Emergency",
    },
    {
      id: 2,
      name: "Assam Landslide Response",
      location: "Guwahati, Assam",
      households: "4,500",
      funded: 450000,
      target: 500000,
      status: "Final Stage",
      category: "Recovery",
    },
    {
      id: 3,
      name: "Odisha Cyclone Support",
      location: "Coastal Odisha",
      households: "25,000",
      funded: 890000,
      target: 5000000,
      status: "Active",
      category: "Critical",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div className="space-y-4">
              <div className="h-px w-20 bg-primary" />
              <h1 className="text-6xl font-black tracking-tighter leading-none">Aid Programs</h1>
              <p className="text-xl text-muted-foreground font-medium max-w-xl">
                Track real-time distribution and fund utilization across all disaster-affected sectors.
              </p>
            </div>
            <div className="flex gap-4">
              <div className="px-6 py-3 rounded-2xl bg-card border border-border/50 text-center">
                <p className="text-2xl font-black">48</p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Active Hubs</p>
              </div>
              <div className="px-6 py-3 rounded-2xl bg-card border border-border/50 text-center">
                <p className="text-2xl font-black">12.5k</p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Total Units</p>
              </div>
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {programs.map((program) => (
              <Card
                key={program.id}
                className="group border-border/50 bg-card/30 backdrop-blur-md hover:border-primary/50 transition-all duration-500 overflow-hidden"
              >
                <div className="h-1.5 w-full bg-muted overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all duration-1000"
                    style={{ width: `${(program.funded / program.target) * 100}%` }}
                  />
                </div>
                <CardHeader className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest rounded-lg border border-primary/20">
                      {program.category}
                    </span>
                    <div className="flex items-center gap-1 text-accent font-black text-xs uppercase italic">
                      <Zap className="h-3 w-3 fill-current" />
                      {program.status}
                    </div>
                  </div>
                  <CardTitle className="text-2xl font-black mb-1 group-hover:text-primary transition-colors">
                    {program.name}
                  </CardTitle>
                  <div className="flex items-center gap-2 text-muted-foreground font-bold text-sm">
                    <MapPin className="h-4 w-4" />
                    {program.location}
                  </div>
                </CardHeader>
                <CardContent className="px-8 pb-8 space-y-8">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">
                        Households
                      </p>
                      <p className="text-lg font-black">{program.households}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">
                        Distributed
                      </p>
                      <p className="text-lg font-black">${(program.funded / 1000000).toFixed(1)}M</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-bold uppercase tracking-tight">
                      <span className="text-muted-foreground">Budget Progress</span>
                      <span className="text-primary">{((program.funded / program.target) * 100).toFixed(0)}%</span>
                    </div>
                    <Progress value={(program.funded / program.target) * 100} className="h-2 bg-muted/50" />
                  </div>

                  <Button className="w-full h-12 rounded-xl font-bold bg-muted/50 text-foreground border-2 border-border/50 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all gap-2 group/btn">
                    View Verification Ledger
                    <ShieldCheck className="h-4 w-4 transition-transform group-hover/btn:scale-125" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-20 p-12 rounded-[40px] bg-primary text-primary-foreground relative overflow-hidden group">
            <div className="relative z-10 max-w-2xl">
              <h2 className="text-4xl font-black tracking-tighter mb-4">Propose a new Relief Sector</h2>
              <p className="text-lg font-medium opacity-80 mb-8">
                Are you an NGO or local authority? Propose a new disaster zone for the RELIEF DAO to evaluate and fund.
              </p>
              <Button
                size="lg"
                variant="secondary"
                className="h-16 px-10 rounded-2xl text-xl font-black gap-3 bg-white text-primary hover:bg-white/90"
              >
                Get NGO Verification <ArrowRight className="h-6 w-6" />
              </Button>
            </div>
            <div className="absolute top-0 right-0 h-full w-1/2 bg-white/5 skew-x-12 transform translate-x-1/2 group-hover:bg-white/10 transition-colors" />
            <div className="absolute -bottom-24 -right-24 h-64 w-64 bg-accent/30 rounded-full blur-[100px]" />
          </div>
        </div>
      </div>
    </div>
  )
}
