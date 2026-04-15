import { hero } from './schemaTypes/hero'
import { about } from './schemaTypes/about'
import { company } from './schemaTypes/company'
import { project } from './schemaTypes/project'
import { post } from './schemaTypes/post'
import { guide } from './schemaTypes/guide'
import { terminalCode } from './schemaTypes/terminalCode'

export const schema = {
  types: [hero, about, company, project, post, guide, terminalCode],
}
