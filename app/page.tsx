import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { ArrowRight, ShieldCheck, Zap, BarChart3, Users, Sparkles } from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background selection:bg-primary selection:text-primary-foreground">
      <Navbar />

      {/* Enhanced Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.02] -z-10" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
          <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-accent/20 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <Zap className="h-4 w-4 fill-current" />
            Empowering the Future of Humanitarian Aid
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 text-balance animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
            Relief Without <br />
            <span className="text-primary italic flex items-center justify-center gap-4">
              Boundaries <Sparkles className="h-12 w-12 text-accent animate-pulse" />
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 text-pretty leading-relaxed animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300">
            A blockchain-powered stablecoin system designed for immediate, transparent, and direct disaster relief. Zero
            leakage. Instant distribution. Full accountability.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-400">
            <Button
              size="lg"
              className="h-14 px-10 text-xl font-bold gap-3 shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all active:scale-95"
              asChild
            >
              <Link href="/auth/sign-up">
                Launch Portal <ArrowRight className="h-6 w-6" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-14 px-10 text-xl font-bold bg-background/50 backdrop-blur-sm border-2 hover:bg-muted transition-all active:scale-95"
            >
              Explore Active Missions
            </Button>
          </div>
        </div>
      </section>

      {/* Enhanced Features with high-fidelity cards */}
      <section className="py-32 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Built for Resilience.</h2>
            <p className="text-xl text-muted-foreground">
              The most secure and transparent way to deliver humanitarian support.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6 bg-background rounded-2xl shadow-sm border">
              <div className="h-12 w-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Verified Aid</h3>
              <p className="text-muted-foreground">
                Digital identities ensure tokens reach verified households without middlemen interfering in the
                distribution process.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-background rounded-2xl shadow-sm border">
              <div className="h-12 w-12 bg-accent/10 text-accent rounded-xl flex items-center justify-center mb-6">
                <BarChart3 className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">On-Chain Transparency</h3>
              <p className="text-muted-foreground">
                Donors can track every token from contribution to point-of-sale at local verified merchants in
                real-time.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-background rounded-2xl shadow-sm border">
              <div className="h-12 w-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Merchant Ecosystem</h3>
              <p className="text-muted-foreground">
                A secure network of local vendors accepts RELIEF tokens via QR codes, supporting local economies during
                disasters.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
