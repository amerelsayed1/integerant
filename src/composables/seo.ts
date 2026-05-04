import { onBeforeUnmount, watchEffect, type MaybeRefOrGetter, toValue } from 'vue'

const SITE_NAME = 'BunyanX'
const SITE_URL = 'https://bunyanx.com'
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.webp`

export interface SeoOptions {
  title?: MaybeRefOrGetter<string>
  description?: MaybeRefOrGetter<string>
  path?: MaybeRefOrGetter<string>
  image?: MaybeRefOrGetter<string>
  type?: MaybeRefOrGetter<'website' | 'article'>
  noindex?: MaybeRefOrGetter<boolean>
  jsonLd?: MaybeRefOrGetter<Record<string, unknown> | Array<Record<string, unknown>> | null>
}

const MANAGED_ATTR = 'data-managed-seo'

function setMeta(selector: string, attrName: 'name' | 'property', attrValue: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attrName, attrValue)
    el.setAttribute(MANAGED_ATTR, '')
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"][${MANAGED_ATTR}]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    el.setAttribute(MANAGED_ATTR, '')
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

function clearJsonLd(idPrefix: string) {
  document.head
    .querySelectorAll<HTMLScriptElement>(`script[data-seo-id^="${idPrefix}"]`)
    .forEach((node) => node.remove())
}

function setJsonLd(
  idPrefix: string,
  data: Record<string, unknown> | Array<Record<string, unknown>> | null
) {
  clearJsonLd(idPrefix)
  if (!data) return
  const blocks = Array.isArray(data) ? data : [data]
  blocks.forEach((block, i) => {
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.setAttribute('data-seo-id', `${idPrefix}-${i}`)
    script.text = JSON.stringify(block)
    document.head.appendChild(script)
  })
}

export function useSeo(options: SeoOptions) {
  watchEffect(() => {
    const title = toValue(options.title)
    const description = toValue(options.description)
    const path = toValue(options.path) ?? ''
    const image = toValue(options.image) ?? DEFAULT_OG_IMAGE
    const type = toValue(options.type) ?? 'website'
    const noindex = toValue(options.noindex) ?? false
    const jsonLd = toValue(options.jsonLd) ?? null

    const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} | Software Development Company in Egypt & GCC`
    const url = `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`.replace(/\/+$/, '') || SITE_URL + '/'

    document.title = fullTitle

    if (description) {
      setMeta('meta[name="description"]', 'name', 'description', description)
      setMeta('meta[property="og:description"]', 'property', 'og:description', description)
      setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description)
    }

    setMeta('meta[property="og:title"]', 'property', 'og:title', fullTitle)
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', fullTitle)
    setMeta('meta[property="og:url"]', 'property', 'og:url', url)
    setMeta('meta[property="og:type"]', 'property', 'og:type', type)
    setMeta('meta[property="og:image"]', 'property', 'og:image', image)
    setMeta('meta[name="twitter:image"]', 'name', 'twitter:image', image)
    setMeta(
      'meta[name="robots"]',
      'name',
      'robots',
      noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large'
    )

    setLink('canonical', url)
    setJsonLd('page-jsonld', jsonLd)
  })

  onBeforeUnmount(() => {
    clearJsonLd('page-jsonld')
  })
}
