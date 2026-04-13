import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { PortableText } from 'next-sanity'
import { sanityFetch } from '@/lib/sanity/client'
import { postBySlugQuery } from '@/lib/sanity/queries'
import { urlFor } from '@/lib/sanity/image'
import type { SanityPost } from '@/lib/sanity/types'
import { Locale } from '@/i18n/config'

export const dynamic = 'force-dynamic'

export default async function PostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  const l = locale as Locale
  const post = await sanityFetch<SanityPost>(postBySlugQuery, { slug })

  if (!post) notFound()

  const title = l === 'en' ? post.title.en : post.title.ptBR
  const excerpt = l === 'en' ? post.excerpt?.en : post.excerpt?.ptBR
  const body = l === 'en' ? post.body?.en : post.body?.ptBR
  const base = l === 'en' ? '/en' : ''

  return (
    <PostDetail
      locale={l}
      base={base}
      publishedAt={post.publishedAt}
      title={title}
      excerpt={excerpt}
      coverImage={post.coverImage}
      body={body}
    />
  )
}

function PostDetail({
  locale,
  base,
  publishedAt,
  title,
  excerpt,
  coverImage,
  body,
}: {
  locale: Locale
  base: string
  publishedAt?: string
  title?: string
  excerpt?: string
  coverImage?: object
  body?: import('@portabletext/types').TypedObject[]
}) {
  const t = useTranslations('blog')

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
        href={`${base}/${locale === 'en' ? 'thinking' : 'pensamentos'}`}
        className="text-sm text-(--color-text-muted) hover:text-(--color-accent) transition-colors mb-8 inline-block"
      >
        {t('backToBlog')}
      </Link>

      <article>
        <header className="mb-10">
          {date && (
            <time className="text-xs font-mono text-(--color-text-muted) block mb-4">{date}</time>
          )}
          <h1 className="font-serif text-4xl text-(--color-text) leading-tight mb-6">{title}</h1>
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
          <div className="prose prose-invert max-w-none font-bitter">
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
                        <figcaption className="text-center text-sm text-(--color-text-muted) mt-2 font-sans not-italic">
                          {value.caption}
                        </figcaption>
                      )}
                    </figure>
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
