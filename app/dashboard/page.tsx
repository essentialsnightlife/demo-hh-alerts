"use client"

import { useState } from "react"
import { Heart, HandHelping, Clock, CheckCircle2, Calendar, Send, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

type CheckInState = "pending" | "confirming" | "complete"

export default function DashboardPage() {
  const [checkInState, setCheckInState] = useState<CheckInState>("pending")
  const [selectedStatus, setSelectedStatus] = useState<"okay" | "support" | null>(null)
  const [notes, setNotes] = useState("")
  const [supportReason, setSupportReason] = useState("")

  const handleCheckIn = (status: "okay" | "support") => {
    setSelectedStatus(status)
    setCheckInState("confirming")
  }

  const submitCheckIn = () => {
    setCheckInState("complete")
  }

  const resetCheckIn = () => {
    setCheckInState("pending")
    setSelectedStatus(null)
    setNotes("")
    setSupportReason("")
  }

  // Mock data
  const lastCheckIn = "May 24, 2026 at 9:30 AM"
  const nextCheckIn = "Tomorrow at 9:00 AM"
  const streak = 12

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Good morning, Eleanor</h1>
        <p className="mt-2 text-muted-foreground">
          {checkInState === "complete" 
            ? "Thank you for checking in today!" 
            : "Time for your daily check-in. How are you feeling?"}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <CheckCircle2 className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Last Check-in</p>
              <p className="font-semibold text-foreground">{lastCheckIn}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Next Check-in</p>
              <p className="font-semibold text-foreground">{nextCheckIn}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <Calendar className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Current Streak</p>
              <p className="font-semibold text-foreground">{streak} days</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Check-in Card */}
      <Card className="border-2 border-border">
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-2xl">Daily Check-in</CardTitle>
          <CardDescription>
            {checkInState === "pending" && "Let us know how you're doing today"}
            {checkInState === "confirming" && "Add any additional details"}
            {checkInState === "complete" && "Your check-in has been recorded"}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          {/* Pending State - Show buttons */}
          {checkInState === "pending" && (
            <div className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <button
                  onClick={() => handleCheckIn("okay")}
                  className="group flex flex-col items-center gap-4 rounded-2xl border-2 border-border bg-card p-8 transition-all hover:border-primary hover:bg-primary/5 hover:shadow-md"
                >
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[oklch(0.65_0.15_145)] transition-transform group-hover:scale-110">
                    <Heart className="h-10 w-10 text-white" fill="currentColor" />
                  </div>
                  <div className="text-center">
                    <span className="text-xl font-semibold text-foreground">I&apos;m Okay</span>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Feeling well, no support needed
                    </p>
                  </div>
                </button>
                <button
                  onClick={() => handleCheckIn("support")}
                  className="group flex flex-col items-center gap-4 rounded-2xl border-2 border-border bg-card p-8 transition-all hover:border-[oklch(0.75_0.15_75)] hover:bg-[oklch(0.75_0.15_75)]/5 hover:shadow-md"
                >
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[oklch(0.75_0.15_75)] transition-transform group-hover:scale-110">
                    <HandHelping className="h-10 w-10 text-[oklch(0.25_0.05_75)]" />
                  </div>
                  <div className="text-center">
                    <span className="text-xl font-semibold text-foreground">I Need Support</span>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Request help from our care team
                    </p>
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* Confirming State - Show form */}
          {checkInState === "confirming" && (
            <div className="space-y-6">
              {/* Status indicator */}
              <div className={cn(
                "flex items-center gap-4 rounded-xl p-4",
                selectedStatus === "okay" 
                  ? "bg-[oklch(0.65_0.15_145)]/10 text-[oklch(0.45_0.15_145)]" 
                  : "bg-[oklch(0.75_0.15_75)]/10 text-[oklch(0.55_0.15_75)]"
              )}>
                <div className={cn(
                  "flex h-12 w-12 items-center justify-center rounded-full",
                  selectedStatus === "okay" ? "bg-[oklch(0.65_0.15_145)]" : "bg-[oklch(0.75_0.15_75)]"
                )}>
                  {selectedStatus === "okay" ? (
                    <Heart className="h-6 w-6 text-white" fill="currentColor" />
                  ) : (
                    <HandHelping className="h-6 w-6 text-[oklch(0.25_0.05_75)]" />
                  )}
                </div>
                <div>
                  <p className="font-semibold text-foreground">
                    {selectedStatus === "okay" ? "You're feeling okay" : "You need support"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {selectedStatus === "okay" 
                      ? "Great to hear! Add any notes if you'd like." 
                      : "Please tell us what kind of help you need."}
                  </p>
                </div>
              </div>

              {/* Support reason (required for support) */}
              {selectedStatus === "support" && (
                <div className="space-y-2">
                  <Label htmlFor="support-reason" className="text-base">
                    What kind of support do you need? <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="support-reason"
                    placeholder="e.g., Need help with medication management, transportation to an appointment, feeling unwell..."
                    className="min-h-[100px]"
                    value={supportReason}
                    onChange={e => setSupportReason(e.target.value)}
                  />
                </div>
              )}

              {/* Optional notes */}
              <div className="space-y-2">
                <Label htmlFor="notes" className="text-base">
                  Additional notes <span className="text-muted-foreground">(optional)</span>
                </Label>
                <Textarea
                  id="notes"
                  placeholder="Any other details you'd like to share..."
                  className="min-h-[80px]"
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                />
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <Button variant="ghost" onClick={resetCheckIn}>
                  Go Back
                </Button>
                <Button 
                  onClick={submitCheckIn}
                  disabled={selectedStatus === "support" && !supportReason.trim()}
                  className="gap-2"
                >
                  <Send className="h-4 w-4" />
                  Submit Check-in
                </Button>
              </div>
            </div>
          )}

          {/* Complete State - Show confirmation */}
          {checkInState === "complete" && (
            <div className="space-y-6 text-center">
              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-[oklch(0.65_0.15_145)]/10">
                <CheckCircle2 className="h-12 w-12 text-[oklch(0.65_0.15_145)]" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground">Check-in Complete</h3>
                <p className="mt-2 text-muted-foreground">
                  {selectedStatus === "okay" 
                    ? "Thank you for letting us know you're doing well. We're here if you need anything!" 
                    : "Our care team has been notified and will reach out to you soon."}
                </p>
              </div>
              {selectedStatus === "support" && (
                <div className="rounded-xl bg-muted p-4 text-left">
                  <p className="text-sm font-medium text-foreground">Your request:</p>
                  <p className="mt-1 text-sm text-muted-foreground">{supportReason}</p>
                </div>
              )}
              <Button variant="outline" onClick={resetCheckIn}>
                Check In Again
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <div className="mt-8">
        <h2 className="mb-4 text-lg font-semibold text-foreground">Recent Check-ins</h2>
        <Card>
          <CardContent className="divide-y divide-border p-0">
            {[
              { date: "May 24", status: "okay", notes: "Feeling well today. Blood sugar levels stable." },
              { date: "May 23", status: "okay", notes: null },
              { date: "May 22", status: "support", notes: "Needed help with transportation to doctor" },
              { date: "May 21", status: "okay", notes: "Good day, took a walk in the park" },
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-4 p-4">
                <div className={cn(
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
                  item.status === "okay" ? "bg-[oklch(0.65_0.15_145)]/10" : "bg-[oklch(0.75_0.15_75)]/10"
                )}>
                  {item.status === "okay" ? (
                    <Heart className="h-5 w-5 text-[oklch(0.65_0.15_145)]" fill="currentColor" />
                  ) : (
                    <HandHelping className="h-5 w-5 text-[oklch(0.55_0.15_75)]" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground">{item.date}</p>
                  <p className="truncate text-sm text-muted-foreground">
                    {item.notes || (item.status === "okay" ? "Checked in as okay" : "Requested support")}
                  </p>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
