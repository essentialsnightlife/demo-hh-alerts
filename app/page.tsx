import Link from "next/link"
import { Heart, ArrowRight, Shield, Bell, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
              <Heart className="h-5 w-5 text-primary-foreground" fill="currentColor" />
            </div>
            <span className="text-xl font-semibold text-foreground">Heavenly Hands</span>
          </div>
          <nav className="flex items-center gap-4">
            <Link href="/auth/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/onboarding">
              <Button>Join Our Community</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              <Heart className="h-4 w-4" />
              Community Health Alert System
            </div>
            <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Caring for our community, one check-in at a time
            </h1>
            <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground">
              A simple platform that helps community organizations monitor and support members 
              with critical health needs through daily check-ins and proactive alerts.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/onboarding">
                <Button size="lg" className="gap-2">
                  Get Started
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/auth/login">
                <Button size="lg" variant="outline">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-border bg-muted/50 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              How it works
            </h2>
            <p className="mt-4 text-muted-foreground">
              Simple, effective health monitoring for community members who need support.
            </p>
          </div>
          <div className="mt-16 grid gap-8 sm:grid-cols-3">
            <Card className="border-none bg-card shadow-sm">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Easy Onboarding</CardTitle>
                <CardDescription>
                  Simple sign-up with health details and emergency contacts. 
                  Choose daily or weekly check-ins based on your needs.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-none bg-card shadow-sm">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Daily Check-Ins</CardTitle>
                <CardDescription>
                  A quick tap to let us know you&apos;re okay, or request support 
                  when you need help. It takes just seconds.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-none bg-card shadow-sm">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <Bell className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Proactive Alerts</CardTitle>
                <CardDescription>
                  Missed check-ins automatically notify our care team, 
                  ensuring no one falls through the cracks.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Demo Access */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              Explore the Platform
            </h2>
            <p className="mt-4 text-muted-foreground">
              View the demo to see how the platform works for members and administrators.
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            <Link href="/onboarding">
              <Card className="group cursor-pointer transition-all hover:border-primary hover:shadow-md">
                <CardContent className="flex items-center gap-4 p-6">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                    <Users className="h-7 w-7 text-primary" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg">Member Onboarding</CardTitle>
                    <CardDescription className="mt-1">
                      Experience the sign-up flow and check-in dashboard
                    </CardDescription>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                </CardContent>
              </Card>
            </Link>
            <Link href="/admin">
              <Card className="group cursor-pointer transition-all hover:border-primary hover:shadow-md">
                <CardContent className="flex items-center gap-4 p-6">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                    <Shield className="h-7 w-7 text-primary" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg">Admin Dashboard</CardTitle>
                    <CardDescription className="mt-1">
                      View member management and alert monitoring
                    </CardDescription>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Heart className="h-4 w-4 text-primary-foreground" fill="currentColor" />
              </div>
              <span className="font-semibold text-foreground">Heavenly Hands</span>
            </div>
            <p className="text-sm text-muted-foreground">
              A US-based charity supporting community health
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
