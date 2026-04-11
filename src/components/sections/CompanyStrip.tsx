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

  if (!companies.length) return null

  return (
    <section className="max-w-5xl mx-auto px-6 py-12 border-t border-(--color-border)">
      <p className="text-xs font-mono text-(--color-text-muted) uppercase tracking-widest mb-8">
        {t('companies')}
      </p>
      <div className="flex flex-wrap items-center gap-8">
        {companies.map((company) => (
          <div key={company._id} className="opacity-50 hover:opacity-80 transition-opacity">
            {company.logo ? (
              <Image
                src={urlFor(company.logo as Parameters<typeof urlFor>[0]).height(40).url()}
                alt={company.name}
                width={120}
                height={40}
                className="h-8 w-auto object-contain grayscale"
              />
            ) : (
              <span className="text-sm font-mono text-(--color-text-muted)">{company.name}</span>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
