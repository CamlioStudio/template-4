import type { Metadata } from 'next'
import { Instrument_Serif, Kapakana, Work_Sans } from 'next/font/google'
import { Layout } from '@/app/components/global/Layout'
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

export const metadata: Metadata = {
  title: 'Laila & Blaize',
  description: 'Wedding website contact page scaffold built with Camlio.',
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
