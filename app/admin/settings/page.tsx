"use client"

import { useState } from "react"
import {
  Bell,
  Mail,
  Clock,
  Shield,
  Users,
  AlertTriangle,
  Save,
  Check,
  Building,
  Phone,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"

export default function AdminSettingsPage() {
  const [saved, setSaved] = useState(false)
  const [settings, setSettings] = useState({
    // Organization
    orgName: "Heavenly Hands",
    orgEmail: "admin@heavenlyhands.org",
    orgPhone: "(555) 000-1234",
    orgAddress: "456 Community Way, Springfield, IL 62702",
    // Alert Settings
    missedCheckInsThreshold: "2",
    alertEscalationDelay: "24",
    notifyEmergencyContacts: true,
    autoCreateAlerts: true,
    // Notification Settings
    emailNotifications: true,
    smsNotifications: false,
    dailyDigest: true,
    digestTime: "08:00",
    // Default Check-in Settings
    defaultFrequency: "daily",
    defaultReminderTime: "09:00",
    weekendReminders: true,
    // Security
    requireMFA: false,
    sessionTimeout: "24",
  })

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="flex-1 overflow-auto">
      <div className="mx-auto max-w-4xl p-6 md:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-foreground">Admin Settings</h1>
          <p className="mt-1 text-muted-foreground">
            Configure system-wide settings and preferences
          </p>
        </div>

        <div className="space-y-6">
          {/* Organization Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Building className="h-5 w-5 text-primary" />
                Organization Details
              </CardTitle>
              <CardDescription>
                Basic information about your organization
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="org-name">Organization Name</Label>
                  <Input
                    id="org-name"
                    value={settings.orgName}
                    onChange={(e) => setSettings({ ...settings, orgName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="org-email">Contact Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="org-email"
                      type="email"
                      value={settings.orgEmail}
                      onChange={(e) => setSettings({ ...settings, orgEmail: e.target.value })}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="org-phone">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="org-phone"
                      type="tel"
                      value={settings.orgPhone}
                      onChange={(e) => setSettings({ ...settings, orgPhone: e.target.value })}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="org-address">Address</Label>
                  <Input
                    id="org-address"
                    value={settings.orgAddress}
                    onChange={(e) => setSettings({ ...settings, orgAddress: e.target.value })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Alert Configuration */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <AlertTriangle className="h-5 w-5 text-primary" />
                Alert Configuration
              </CardTitle>
              <CardDescription>
                Configure when and how alerts are triggered
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="missed-threshold">Missed Check-ins Threshold</Label>
                  <Select
                    value={settings.missedCheckInsThreshold}
                    onValueChange={(value) =>
                      setSettings({ ...settings, missedCheckInsThreshold: value })
                    }
                  >
                    <SelectTrigger id="missed-threshold">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 missed check-in</SelectItem>
                      <SelectItem value="2">2 missed check-ins</SelectItem>
                      <SelectItem value="3">3 missed check-ins</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    Number of missed check-ins before triggering an alert
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="escalation-delay">Escalation Delay (hours)</Label>
                  <Select
                    value={settings.alertEscalationDelay}
                    onValueChange={(value) =>
                      setSettings({ ...settings, alertEscalationDelay: value })
                    }
                  >
                    <SelectTrigger id="escalation-delay">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="12">12 hours</SelectItem>
                      <SelectItem value="24">24 hours</SelectItem>
                      <SelectItem value="48">48 hours</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    Time before unresolved alerts are escalated
                  </p>
                </div>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Bell className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <Label htmlFor="auto-alerts" className="text-base font-medium">
                      Auto-create Alerts
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically create alerts based on check-in patterns
                    </p>
                  </div>
                </div>
                <Switch
                  id="auto-alerts"
                  checked={settings.autoCreateAlerts}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, autoCreateAlerts: checked })
                  }
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <Label htmlFor="notify-emergency" className="text-base font-medium">
                      Notify Emergency Contacts
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically contact emergency contacts for critical alerts
                    </p>
                  </div>
                </div>
                <Switch
                  id="notify-emergency"
                  checked={settings.notifyEmergencyContacts}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, notifyEmergencyContacts: checked })
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* Admin Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Mail className="h-5 w-5 text-primary" />
                Admin Notifications
              </CardTitle>
              <CardDescription>
                How administrators receive alerts and updates
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <Label htmlFor="email-notif" className="text-base font-medium">
                      Email Notifications
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Receive instant email alerts for new incidents
                    </p>
                  </div>
                </div>
                <Switch
                  id="email-notif"
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
                    <Label htmlFor="sms-notif" className="text-base font-medium">
                      SMS Notifications
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Receive text alerts for critical incidents
                    </p>
                  </div>
                </div>
                <Switch
                  id="sms-notif"
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
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <Label htmlFor="daily-digest" className="text-base font-medium">
                      Daily Digest
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Receive a daily summary of all member activity
                    </p>
                  </div>
                </div>
                <Switch
                  id="daily-digest"
                  checked={settings.dailyDigest}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, dailyDigest: checked })
                  }
                />
              </div>

              {settings.dailyDigest && (
                <div className="ml-13 space-y-2">
                  <Label htmlFor="digest-time">Digest Time</Label>
                  <Input
                    id="digest-time"
                    type="time"
                    value={settings.digestTime}
                    onChange={(e) => setSettings({ ...settings, digestTime: e.target.value })}
                    className="max-w-xs"
                  />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Default Check-in Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Clock className="h-5 w-5 text-primary" />
                Default Check-in Settings
              </CardTitle>
              <CardDescription>
                Default settings for new member registrations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="default-frequency">Default Frequency</Label>
                  <Select
                    value={settings.defaultFrequency}
                    onValueChange={(value) =>
                      setSettings({ ...settings, defaultFrequency: value })
                    }
                  >
                    <SelectTrigger id="default-frequency">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="default-reminder">Default Reminder Time</Label>
                  <Input
                    id="default-reminder"
                    type="time"
                    value={settings.defaultReminderTime}
                    onChange={(e) =>
                      setSettings({ ...settings, defaultReminderTime: e.target.value })
                    }
                  />
                </div>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="weekend-reminders" className="text-base font-medium">
                    Weekend Reminders
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Send check-in reminders on weekends
                  </p>
                </div>
                <Switch
                  id="weekend-reminders"
                  checked={settings.weekendReminders}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, weekendReminders: checked })
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* Security */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Shield className="h-5 w-5 text-primary" />
                Security
              </CardTitle>
              <CardDescription>
                Security settings for admin accounts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="require-mfa" className="text-base font-medium">
                    Require MFA for Admins
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Require multi-factor authentication for all admin logins
                  </p>
                </div>
                <Switch
                  id="require-mfa"
                  checked={settings.requireMFA}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, requireMFA: checked })
                  }
                />
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="session-timeout">Session Timeout</Label>
                <Select
                  value={settings.sessionTimeout}
                  onValueChange={(value) =>
                    setSettings({ ...settings, sessionTimeout: value })
                  }
                >
                  <SelectTrigger id="session-timeout" className="max-w-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 hour</SelectItem>
                    <SelectItem value="8">8 hours</SelectItem>
                    <SelectItem value="24">24 hours</SelectItem>
                    <SelectItem value="168">1 week</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Automatically log out admins after this period of inactivity
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button onClick={handleSave} className="min-w-[160px]">
              {saved ? (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Settings Saved
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save All Settings
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
