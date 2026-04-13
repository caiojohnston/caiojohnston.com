import { defineField, defineType } from 'sanity'

export const about = defineType({
  name: 'about',
  title: 'Sobre',
  type: 'document',
  fields: [
    defineField({
      name: 'photo',
      title: 'Foto',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'headline',
      title: 'Título da seção',
      type: 'object',
      fields: [
        { name: 'ptBR', type: 'string', title: 'Português (PT-BR)' },
        { name: 'en', type: 'string', title: 'English' },
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
  preview: {
    prepare: () => ({ title: 'Sobre' }),
  },
})
