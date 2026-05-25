import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export function DemoBanner() {
  return (
    <div className="border-b border-[oklch(0.78_0.13_75)] bg-[oklch(0.94_0.08_80)] px-6 py-2.5 text-[oklch(0.28_0.06_70)]">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <Badge className="border-[oklch(0.45_0.11_70)] bg-[oklch(0.35_0.10_70)] text-white">
            Demo version
          </Badge>
          <p className="text-sm font-medium text-[oklch(0.28_0.06_70)]">
            This preview app is for demo purposes only and does not use real data.
          </p>
        </div>
        <Button
          asChild
          variant="outline"
          size="sm"
          className="w-fit gap-2 border-[oklch(0.58_0.12_75)] bg-white/80 text-[oklch(0.28_0.06_70)] hover:bg-white"
        >
          <Link href="/">
            <ArrowLeft className="h-4 w-4" />
            Back to landing page
          </Link>
        </Button>
      </div>
    </div>
  )
}
