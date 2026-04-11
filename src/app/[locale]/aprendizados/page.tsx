import { useTranslations } from 'next-intl'
import { sanityFetch } from '@/lib/sanity/client'

export const dynamic = 'force-dynamic'
import { latestGuidesQuery } from '@/lib/sanity/queries'
import { GuideCard } from '@/components/sections/GuideCard'
import { Locale } from '@/i18n/config'

export default async function AprendizadosPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const l = locale as Locale
  const guides = await sanityFetch(latestGuidesQuery)

  return <GuidesPageContent locale={l} guides={(guides as Parameters<typeof GuideCard>[0]['guide'][]) ?? []} />
}

function GuidesPageContent({
  locale,
  guides,
}: {
  locale: Locale
  guides: Parameters<typeof GuideCard>[0]['guide'][]
}) {
  const t = useTranslations('sections')
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="font-serif text-4xl text-(--color-text) mb-12">{t('learned')}</h1>
      <div>
        {guides.map((guide) => (
          <GuideCard key={guide._id} guide={guide} locale={locale} />
        ))}
      </div>
    </div>
  )
}
