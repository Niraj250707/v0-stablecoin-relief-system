import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Users, Landmark, HeartHandshake, AlertCircle, ShieldAlert } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default async function AdminDashboard() {
  const supabase = await createClient()

  // Fetch campaign stats
  const { data: campaigns } = await supabase.from("campaigns").select("*").order("created_at", { ascending: false })

  const totalBudget = campaigns?.reduce((acc, curr) => acc + (curr.budget_total || 0), 0) || 0
  const totalSpent = campaigns?.reduce((acc, curr) => acc + (curr.budget_spent || 0), 0) || 0

  return (
    <div className="p-6 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Relief Administration</h1>
          <p className="text-muted-foreground">Monitor and manage disaster relief programs.</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" /> Create Program
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
            <Landmark className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{totalBudget.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Across all active programs</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Disbursed</CardTitle>
            <HeartHandshake className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{totalSpent.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {((totalSpent / (totalBudget || 1)) * 100).toFixed(1)}% of budget utilized
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Households Served</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,450</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
            <AlertCircle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">High-risk transactions flagged</p>
            <Button
              variant="link"
              size="sm"
              className="p-0 h-auto text-xs text-destructive flex items-center gap-1"
              asChild
            >
              <Link href="/admin/risk-center">
                <ShieldAlert className="h-3 w-3" /> View Risk Center
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Programs Table */}
      <Card>
        <CardHeader>
          <CardTitle>Active Relief Programs</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Program Name</TableHead>
                <TableHead>Region</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Budget</TableHead>
                <TableHead>Utilization</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {campaigns?.map((campaign) => (
                <TableRow key={campaign.id}>
                  <TableCell className="font-medium">{campaign.title}</TableCell>
                  <TableCell>{campaign.location_name}</TableCell>
                  <TableCell>
                    <Badge variant={campaign.status === "active" ? "default" : "secondary"}>{campaign.status}</Badge>
                  </TableCell>
                  <TableCell>₹{campaign.budget_total?.toLocaleString()}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-primary h-full"
                          style={{ width: `${(campaign.budget_spent / campaign.budget_total) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs">
                        {((campaign.budget_spent / campaign.budget_total) * 100).toFixed(0)}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      Manage
                    </Button>
                    <Button variant="ghost" size="sm" className="text-primary font-bold">
                      Disburse
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {(!campaigns || campaigns.length === 0) && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No active programs found. Create one to get started.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
