import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { PortableText } from 'next-sanity'
import { sanityFetch } from '@/lib/sanity/client'
import { postBySlugQuery } from '@/lib/sanity/queries'
import { urlFor } from '@/lib/sanity/image'
import { GuideThumbnail } from '@/components/ui/GuideThumbnail'
import { RevealContent } from '@/components/ui/RevealContent'
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
      thumbnailSeed={post.title.en ?? post.title.ptBR ?? slug}
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
  thumbnailSeed,
  excerpt,
  coverImage,
  body,
}: {
  locale: Locale
  base: string
  publishedAt?: string
  title?: string
  thumbnailSeed?: string
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
        className="text-sm text-(--color-text-muted) hover:text-(--color-accent) transition-colors mb-8 inline-block flex items-center gap-1"
      >
        <span className="flex items-center gap-1">
          <span aria-label="arrow" className="inline-block mr-1 text-base font-bold" style={{ fontFamily: 'sans-serif' }}>←</span>
          {t('backToBlog').substring(2)} {/* Remove os primeiros 2 caracteres '← ' */}
        </span>
      </Link>

      <article>
        <header className="mb-10">
          {date && (
            <time className="text-xs font-mono text-(--color-text-muted) block mb-4">{date}</time>
          )}
          <h1 className="font-serif text-4xl text-(--color-text) leading-tight mb-6">{title}</h1>
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <div className="relative shrink-0 w-full sm:w-48 aspect-square rounded-lg overflow-hidden bg-(--color-border) border border-(--color-border)">
              {coverImage ? (
                <Image
                  src={urlFor(coverImage as Parameters<typeof urlFor>[0]).width(384).height(384).url()}
                  alt={title ?? ''}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <GuideThumbnail title={thumbnailSeed ?? title ?? ''} fill />
              )}
            </div>
            {excerpt && (
              <p className="text-lg text-(--color-text-muted) leading-relaxed">{excerpt}</p>
            )}
          </div>
        </header>

        {body && body.length > 0 && (
          <RevealContent>
          <div className="prose max-w-none font-bitter">
            <PortableText
              value={body}
              components={{
                types: {
                  image: ({ value }) => (
                    <figure className="my-8">
                      <Image
                        src={urlFor(value).width(1200).url()}
                        alt={value.alt ?? ''}
                        width={1200}
                        height={800}
                        className="w-full h-auto rounded-lg"
                      />
                      {value.caption && (
                        <figcaption className="text-center text-sm text-(--color-text-muted) mt-2 font-sans not-italic">
                          {value.caption}
                        </figcaption>
                      )}
                    </figure>
                  ),
                },
                marks: {
                  link: ({ value, children }) => (
                    <a
                      href={value?.href}
                      target={value?.blank ? '_blank' : undefined}
                      rel={value?.blank ? 'noopener noreferrer' : undefined}
                      className="underline underline-offset-2 hover:opacity-70 transition-opacity"
                    >
                      {children}
                    </a>
                  ),
                },
              }}
            />
          </div>
          </RevealContent>
        )}
      </article>
    </div>
  )
}
