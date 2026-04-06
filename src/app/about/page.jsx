// BRP-FIX: B-3
export const metadata = {
  title: 'About Us | Basti Ram Palace',
  description: 'Learn about Basti Ram Palace — Gurugram\'s premier banquet hall in IMT Manesar.',
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
      <div className="text-center px-6">
        <p className="text-[#c9a96e] text-xs tracking-[0.2em] uppercase mb-4">Coming Soon</p>
        <h1 className="font-serif text-4xl text-[#f5f0e8] mb-6">Our Story</h1>
        <p className="text-[#a09880] max-w-md mx-auto">
          We are putting the finishing touches on this page.
          In the meantime, call us at{' '}
          <a href="tel:+918800190003" className="text-[#c9a96e] hover:underline">
            +91 88001 90003
          </a>
        </p>
      </div>
    </main>
  )
}
