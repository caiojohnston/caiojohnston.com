import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { PortableText } from 'next-sanity'
import { sanityFetch } from '@/lib/sanity/client'
import { projectBySlugQuery } from '@/lib/sanity/queries'
import { urlFor } from '@/lib/sanity/image'
import type { SanityProject } from '@/lib/sanity/types'
import { Locale } from '@/i18n/config'

export const dynamic = 'force-dynamic'

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  const l = locale as Locale
  const project = await sanityFetch<SanityProject>(projectBySlugQuery, { slug })

  if (!project) notFound()

  const title = l === 'en' ? project.title.en : project.title.ptBR
  const description = l === 'en' ? project.description?.en : project.description?.ptBR
  const caseStudy = l === 'en' ? project.caseStudy?.en : project.caseStudy?.ptBR
  const base = l === 'en' ? '/en' : ''

  return (
    <ProjectDetail
      locale={l}
      base={base}
      image={project.image}
      tags={project.tags}
      url={project.url}
      title={title}
      description={description}
      caseStudy={caseStudy}
    />
  )
}

function ProjectDetail({
  locale,
  base,
  image,
  tags,
  url,
  title,
  description,
  caseStudy,
}: {
  locale: Locale
  base: string
  image?: object
  tags?: string[]
  url?: string
  title?: string
  description?: string
  caseStudy?: import('@portabletext/types').TypedObject[]
}) {
  const t = useTranslations('projects')

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <Link
        href={`${base}/${locale === 'en' ? 'work' : 'projetos'}`}
        className="text-sm text-(--color-text-muted) hover:text-(--color-accent) transition-colors mb-8 inline-block"
      >
        {t('backToProjects')}
      </Link>

      <h1 className="font-serif text-4xl text-(--color-text) mb-4">{title}</h1>

      {description && (
        <p className="text-lg text-(--color-text-muted) leading-relaxed mb-8">{description}</p>
      )}

      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-mono text-(--color-text-muted) bg-(--color-border) px-2 py-1 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {image && (
        <div className="aspect-video rounded-lg overflow-hidden mb-12 bg-(--color-border)">
          <Image
            src={urlFor(image).width(1200).height(675).url()}
            alt={title ?? ''}
            width={1200}
            height={675}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {caseStudy && caseStudy.length > 0 && (
        <div className="prose prose-invert max-w-none">
          <PortableText value={caseStudy} />
        </div>
      )}

      {url && (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 mt-10 px-5 py-2.5 bg-(--color-accent) text-(--color-bg) text-sm font-medium rounded hover:bg-(--color-accent-hover) transition-colors"
        >
          {t('viewProject')} ↗
        </a>
      )}
    </div>
  )
}
