"use client"

import { use, useState } from "react"
import Link from "next/link"
import { ArrowLeft, Phone, Mail, MapPin, Calendar, Heart, AlertTriangle, CheckCircle2, Clock, User, Shield, X } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog"
import { getMemberById, getAlertsByMemberId, getCheckInsByMemberId, formatDate, formatDateTime, calculateAge } from "@/lib/mock-data"
import type { Alert } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

export default function MemberDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const member = getMemberById(id)
  const alerts = getAlertsByMemberId(id)
  const checkIns = getCheckInsByMemberId(id)
  
  const [resolveDialogOpen, setResolveDialogOpen] = useState(false)
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null)
  const [resolutionNotes, setResolutionNotes] = useState("")

  if (!member) {
    return (
      <div className="flex h-full items-center justify-center p-8">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-foreground">Member not found</h2>
          <Link href="/admin/members">
            <Button variant="link" className="mt-2">Back to members</Button>
          </Link>
        </div>
      </div>
    )
  }

  const activeAlerts = alerts.filter(a => a.status === "active")
  const resolvedAlerts = alerts.filter(a => a.status === "resolved")
  const hasActiveAlert = activeAlerts.length > 0

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
      {/* Back button */}
      <Link href="/admin/members">
        <Button variant="ghost" className="mb-6 gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Members
        </Button>
      </Link>

      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-xl font-semibold text-primary-foreground">
            {member.firstName[0]}{member.lastName[0]}
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-foreground">
                {member.firstName} {member.lastName}
              </h1>
              <Badge 
                variant={hasActiveAlert ? "destructive" : "outline"}
                className={cn(
                  !hasActiveAlert && "border-[oklch(0.65_0.15_145)] text-[oklch(0.45_0.15_145)] bg-[oklch(0.65_0.15_145)]/10"
                )}
              >
                {hasActiveAlert ? "At Risk" : "Okay"}
              </Badge>
            </div>
            <p className="mt-1 text-muted-foreground">
              Member since {formatDate(member.joinedAt)} • {calculateAge(member.dateOfBirth)} years old
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left column - Details */}
        <div className="space-y-6 lg:col-span-2">
          {/* Active Alerts */}
          {activeAlerts.length > 0 && (
            <Card className="border-destructive/50 bg-destructive/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-destructive">
                  <AlertTriangle className="h-5 w-5" />
                  Active Alerts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {activeAlerts.map(alert => (
                  <div key={alert.id} className="flex items-start justify-between gap-4 rounded-lg border border-destructive/20 bg-card p-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Badge variant={alert.type === "missed_checkin" ? "destructive" : "secondary"}>
                          {alert.type === "missed_checkin" ? "Missed Check-in" : "Needs Support"}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {formatDateTime(alert.createdAt)}
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-foreground">{alert.message}</p>
                    </div>
                    <Button size="sm" onClick={() => openResolveDialog(alert)}>
                      Resolve
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="text-sm font-medium text-foreground">{member.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                  <Phone className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Phone</p>
                  <p className="text-sm font-medium text-foreground">{member.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 sm:col-span-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Address</p>
                  <p className="text-sm font-medium text-foreground">{member.address}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Date of Birth</p>
                  <p className="text-sm font-medium text-foreground">{formatDate(member.dateOfBirth)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Health Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-primary" />
                Health Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Health Conditions</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {member.healthConditions.map((condition, index) => (
                      <Badge key={index} variant="secondary">
                        {condition}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Check-in Frequency</p>
                    <p className="mt-1 text-sm text-foreground capitalize">{member.checkInFrequency}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Preferred Contact</p>
                    <p className="mt-1 text-sm text-foreground capitalize">{member.preferredContact}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Check-ins */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                Recent Check-ins
              </CardTitle>
              <CardDescription>
                Last check-in: {member.lastCheckIn ? formatDateTime(member.lastCheckIn) : "Never"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {checkIns.length === 0 ? (
                <p className="py-4 text-center text-muted-foreground">No check-ins recorded yet</p>
              ) : (
                <div className="space-y-3">
                  {checkIns.map(checkIn => (
                    <div key={checkIn.id} className="flex items-start gap-4 rounded-lg border border-border p-4">
                      <div className={cn(
                        "flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
                        checkIn.status === "okay" ? "bg-[oklch(0.65_0.15_145)]/10" : "bg-[oklch(0.75_0.15_75)]/10"
                      )}>
                        {checkIn.status === "okay" ? (
                          <Heart className="h-5 w-5 text-[oklch(0.65_0.15_145)]" fill="currentColor" />
                        ) : (
                          <AlertTriangle className="h-5 w-5 text-[oklch(0.55_0.15_75)]" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-foreground">
                            {checkIn.status === "okay" ? "Okay" : "Needs Support"}
                          </p>
                          <span className="text-xs text-muted-foreground">
                            {formatDateTime(checkIn.createdAt)}
                          </span>
                        </div>
                        {checkIn.notes && (
                          <p className="mt-1 text-sm text-muted-foreground">{checkIn.notes}</p>
                        )}
                        {checkIn.supportNeeded && (
                          <p className="mt-1 text-sm text-destructive">Support needed: {checkIn.supportNeeded}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right column - Emergency Contacts & History */}
        <div className="space-y-6">
          {/* Emergency Contacts */}
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Emergency Contacts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {member.emergencyContacts.map(contact => (
                <div key={contact.id} className="rounded-lg border border-border p-4">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-foreground">{contact.name}</p>
                    <Badge variant="outline">{contact.relationship}</Badge>
                  </div>
                  <div className="mt-3 space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="text-foreground">{contact.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="text-foreground">{contact.email}</span>
                    </div>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1 gap-1">
                      <Phone className="h-4 w-4" />
                      Call
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 gap-1">
                      <Mail className="h-4 w-4" />
                      Email
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Quick Stats
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total Check-ins</span>
                <span className="font-medium text-foreground">{checkIns.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Consecutive Missed</span>
                <span className={cn(
                  "font-medium",
                  member.consecutiveMissed >= 2 ? "text-destructive" : "text-foreground"
                )}>
                  {member.consecutiveMissed}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Active Alerts</span>
                <span className={cn(
                  "font-medium",
                  activeAlerts.length > 0 ? "text-destructive" : "text-foreground"
                )}>
                  {activeAlerts.length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Resolved Alerts</span>
                <span className="font-medium text-foreground">{resolvedAlerts.length}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

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
