import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { PortableText } from 'next-sanity'
import { sanityFetch } from '@/lib/sanity/client'
import { guideBySlugQuery } from '@/lib/sanity/queries'
import { urlFor } from '@/lib/sanity/image'
import { TerminalBlock } from '@/components/ui/TerminalBlock'
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
      coverImage={guide.coverImage}
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
  coverImage,
  body,
}: {
  locale: Locale
  base: string
  category?: string
  publishedAt?: string
  title?: string
  excerpt?: string
  coverImage?: object
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
          <h1 className="font-mono text-3xl text-(--color-text) leading-tight mb-6">{title}</h1>
          {coverImage && (
            <div className="mb-6 rounded-lg overflow-hidden aspect-video">
              <Image
                src={urlFor(coverImage as Parameters<typeof urlFor>[0]).width(1200).height(675).url()}
                alt={title ?? ''}
                width={1200}
                height={675}
                className="w-full h-full object-cover"
                priority
              />
            </div>
          )}
          {excerpt && (
            <p className="text-lg text-(--color-text-muted) leading-relaxed">{excerpt}</p>
          )}
        </header>

        {body && body.length > 0 && (
          <div className="prose prose-invert max-w-none font-mono">
            <PortableText
              value={body}
              components={{
                types: {
                  image: ({ value }) => (
                    <figure className="my-8">
                      <Image
                        src={urlFor(value).width(1200).height(800).fit('max').url()}
                        alt={value.alt ?? ''}
                        width={1200}
                        height={800}
                        className="w-full rounded-lg object-contain"
                      />
                      {value.caption && (
                        <figcaption className="text-center text-sm text-(--color-text-muted) mt-2 not-italic">
                          {value.caption}
                        </figcaption>
                      )}
                    </figure>
                  ),
                  code: ({ value }) => (
                    <TerminalBlock
                      code={value.code ?? ''}
                      language={value.language}
                      filename={value.filename}
                    />
                  ),
                },
              }}
            />
          </div>
        )}
      </article>
    </div>
  )
}
