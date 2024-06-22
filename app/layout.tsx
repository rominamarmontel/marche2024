import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from './LanguageContext'
import { Toaster } from 'react-hot-toast'
import TypekitLoader from '@/app/TypekitLoader'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Sushi Marché | Sushi Gourmet',
  description:
    'Sushi Marche, Sushi Gourmet in Paris. Authetic Japanese Restaurant & Take Away Shop.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <body suppressHydrationWarning={true}>
        <LanguageProvider>
          <TypekitLoader />
          {children}
        </LanguageProvider>
        <Toaster />
      </body>
    </html>
  )
}
