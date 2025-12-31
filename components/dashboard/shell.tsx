import type React from "react"
import { Navbar } from "@/components/navbar"
import { Sidebar } from "@/components/dashboard/sidebar"

interface DashboardShellProps {
  children: React.ReactNode
  role: "admin" | "field_agent" | "merchant" | "beneficiary" | "donor"
}

export function DashboardShell({ children, role }: DashboardShellProps) {
  return (
    <div className="min-h-screen bg-background selection:bg-primary/30">
      <Navbar />
      <div className="flex pt-20 h-screen overflow-hidden">
        <Sidebar role={role} />
        <main className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-12 scrollbar-hide">
          <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-2 duration-500">{children}</div>
        </main>
      </div>
    </div>
  )
}
