import Script from 'next/script'

const GTM_ID = process.env['NEXT_PUBLIC_GTM_ID']
const isPlaceholder = !GTM_ID || GTM_ID === 'GTM-XXXXXXX'

// Minified GTM loader (unchanged from Google's snippet)
const gtmLoader = (id: string) =>
  `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${id}');`

// GTM Consent Mode v2 initialisation.
// Must run BEFORE GTM loads so tags respect consent from the first page view.
// Reads mc-consent from localStorage to restore prior choice.
const consentInit = `
window.dataLayer=window.dataLayer||[];
function gtag(){dataLayer.push(arguments);}
gtag('consent','default',{
  analytics_storage:'denied',
  ad_storage:'denied',
  ad_user_data:'denied',
  ad_personalization:'denied',
  functionality_storage:'granted',
  security_storage:'granted',
  wait_for_update:300
});
try{
  var _c=JSON.parse(localStorage.getItem('mc-consent')||'{}');
  if(_c&&typeof _c.analytics==='boolean'){
    gtag('consent','update',{
      analytics_storage:_c.analytics?'granted':'denied',
      ad_storage:_c.marketing?'granted':'denied',
      ad_user_data:_c.marketing?'granted':'denied',
      ad_personalization:_c.marketing?'granted':'denied'
    });
  }
}catch(e){}
`.trim()

/**
 * GTM script tags — place in <head>.
 * 1. beforeInteractive: Consent Mode defaults + restore prior choice from localStorage
 * 2. afterInteractive: GTM container loads after hydration
 *
 * No analytics calls in code — GTM reads data-* attributes on DOM elements.
 */
export function GTMScript() {
  if (isPlaceholder) return null

  return (
    <>
      {/* Consent Mode v2 defaults — must precede GTM container */}
      <Script
        id="gtm-consent-init"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: consentInit }}
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
