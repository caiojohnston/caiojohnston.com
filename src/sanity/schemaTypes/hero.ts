import { defineField, defineType } from 'sanity'

export const hero = defineType({
  name: 'hero',
  title: 'Hero',
  type: 'document',
  // Singleton: impede criação de novos documentos via botão "+"
  // O documento correto é sempre acessado pela sidebar com documentId fixo 'hero'
  // @ts-expect-error — __experimental_actions é uma API interna do Sanity Studio
  __experimental_actions: ['update', 'publish', 'delete'],

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
