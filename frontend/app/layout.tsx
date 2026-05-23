import type { Metadata } from 'next'
import { Instrument_Serif, Kapakana, Work_Sans } from 'next/font/google'
import { Layout } from '@/app/components/global/Layout'
import { getSiteSettings } from '@/sanity/lib/service'
import './globals.css'

const workSans = Work_Sans({
  subsets: ['latin'],
  variable: '--font-work-sans',
})

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-instrument-serif',
})

const kapakana = Kapakana({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-kapakana',
})

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings()
  return {
    title: settings?.siteTitle ?? 'Laila & Blaize',
    description: settings?.siteDescription ?? 'Wedding website contact page scaffold built with Camlio.',
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${workSans.variable} ${instrumentSerif.variable} ${kapakana.variable}`}>
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  )
}
