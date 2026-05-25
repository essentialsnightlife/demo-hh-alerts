"use client"

import { useState } from "react"
import Link from "next/link"
import { AlertTriangle, CheckCircle2, Clock, Filter, ChevronRight, HandHelping, X } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog"
import { mockAlerts, getMemberById, formatDateTime } from "@/lib/mock-data"
import type { Alert } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

type FilterStatus = "all" | "active" | "resolved"

export default function AlertsPage() {
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("active")
  const [resolveDialogOpen, setResolveDialogOpen] = useState(false)
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null)
  const [resolutionNotes, setResolutionNotes] = useState("")

  const filteredAlerts = mockAlerts.filter(alert => {
    if (filterStatus === "all") return true
    return alert.status === filterStatus
  }).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  const activeCount = mockAlerts.filter(a => a.status === "active").length
  const resolvedCount = mockAlerts.filter(a => a.status === "resolved").length

  const openResolveDialog = (alert: Alert) => {
    setSelectedAlert(alert)
    setResolutionNotes("")
    setResolveDialogOpen(true)
  }

  const handleResolve = () => {
    // In a real app, this would call an API
    setResolveDialogOpen(false)
    setSelectedAlert(null)
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Alerts</h1>
        <p className="mt-2 text-muted-foreground">
          Monitor and resolve member alerts
        </p>
      </div>

      {/* Stats */}
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <Card className={cn(filterStatus === "active" && "ring-2 ring-primary")}>
          <CardContent className="flex cursor-pointer items-center justify-between p-4" onClick={() => setFilterStatus("active")}>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-destructive/10">
                <AlertTriangle className="h-5 w-5 text-destructive" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{activeCount}</p>
                <p className="text-sm text-muted-foreground">Active Alerts</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className={cn(filterStatus === "resolved" && "ring-2 ring-primary")}>
          <CardContent className="flex cursor-pointer items-center justify-between p-4" onClick={() => setFilterStatus("resolved")}>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[oklch(0.65_0.15_145)]/10">
                <CheckCircle2 className="h-5 w-5 text-[oklch(0.65_0.15_145)]" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{resolvedCount}</p>
                <p className="text-sm text-muted-foreground">Resolved</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className={cn(filterStatus === "all" && "ring-2 ring-primary")}>
          <CardContent className="flex cursor-pointer items-center justify-between p-4" onClick={() => setFilterStatus("all")}>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{mockAlerts.length}</p>
                <p className="text-sm text-muted-foreground">Total Alerts</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts List */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>
              {filterStatus === "active" && "Active Alerts"}
              {filterStatus === "resolved" && "Resolved Alerts"}
              {filterStatus === "all" && "All Alerts"}
            </CardTitle>
            <CardDescription>
              {filteredAlerts.length} alert{filteredAlerts.length !== 1 ? "s" : ""}
            </CardDescription>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setFilterStatus("all")}>
                All Alerts
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterStatus("active")}>
                <AlertTriangle className="mr-2 h-4 w-4 text-destructive" />
                Active
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterStatus("resolved")}>
                <CheckCircle2 className="mr-2 h-4 w-4 text-[oklch(0.65_0.15_145)]" />
                Resolved
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>
        <CardContent className="p-0">
          {filteredAlerts.length === 0 ? (
            <div className="py-12 text-center">
              <CheckCircle2 className="mx-auto h-12 w-12 text-[oklch(0.65_0.15_145)]" />
              <p className="mt-2 text-muted-foreground">No alerts to display</p>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {filteredAlerts.map(alert => {
                const member = getMemberById(alert.memberId)
                
                return (
                  <div key={alert.id} className="flex items-start gap-4 p-4">
                    {/* Icon */}
                    <div className={cn(
                      "flex h-12 w-12 shrink-0 items-center justify-center rounded-full",
                      alert.status === "active" 
                        ? alert.type === "missed_checkin" ? "bg-destructive/10" : "bg-[oklch(0.75_0.15_75)]/10"
                        : "bg-muted"
                    )}>
                      {alert.type === "missed_checkin" ? (
                        <Clock className={cn(
                          "h-6 w-6",
                          alert.status === "active" ? "text-destructive" : "text-muted-foreground"
                        )} />
                      ) : (
                        <HandHelping className={cn(
                          "h-6 w-6",
                          alert.status === "active" ? "text-[oklch(0.55_0.15_75)]" : "text-muted-foreground"
                        )} />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <Link href={`/admin/members/${alert.memberId}`} className="font-medium text-foreground hover:underline">
                          {member?.firstName} {member?.lastName}
                        </Link>
                        <Badge 
                          variant={alert.status === "active" ? "destructive" : "secondary"}
                          className={cn(alert.status === "resolved" && "bg-[oklch(0.65_0.15_145)]/10 text-[oklch(0.45_0.15_145)]")}
                        >
                          {alert.status === "active" ? "Active" : "Resolved"}
                        </Badge>
                        <Badge variant="outline">
                          {alert.type === "missed_checkin" ? "Missed Check-in" : "Needs Support"}
                        </Badge>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">{alert.message}</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Created: {formatDateTime(alert.createdAt)}
                        {alert.resolvedAt && (
                          <> • Resolved: {formatDateTime(alert.resolvedAt)} by {alert.resolvedBy}</>
                        )}
                      </p>
                      {alert.resolutionNotes && (
                        <div className="mt-2 rounded bg-muted p-2">
                          <p className="text-xs font-medium text-muted-foreground">Resolution notes:</p>
                          <p className="text-sm text-foreground">{alert.resolutionNotes}</p>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      {alert.status === "active" && (
                        <Button size="sm" onClick={() => openResolveDialog(alert)}>
                          Resolve
                        </Button>
                      )}
                      <Link href={`/admin/members/${alert.memberId}`}>
                        <Button size="sm" variant="ghost">
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Resolve Alert Dialog */}
      <Dialog open={resolveDialogOpen} onOpenChange={setResolveDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Resolve Alert</DialogTitle>
            <DialogDescription>
              Mark this alert as resolved and add notes about the follow-up action taken.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {selectedAlert && (
              <div className="rounded-lg bg-muted p-4">
                <p className="text-sm font-medium text-foreground">Alert Details</p>
                <p className="mt-1 text-sm text-muted-foreground">{selectedAlert.message}</p>
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="resolution-notes">Resolution Notes</Label>
              <Textarea
                id="resolution-notes"
                placeholder="Describe the follow-up action taken..."
                value={resolutionNotes}
                onChange={e => setResolutionNotes(e.target.value)}
                className="min-h-[100px]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setResolveDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleResolve} disabled={!resolutionNotes.trim()}>
              Mark as Resolved
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
