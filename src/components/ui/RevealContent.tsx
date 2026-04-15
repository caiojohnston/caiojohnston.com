'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'

export function RevealContent({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const t = useTranslations('common')

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="mt-10 px-5 py-2.5 bg-(--color-accent) text-(--color-bg) text-sm font-medium rounded hover:bg-(--color-accent-hover) transition-colors"
        >
          {t('showFullContent')}
        </button>
      )}
      {open && <div className="mt-10">{children}</div>}
    </>
  )
}
