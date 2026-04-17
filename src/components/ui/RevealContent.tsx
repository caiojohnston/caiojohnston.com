'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'

export function RevealContent({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const t = useTranslations('common')

  return (
    <>
      {!open && (
        <Button
          onClick={() => setOpen(true)}
          variant="default"
          className="mt-10 rounded px-5 py-2.5 h-auto"
        >
          {t('showFullContent')}
        </Button>
      )}
      {open && <div className="mt-10">{children}</div>}
    </>
  )
}
