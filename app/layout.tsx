import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { DemoBanner } from '@/components/demo-banner'
import './globals.css'

export const metadata: Metadata = {
  title: 'Heavenly Hands - Community Health Alert System',
  description: 'A community platform that helps organizations monitor and support members with critical health needs.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className="font-sans antialiased">
        <div className="flex min-h-screen flex-col bg-background">
          <DemoBanner />
          <div className="flex min-h-0 flex-1 flex-col">
            {children}
          </div>
        </div>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
