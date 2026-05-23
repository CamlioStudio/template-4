import { defineQuery } from 'next-sanity'

export const getPageQuery = defineQuery(`*[_type == "page" && slug.current == $slug][0]{..., pageBuilder[]{...}}`)
export const settingsQuery = defineQuery(`*[_type == "settings"][0]{...}`)

export const getHomePageQuery = defineQuery(`
  *[_type == "page" && slug.current == "home"][0]{
    _id,
    _type,
    title,
    slug,
    "pageBuilder": pageBuilder[]{
      _type,
      cmsTitle,
      ...select(
        _type == "hero" => {
          eyebrow,
          headline,
          tagline,
          "image": image.asset->url,
        },
        _type == "cta" => {
          body,
          ctaText,
          ctaHref,
        },
        _type == "story" => {
          heading,
          body,
          "decorImage": decorImage.asset->url,
          "imageLeft": imageLeft.asset->url,
          "imageRightFull": imageRightFull.asset->url,
          "imageRightSmall": imageRightSmall.asset->url,
        },
        _type == "features" => {
          heading,
          "features": features[]{ title, body },
        },
        _type == "timeline" => {
          heading,
          description,
          promoText,
          targetDate,
          ctaText,
          ctaHref,
          videoUrl,
          "videoThumbnail": videoThumbnail.asset->url,
        },
        _type == "gallery" => {
          heading,
          subtitle,
          viewAllText,
          viewAllHref,
          "photos": photos[].asset->url,
        },
        _type == "rsvp" => {
          heading,
          subtitle,
        },
        _type == "quote" => {
          quote,
          "image": image.asset->url,
        },
        _type == "dresscode" => {
          headingSerif,
          headingScript,
          body,
          "photos": photos[].asset->url,
        },
        _type == "blog" => {
          heading,
          subtitle,
          "articles": articles[]{ label, "image": image.asset->url },
        },
        _type == "contactUs" => {
          eyebrow,
          title,
          subtitle,
          ceremonyTitle,
          ceremonyDate,
          ceremonyTime,
          ceremonyLocation,
          receptionTitle,
          receptionDate,
          receptionTime,
          receptionLocation,
        }
      )
    }
  }
`)

