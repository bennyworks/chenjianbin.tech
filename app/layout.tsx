import { Inter as FontSans } from 'next/font/google'
import localFont from 'next/font/local'

import '@/styles/globals.css'
import { siteConfig } from '@/config/site'
import { absoluteUrl, cn } from '@/lib/utils'
import { Toaster } from 'sonner'
import { TailwindIndicator } from '@/components/tailwind-indicator'
import { ThemeProvider } from '@/components/theme-provider'
import type { Viewport } from 'next'
import { SpeedInsights } from '@vercel/speed-insights/next'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

// Font files can be colocated inside of `pages`
const fontHeading = localFont({
  src: '../assets/fonts/CalSans-SemiBold.woff2',
  variable: '--font-heading',
})

interface RootLayoutProps {
  children: React.ReactNode
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export const metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: ['个人网站', '家庭管理', '日程管理', '照片管理'],
  authors: [
    {
      name: '陈剑彬',
      url: 'https://chenjianbin.tech',
    },
  ],
  creator: '陈剑彬',
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${siteConfig.url}/og.jpg`],
    creator: '@shadcn',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable,
          fontHeading.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <Toaster />
          <TailwindIndicator />
        </ThemeProvider>
        <SpeedInsights />
      </body>
    </html>
  )
}
