import './globals.css'

// Root layout — passthrough to let app/[locale]/layout.tsx own html/body/lang.
// globals.css is imported here to ensure it's bundled for all routes.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children
}
