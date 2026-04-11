import { createClient, type QueryParams } from 'next-sanity'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const apiVersion = '2024-01-01'

const isConfigured = Boolean(projectId)

export const client = isConfigured
  ? createClient({ projectId: projectId!, dataset, apiVersion, useCdn: true })
  : null

export const previewClient = isConfigured
  ? createClient({
      projectId: projectId!,
      dataset,
      apiVersion,
      useCdn: false,
      token: process.env.SANITY_API_READ_TOKEN,
    })
  : null

export async function sanityFetch<T = unknown>(
  query: string,
  params?: QueryParams,
): Promise<T | null> {
  if (!client) return null
  if (params) {
    return client.fetch<T>(query, params)
  }
  return client.fetch<T>(query)
}
