"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Filter, ChevronRight, Heart, AlertTriangle, Clock, CheckCircle2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { mockMembers, formatDateTime, getAlertsByMemberId, calculateAge } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

type FilterStatus = "all" | "okay" | "at-risk" | "new"

export default function MembersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all")

  const filteredMembers = mockMembers.filter(member => {
    // Search filter
    const searchLower = searchQuery.toLowerCase()
    const matchesSearch = !searchQuery || 
      member.firstName.toLowerCase().includes(searchLower) ||
      member.lastName.toLowerCase().includes(searchLower) ||
      member.email.toLowerCase().includes(searchLower)

    // Status filter
    const hasActiveAlert = getAlertsByMemberId(member.id).some(a => a.status === "active")
    const isNew = !member.lastCheckIn
    
    if (filterStatus === "at-risk" && !hasActiveAlert && member.consecutiveMissed < 2) return false
    if (filterStatus === "okay" && (hasActiveAlert || member.consecutiveMissed >= 2)) return false
    if (filterStatus === "new" && !isNew) return false

    return matchesSearch
  })

  const getMemberStatus = (member: typeof mockMembers[0]) => {
    const hasActiveAlert = getAlertsByMemberId(member.id).some(a => a.status === "active")
    if (hasActiveAlert || member.consecutiveMissed >= 2) return "at-risk"
    if (!member.lastCheckIn) return "new"
    return "okay"
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Members</h1>
        <p className="mt-2 text-muted-foreground">
          View and manage all community members
        </p>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search members by name or email..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                {filterStatus === "all" && "All Members"}
                {filterStatus === "okay" && "Okay"}
                {filterStatus === "at-risk" && "At Risk"}
                {filterStatus === "new" && "New Members"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setFilterStatus("all")}>
                All Members
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterStatus("okay")}>
                <CheckCircle2 className="mr-2 h-4 w-4 text-[oklch(0.65_0.15_145)]" />
                Okay
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterStatus("at-risk")}>
                <AlertTriangle className="mr-2 h-4 w-4 text-destructive" />
                At Risk
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterStatus("new")}>
                <Clock className="mr-2 h-4 w-4 text-primary" />
                New Members
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardContent>
      </Card>

      {/* Members List */}
      <Card>
        <CardHeader>
          <CardTitle>All Members</CardTitle>
          <CardDescription>
            {filteredMembers.length} member{filteredMembers.length !== 1 ? "s" : ""} found
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-border">
            {filteredMembers.map(member => {
              const status = getMemberStatus(member)
              const age = calculateAge(member.dateOfBirth)
              
              return (
                <Link key={member.id} href={`/admin/members/${member.id}`}>
                  <div className="flex items-center gap-4 p-4 transition-colors hover:bg-muted/50">
                    {/* Avatar */}
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground">
                      {member.firstName[0]}{member.lastName[0]}
                    </div>
                    
                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-foreground">
                          {member.firstName} {member.lastName}
                        </p>
                        <Badge 
                          variant={status === "at-risk" ? "destructive" : status === "new" ? "secondary" : "outline"}
                          className={cn(
                            "text-xs",
                            status === "okay" && "border-[oklch(0.65_0.15_145)] text-[oklch(0.45_0.15_145)] bg-[oklch(0.65_0.15_145)]/10"
                          )}
                        >
                          {status === "at-risk" && "At Risk"}
                          {status === "okay" && "Okay"}
                          {status === "new" && "New"}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {age} years old • {member.checkInFrequency} check-ins
                      </p>
                    </div>

                    {/* Last Check-in */}
                    <div className="hidden text-right sm:block">
                      <p className="text-sm text-muted-foreground">Last check-in</p>
                      <p className="text-sm font-medium text-foreground">
                        {member.lastCheckIn ? formatDateTime(member.lastCheckIn) : "Never"}
                      </p>
                    </div>

                    {/* Status Icon */}
                    <div className={cn(
                      "flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
                      status === "at-risk" && "bg-destructive/10",
                      status === "okay" && "bg-[oklch(0.65_0.15_145)]/10",
                      status === "new" && "bg-primary/10"
                    )}>
                      {status === "at-risk" && <AlertTriangle className="h-5 w-5 text-destructive" />}
                      {status === "okay" && <Heart className="h-5 w-5 text-[oklch(0.65_0.15_145)]" fill="currentColor" />}
                      {status === "new" && <Clock className="h-5 w-5 text-primary" />}
                    </div>

                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                </Link>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
