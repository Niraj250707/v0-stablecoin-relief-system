"use client"

import type React from "react"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Shield, AlertCircle, CheckCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function SignUpPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [fullName, setFullName] = useState("")
  const [role, setRole] = useState<string>("beneficiary")
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    setIsLoading(true)
    setError(null)
    setSuccess(false)

    if (password.length < 6) {
      setError("Password must be at least 6 characters")
      setIsLoading(false)
      return
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            role: role,
          },
          emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || window.location.origin,
        },
      })

      if (error) throw error
      setSuccess(true)

      setTimeout(() => {
        router.push("/auth/login")
      }, 2000)
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "Failed to create account")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full -z-10 opacity-30 dark:opacity-20 pointer-events-none">
        <div className="absolute top-[10%] right-[-5%] w-[35%] h-[35%] bg-accent/20 blur-[100px] rounded-full" />
        <div className="absolute bottom-[10%] left-[-5%] w-[35%] h-[35%] bg-primary/20 blur-[100px] rounded-full" />
      </div>

      <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="flex flex-col items-center mb-8">
          <Link
            href="/"
            className="h-16 w-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4 border border-primary/20 backdrop-blur-sm transition-transform hover:scale-110 active:scale-95"
          >
            <Shield className="h-8 w-8 text-primary" />
          </Link>
          <h1 className="text-4xl font-black tracking-tighter">Join RELIEF</h1>
          <p className="text-muted-foreground text-center mt-2 max-w-[300px]">
            Empower humanitarian aid with zero leakage
          </p>
        </div>

        <Card className="border-border/50 bg-card/50 backdrop-blur-xl shadow-2xl overflow-hidden">
          <div className="h-1.5 w-full bg-gradient-to-r from-accent via-primary to-accent animate-pulse" />
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
            <CardDescription>Join the network of transparent aid</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignUp} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="John Doe"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="At least 6 characters"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">I am a</Label>
                <Select value={role} onValueChange={setRole}>
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beneficiary">Beneficiary (Disaster Victim)</SelectItem>
                    <SelectItem value="merchant">Merchant (Local Vendor)</SelectItem>
                    <SelectItem value="donor">Donor (Contribute Funds)</SelectItem>
                    <SelectItem value="field_agent">Field Agent (NGO Worker)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {success && (
                <Alert className="bg-accent/10 text-accent-foreground border-accent">
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>Account created! Redirecting to login...</AlertDescription>
                </Alert>
              )}

              <Button type="submit" className="w-full h-11 text-base" disabled={isLoading || success}>
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>

              <div className="text-center text-sm text-muted-foreground pt-4 border-t">
                Already have an account?{" "}
                <Link href="/auth/login" className="font-medium text-primary hover:underline">
                  Sign in
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-muted-foreground mt-6">
          By creating an account, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  )
}
