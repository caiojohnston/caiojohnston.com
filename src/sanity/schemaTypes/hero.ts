import { defineField, defineType } from 'sanity'

export const hero = defineType({
  name: 'hero',
  title: 'Hero',
  type: 'document',

  fields: [
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'object',
      fields: [
        { name: 'ptBR', type: 'string', title: 'Português (PT-BR)' },
        { name: 'en', type: 'string', title: 'English' },
      ],
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'object',
      fields: [
        { name: 'ptBR', type: 'text', title: 'Português (PT-BR)' },
        { name: 'en', type: 'text', title: 'English' },
      ],
    }),
    defineField({
      name: 'photo',
      title: 'Foto',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Hero' }),
  },
})
