import '../styles/globals.css'
import type { ReactNode } from 'react'
import Head from 'next/head'
import { Inter } from 'next/font/google'
import { AuthProvider } from '../lib/AuthContext'

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

interface LayoutProps {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <html lang="en" className={inter.className}>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="RateXpose - Anonymous Canadian rate sharing platform for phone, internet, and utility plans. Find better deals and pricing transparency." />
        <title>RateXpose - Canadian Rate Transparency Platform</title>
      </Head>
      <body className="bg-gradient-dashboard min-h-screen">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}

export default Layout
