import Link from "next/link"
import { Users, AlertTriangle, CheckCircle2, Clock, ArrowRight, Heart, HandHelping } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { mockMembers, mockAlerts, getActiveAlerts, formatDateTime, getMemberById } from "@/lib/mock-data"

export default function AdminDashboardPage() {
  const activeAlerts = getActiveAlerts()
  const totalMembers = mockMembers.length
  const checkedInToday = mockMembers.filter(m => {
    if (!m.lastCheckIn) return false
    const today = new Date().toDateString()
    return new Date(m.lastCheckIn).toDateString() === today
  }).length
  const missedCheckIns = mockMembers.filter(m => m.consecutiveMissed >= 2).length

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Dashboard Overview</h1>
        <p className="mt-2 text-muted-foreground">
          Monitor community health and manage alerts
        </p>
      </div>

      {/* Stats Cards */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Members</p>
                <p className="text-3xl font-bold text-foreground">{totalMembers}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <Users className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Checked In Today</p>
                <p className="text-3xl font-bold text-foreground">{checkedInToday}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[oklch(0.65_0.15_145)]/10">
                <CheckCircle2 className="h-6 w-6 text-[oklch(0.65_0.15_145)]" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Alerts</p>
                <p className="text-3xl font-bold text-destructive">{activeAlerts.length}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-destructive/10">
                <AlertTriangle className="h-6 w-6 text-destructive" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Missed Check-ins</p>
                <p className="text-3xl font-bold text-[oklch(0.75_0.15_75)]">{missedCheckIns}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[oklch(0.75_0.15_75)]/10">
                <Clock className="h-6 w-6 text-[oklch(0.55_0.15_75)]" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Active Alerts */}
        <Card className="border-destructive/20">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                Active Alerts
              </CardTitle>
              <CardDescription>Requires immediate attention</CardDescription>
            </div>
            <Link href="/admin/alerts">
              <Button variant="outline" size="sm" className="gap-1">
                View All
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            {activeAlerts.length === 0 ? (
              <div className="py-8 text-center">
                <CheckCircle2 className="mx-auto h-12 w-12 text-[oklch(0.65_0.15_145)]" />
                <p className="mt-2 text-muted-foreground">No active alerts</p>
              </div>
            ) : (
              <div className="space-y-3">
                {activeAlerts.map(alert => {
                  const member = getMemberById(alert.memberId)
                  return (
                    <Link key={alert.id} href={`/admin/members/${alert.memberId}`}>
                      <div className="flex items-start gap-4 rounded-lg border border-border bg-card p-4 transition-all hover:border-destructive/50 hover:shadow-sm">
                        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                          alert.type === "missed_checkin" 
                            ? "bg-destructive/10" 
                            : "bg-[oklch(0.75_0.15_75)]/10"
                        }`}>
                          {alert.type === "missed_checkin" ? (
                            <Clock className="h-5 w-5 text-destructive" />
                          ) : (
                            <HandHelping className="h-5 w-5 text-[oklch(0.55_0.15_75)]" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-foreground">
                              {member?.firstName} {member?.lastName}
                            </p>
                            <Badge variant={alert.type === "missed_checkin" ? "destructive" : "secondary"} className="text-xs">
                              {alert.type === "missed_checkin" ? "Missed Check-in" : "Needs Support"}
                            </Badge>
                          </div>
                          <p className="mt-1 truncate text-sm text-muted-foreground">{alert.message}</p>
                          <p className="mt-1 text-xs text-muted-foreground">{formatDateTime(alert.createdAt)}</p>
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Check-ins */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-primary" />
                Recent Check-ins
              </CardTitle>
              <CardDescription>Latest member activity</CardDescription>
            </div>
            <Link href="/admin/members">
              <Button variant="outline" size="sm" className="gap-1">
                All Members
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockMembers
                .filter(m => m.lastCheckIn)
                .sort((a, b) => new Date(b.lastCheckIn!).getTime() - new Date(a.lastCheckIn!).getTime())
                .slice(0, 4)
                .map(member => (
                  <Link key={member.id} href={`/admin/members/${member.id}`}>
                    <div className="flex items-center gap-4 rounded-lg border border-border bg-card p-4 transition-all hover:border-primary/50 hover:shadow-sm">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground">
                        {member.firstName[0]}{member.lastName[0]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground">
                          {member.firstName} {member.lastName}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {formatDateTime(member.lastCheckIn!)}
                        </p>
                      </div>
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[oklch(0.65_0.15_145)]/10">
                        <Heart className="h-4 w-4 text-[oklch(0.65_0.15_145)]" fill="currentColor" />
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
