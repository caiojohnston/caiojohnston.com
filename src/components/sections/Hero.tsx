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
      <div className="flex flex-col items-center text-center gap-10 md:grid md:grid-cols-[1fr_auto] md:items-stretch md:text-left md:gap-10">
        <div>
          <h1 className="font-serif text-4xl md:text-5xl text-(--color-text) leading-tight mb-5">
            {tagline ?? 'Place Holder'}
          </h1>
          {bio && (
            <p className="text-lg text-(--color-text-muted) leading-relaxed max-w-full md:max-w-[65%] mx-auto md:mx-0">
              {bio}
            </p>
          )}
        </div>

        {data?.photo && (
          <div className="relative w-44 aspect-square md:w-auto md:h-full overflow-hidden mx-auto md:mx-0">
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
