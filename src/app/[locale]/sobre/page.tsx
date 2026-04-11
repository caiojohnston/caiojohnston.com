import { useTranslations } from 'next-intl'

export default function SobrePage() {
  const t = useTranslations('about')
  return (
    <div className="max-w-3xl mx-auto px-6 py-20">
      <h1 className="font-serif text-4xl text-(--color-text) mb-8">{t('title')}</h1>
    </div>
  )
}
