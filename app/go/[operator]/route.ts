import { type NextRequest, NextResponse } from 'next/server'

import { operatorBySlug } from '@/config/operators'

// Affiliation interstitial — fires GA4 via dataLayer before redirecting.
// Page is noindex, no-store, serves HTML with short JS delay then location.replace().
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ operator: string }> }
) {
  const { operator: slug } = await params
  const op = operatorBySlug.get(slug)

  if (!op) {
    return new NextResponse('Casino non trouvé', { status: 404 })
  }

  // Real affiliate URL (from config — placeholder in dev)
  // In production, replace with real partner tracking links
  const dest = op.affiliateUrl.startsWith('/go/')
    ? `https://example.com/?ref=${slug}&utm_source=lmcel&utm_medium=affiliate&utm_campaign=${slug}`
    : op.affiliateUrl

  const html = `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<meta http-equiv="refresh" content="0;url=${dest}">
<title>Redirection — ${op.name}</title>
<style>
  body{font-family:-apple-system,sans-serif;display:flex;align-items:center;justify-content:center;
    min-height:100vh;margin:0;background:#FAFBFC;color:#3E424A}
  .box{text-align:center;padding:40px 24px}
  .name{font-size:18px;font-weight:700;color:#0B0D0F;margin-bottom:6px}
  .sub{font-size:14px;opacity:.7}
</style>
</head>
<body>
<div class="box">
  <div class="name">${op.name}</div>
  <div class="sub">Redirection en cours…</div>
</div>
<script>
(function(){
  // Push affiliate_click to dataLayer — GTM picks this up before redirect
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'affiliate_click',
    operator: '${op.slug}',
    operator_name: '${op.name}',
    placement: 'go_redirect',
    destination: '${dest}'
  });
  setTimeout(function(){ window.location.replace('${dest}'); }, 200);
})();
</script>
</body>
</html>`

  return new NextResponse(html, {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'X-Robots-Tag': 'noindex, nofollow',
      'Cache-Control': 'no-store, no-cache, must-revalidate',
    },
  })
}
