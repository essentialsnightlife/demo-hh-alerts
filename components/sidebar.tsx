"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Heart, Users, LayoutDashboard, Settings, Bell, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface NavItem {
  label: string
  href: string
  icon: React.ReactNode
  badge?: number
}

const memberNavItems: NavItem[] = [
  { label: "Check In", href: "/dashboard", icon: <Heart className="h-5 w-5" /> },
  { label: "My Profile", href: "/dashboard/profile", icon: <Users className="h-5 w-5" /> },
  { label: "Settings", href: "/dashboard/settings", icon: <Settings className="h-5 w-5" /> },
]

const adminNavItems: NavItem[] = [
  { label: "Overview", href: "/admin", icon: <LayoutDashboard className="h-5 w-5" /> },
  { label: "Members", href: "/admin/members", icon: <Users className="h-5 w-5" /> },
  { label: "Alerts", href: "/admin/alerts", icon: <Bell className="h-5 w-5" />, badge: 2 },
  { label: "Settings", href: "/admin/settings", icon: <Settings className="h-5 w-5" /> },
]

interface SidebarProps {
  type: "member" | "admin"
  userName?: string
}

export function Sidebar({ type, userName = "Guest" }: SidebarProps) {
  const pathname = usePathname()
  const navItems = type === "admin" ? adminNavItems : memberNavItems

  return (
    <aside className="flex h-screen w-64 flex-col border-r border-border bg-sidebar">
      {/* Logo */}
      <div className="flex items-center gap-3 border-b border-sidebar-border px-6 py-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
          <Heart className="h-5 w-5 text-primary-foreground" fill="currentColor" />
        </div>
        <div>
          <h1 className="font-semibold text-sidebar-foreground">Heavenly Hands</h1>
          <p className="text-xs text-muted-foreground">
            {type === "admin" ? "Admin Portal" : "Member Portal"}
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href || 
            (item.href !== "/admin" && item.href !== "/dashboard" && pathname.startsWith(item.href))
          
          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant={isActive ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start gap-3 text-sidebar-foreground",
                  isActive && "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                )}
              >
                {item.icon}
                {item.label}
                {item.badge && (
                  <Badge variant="destructive" className="ml-auto">
                    {item.badge}
                  </Badge>
                )}
              </Button>
            </Link>
          )
        })}
      </nav>

      {/* User section */}
      <div className="border-t border-sidebar-border p-4">
        <div className="flex items-center gap-3 rounded-lg bg-sidebar-accent px-3 py-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground">
            {userName.split(" ").map(n => n[0]).join("").slice(0, 2)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="truncate text-sm font-medium text-sidebar-foreground">{userName}</p>
            <p className="text-xs text-muted-foreground">{type === "admin" ? "Administrator" : "Member"}</p>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-sidebar-foreground">
            <LogOut className="h-4 w-4" />
            <span className="sr-only">Sign out</span>
          </Button>
        </div>
      </div>
    </aside>
  )
}
