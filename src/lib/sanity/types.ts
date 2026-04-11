import type { TypedObject } from '@portabletext/types'

export interface LocalizedString {
  ptBR?: string
  en?: string
}

export interface LocalizedText {
  ptBR?: string
  en?: string
}

export interface LocalizedBlocks {
  ptBR?: TypedObject[]
  en?: TypedObject[]
}

export interface SanityHero {
  tagline?: LocalizedString
  bio?: LocalizedText
  photo?: object
}

export interface SanityCompany {
  _id: string
  name: string
  logo?: object
  order?: number
}

export interface SanityProject {
  _id: string
  title: LocalizedString
  slug: { current: string }
  description?: LocalizedText
  tags?: string[]
  image?: object
  status: 'published' | 'inProgress'
  url?: string
  caseStudy?: LocalizedBlocks
}

export interface SanityPost {
  _id: string
  title: LocalizedString
  slug: { current: string }
  publishedAt?: string
  coverImage?: object
  excerpt?: LocalizedText
  body?: LocalizedBlocks
}

export interface SanityGuide {
  _id: string
  title: LocalizedString
  slug: { current: string }
  publishedAt?: string
  coverImage?: object
  excerpt?: LocalizedText
  category?: string
  body?: LocalizedBlocks
}
