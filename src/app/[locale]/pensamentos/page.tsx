import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { sanityFetch } from '@/lib/sanity/client'

export const dynamic = 'force-dynamic'
import { latestPostsQuery } from '@/lib/sanity/queries'
import { PostCard } from '@/components/sections/PostCard'
import { Locale } from '@/i18n/config'

export default async function PensamentosPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const l = locale as Locale
  const posts = await sanityFetch(latestPostsQuery)

  return <PostsPageContent locale={l} posts={(posts as Parameters<typeof PostCard>[0]['post'][]) ?? []} />
}

function PostsPageContent({
  locale,
  posts,
}: {
  locale: Locale
  posts: Parameters<typeof PostCard>[0]['post'][]
}) {
  const t = useTranslations('sections')
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="font-serif text-4xl text-(--color-text) mb-12">{t('thinking')}</h1>
      <div>
        {posts.map((post) => (
          <PostCard key={post._id} post={post} locale={locale} />
        ))}
      </div>
    </div>
  )
}
