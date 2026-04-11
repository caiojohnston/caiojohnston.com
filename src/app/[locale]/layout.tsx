import type { Metadata } from 'next'
import { Inter, Young_Serif } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import { Locale } from '@/i18n/config'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ThemeProvider } from '@/components/layout/ThemeProvider'
import '../globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const youngSerif = Young_Serif({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-young-serif',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    template: '%s | Caio Johnston',
    default: 'Caio Johnston — Data Scientist & AI Consultant',
  },
  description: 'Portfolio e site pessoal de Caio Johnston, Data Scientist e AI Consultant.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://caiojohnston.com'),
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!routing.locales.includes(locale as Locale)) {
    notFound()
  }

  const messages = await getMessages()

  return (
    <html
      lang={locale === 'pt' ? 'pt-BR' : locale}
      className={`${inter.variable} ${youngSerif.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col bg-(--color-bg) text-(--color-text) font-sans antialiased">
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
            <Navbar locale={locale as Locale} />
            <main className="flex-1">{children}</main>
            <Footer locale={locale as Locale} />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
