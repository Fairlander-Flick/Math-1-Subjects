import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Math 1 Success Checklist',
  description: 'Track your math exam topics and resources',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <main className="min-h-screen p-4 md:p-8 max-w-5xl mx-auto flex flex-col justify-center items-center">
          {children}
        </main>
      </body>
    </html>
  )
}
