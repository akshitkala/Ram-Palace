// BRP-FIX: B-3
import { redirect } from 'next/navigation'
export default function AdminLoginPage() {
  redirect('/brp-portal-login/login')
}
