"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Heart, ArrowRight, ArrowLeft, Check, User, Phone, Shield, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { cn } from "@/lib/utils"

const steps = [
  { id: 1, title: "Personal Details", icon: User },
  { id: 2, title: "Health Information", icon: Heart },
  { id: 3, title: "Emergency Contact", icon: Phone },
  { id: 4, title: "Check-in Preferences", icon: Calendar },
]

export default function OnboardingPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    address: "",
    healthConditions: "",
    medications: "",
    emergencyName: "",
    emergencyRelationship: "",
    emergencyPhone: "",
    emergencyEmail: "",
    checkInFrequency: "daily",
    preferredContact: "email",
  })

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(prev => prev + 1)
    } else {
      router.push("/dashboard")
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
              <Heart className="h-5 w-5 text-primary-foreground" fill="currentColor" />
            </div>
            <span className="text-xl font-semibold text-foreground">Heavenly Hands</span>
          </div>
          <div className="hidden sm:block">
            <p className="text-sm text-muted-foreground">
              Step {currentStep} of 4
            </p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-12">
        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const StepIcon = step.icon
              const isCompleted = currentStep > step.id
              const isCurrent = currentStep === step.id
              
              return (
                <div key={step.id} className="flex flex-1 items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={cn(
                        "flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all",
                        isCompleted && "border-primary bg-primary text-primary-foreground",
                        isCurrent && "border-primary bg-primary/10 text-primary",
                        !isCompleted && !isCurrent && "border-border bg-muted text-muted-foreground"
                      )}
                    >
                      {isCompleted ? (
                        <Check className="h-5 w-5" />
                      ) : (
                        <StepIcon className="h-5 w-5" />
                      )}
                    </div>
                    <span className={cn(
                      "mt-2 text-xs font-medium hidden sm:block",
                      isCurrent ? "text-primary" : "text-muted-foreground"
                    )}>
                      {step.title}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={cn(
                      "h-0.5 flex-1 mx-4",
                      currentStep > step.id ? "bg-primary" : "bg-border"
                    )} />
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Form Card */}
        <Card className="border-border shadow-sm">
          <CardHeader className="pb-6">
            <CardTitle className="text-2xl">
              {currentStep === 1 && "Tell us about yourself"}
              {currentStep === 2 && "Your health information"}
              {currentStep === 3 && "Emergency contact"}
              {currentStep === 4 && "Check-in preferences"}
            </CardTitle>
            <CardDescription>
              {currentStep === 1 && "We'll use this information to personalize your experience."}
              {currentStep === 2 && "Help us understand your health needs so we can better support you."}
              {currentStep === 3 && "Someone we can contact if you need assistance."}
              {currentStep === 4 && "Choose how often you'd like to check in with us."}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Step 1: Personal Details */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      placeholder="Eleanor"
                      value={formData.firstName}
                      onChange={e => updateFormData("firstName", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      placeholder="Thompson"
                      value={formData.lastName}
                      onChange={e => updateFormData("lastName", e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="eleanor@email.com"
                    value={formData.email}
                    onChange={e => updateFormData("email", e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    We&apos;ll send a magic link to this email to sign you in.
                  </p>
                </div>
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="(555) 123-4567"
                      value={formData.phone}
                      onChange={e => updateFormData("phone", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dob">Date of Birth</Label>
                    <Input
                      id="dob"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={e => updateFormData("dateOfBirth", e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Home Address</Label>
                  <Input
                    id="address"
                    placeholder="123 Oak Street, Springfield, IL 62701"
                    value={formData.address}
                    onChange={e => updateFormData("address", e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* Step 2: Health Information */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
                  <div className="flex gap-3">
                    <Shield className="h-5 w-5 shrink-0 text-primary" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Your information is secure</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        All health information is encrypted and only shared with authorized care team members.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="conditions">Health Conditions</Label>
                  <Textarea
                    id="conditions"
                    placeholder="e.g., Diabetes Type 2, Hypertension, Arthritis..."
                    className="min-h-[100px]"
                    value={formData.healthConditions}
                    onChange={e => updateFormData("healthConditions", e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    List any conditions you&apos;d like us to be aware of.
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="medications">Current Medications</Label>
                  <Textarea
                    id="medications"
                    placeholder="e.g., Metformin 500mg twice daily, Lisinopril 10mg daily..."
                    className="min-h-[100px]"
                    value={formData.medications}
                    onChange={e => updateFormData("medications", e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Include dosages if you know them.
                  </p>
                </div>
              </div>
            )}

            {/* Step 3: Emergency Contact */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="emergencyName">Contact Name</Label>
                    <Input
                      id="emergencyName"
                      placeholder="Michael Thompson"
                      value={formData.emergencyName}
                      onChange={e => updateFormData("emergencyName", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="emergencyRelationship">Relationship</Label>
                    <Input
                      id="emergencyRelationship"
                      placeholder="Son, Daughter, Spouse..."
                      value={formData.emergencyRelationship}
                      onChange={e => updateFormData("emergencyRelationship", e.target.value)}
                    />
                  </div>
                </div>
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="emergencyPhone">Phone Number</Label>
                    <Input
                      id="emergencyPhone"
                      type="tel"
                      placeholder="(555) 234-5678"
                      value={formData.emergencyPhone}
                      onChange={e => updateFormData("emergencyPhone", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="emergencyEmail">Email Address</Label>
                    <Input
                      id="emergencyEmail"
                      type="email"
                      placeholder="michael@email.com"
                      value={formData.emergencyEmail}
                      onChange={e => updateFormData("emergencyEmail", e.target.value)}
                    />
                  </div>
                </div>
                <div className="rounded-lg bg-muted p-4">
                  <p className="text-sm text-muted-foreground">
                    Your emergency contact will be notified if you miss multiple check-ins 
                    or if you request support.
                  </p>
                </div>
              </div>
            )}

            {/* Step 4: Check-in Preferences */}
            {currentStep === 4 && (
              <div className="space-y-8">
                <div className="space-y-4">
                  <Label className="text-base">How often would you like to check in?</Label>
                  <RadioGroup
                    value={formData.checkInFrequency}
                    onValueChange={value => updateFormData("checkInFrequency", value)}
                    className="grid gap-4 sm:grid-cols-2"
                  >
                    <Label
                      htmlFor="daily"
                      className={cn(
                        "flex cursor-pointer items-start gap-4 rounded-lg border-2 p-4 transition-all",
                        formData.checkInFrequency === "daily" 
                          ? "border-primary bg-primary/5" 
                          : "border-border hover:border-primary/50"
                      )}
                    >
                      <RadioGroupItem value="daily" id="daily" className="mt-0.5" />
                      <div>
                        <span className="font-medium text-foreground">Daily Check-in</span>
                        <p className="mt-1 text-sm text-muted-foreground">
                          Receive a reminder every day to let us know how you&apos;re doing.
                        </p>
                      </div>
                    </Label>
                    <Label
                      htmlFor="weekly"
                      className={cn(
                        "flex cursor-pointer items-start gap-4 rounded-lg border-2 p-4 transition-all",
                        formData.checkInFrequency === "weekly" 
                          ? "border-primary bg-primary/5" 
                          : "border-border hover:border-primary/50"
                      )}
                    >
                      <RadioGroupItem value="weekly" id="weekly" className="mt-0.5" />
                      <div>
                        <span className="font-medium text-foreground">Weekly Check-in</span>
                        <p className="mt-1 text-sm text-muted-foreground">
                          Receive a reminder once a week to update us on your status.
                        </p>
                      </div>
                    </Label>
                  </RadioGroup>
                </div>

                <div className="space-y-4">
                  <Label className="text-base">How should we contact you for reminders?</Label>
                  <RadioGroup
                    value={formData.preferredContact}
                    onValueChange={value => updateFormData("preferredContact", value)}
                    className="grid gap-4 sm:grid-cols-3"
                  >
                    <Label
                      htmlFor="email-pref"
                      className={cn(
                        "flex cursor-pointer items-center gap-3 rounded-lg border-2 p-4 transition-all",
                        formData.preferredContact === "email" 
                          ? "border-primary bg-primary/5" 
                          : "border-border hover:border-primary/50"
                      )}
                    >
                      <RadioGroupItem value="email" id="email-pref" />
                      <span className="font-medium text-foreground">Email</span>
                    </Label>
                    <Label
                      htmlFor="sms-pref"
                      className={cn(
                        "flex cursor-pointer items-center gap-3 rounded-lg border-2 p-4 transition-all",
                        formData.preferredContact === "sms" 
                          ? "border-primary bg-primary/5" 
                          : "border-border hover:border-primary/50"
                      )}
                    >
                      <RadioGroupItem value="sms" id="sms-pref" />
                      <span className="font-medium text-foreground">SMS</span>
                    </Label>
                    <Label
                      htmlFor="both-pref"
                      className={cn(
                        "flex cursor-pointer items-center gap-3 rounded-lg border-2 p-4 transition-all",
                        formData.preferredContact === "both" 
                          ? "border-primary bg-primary/5" 
                          : "border-border hover:border-primary/50"
                      )}
                    >
                      <RadioGroupItem value="both" id="both-pref" />
                      <span className="font-medium text-foreground">Both</span>
                    </Label>
                  </RadioGroup>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between pt-6 border-t border-border">
              <Button
                variant="ghost"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
              <Button onClick={nextStep} className="gap-2">
                {currentStep === 4 ? "Complete Setup" : "Continue"}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
