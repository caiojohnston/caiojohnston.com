import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Locale } from '@/i18n/config'

interface FooterProps {
  locale: Locale
}

function EntangleLogo() {
  return (
    <Image
      src="/entangle.svg"
      alt="Entangle logo"
      width={120}
      height={20}
      className="shrink-0 opacity-70"
    />
  )
}

export function Footer({ locale: _locale }: FooterProps) {
  const t = useTranslations('footer')

  return (
    <footer className="border-t border-(--color-border) mt-24">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-(--color-text-muted)">
          <EntangleLogo />
          <p className="text-sm">
            © {new Date().getFullYear()} Caio Johnston. {t('rights')}
          </p>
        </div>
        <div className="flex items-center gap-5">
          <a
            href="https://www.linkedin.com/in/caio-johnston/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-(--color-text-muted) hover:text-(--color-accent) transition-colors"
          >
            {t('linkedin')}
          </a>
          <a
            href="https://github.com/caiojohnston"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-(--color-text-muted) hover:text-(--color-accent) transition-colors"
          >
            {t('github')}
          </a>
        </div>
      </div>
    </footer>
  )
}
