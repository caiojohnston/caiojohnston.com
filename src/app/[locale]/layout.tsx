import type { Metadata } from 'next'
import { Noto_Sans, Source_Sans_3, Bitter } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import { Locale } from '@/i18n/config'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ThemeProvider } from '@/components/layout/ThemeProvider'
import '../globals.css'

const notoSans = Noto_Sans({
  subsets: ['latin'],
  weight: '700',
  variable: '--font-noto-sans',
  display: 'swap',
})

const sourceSans3 = Source_Sans_3({
  subsets: ['latin'],
  variable: '--font-source-sans-3',
  display: 'swap',
})

const bitter = Bitter({
  subsets: ['latin'],
  variable: '--font-bitter-var',
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
      className={`${notoSans.variable} ${sourceSans3.variable} ${bitter.variable}`}
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
