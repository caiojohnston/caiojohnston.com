import Image from 'next/image'
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
  const tagline = locale === 'en' ? data?.tagline?.en : data?.tagline?.ptBR
  const bio = locale === 'en' ? data?.bio?.en : data?.bio?.ptBR

  return (
    <section className="max-w-6xl mx-auto px-6 pt-20 pb-16">
      <div className="flex flex-col-reverse gap-10 md:grid md:grid-cols-[1fr_176px] md:items-stretch md:gap-10">
        <div>
          <h1 className="font-serif text-4xl md:text-5xl text-(--color-text) leading-tight mb-5">
            {tagline ?? 'Data Scientist & AI Consultant'}
          </h1>
          {bio && (
            <p className="text-lg text-(--color-text-muted) leading-relaxed max-w-[80%]">
              {bio}
            </p>
          )}
        </div>

        {data?.photo && (
          <div className="relative h-56 md:h-auto overflow-hidden rounded-sm">
            <Image
              src={urlFor(data.photo as Parameters<typeof urlFor>[0]).width(480).url()}
              alt="Caio Johnston"
              fill
              className="object-cover object-top"
              priority
            />
          </div>
        )}
      </div>
    </section>
  )
}
