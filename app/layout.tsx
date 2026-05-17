// app/layout.tsx
import type { Metadata } from 'next'
import { Nunito, Playfair_Display } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
})

export const metadata: Metadata = {
  title: 'SunMall — Too Yummi Snacks',
  description: 'Crispy, teasty snacks delivered to your door. Shop Too Yummi Veggie Stix, Potato Chips and more.',
  keywords: 'chips, snacks, too yummi, veggie stix, Bangladesh',
  openGraph: {
    title: 'SunMall Snacks',
    description: 'Bangladesh\'s crunchiest snack store',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${nunito.variable} ${playfair.variable}`}>
      <body className="font-nunito bg-cream antialiased">
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              fontFamily: 'var(--font-nunito)',
              fontWeight: 700,
            },
          }}
        />
      </body>
    </html>
  )
}
