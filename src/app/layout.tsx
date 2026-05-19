import type { Metadata } from 'next'
import { Toaster } from 'react-hot-toast'
import '../../styles/globals.css'

export const metadata: Metadata = {
  title: 'SunMall — Too Yummi Chips',
  description: 'Premium artisanal chips and veggie stix. Crispy, bold, and irresistible.',
  keywords: ['chips', 'snacks', 'veggie stix', 'potato chips', 'too yummi'],
  openGraph: {
    title: 'SunMall — Too Yummi Chips',
    description: 'Premium artisanal chips and veggie stix.',
    images: ['/images/sour-cream.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: '#1A1A1A',
              color: '#fff',
              borderRadius: '50px',
              padding: '12px 20px',
              fontFamily: 'Nunito, sans-serif',
              fontWeight: 700,
            },
          }}
        />
      </body>
    </html>
  )
}
