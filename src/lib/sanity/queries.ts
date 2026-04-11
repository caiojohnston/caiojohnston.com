import { groq } from 'next-sanity'

export const heroQuery = groq`
  *[_type == "hero"][0] {
    tagline,
    bio,
    photo
  }
`

export const companiesQuery = groq`
  *[_type == "company"] | order(order asc) {
    _id,
    name,
    logo,
    order
  }
`

export const publishedProjectsQuery = groq`
  *[_type == "project" && status == "published"] | order(_createdAt desc) {
    _id,
    title,
    slug,
    description,
    tags,
    image,
    status,
    url
  }
`

export const inProgressProjectsQuery = groq`
  *[_type == "project" && status == "inProgress"] | order(_createdAt desc) {
    _id,
    title,
    slug,
    description,
    tags,
    image,
    status,
    url
  }
`

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    tags,
    image,
    status,
    url,
    caseStudy
  }
`

export const latestPostsQuery = groq`
  *[_type == "post"] | order(publishedAt desc)[0...6] {
    _id,
    title,
    slug,
    publishedAt,
    coverImage,
    excerpt
  }
`

export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    publishedAt,
    coverImage,
    excerpt,
    body
  }
`

export const latestGuidesQuery = groq`
  *[_type == "guide"] | order(publishedAt desc)[0...6] {
    _id,
    title,
    slug,
    publishedAt,
    coverImage,
    excerpt,
    category
  }
`

export const guideBySlugQuery = groq`
  *[_type == "guide" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    publishedAt,
    coverImage,
    excerpt,
    category,
    body
  }
`
