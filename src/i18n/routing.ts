import { defineRouting } from 'next-intl/routing'
import { locales, defaultLocale } from './config'

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: 'as-needed',
  pathnames: {
    '/': '/',
    '/sobre': { pt: '/sobre', en: '/about' },
    '/projetos': { pt: '/projetos', en: '/work' },
    '/projetos/[slug]': { pt: '/projetos/[slug]', en: '/work/[slug]' },
    '/pensamentos': { pt: '/pensamentos', en: '/thinking' },
    '/pensamentos/[slug]': { pt: '/pensamentos/[slug]', en: '/thinking/[slug]' },
    '/aprendizados': { pt: '/aprendizados', en: '/learned' },
    '/aprendizados/[slug]': { pt: '/aprendizados/[slug]', en: '/learned/[slug]' },
  },
})
