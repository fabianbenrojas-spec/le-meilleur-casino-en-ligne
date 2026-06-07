import Script from 'next/script'

const GTM_ID = process.env['NEXT_PUBLIC_GTM_ID']
const isPlaceholder = !GTM_ID || GTM_ID === 'GTM-XXXXXXX'

// Minified GTM loader (unchanged from Google's snippet)
const gtmLoader = (id: string) =>
  `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${id}');`

/**
 * GTM script tags — place in <head>.
 * Uses next/script with strategy="afterInteractive" so it fires after hydration
 * without blocking the critical render path.
 *
 * No dataLayer.push() calls here — GTM reads data-* attributes on DOM elements.
 */
export function GTMScript() {
  if (isPlaceholder) return null

  return (
    <>
      {/* Initialise dataLayer before GTM loads */}
      <Script
        id="gtm-dl-init"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: 'window.dataLayer=window.dataLayer||[];' }}
      />
      {/* GTM container */}
      <Script
        id="gtm"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: gtmLoader(GTM_ID!) }}
      />
    </>
  )
}

/**
 * GTM noscript fallback — place immediately after <body> opening tag.
 * Required for RGPD compliance (logs consent changes even without JS).
 */
export function GTMNoScript() {
  if (isPlaceholder) return null

  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: 'none', visibility: 'hidden' }}
        title="GTM noscript"
      />
    </noscript>
  )
}
