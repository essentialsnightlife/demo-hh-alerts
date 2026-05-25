"use client"

import { useState } from "react"
import { User, Phone, Mail, MapPin, Heart, AlertCircle, Edit2, Save, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export default function MemberProfilePage() {
  const [editing, setEditing] = useState(false)
  const [saved, setSaved] = useState(false)
  const [profile, setProfile] = useState({
    firstName: "Margaret",
    lastName: "Thompson",
    email: "margaret.t@email.com",
    phone: "(555) 123-4567",
    address: "123 Oak Street, Springfield, IL 62701",
    dateOfBirth: "1952-03-15",
    healthConditions: ["Type 2 Diabetes", "Hypertension", "Arthritis"],
    medications: "Metformin 500mg twice daily, Lisinopril 10mg daily",
    allergies: "Penicillin, Sulfa drugs",
    notes: "Prefer morning check-ins. Lives alone since 2019.",
    emergencyContact1: {
      name: "Robert Thompson",
      relationship: "Son",
      phone: "(555) 234-5678",
    },
    emergencyContact2: {
      name: "Sarah Johnson",
      relationship: "Daughter",
      phone: "(555) 345-6789",
    },
  })

  const handleSave = () => {
    setEditing(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="flex-1 overflow-auto">
      <div className="mx-auto max-w-3xl p-6 md:p-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">My Profile</h1>
            <p className="mt-1 text-muted-foreground">
              View and update your personal information
            </p>
          </div>
          {!editing ? (
            <Button variant="outline" onClick={() => setEditing(true)}>
              <Edit2 className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
          ) : (
            <Button onClick={handleSave}>
              {saved ? (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Saved
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </>
              )}
            </Button>
          )}
        </div>

        <div className="space-y-6">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <User className="h-5 w-5 text-primary" />
                Personal Information
              </CardTitle>
              <CardDescription>Your basic contact details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={profile.firstName}
                    onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                    disabled={!editing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={profile.lastName}
                    onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                    disabled={!editing}
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      className="pl-10"
                      disabled={!editing}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="phone"
                      type="tel"
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      className="pl-10"
                      disabled={!editing}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="address"
                    value={profile.address}
                    onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                    className="pl-10"
                    disabled={!editing}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="dob">Date of Birth</Label>
                <Input
                  id="dob"
                  type="date"
                  value={profile.dateOfBirth}
                  onChange={(e) => setProfile({ ...profile, dateOfBirth: e.target.value })}
                  disabled={!editing}
                  className="max-w-xs"
                />
              </div>
            </CardContent>
          </Card>

          {/* Health Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Heart className="h-5 w-5 text-primary" />
                Health Information
              </CardTitle>
              <CardDescription>
                Medical conditions, medications, and allergies
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Health Conditions</Label>
                <div className="flex flex-wrap gap-2">
                  {profile.healthConditions.map((condition) => (
                    <Badge key={condition} variant="secondary" className="text-sm">
                      {condition}
                    </Badge>
                  ))}
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="medications">Current Medications</Label>
                <Textarea
                  id="medications"
                  value={profile.medications}
                  onChange={(e) => setProfile({ ...profile, medications: e.target.value })}
                  disabled={!editing}
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="allergies">Allergies</Label>
                <div className="relative">
                  <AlertCircle className="absolute left-3 top-3 h-4 w-4 text-destructive" />
                  <Textarea
                    id="allergies"
                    value={profile.allergies}
                    onChange={(e) => setProfile({ ...profile, allergies: e.target.value })}
                    className="pl-10"
                    disabled={!editing}
                    rows={2}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  id="notes"
                  value={profile.notes}
                  onChange={(e) => setProfile({ ...profile, notes: e.target.value })}
                  disabled={!editing}
                  rows={3}
                  placeholder="Any additional information for your care team..."
                />
              </div>
            </CardContent>
          </Card>

          {/* Emergency Contacts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Phone className="h-5 w-5 text-primary" />
                Emergency Contacts
              </CardTitle>
              <CardDescription>
                People to contact in case of emergency
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Contact 1 */}
              <div className="rounded-lg border border-border bg-muted/30 p-4">
                <h4 className="mb-3 font-medium text-foreground">Primary Contact</h4>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="ec1-name">Name</Label>
                    <Input
                      id="ec1-name"
                      value={profile.emergencyContact1.name}
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          emergencyContact1: { ...profile.emergencyContact1, name: e.target.value },
                        })
                      }
                      disabled={!editing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ec1-relationship">Relationship</Label>
                    <Input
                      id="ec1-relationship"
                      value={profile.emergencyContact1.relationship}
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          emergencyContact1: {
                            ...profile.emergencyContact1,
                            relationship: e.target.value,
                          },
                        })
                      }
                      disabled={!editing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ec1-phone">Phone</Label>
                    <Input
                      id="ec1-phone"
                      value={profile.emergencyContact1.phone}
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          emergencyContact1: { ...profile.emergencyContact1, phone: e.target.value },
                        })
                      }
                      disabled={!editing}
                    />
                  </div>
                </div>
              </div>

              {/* Contact 2 */}
              <div className="rounded-lg border border-border bg-muted/30 p-4">
                <h4 className="mb-3 font-medium text-foreground">Secondary Contact</h4>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="ec2-name">Name</Label>
                    <Input
                      id="ec2-name"
                      value={profile.emergencyContact2.name}
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          emergencyContact2: { ...profile.emergencyContact2, name: e.target.value },
                        })
                      }
                      disabled={!editing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ec2-relationship">Relationship</Label>
                    <Input
                      id="ec2-relationship"
                      value={profile.emergencyContact2.relationship}
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          emergencyContact2: {
                            ...profile.emergencyContact2,
                            relationship: e.target.value,
                          },
                        })
                      }
                      disabled={!editing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ec2-phone">Phone</Label>
                    <Input
                      id="ec2-phone"
                      value={profile.emergencyContact2.phone}
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          emergencyContact2: { ...profile.emergencyContact2, phone: e.target.value },
                        })
                      }
                      disabled={!editing}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
