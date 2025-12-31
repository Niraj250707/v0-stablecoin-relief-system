"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { QrCode, UserPlus, CheckCircle2 } from "lucide-react"

export default function BeneficiaryOnboarding() {
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Logic to register beneficiary in Supabase & Smart Contract
    setIsSuccess(true)
  }

  if (isSuccess) {
    return (
      <div className="flex items-center justify-center min-h-[80vh] p-4">
        <Card className="max-w-md w-full text-center">
          <CardHeader>
            <div className="mx-auto h-12 w-12 bg-accent/10 text-accent rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <CardTitle>Beneficiary Registered!</CardTitle>
            <CardDescription>Household ID #4402 has been successfully verified and enrolled.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-6 bg-muted rounded-xl border-2 border-dashed flex flex-col items-center gap-4">
              <QrCode className="h-32 w-32" />
              <p className="text-sm font-medium">Print QR Voucher</p>
            </div>
            <Button className="w-full" onClick={() => setIsSuccess(false)}>
              Onboard Next Beneficiary
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Beneficiary Onboarding</h1>
        <p className="text-muted-foreground">Register and verify disaster-affected households.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Verification Form</CardTitle>
          <CardDescription>Enter beneficiary details and perform KYC verification.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="full_name">Full Name (Head of Household)</Label>
                <Input id="full_name" placeholder="John Doe" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="aadhaar">Government ID / Aadhaar</Label>
                <Input id="aadhaar" placeholder="XXXX-XXXX-XXXX" required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="program">Select Relief Program</Label>
              <Select required>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a program" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="flood-2024">Bihar Monsoon Flood Relief 2024</SelectItem>
                  <SelectItem value="cyclone-rehab">Cyclone Rehab Program (Odisha)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Input id="state" placeholder="Bihar" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="district">District</Label>
                <Input id="district" placeholder="Patna" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="village">Village / Ward</Label>
                <Input id="village" placeholder="Ward 12" required />
              </div>
            </div>

            <Button type="submit" className="w-full gap-2 py-6">
              <UserPlus className="h-5 w-5" /> Verify & Generate Wallet
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
