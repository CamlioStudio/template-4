import { defineQuery } from 'next-sanity'

export const getPageQuery = defineQuery(`
  *[_type == "page" && slug.current == $slug][0]{
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
          "highlights": highlights[]{ char, charIndex },
          tagline,
          "image": image.asset->url,
        },
        _type == "cta" => {
          body,
          ctaText,
          ctaHref,
          "backgroundImage": backgroundImage.asset->url,
        },
        _type == "story" => {
          heading,
          "highlights": highlights[]{ char, charIndex },
          body,
          "decorImage": decorImage.asset->url,
          "imageLeft": imageLeft.asset->url,
          "imageRightFull": imageRightFull.asset->url,
          "imageRightSmall": imageRightSmall.asset->url,
        },
        _type == "features" => {
          heading,
          "highlights": highlights[]{ char, charIndex },
          "features": features[]{ title, body },
        },
        _type == "timeline" => {
          heading,
          "highlights": highlights[]{ char, charIndex },
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
        },
        _type == "couple" => {
          heading,
          "highlights": highlights[]{ char, charIndex },
          "decorImage": decorImage.asset->url,
          "people": people[]{
            name,
            role,
            bio,
            "photo": photo.asset->url,
            socials[]{ platform, href },
          },
        },
        _type == "journey" => {
          "items": items[]{
            year,
            heading,
            body,
            "image": image.asset->url,
          },
        },
        _type == "bridesmaidsGroomsmen" => {
          heading,
          "highlights": highlights[]{ char, charIndex },
          description,
          "members": members[]{
            name,
            role,
            "photo": photo.asset->url,
          },
        },
        _type == "wishes" => {
          heading,
          "highlights": highlights[]{ char, charIndex },
          "quotes": quotes[]{ quote, author },
        }
      )
    }
  }
`)
export const settingsQuery = defineQuery(`*[_type == "settings"][0]{...}`)

export const siteHeaderQuery = defineQuery(
  `*[_type == "siteHeader" && _id == "siteHeader"][0]{ navLeft[]{ label, href }, navRight[]{ label, href }, rsvpLabel, rsvpHref }`
)

export const siteFooterQuery = defineQuery(
  `*[_type == "siteFooter" && _id == "siteFooter"][0]{ navItems[]{ label, href }, brandName, brandYear, facebookUrl, instagramUrl, xUrl, copyrightText }`
)

export const siteSettingsQuery = defineQuery(
  `*[_type == "siteSettings" && _id == "siteSettings"][0]{ siteTitle, siteDescription, coupleName }`
)

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
          "highlights": highlights[]{ char, charIndex },
          tagline,
          "image": image.asset->url,
        },
        _type == "cta" => {
          body,
          ctaText,
          ctaHref,
          "backgroundImage": backgroundImage.asset->url,
        },
        _type == "story" => {
          heading,
          "highlights": highlights[]{ char, charIndex },
          body,
          "decorImage": decorImage.asset->url,
          "imageLeft": imageLeft.asset->url,
          "imageRightFull": imageRightFull.asset->url,
          "imageRightSmall": imageRightSmall.asset->url,
        },
        _type == "features" => {
          heading,
          "highlights": highlights[]{ char, charIndex },
          "features": features[]{ title, body },
        },
        _type == "timeline" => {
          heading,
          "highlights": highlights[]{ char, charIndex },
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
        },
        _type == "couple" => {
          heading,
          "highlights": highlights[]{ char, charIndex },
          "decorImage": decorImage.asset->url,
          "people": people[]{
            name,
            role,
            bio,
            "photo": photo.asset->url,
            socials[]{ platform, href },
          },
        },
        _type == "journey" => {
          "items": items[]{
            year,
            heading,
            body,
            "image": image.asset->url,
          },
        },
        _type == "bridesmaidsGroomsmen" => {
          heading,
          "highlights": highlights[]{ char, charIndex },
          description,
          "members": members[]{
            name,
            role,
            "photo": photo.asset->url,
          },
        },
        _type == "wishes" => {
          heading,
          "highlights": highlights[]{ char, charIndex },
          "quotes": quotes[]{ quote, author },
        }
      )
    }
  }
`)

