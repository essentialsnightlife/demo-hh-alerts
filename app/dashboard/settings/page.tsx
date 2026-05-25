"use client"

import { useState } from "react"
import { Bell, Mail, Phone, Shield, Clock, Eye, Save, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

export default function MemberSettingsPage() {
  const [saved, setSaved] = useState(false)
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    checkInReminders: true,
    reminderTime: "09:00",
    checkInFrequency: "daily",
    showHealthInfo: true,
    shareWithEmergencyContacts: true,
  })

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="flex-1 overflow-auto">
      <div className="mx-auto max-w-3xl p-6 md:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-foreground">Settings</h1>
          <p className="mt-1 text-muted-foreground">
            Manage your notification preferences and account settings
          </p>
        </div>

        <div className="space-y-6">
          {/* Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Bell className="h-5 w-5 text-primary" />
                Notifications
              </CardTitle>
              <CardDescription>
                Choose how you want to receive check-in reminders and updates
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <Label htmlFor="email-notifications" className="text-base font-medium">
                      Email Notifications
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Receive reminders and updates via email
                    </p>
                  </div>
                </div>
                <Switch
                  id="email-notifications"
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, emailNotifications: checked })
                  }
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <Label htmlFor="sms-notifications" className="text-base font-medium">
                      SMS Notifications
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Receive text message reminders
                    </p>
                  </div>
                </div>
                <Switch
                  id="sms-notifications"
                  checked={settings.smsNotifications}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, smsNotifications: checked })
                  }
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Bell className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <Label htmlFor="check-in-reminders" className="text-base font-medium">
                      Check-in Reminders
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified when it&apos;s time to check in
                    </p>
                  </div>
                </div>
                <Switch
                  id="check-in-reminders"
                  checked={settings.checkInReminders}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, checkInReminders: checked })
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* Check-in Preferences */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Clock className="h-5 w-5 text-primary" />
                Check-in Preferences
              </CardTitle>
              <CardDescription>
                Customize your check-in schedule and timing
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="frequency">Check-in Frequency</Label>
                  <Select
                    value={settings.checkInFrequency}
                    onValueChange={(value) =>
                      setSettings({ ...settings, checkInFrequency: value })
                    }
                  >
                    <SelectTrigger id="frequency">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reminder-time">Reminder Time</Label>
                  <Input
                    id="reminder-time"
                    type="time"
                    value={settings.reminderTime}
                    onChange={(e) =>
                      setSettings({ ...settings, reminderTime: e.target.value })
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Privacy */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Shield className="h-5 w-5 text-primary" />
                Privacy
              </CardTitle>
              <CardDescription>
                Control what information is shared with others
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Eye className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <Label htmlFor="show-health" className="text-base font-medium">
                      Show Health Information
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Allow admins to view your health conditions
                    </p>
                  </div>
                </div>
                <Switch
                  id="show-health"
                  checked={settings.showHealthInfo}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, showHealthInfo: checked })
                  }
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <Label htmlFor="share-emergency" className="text-base font-medium">
                      Share with Emergency Contacts
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Allow emergency contacts to be notified if needed
                    </p>
                  </div>
                </div>
                <Switch
                  id="share-emergency"
                  checked={settings.shareWithEmergencyContacts}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, shareWithEmergencyContacts: checked })
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button onClick={handleSave} className="min-w-[140px]">
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
          </div>
        </div>
      </div>
    </div>
  )
}
