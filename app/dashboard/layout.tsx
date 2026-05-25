import { Sidebar } from "@/components/sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-0 flex-1 bg-background">
      <Sidebar type="member" userName="Eleanor Thompson" />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  )
}
