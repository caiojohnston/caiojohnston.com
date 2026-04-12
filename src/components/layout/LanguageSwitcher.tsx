'use client'

import { useLocale } from 'next-intl'
import { useParams } from 'next/navigation'
import { useRouter, usePathname } from '@/i18n/navigation'
import { Locale, localeNames } from '@/i18n/config'

export function LanguageSwitcher() {
  const locale = useLocale() as Locale
  const router = useRouter()
  const pathname = usePathname() // path interno sem prefixo de locale, ex: '/', '/sobre'
  const params = useParams()

  const otherLocale: Locale = locale === 'pt' ? 'en' : 'pt'

  const handleSwitch = () => {
    // Persiste a escolha — next-intl lê NEXT_LOCALE antes do Accept-Language
    document.cookie = `NEXT_LOCALE=${otherLocale}; path=/; max-age=31536000; SameSite=Lax`
    // @ts-expect-error — pathname + params são dinâmicos; next-intl resolve corretamente em runtime
    router.replace({ pathname, params }, { locale: otherLocale })
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
