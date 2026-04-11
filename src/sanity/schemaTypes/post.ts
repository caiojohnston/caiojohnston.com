import { defineField, defineType } from 'sanity'

export const post = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'object',
      fields: [
        { name: 'ptBR', type: 'string', title: 'Português (PT-BR)' },
        { name: 'en', type: 'string', title: 'English' },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title.ptBR' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Publicado em',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Capa',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'excerpt',
      title: 'Resumo',
      type: 'object',
      fields: [
        { name: 'ptBR', type: 'text', title: 'Português (PT-BR)', rows: 3 },
        { name: 'en', type: 'text', title: 'English', rows: 3 },
      ],
    }),
    defineField({
      name: 'body',
      title: 'Conteúdo',
      type: 'object',
      fields: [
        {
          name: 'ptBR',
          type: 'array',
          title: 'Português (PT-BR)',
          of: [{ type: 'block' }, { type: 'image' }],
        },
        {
          name: 'en',
          type: 'array',
          title: 'English',
          of: [{ type: 'block' }, { type: 'image' }],
        },
      ],
    }),
  ],
  orderings: [
    {
      title: 'Mais recente',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
  preview: {
    select: { title: 'title.ptBR', media: 'coverImage', subtitle: 'publishedAt' },
  },
})
