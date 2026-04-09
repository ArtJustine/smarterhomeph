import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from 'sonner'

export const metadata: Metadata = {
  title: 'Zenith Smart Systems | Intelligent Living, Reimagined',
  description: 'Engineering the next generation of private, secure, and intuitive smart home environments.',
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

