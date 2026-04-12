import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { Locale } from '@/i18n/config'
import { LanguageSwitcher } from './LanguageSwitcher'
import { ThemeToggle } from './ThemeToggle'

interface NavbarProps {
  locale: Locale
}

export function Navbar({ locale }: NavbarProps) {
  const t = useTranslations('nav')

  const base = locale === 'en' ? '/en' : ''

  const links = [
    { href: `${base}/`, label: t('home') },
    { href: `${base}/${locale === 'en' ? 'about' : 'sobre'}`, label: t('about') },
    { href: `${base}/${locale === 'en' ? 'work' : 'projetos'}`, label: t('projects') },
    { href: `${base}/${locale === 'en' ? 'thinking' : 'pensamentos'}`, label: t('blog') },
    { href: `${base}/${locale === 'en' ? 'learned' : 'aprendizados'}`, label: t('guides') },
  ]

  return (
    <header className="sticky top-0 z-50 border-b border-(--color-border) bg-(--color-bg)/80 backdrop-blur-sm">
      <nav className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link
          href={base || '/'}
          className="font-serif text-base text-(--color-text) hover:text-(--color-accent) transition-colors"
        >
          Caio Johnston
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {links.slice(1).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-(--color-text-muted) hover:text-(--color-text) transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </nav>
    </header>
  )
}
