import { Sidebar } from "@/components/sidebar"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-0 flex-1 bg-background">
      <Sidebar type="admin" userName="Jane Admin" />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  )
}
