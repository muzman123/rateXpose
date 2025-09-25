import '../styles/globals.css'
import type { ReactNode } from 'react'
import Head from 'next/head'
import { AuthProvider } from '../lib/AuthContext'

interface LayoutProps {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <html lang="en">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="RateXpose - Anonymous Canadian rate sharing platform for phone, internet, and utility plans. Find better deals and pricing transparency." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
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
