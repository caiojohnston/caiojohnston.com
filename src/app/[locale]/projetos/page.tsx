import { useTranslations } from 'next-intl'
import { sanityFetch } from '@/lib/sanity/client'

export const dynamic = 'force-dynamic'
import { publishedProjectsQuery, inProgressProjectsQuery } from '@/lib/sanity/queries'
import { ProjectCard } from '@/components/sections/ProjectCard'
import { Locale } from '@/i18n/config'

export default async function ProjetosPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const l = locale as Locale

  const [published, inProgress] = await Promise.all([
    sanityFetch(publishedProjectsQuery),
    sanityFetch(inProgressProjectsQuery),
  ])

  return <ProjectsPageContent
    locale={l}
    published={(published as Parameters<typeof ProjectCard>[0]['project'][]) ?? []}
    inProgress={(inProgress as Parameters<typeof ProjectCard>[0]['project'][]) ?? []}
  />
}

function ProjectsPageContent({
  locale,
  published,
  inProgress,
}: {
  locale: Locale
  published: Parameters<typeof ProjectCard>[0]['project'][]
  inProgress: Parameters<typeof ProjectCard>[0]['project'][]
}) {
  const t = useTranslations('sections')
  const tp = useTranslations('projects')

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="font-serif text-4xl text-(--color-text) mb-12">{t('recentProjects')}</h1>

      {published.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {published.map((project) => (
            <ProjectCard key={project._id} project={project} locale={locale} />
          ))}
        </div>
      )}

      {inProgress.length > 0 && (
        <>
          <h2 className="font-serif text-2xl text-(--color-text) mb-8">{t('building')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {inProgress.map((project) => (
              <ProjectCard key={project._id} project={project} locale={locale} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
