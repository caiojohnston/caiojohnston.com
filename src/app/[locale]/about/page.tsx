import Image from 'next/image'
import { PortableText } from 'next-sanity'
import { sanityFetch } from '@/lib/sanity/client'
import { aboutQuery } from '@/lib/sanity/queries'
import { urlFor } from '@/lib/sanity/image'
import { Locale } from '@/i18n/config'

export const dynamic = 'force-dynamic'

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const l = locale as Locale

  const about = await sanityFetch(aboutQuery)
  const data = about as {
    photo?: object
    headline?: { ptBR?: string; en?: string }
    body?: { ptBR?: import('@portabletext/types').TypedObject[]; en?: import('@portabletext/types').TypedObject[] }
  } | null

  const headline = data?.headline?.en
  const body = data?.body?.en

  return (
    <div className="max-w-3xl mx-auto px-6 py-20">
      <h1 className="font-serif text-4xl text-(--color-text) mb-10">
        {headline ?? 'About'}
      </h1>

      {data?.photo && (
        <div className="mb-10 rounded-lg overflow-hidden aspect-video">
          <Image
            src={urlFor(data.photo as Parameters<typeof urlFor>[0]).width(1200).height(675).url()}
            alt={headline ?? 'Caio Johnston'}
            width={1200}
            height={675}
            className="w-full h-full object-cover"
            priority
          />
        </div>
      )}

      {body && body.length > 0 && (
        <div className="prose prose-invert max-w-none">
          <PortableText
            value={body}
            components={{
              types: {
                image: ({ value }) => (
                  <figure className="my-8">
                    <Image
                      src={urlFor(value).width(1200).height(800).fit('max').url()}
                      alt={value.alt ?? ''}
                      width={1200}
                      height={800}
                      className="w-full rounded-lg object-contain"
                    />
                    {value.caption && (
                      <figcaption className="text-center text-sm text-(--color-text-muted) mt-2 font-sans not-italic">
                        {value.caption}
                      </figcaption>
                    )}
                  </figure>
                ),
              },
            }}
          />
        </div>
      )}
    </div>
  )
}
