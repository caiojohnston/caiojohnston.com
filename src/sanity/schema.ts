import { hero } from './schemaTypes/hero'
import { company } from './schemaTypes/company'
import { project } from './schemaTypes/project'
import { post } from './schemaTypes/post'
import { guide } from './schemaTypes/guide'

export const schema = {
  types: [hero, company, project, post, guide],
}
