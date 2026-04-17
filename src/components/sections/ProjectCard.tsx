import Link from 'next/link'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { urlFor } from '@/lib/sanity/image'
import { GuideThumbnail } from '@/components/ui/GuideThumbnail'
import { Badge } from '@/components/ui/badge'
import { Locale } from '@/i18n/config'

interface Project {
  _id: string
  title: { ptBR?: string; en?: string }
  slug: { current: string }
  description?: { ptBR?: string; en?: string }
  tags?: string[]
  image?: object
  status: 'published' | 'inProgress'
  url?: string
}

interface ProjectCardProps {
  project: Project
  locale: Locale
}

export function ProjectCard({ project, locale }: ProjectCardProps) {
  const t = useTranslations('projects')
  const title = locale === 'en' ? project.title.en : project.title.ptBR
  const description = locale === 'en' ? project.description?.en : project.description?.ptBR
  const base = locale === 'en' ? '/en' : ''
  const projectPath = `${base}/${locale === 'en' ? 'work' : 'projetos'}/${project.slug.current}`

  return (
    <article className="group border border-(--color-border) rounded-lg overflow-hidden hover:border-(--color-accent)/40 transition-colors">
      <Link href={projectPath} className="block">
        <div className="aspect-video bg-(--color-border) overflow-hidden">
          {project.image ? (
            <Image
              src={urlFor(project.image as Parameters<typeof urlFor>[0]).width(800).height(450).url()}
              alt={title ?? ''}
              width={800}
              height={450}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <GuideThumbnail title={project.title.en ?? project.title.ptBR ?? project._id} fill />
          )}
        </div>
      </Link>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-2">
          <Link href={projectPath}>
            <h3 className="font-serif text-lg text-(--color-text) group-hover:text-(--color-accent) transition-colors">
              {title}
            </h3>
          </Link>
          {project.status === 'inProgress' && (
            <Badge variant="outline" className="shrink-0 font-mono rounded border-(--color-accent)/30 text-(--color-accent)">
              {t('inProgress')}
            </Badge>
          )}
        </div>
        {description && (
          <p className="text-sm text-(--color-text-muted) leading-relaxed mb-4 line-clamp-2">
            {description}
          </p>
        )}
        {project.tags && project.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="font-mono rounded text-(--color-text-muted)"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
        <div className="flex items-center gap-4">
          <Link
            href={projectPath}
            className="text-sm text-(--color-accent) hover:text-(--color-accent-hover) transition-colors"
          >
            {t('caseStudy')} →
          </Link>
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-(--color-text-muted) hover:text-(--color-text) transition-colors"
            >
              {t('viewProject')} ↗
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
