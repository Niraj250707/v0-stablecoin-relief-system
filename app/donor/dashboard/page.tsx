"use client"

import { cn } from "@/lib/utils"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, XAxis, ResponsiveContainer, Pie, PieChart, Cell } from "recharts"
import { Heart, Coins, Vote, Landmark, ArrowRight } from "lucide-react"

const fundingData = [
  { month: "Jan", amount: 25000 },
  { month: "Feb", amount: 42000 },
  { month: "Mar", amount: 38000 },
  { month: "Apr", amount: 55000 },
  { month: "May", amount: 48000 },
]

const categoryData = [
  { name: "Food", value: 40, color: "var(--primary)" },
  { name: "Health", value: 30, color: "var(--accent)" },
  { name: "Shelter", value: 20, color: "oklch(0.65 0.1 200)" },
  { name: "Other", value: 10, color: "oklch(0.45 0.2 30)" },
]

const proposals = [
  {
    id: 1,
    title: "Increase Bihar Program Budget by 15%",
    description: "Proposed due to unexpected monsoon intensity in northern districts.",
    votesFor: 85000,
    votesAgainst: 12000,
    status: "Active",
  },
  {
    id: 2,
    title: "Onboard 50 New Local Merchants in Odisha",
    description: "Expanding the network for cyclone rehabilitation program.",
    votesFor: 45000,
    votesAgainst: 5000,
    status: "Passed",
  },
]

export default function DonorDashboard() {
  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Donor Impact Hub</h1>
          <p className="text-muted-foreground">Track your contributions and participate in governance.</p>
        </div>
        <div className="flex gap-3">
          <Button className="gap-2">
            <Heart className="h-4 w-4" /> Donate Now
          </Button>
          <Button variant="outline" className="gap-2 bg-transparent">
            <Coins className="h-4 w-4" /> Claim Voting Tokens
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Funding Impact (On-Chain)</CardTitle>
            <CardDescription>Real-time flow of funds to active disaster programs.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{ amount: { label: "Donated (₹)", color: "var(--primary)" } }}
              className="h-64 w-full"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={fundingData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="amount" fill="var(--primary)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Spend by Category</CardTitle>
            <CardDescription>Where your RELIEF tokens go.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4 w-full text-xs">
              {categoryData.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-muted-foreground">{item.name}</span>
                  <span className="font-bold">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="dao" className="w-full">
        <TabsList className="grid w-full md:w-[400px] grid-cols-2">
          <TabsTrigger value="dao">Donor DAO</TabsTrigger>
          <TabsTrigger value="transparency">Transparency Log</TabsTrigger>
        </TabsList>

        <TabsContent value="dao" className="mt-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {proposals.map((proposal) => (
              <Card key={proposal.id} className="flex flex-col">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant={proposal.status === "Active" ? "default" : "secondary"}>{proposal.status}</Badge>
                    <span className="text-xs text-muted-foreground font-mono">#PRP-{proposal.id}</span>
                  </div>
                  <CardTitle className="text-lg">{proposal.title}</CardTitle>
                  <CardDescription>{proposal.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Yes</span>
                      <span>{proposal.votesFor.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-primary h-full rounded-full"
                        style={{ width: `${(proposal.votesFor / (proposal.votesFor + proposal.votesAgainst)) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>No</span>
                      <span>{proposal.votesAgainst.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-1">
                      <div
                        className="bg-destructive/50 h-full rounded-full"
                        style={{
                          width: `${(proposal.votesAgainst / (proposal.votesFor + proposal.votesAgainst)) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button className="w-full gap-2" variant={proposal.status === "Active" ? "default" : "outline"}>
                    <Vote className="h-4 w-4" /> {proposal.status === "Active" ? "Vote Now" : "View Results"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
            <Card className="flex flex-col items-center justify-center border-dashed border-2 bg-muted/20 hover:bg-muted/40 transition-colors cursor-pointer p-8 text-center">
              <Plus className="h-8 w-8 text-muted-foreground mb-2" />
              <p className="font-bold">New Proposal</p>
              <p className="text-xs text-muted-foreground">Requires 5,000 voting tokens</p>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="transparency" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Full Transparency Ledger</CardTitle>
              <CardDescription>Every transaction is verified on-chain.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-8 text-center border rounded-xl bg-muted/10">
                <Landmark className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">The block explorer for the RELIEF testnet is being synced.</p>
                <Button variant="outline" className="gap-2 bg-transparent">
                  View on Polygonscan <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function Badge({
  children,
  variant = "default",
  className,
}: { children: React.ReactNode; variant?: "default" | "secondary" | "destructive"; className?: string }) {
  const variants = {
    default: "bg-primary text-primary-foreground",
    secondary: "bg-secondary text-secondary-foreground",
    destructive: "bg-destructive text-destructive-foreground",
  }
  return (
    <span
      className={cn(
        "px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider",
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  )
}

function CardFooter({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("p-6 pt-0", className)}>{children}</div>
}

function Plus({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  )
}
