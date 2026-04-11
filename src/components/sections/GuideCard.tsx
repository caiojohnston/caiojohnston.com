import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { Locale } from '@/i18n/config'

interface Guide {
  _id: string
  title: { ptBR?: string; en?: string }
  slug: { current: string }
  publishedAt?: string
  excerpt?: { ptBR?: string; en?: string }
  category?: string
}

interface GuideCardProps {
  guide: Guide
  locale: Locale
}

export function GuideCard({ guide, locale }: GuideCardProps) {
  const t = useTranslations('guides')
  const title = locale === 'en' ? guide.title.en : guide.title.ptBR
  const excerpt = locale === 'en' ? guide.excerpt?.en : guide.excerpt?.ptBR
  const base = locale === 'en' ? '/en' : ''
  const guidePath = `${base}/${locale === 'en' ? 'learned' : 'aprendizados'}/${guide.slug.current}`

  const date = guide.publishedAt
    ? new Date(guide.publishedAt).toLocaleDateString(locale === 'en' ? 'en-US' : 'pt-BR', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : null

  return (
    <article className="group py-5 border-b border-(--color-border) last:border-0">
      <div className="flex items-baseline justify-between gap-4 mb-1">
        <Link href={guidePath}>
          <h3 className="font-mono text-base text-(--color-text) group-hover:text-(--color-accent) transition-colors">
            {title}
          </h3>
        </Link>
        <div className="shrink-0 flex items-center gap-3">
          {guide.category && (
            <span className="text-xs font-mono text-(--color-accent) border border-(--color-accent)/30 px-2 py-0.5 rounded">
              {guide.category}
            </span>
          )}
          {date && (
            <time className="text-xs font-mono text-(--color-text-muted)">{date}</time>
          )}
        </div>
      </div>
      {excerpt && (
        <p className="text-sm text-(--color-text-muted) leading-relaxed mb-3 line-clamp-2">
          {excerpt}
        </p>
      )}
      <Link
        href={guidePath}
        className="text-sm text-(--color-accent) hover:text-(--color-accent-hover) transition-colors"
      >
        {t('readMore')} →
      </Link>
    </article>
  )
}
