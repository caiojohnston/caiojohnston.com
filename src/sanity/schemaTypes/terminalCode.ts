import { defineField, defineType } from 'sanity'

export const terminalCode = defineType({
  name: 'terminalCode',
  title: 'Bloco de Terminal',
  type: 'object',
  fields: [
    defineField({
      name: 'style',
      title: 'Estilo',
      type: 'string',
      options: {
        list: [
          { title: 'macOS', value: 'mac' },
          { title: 'Windows', value: 'win' },
          { title: 'Sem borda', value: 'plain' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'mac',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Título da janela',
      type: 'string',
      description: 'Ex: script.py, terminal, PowerShell',
    }),
    defineField({
      name: 'language',
      title: 'Linguagem',
      type: 'string',
      options: {
        list: [
          { title: 'Bash / Shell', value: 'bash' },
          { title: 'PowerShell', value: 'powershell' },
          { title: 'Python', value: 'python' },
          { title: 'JavaScript', value: 'javascript' },
          { title: 'TypeScript', value: 'typescript' },
          { title: 'SQL', value: 'sql' },
          { title: 'JSON', value: 'json' },
          { title: 'YAML', value: 'yaml' },
          { title: 'Texto', value: 'text' },
        ],
      },
    }),
    defineField({
      name: 'code',
      title: 'Código',
      type: 'text',
      rows: 8,
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'style', code: 'code' },
    prepare: ({ title, subtitle, code }) => ({
      title: title || (code as string)?.split('\n')[0]?.slice(0, 40) || 'Bloco de Terminal',
      subtitle: subtitle,
    }),
  },
})
