import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Operational Courage Index',
  description: 'A 24-question organizational diagnostic that measures where a lack of courage is creating drag on your operational effectiveness.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        {children}
      </body>
    </html>
  )
}
