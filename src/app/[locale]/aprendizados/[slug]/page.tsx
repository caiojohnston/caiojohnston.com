import { notFound } from 'next/navigation'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { PortableText } from 'next-sanity'
import { sanityFetch } from '@/lib/sanity/client'
import { guideBySlugQuery } from '@/lib/sanity/queries'
import type { SanityGuide } from '@/lib/sanity/types'
import { Locale } from '@/i18n/config'

export const dynamic = 'force-dynamic'

export default async function GuidePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  const l = locale as Locale
  const guide = await sanityFetch<SanityGuide>(guideBySlugQuery, { slug })

  if (!guide) notFound()

  const title = l === 'en' ? guide.title.en : guide.title.ptBR
  const excerpt = l === 'en' ? guide.excerpt?.en : guide.excerpt?.ptBR
  const body = l === 'en' ? guide.body?.en : guide.body?.ptBR
  const base = l === 'en' ? '/en' : ''

  return (
    <GuideDetail
      locale={l}
      base={base}
      category={guide.category}
      publishedAt={guide.publishedAt}
      title={title}
      excerpt={excerpt}
      body={body}
    />
  )
}

function GuideDetail({
  locale,
  base,
  category,
  publishedAt,
  title,
  excerpt,
  body,
}: {
  locale: Locale
  base: string
  category?: string
  publishedAt?: string
  title?: string
  excerpt?: string
  body?: import('@portabletext/types').TypedObject[]
}) {
  const t = useTranslations('guides')

  const date = publishedAt
    ? new Date(publishedAt).toLocaleDateString(locale === 'en' ? 'en-US' : 'pt-BR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <Link
        href={`${base}/${locale === 'en' ? 'learned' : 'aprendizados'}`}
        className="text-sm text-(--color-text-muted) hover:text-(--color-accent) transition-colors mb-8 inline-block"
      >
        {t('backToGuides')}
      </Link>

      <article>
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            {date && (
              <time className="text-xs font-mono text-(--color-text-muted)">{date}</time>
            )}
            {category && (
              <span className="text-xs font-mono text-(--color-accent) border border-(--color-accent)/30 px-2 py-0.5 rounded">
                {category}
              </span>
            )}
          </div>
          <h1 className="font-mono text-3xl text-(--color-text) leading-tight mb-4">{title}</h1>
          {excerpt && (
            <p className="text-lg text-(--color-text-muted) leading-relaxed">{excerpt}</p>
          )}
        </header>

        {body && body.length > 0 && (
          <div className="prose prose-invert max-w-none font-mono">
            <PortableText value={body} />
          </div>
        )}
      </article>
    </div>
  )
}
