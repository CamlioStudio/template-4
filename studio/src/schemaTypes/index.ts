import { page } from './documents/page'
import { siteHeader } from './documents/header'
import { siteFooter } from './documents/footer'
import { siteSettings } from './documents/settings'
import { importSchemaTypes } from './importSchemaType'

export const schemaTypes = [page, siteHeader, siteFooter, siteSettings, ...importSchemaTypes]
