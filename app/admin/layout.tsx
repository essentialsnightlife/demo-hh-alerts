import { Sidebar } from "@/components/sidebar"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar type="admin" userName="Jane Admin" />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  )
}
