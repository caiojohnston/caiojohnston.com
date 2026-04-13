import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { codeInput } from '@sanity/code-input'
import { schema } from './schema'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  title: 'caiojohnston.com',
  schema,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Conteúdo')
          .items([
            S.listItem()
              .title('Hero')
              .id('hero')
              .child(S.document().schemaType('hero').documentId('hero')),
            S.divider(),
            S.documentTypeListItem('company').title('Empresas'),
            S.documentTypeListItem('project').title('Projetos'),
            S.divider(),
            S.documentTypeListItem('post').title('Posts'),
            S.documentTypeListItem('guide').title('Aprendizados'),
          ]),
    }),
    visionTool(),
    codeInput(),
  ],
})
