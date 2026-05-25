import Link from "next/link"
import { Heart, ArrowRight, Shield, Bell, Users } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function HomePage() {
  return (
    <div className="flex-1">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link
            href="/"
            aria-label="Back to landing page"
            className="flex items-center gap-3 rounded-md transition-opacity hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
              <Heart className="h-5 w-5 text-primary-foreground" fill="currentColor" />
            </div>
            <span className="text-xl font-semibold text-foreground">Heavenly Hands</span>
          </Link>
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

      {/* Preview Access */}
      <section className="border-b border-[oklch(0.78_0.13_75)] bg-[oklch(0.97_0.04_85)] py-10">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <Badge className="border-[oklch(0.45_0.11_70)] bg-[oklch(0.35_0.10_70)] text-white">
                Preview access
              </Badge>
              <h2 className="mt-4 text-2xl font-bold tracking-tight text-foreground">
                Explore the Platform
              </h2>
              <p className="mt-3 text-muted-foreground">
                Use these demo entry points to preview member and administrator workflows.
              </p>
            </div>
            <div className="grid flex-1 gap-4 sm:grid-cols-2">
              <Link href="/onboarding">
                <Card className="group cursor-pointer border-[oklch(0.78_0.13_75)] bg-white/80 shadow-sm transition-all hover:border-[oklch(0.55_0.12_180)] hover:bg-white hover:shadow-md">
                  <CardContent className="flex items-center gap-4 p-5">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[oklch(0.90_0.05_180)] transition-colors group-hover:bg-[oklch(0.84_0.08_180)]">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <CardTitle className="text-base">Member Preview</CardTitle>
                      <CardDescription className="mt-1">
                        Try onboarding and check-ins
                      </CardDescription>
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                  </CardContent>
                </Card>
              </Link>
              <Link href="/admin">
                <Card className="group cursor-pointer border-[oklch(0.78_0.13_75)] bg-white/80 shadow-sm transition-all hover:border-[oklch(0.55_0.12_180)] hover:bg-white hover:shadow-md">
                  <CardContent className="flex items-center gap-4 p-5">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[oklch(0.92_0.05_75)] transition-colors group-hover:bg-[oklch(0.86_0.08_75)]">
                      <Shield className="h-6 w-6 text-[oklch(0.45_0.11_70)]" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <CardTitle className="text-base">Admin Preview</CardTitle>
                      <CardDescription className="mt-1">
                        Review alerts and members
                      </CardDescription>
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Hero */}
      <section className="relative overflow-hidden py-20">
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

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <Link
              href="/"
              aria-label="Back to landing page"
              className="flex items-center gap-3 rounded-md transition-opacity hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Heart className="h-4 w-4 text-primary-foreground" fill="currentColor" />
              </div>
              <span className="font-semibold text-foreground">Heavenly Hands</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              A US-based charity supporting community health
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
