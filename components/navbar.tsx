"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Shield, Wallet, Menu, LogOut, User } from "lucide-react"
import { useState, useEffect } from "react"
// <CHANGE> Import theme toggle component
import { ThemeToggle } from "@/components/theme-toggle"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import type { User as SupabaseUser } from "@supabase/supabase-js"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  // <CHANGE> Track auth state to conditionally render login/logout
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const [userRole, setUserRole] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  // <CHANGE> Fetch current user and role on mount
  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)

      if (user) {
        const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single()
        setUserRole(profile?.role || null)
      }
      setLoading(false)
    }

    fetchUser()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        supabase
          .from("profiles")
          .select("role")
          .eq("id", session.user.id)
          .single()
          .then(({ data }) => setUserRole(data?.role || null))
      } else {
        setUserRole(null)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  // <CHANGE> Handle logout functionality
  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/")
  }

  // <CHANGE> Navigate to role-specific dashboard
  const goToDashboard = () => {
    if (!userRole) return
    const dashboardMap: Record<string, string> = {
      admin: "/admin",
      field_agent: "/field-agent",
      beneficiary: "/beneficiary",
      merchant: "/merchant",
      donor: "/donor",
    }
    router.push(dashboardMap[userRole] || "/")
  }

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-border saturate-150">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <Link href="/" className="flex items-center gap-3 group transition-transform hover:scale-105 active:scale-95">
            <div className="bg-primary/10 p-2 rounded-xl border border-primary/20 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              <Shield className="h-8 w-8" />
            </div>
            <span className="text-2xl font-black tracking-tighter">RELIEF</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {!loading && !user && (
              <>
                <Link href="/programs" className="text-sm font-medium hover:text-primary transition-colors">
                  Programs
                </Link>
                <Link href="/how-it-works" className="text-sm font-medium hover:text-primary transition-colors">
                  How it Works
                </Link>
                <Link href="/transparency" className="text-sm font-medium hover:text-primary transition-colors">
                  Transparency
                </Link>
              </>
            )}
            <div className="flex items-center gap-3">
              {/* <CHANGE> Theme toggle button */}
              <ThemeToggle />
              
              {/* <CHANGE> Conditional rendering based on auth state */}
              {loading ? (
                <div className="h-9 w-20 bg-muted animate-pulse rounded-md" />
              ) : user ? (
                <>
                  <Button variant="outline" size="sm" onClick={goToDashboard} className="gap-2">
                    <User className="h-4 w-4" />
                    Dashboard
                  </Button>
                  <Button variant="ghost" size="sm" onClick={handleLogout} className="gap-2">
                    <LogOut className="h-4 w-4" />
                    Logout
                  </Button>
                </>
              ) : (
                <Button variant="outline" size="sm" asChild>
                  <Link href="/auth/login">Login</Link>
                </Button>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            {/* <CHANGE> Theme toggle for mobile */}
            <ThemeToggle />
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-background px-4 py-4 flex flex-col gap-4">
          {!loading && !user && (
            <>
              <Link href="/programs" className="text-lg font-medium">
                Programs
              </Link>
              <Link href="/how-it-works" className="text-lg font-medium">
                How it Works
              </Link>
              <Link href="/transparency" className="text-lg font-medium">
                Transparency
              </Link>
              <hr />
            </>
          )}
          
          {/* <CHANGE> Conditional mobile menu based on auth state */}
          {loading ? (
            <div className="h-10 w-full bg-muted animate-pulse rounded-md" />
          ) : user ? (
            <>
              <Button variant="outline" className="w-full justify-start gap-2" onClick={goToDashboard}>
                <User className="h-4 w-4" />
                Go to Dashboard
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-2" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </>
          ) : (
            <Button variant="outline" className="w-full bg-transparent" asChild>
              <Link href="/auth/login">Login</Link>
            </Button>
          )}
        </div>
      )}
    </nav>
  )
}
