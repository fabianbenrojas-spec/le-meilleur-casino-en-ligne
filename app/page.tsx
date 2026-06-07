// This route is handled by the next-intl middleware which rewrites / → /[locale]/
// It should never be reached in production. Safety redirect for direct access.
import { redirect } from 'next/navigation'

export default function RootPage() {
  redirect('/')
}
