"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Map,
  Store,
  History,
  ShieldAlert,
  Vote,
  Settings,
  PlusCircle,
  ScanBarcode as ScanQrCode,
  Heart,
  Users,
} from "lucide-react"

interface SidebarProps {
  role: "admin" | "field_agent" | "merchant" | "beneficiary" | "donor"
}

const navItems = {
  admin: [
    { name: "Command Center", href: "/admin", icon: LayoutDashboard },
    { name: "Aid Programs", href: "/admin/programs", icon: Map },
    { name: "Risk Center", href: "/admin/risk", icon: ShieldAlert },
    { name: "Users & NGO Agents", href: "/admin/users", icon: Users },
    { name: "System Settings", href: "/admin/settings", icon: Settings },
  ],
  field_agent: [
    { name: "Agent Hub", href: "/field-agent", icon: LayoutDashboard },
    { name: "Onboard Household", href: "/field-agent/onboard", icon: PlusCircle },
    { name: "Voucher Verification", href: "/field-agent/verify", icon: ScanQrCode },
    { name: "Local Reports", href: "/field-agent/reports", icon: History },
  ],
  beneficiary: [
    { name: "My Relief Wallet", href: "/beneficiary", icon: LayoutDashboard },
    { name: "Find Merchants", href: "/beneficiary/merchants", icon: Store },
    { name: "Payment History", href: "/beneficiary/history", icon: History },
    { name: "Support & Identity", href: "/beneficiary/profile", icon: Settings },
  ],
  merchant: [
    { name: "Sales & Receiving", href: "/merchant", icon: LayoutDashboard },
    { name: "Inventory Log", href: "/merchant/inventory", icon: Store },
    { name: "Cash-Out History", href: "/merchant/withdrawals", icon: History },
    { name: "Store Settings", href: "/merchant/settings", icon: Settings },
  ],
  donor: [
    { name: "Impact Dashboard", href: "/donor", icon: LayoutDashboard },
    { name: "Global Giving", href: "/donor/donate", icon: Heart },
    { name: "DAO Governance", href: "/donor/dao", icon: Vote },
    { name: "Transparency Log", href: "/donor/transparency", icon: History },
  ],
}

export function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname()
  const items = navItems[role]

  return (
    <aside className="hidden md:flex w-72 border-r border-border/50 flex-col bg-card/30 backdrop-blur-xl">
      <div className="p-8 flex-1">
        <div className="mb-10">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-4">
            Relief Portal • {role.replace("_", " ")}
          </p>
        </div>
        <nav className="space-y-2">
          {items.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-4 px-4 py-3 rounded-2xl text-sm font-bold transition-all duration-300 group",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-[1.02]"
                    : "text-muted-foreground hover:bg-muted/50 hover:text-foreground hover:translate-x-1",
                )}
              >
                <div
                  className={cn(
                    "p-2 rounded-xl transition-colors",
                    isActive ? "bg-white/20" : "bg-primary/5 group-hover:bg-primary/10",
                  )}
                >
                  <Icon className="h-4 w-4" />
                </div>
                {item.name}
              </Link>
            )
          })}
        </nav>
      </div>

      <div className="p-8 border-t border-border/50">
        <div className="p-4 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20">
          <p className="text-[10px] font-bold text-primary uppercase tracking-wider mb-1">Status</p>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-accent animate-pulse" />
            <span className="text-xs font-bold">Network: Polygon</span>
          </div>
        </div>
      </div>
    </aside>
  )
}
