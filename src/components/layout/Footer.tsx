import { useTranslations } from 'next-intl'
import { Locale } from '@/i18n/config'

interface FooterProps {
  locale: Locale
}

function PrismLogo() {
  return (
    <svg
      width="28"
      height="24"
      viewBox="-40 -40 1154 1010"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      <path
        d="M541.266 17.5L1060.88 917.5L1065.21 925H8.66016L12.9902 917.5L532.605 17.5L536.936 10L541.266 17.5Z"
        stroke="currentColor"
        strokeWidth="80"
      />
    </svg>
  )
}

export function Footer({ locale: _locale }: FooterProps) {
  const t = useTranslations('footer')

  return (
    <footer className="border-t border-(--color-border) mt-24">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-(--color-text-muted)">
          <PrismLogo />
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
