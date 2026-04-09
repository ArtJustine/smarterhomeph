import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from 'sonner'

export const metadata: Metadata = {
  title: 'Smarter Home PH | Intelligent Living, Reimagined',
  description: 'Premium smart home solutions and automation systems in the Philippines.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased selection:bg-primary selection:text-primary-foreground">
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  )
}

