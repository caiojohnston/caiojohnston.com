import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { sanityFetch } from '@/lib/sanity/client'

export const dynamic = 'force-dynamic'
import {
  heroQuery,
  companiesQuery,
  publishedProjectsQuery,
  inProgressProjectsQuery,
  latestPostsQuery,
  latestGuidesQuery,
} from '@/lib/sanity/queries'
import { Hero } from '@/components/sections/Hero'
import { CompanyStrip } from '@/components/sections/CompanyStrip'
import { ProjectCard } from '@/components/sections/ProjectCard'
import { PostCard } from '@/components/sections/PostCard'
import { GuideCard } from '@/components/sections/GuideCard'
import { Locale } from '@/i18n/config'

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const l = locale as Locale
  const base = l === 'en' ? '/en' : ''

  const [heroData, companies, publishedProjects, inProgressProjects, posts, guides] =
    await Promise.all([
      sanityFetch(heroQuery),
      sanityFetch(companiesQuery),
      sanityFetch(publishedProjectsQuery),
      sanityFetch(inProgressProjectsQuery),
      sanityFetch(latestPostsQuery),
      sanityFetch(latestGuidesQuery),
    ])

  return (
    <>
      <Hero data={heroData as Parameters<typeof Hero>[0]['data']} locale={l} />
      <CompanyStrip companies={(companies as Parameters<typeof CompanyStrip>[0]['companies']) ?? []} />
      <ProjectsSection
        locale={l}
        base={base}
        published={((publishedProjects as Parameters<typeof ProjectCard>[0]['project'][]) ?? []).slice(0, 3)}
        inProgress={((inProgressProjects as Parameters<typeof ProjectCard>[0]['project'][]) ?? []).slice(0, 3)}
      />
      <PostsSection locale={l} base={base} posts={(posts as Parameters<typeof PostCard>[0]['post'][]) ?? []} />
      <GuidesSection locale={l} base={base} guides={(guides as Parameters<typeof GuideCard>[0]['guide'][]) ?? []} />
    </>
  )
}

function ProjectsSection({
  locale,
  base,
  published,
  inProgress,
}: {
  locale: Locale
  base: string
  published: Parameters<typeof ProjectCard>[0]['project'][]
  inProgress: Parameters<typeof ProjectCard>[0]['project'][]
}) {
  const t = useTranslations('sections')
  const tp = useTranslations('projects')
  const allProjectsPath = `${base}/${locale === 'en' ? 'work' : 'projetos'}`

  return (
    <>
      {published.length > 0 && (
        <section className="max-w-5xl mx-auto px-6 py-12 border-t border-(--color-border)">
          <div className="flex items-center justify-between mb-8">
            <p className="text-xs font-mono text-(--color-text-muted) uppercase tracking-widest">
              {t('recentProjects')}
            </p>
            <Link
              href={allProjectsPath}
              className="text-sm text-(--color-accent) hover:text-(--color-accent-hover) transition-colors"
            >
              {tp('allProjects')} →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {published.map((project) => (
              <ProjectCard key={project._id} project={project} locale={locale} />
            ))}
          </div>
        </section>
      )}

      {inProgress.length > 0 && (
        <section className="max-w-5xl mx-auto px-6 py-12 border-t border-(--color-border)">
          <p className="text-xs font-mono text-(--color-text-muted) uppercase tracking-widest mb-8">
            {t('building')}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {inProgress.map((project) => (
              <ProjectCard key={project._id} project={project} locale={locale} />
            ))}
          </div>
        </section>
      )}
    </>
  )
}

function PostsSection({
  locale,
  base,
  posts,
}: {
  locale: Locale
  base: string
  posts: Parameters<typeof PostCard>[0]['post'][]
}) {
  const t = useTranslations('sections')
  const tb = useTranslations('blog')
  const allPostsPath = `${base}/${locale === 'en' ? 'thinking' : 'pensamentos'}`

  if (!posts.length) return null

  return (
    <section className="max-w-5xl mx-auto px-6 py-12 border-t border-(--color-border)">
      <div className="flex items-center justify-between mb-8">
        <p className="text-xs font-mono text-(--color-text-muted) uppercase tracking-widest">
          {t('thinking')}
        </p>
        <Link
          href={allPostsPath}
          className="text-sm text-(--color-accent) hover:text-(--color-accent-hover) transition-colors"
        >
          {tb('allPosts')} →
        </Link>
      </div>
      <div>
        {posts.map((post) => (
          <PostCard key={post._id} post={post} locale={locale} />
        ))}
      </div>
    </section>
  )
}

function GuidesSection({
  locale,
  base,
  guides,
}: {
  locale: Locale
  base: string
  guides: Parameters<typeof GuideCard>[0]['guide'][]
}) {
  const t = useTranslations('sections')
  const tg = useTranslations('guides')
  const allGuidesPath = `${base}/${locale === 'en' ? 'learned' : 'aprendizados'}`

  if (!guides.length) return null

  return (
    <section className="max-w-5xl mx-auto px-6 py-12 border-t border-(--color-border)">
      <div className="flex items-center justify-between mb-8">
        <p className="text-xs font-mono text-(--color-text-muted) uppercase tracking-widest">
          {t('learned')}
        </p>
        <Link
          href={allGuidesPath}
          className="text-sm text-(--color-accent) hover:text-(--color-accent-hover) transition-colors"
        >
          {tg('allGuides')} →
        </Link>
      </div>
      <div>
        {guides.map((guide) => (
          <GuideCard key={guide._id} guide={guide} locale={locale} />
        ))}
      </div>
    </section>
  )
}
