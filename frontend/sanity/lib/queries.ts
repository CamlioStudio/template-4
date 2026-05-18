import { defineQuery } from 'next-sanity'

export const getPageQuery = defineQuery(`*[_type == "page" && slug.current == $slug][0]{..., pageBuilder[]{...}}`)
export const settingsQuery = defineQuery(`*[_type == "settings"][0]{...}`)
