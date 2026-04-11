import { getRequestConfig } from 'next-intl/server'
import { routing } from './routing'
import { Locale } from './config'

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale

  if (!locale || !routing.locales.includes(locale as Locale)) {
    locale = routing.defaultLocale
  }

  const messageLocale = locale === 'pt' ? 'pt-BR' : locale

  return {
    locale,
    messages: (await import(`./locales/${messageLocale}.json`)).default,
  }
})
