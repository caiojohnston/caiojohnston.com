import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { urlFor } from '@/lib/sanity/image'
import { Locale } from '@/i18n/config'

interface HeroData {
  tagline?: { ptBR?: string; en?: string }
  bio?: { ptBR?: string; en?: string }
  photo?: object
}

interface HeroProps {
  data: HeroData | null
  locale: Locale
}

export function Hero({ data, locale }: HeroProps) {
  const t = useTranslations('hero')
  const tNav = useTranslations('nav')

  const tagline = locale === 'en' ? data?.tagline?.en : data?.tagline?.ptBR
  const bio = locale === 'en' ? data?.bio?.en : data?.bio?.ptBR
  const base = locale === 'en' ? '/en' : ''

  return (
    <section className="max-w-5xl mx-auto px-6 pt-20 pb-16">
      <div className="flex flex-col-reverse md:flex-row md:items-start md:justify-between gap-10">
        <div className="flex-1 max-w-2xl">
          <h1 className="font-serif text-4xl md:text-5xl text-(--color-text) leading-tight mb-5">
            {tagline ?? 'Data Scientist & AI Consultant'}
          </h1>
          {bio && (
            <p className="text-lg text-(--color-text-muted) leading-relaxed mb-8">
              {bio}
            </p>
          )}
          <div className="flex items-center gap-4">
            <Link
              href={`${base}/${locale === 'en' ? 'work' : 'projetos'}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-(--color-accent) text-[#111111] text-sm font-medium rounded hover:bg-(--color-accent-hover) transition-colors"
            >
              {t('cta')}
            </Link>
            <a
              href="https://linkedin.com/in/caiojohnston"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-(--color-text-muted) hover:text-(--color-accent) transition-colors"
            >
              {t('contact')} ↗
            </a>
          </div>
        </div>

        {data?.photo && (
          <div className="shrink-0">
            <div className="w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden ring-1 ring-(--color-border)">
              <Image
                src={urlFor(data.photo as Parameters<typeof urlFor>[0]).width(288).height(288).url()}
                alt="Caio Johnston"
                width={144}
                height={144}
                className="object-cover w-full h-full"
                priority
              />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
