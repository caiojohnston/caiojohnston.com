import Link from 'next/link'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { urlFor } from '@/lib/sanity/image'
import { GuideThumbnail } from '@/components/ui/GuideThumbnail'
import { Locale } from '@/i18n/config'

interface Post {
  _id: string
  title: { ptBR?: string; en?: string }
  slug: { current: string }
  publishedAt?: string
  coverImage?: object
  excerpt?: { ptBR?: string; en?: string }
}

interface PostCardProps {
  post: Post
  locale: Locale
}

export function PostCard({ post, locale }: PostCardProps) {
  const t = useTranslations('blog')
  const title = locale === 'en' ? post.title.en : post.title.ptBR
  const excerpt = locale === 'en' ? post.excerpt?.en : post.excerpt?.ptBR
  const base = locale === 'en' ? '/en' : ''
  const postPath = `${base}/${locale === 'en' ? 'thinking' : 'pensamentos'}/${post.slug.current}`

  const date = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString(locale === 'en' ? 'en-US' : 'pt-BR', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : null

  return (
    <article className="group py-5 border-b border-(--color-border) last:border-0 flex gap-4">
      <Link href={postPath} className="shrink-0">
        <div className="w-16 h-16 rounded overflow-hidden bg-(--color-border)">
          {post.coverImage ? (
            <Image
              src={urlFor(post.coverImage as Parameters<typeof urlFor>[0]).width(128).height(128).url()}
              alt={title ?? ''}
              width={128}
              height={128}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <GuideThumbnail title={post.title.en ?? post.title.ptBR ?? post._id} size={64} />
          )}
        </div>
      </Link>
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline justify-between gap-4 mb-1">
          <Link href={postPath}>
            <h3 className="font-serif text-lg text-(--color-text) group-hover:text-(--color-accent) transition-colors">
              {title}
            </h3>
          </Link>
          {date && (
            <time className="shrink-0 text-xs font-mono text-(--color-text-muted)">{date}</time>
          )}
        </div>
        {excerpt && (
          <p className="text-sm text-(--color-text-muted) leading-relaxed mb-3 line-clamp-2">
            {excerpt}
          </p>
        )}
        <Link
          href={postPath}
          className="text-sm text-(--color-accent) hover:text-(--color-accent-hover) transition-colors"
        >
          {t('readMore')} →
        </Link>
      </div>
    </article>
  )
}
