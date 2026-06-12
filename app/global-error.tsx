'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="fr">
      <body
        style={{
          fontFamily: 'system-ui, sans-serif',
          background: '#F5F4F0',
          color: '#1A1A1A',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          padding: '2rem',
          textAlign: 'center',
          margin: 0,
        }}
      >
        <div
          style={{
            background: '#C8322B',
            color: '#fff',
            fontFamily: 'monospace',
            fontSize: '11px',
            fontWeight: 700,
            padding: '3px 9px',
            borderRadius: '5px',
            letterSpacing: '0.05em',
            marginBottom: '20px',
          }}
        >
          ERREUR
        </div>
        <h1 style={{ fontSize: '28px', fontWeight: 500, marginBottom: '12px' }}>
          Une erreur est survenue
        </h1>
        <p style={{ fontSize: '16px', color: '#666', marginBottom: '28px', maxWidth: '44ch' }}>
          {"Une erreur inattendue s'est produite. Veuillez réessayer ou revenir à l'accueil."}
        </p>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <button
            onClick={reset}
            style={{
              background: '#0F6B3E',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              padding: '12px 22px',
              fontSize: '15px',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            Réessayer
          </button>
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a
            href="/"
            style={{
              border: '1.5px solid #0F6B3E',
              color: '#0F6B3E',
              borderRadius: '6px',
              padding: '12px 22px',
              fontSize: '15px',
              fontWeight: 700,
              textDecoration: 'none',
            }}
          >
            {"Retour à l'accueil"}
          </a>
        </div>
        {error.digest && (
          <p
            style={{ marginTop: '24px', fontSize: '11px', color: '#999', fontFamily: 'monospace' }}
          >
            ref: {error.digest}
          </p>
        )}
      </body>
    </html>
  )
}
