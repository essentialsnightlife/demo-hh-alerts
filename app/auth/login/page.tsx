"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Heart, Mail, ArrowRight, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSent, setIsSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsLoading(false)
    setIsSent(true)
  }

  const handleDemoLogin = (type: "member" | "admin") => {
    router.push(type === "member" ? "/dashboard" : "/admin")
  }

  return (
    <div className="flex flex-1 items-center justify-center bg-background p-6">
      <div className="w-full max-w-md">
        {/* Logo */}
        <Link
          href="/"
          aria-label="Back to landing page"
          className="mb-8 flex flex-col items-center rounded-md transition-opacity hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4"
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary">
            <Heart className="h-7 w-7 text-primary-foreground" fill="currentColor" />
          </div>
          <h1 className="mt-4 text-2xl font-bold text-foreground">Heavenly Hands</h1>
          <p className="mt-1 text-muted-foreground">Community Health Alert System</p>
        </Link>

        <Card>
          <CardHeader className="text-center">
            <CardTitle>
              {isSent ? "Check your email" : "Welcome back"}
            </CardTitle>
            <CardDescription>
              {isSent 
                ? "We sent you a magic link to sign in" 
                : "Enter your email to receive a magic link"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isSent ? (
              <div className="space-y-6 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Mail className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    We sent a magic link to
                  </p>
                  <p className="font-medium text-foreground">{email}</p>
                </div>
                <Button variant="outline" onClick={() => setIsSent(false)} className="w-full">
                  Use a different email
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="eleanor@email.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full gap-2" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Sending link...
                    </>
                  ) : (
                    <>
                      Send magic link
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            )}

            {/* Demo Access */}
            <div className="mt-6 border-t border-border pt-6">
              <p className="mb-3 text-center text-sm text-muted-foreground">
                Demo Access
              </p>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" onClick={() => handleDemoLogin("member")}>
                  Member View
                </Button>
                <Button variant="outline" onClick={() => handleDemoLogin("admin")}>
                  Admin View
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          New to Heavenly Hands?{" "}
          <Link href="/onboarding" className="font-medium text-primary hover:underline">
            Join our community
          </Link>
        </p>
      </div>
    </div>
  )
}
