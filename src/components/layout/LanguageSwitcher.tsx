'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useLocale } from 'next-intl'
import { Locale, localeNames } from '@/i18n/config'

export function LanguageSwitcher() {
  const locale = useLocale() as Locale
  const router = useRouter()
  const pathname = usePathname()

  const otherLocale: Locale = locale === 'pt' ? 'en' : 'pt'

  const handleSwitch = () => {
    // Strip current locale prefix if present, then add the new one
    const stripped = pathname.replace(/^\/(en)(\/|$)/, '/')
    const next = otherLocale === 'en' ? `/en${stripped === '/' ? '' : stripped}` : stripped || '/'
    router.push(next)
  }

  return (
    <button
      onClick={handleSwitch}
      className="text-sm font-mono text-(--color-text-muted) hover:text-(--color-accent) transition-colors tracking-wide"
      aria-label={`Switch to ${localeNames[otherLocale]}`}
    >
      {localeNames[otherLocale]}
    </button>
  )
}
