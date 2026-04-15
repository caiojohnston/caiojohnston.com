'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { urlFor } from '@/lib/sanity/image'

interface Company {
  _id: string
  name: string
  logo?: object
  order?: number
}

interface CompanyStripProps {
  companies: Company[]
}

export function CompanyStrip({ companies }: CompanyStripProps) {
  const t = useTranslations('sections')
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  if (!companies.length) return null

  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <h2 className="font-serif text-base text-(--color-text) mb-8">
        {t('companies')}
      </h2>
      <div className="flex flex-wrap items-center justify-center gap-10">
        {companies.map((company) => {
          const isHovered = hoveredId === company._id
          const isOtherHovered = hoveredId !== null && !isHovered

          return (
            <div
              key={company._id}
              onMouseEnter={() => setHoveredId(company._id)}
              onMouseLeave={() => setHoveredId(null)}
              className={`transition-all duration-200 ease-out cursor-default ${
                isHovered
                  ? 'scale-110 opacity-100'
                  : isOtherHovered
                    ? 'opacity-30 blur-[2px]'
                    : 'opacity-50'
              }`}
            >
              {company.logo ? (
                <Image
                  src={urlFor(company.logo as Parameters<typeof urlFor>[0]).height(128).url()}
                  alt={company.name}
                  width={256}
                  height={64}
                  className={`object-contain transition-all duration-200 ${
                    isHovered ? '' : 'grayscale'
                  }`}
                  style={{ height: '64px' }}
                />
              ) : (
                <span className="text-sm font-mono text-(--color-text-muted)">{company.name}</span>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
