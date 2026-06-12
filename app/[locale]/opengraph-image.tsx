import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const contentType = 'image/png'
export const size = { width: 1200, height: 630 }

export default async function OGImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const isFr = locale !== 'en'

  const tagline = isFr
    ? 'Comparateur indépendant · Avis vérifiés · 60+ casinos testés'
    : 'Independent comparison · Verified reviews · 60+ casinos tested'
  const name = 'le-meilleur-casino-en-ligne.fr'

  return new ImageResponse(
    <div
      style={{
        width: 1200,
        height: 630,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        background: '#111111',
        padding: '72px 80px',
        position: 'relative',
      }}
    >
      {/* Green accent bar */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: 8,
          background: '#0F6B3E',
        }}
      />

      {/* 18+ badge */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          marginBottom: 36,
        }}
      >
        <div
          style={{
            background: '#C8322B',
            color: '#ffffff',
            fontSize: 14,
            fontWeight: 700,
            fontFamily: 'monospace',
            padding: '4px 10px',
            borderRadius: 6,
            letterSpacing: '0.05em',
          }}
        >
          18+
        </div>
        <div
          style={{
            color: '#0F6B3E',
            fontSize: 13,
            fontFamily: 'monospace',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
          }}
        >
          {isFr ? 'JEUX RESPONSABLES' : 'RESPONSIBLE GAMBLING'}
        </div>
      </div>

      {/* Site name */}
      <div
        style={{
          fontSize: 52,
          fontWeight: 500,
          color: '#F5F4F0',
          fontFamily: 'Georgia, serif',
          lineHeight: 1.1,
          letterSpacing: '-0.02em',
          marginBottom: 24,
          maxWidth: 900,
        }}
      >
        {name}
      </div>

      {/* Tagline */}
      <div
        style={{
          fontSize: 22,
          color: '#888888',
          fontFamily: 'system-ui, sans-serif',
          letterSpacing: '0.01em',
          marginBottom: 48,
        }}
      >
        {tagline}
      </div>

      {/* Bottom rule + stats */}
      <div
        style={{
          display: 'flex',
          gap: 48,
          borderTop: '1px solid #2A2A2A',
          paddingTop: 28,
          width: '100%',
        }}
      >
        {[
          { n: '60+', label: isFr ? 'casinos testés' : 'casinos tested' },
          { n: '38', label: isFr ? "critères d'évaluation" : 'rating criteria' },
          { n: '9.4', label: isFr ? 'note moyenne' : 'avg top rating' },
        ].map(({ n, label }) => (
          <div key={n} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <span
              style={{ fontSize: 28, fontWeight: 700, color: '#0F6B3E', fontFamily: 'monospace' }}
            >
              {n}
            </span>
            <span style={{ fontSize: 14, color: '#666666', fontFamily: 'system-ui, sans-serif' }}>
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>,
    { ...size }
  )
}
