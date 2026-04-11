import { defineField, defineType } from 'sanity'

export const project = defineType({
  name: 'project',
  title: 'Projeto',
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
      name: 'description',
      title: 'Descrição',
      type: 'object',
      fields: [
        { name: 'ptBR', type: 'text', title: 'Português (PT-BR)' },
        { name: 'en', type: 'text', title: 'English' },
      ],
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'image',
      title: 'Imagem',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Publicado', value: 'published' },
          { title: 'Em construção', value: 'inProgress' },
        ],
        layout: 'radio',
      },
      initialValue: 'published',
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
    }),
    defineField({
      name: 'caseStudy',
      title: 'Case Study',
      type: 'object',
      fields: [
        {
          name: 'ptBR',
          type: 'array',
          title: 'Português (PT-BR)',
          of: [{ type: 'block' }],
        },
        {
          name: 'en',
          type: 'array',
          title: 'English',
          of: [{ type: 'block' }],
        },
      ],
    }),
  ],
  preview: {
    select: { title: 'title.ptBR', media: 'image', subtitle: 'status' },
  },
})
