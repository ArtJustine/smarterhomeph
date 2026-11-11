import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'
import { Toaster } from 'sonner'
import { SITE_NAME, SITE_URL, SERVICE_AREAS, SERVICE_CITIES } from '@/lib/site'

const display = localFont({
  src: [
    {
      path: '../node_modules/@fontsource/instrument-serif/files/instrument-serif-latin-400-normal.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../node_modules/@fontsource/instrument-serif/files/instrument-serif-latin-400-italic.woff2',
      weight: '400',
      style: 'italic',
    },
  ],
  variable: '--font-display',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Smart Home Installation in Pampanga, Tarlac & Bulacan',
    template: `%s | ${SITE_NAME}`,
  },
  description:
    'Smarter Home PH plans, supplies and installs smart lights, door locks, CCTV cameras and aircon control for homes in Pampanga, Tarlac and Bulacan. Price your setup online.',
  keywords: [
    'smart home Philippines',
    'smart home installation Pampanga',
    'smart home Tarlac',
    'smart home Bulacan',
    'smart lock Philippines',
    'Home Assistant installer Philippines',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Smart Home Installation in Pampanga, Tarlac & Bulacan',
    description:
      'Smart lights, locks, cameras and aircon control, planned and installed for homes in Central Luzon.',
    url: '/',
    siteName: SITE_NAME,
    locale: 'en_PH',
    type: 'website',
  },
  twitter: { card: 'summary' },
  robots: { index: true, follow: true },
}

const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: SITE_NAME,
  url: SITE_URL,
  description:
    'Smart home planning, supply and installation: lighting, door locks, cameras, aircon control and automation.',
  areaServed: [
    ...SERVICE_AREAS.map((name) => ({ '@type': 'AdministrativeArea', name: `${name}, Philippines` })),
    ...SERVICE_CITIES.flatMap((a) => a.cities.map((c) => ({ '@type': 'City', name: c }))),
  ],
  knowsAbout: ['Smart home installation', 'Home automation', 'Home Assistant', 'Smart locks', 'Security cameras'],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en-PH"
      className={`${GeistSans.variable} ${GeistMono.variable} ${display.variable}`}
    >
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  )
}
