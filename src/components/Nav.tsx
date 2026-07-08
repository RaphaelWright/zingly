import { useState, useEffect } from 'react'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-5 px-4">
      <nav
        className="flex items-center gap-8 px-6 py-3 transition-all duration-300"
        style={{
          backgroundColor: scrolled ? 'rgba(247,247,247,0.92)' : 'rgba(255,255,255,0.7)',
          backdropFilter: 'blur(12px)',
          borderRadius: '9999px',
          border: '1px solid rgba(0,0,0,0.08)',
          boxShadow: scrolled ? '0 4px 24px rgba(0,0,0,0.08)' : '0 2px 12px rgba(0,0,0,0.04)',
        }}
      >
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 mr-2">
          <span
            className="w-7 h-7 flex items-center justify-center rounded-full text-xs font-semibold text-white"
            style={{ backgroundColor: '#111111', fontFamily: 'var(--font-display)' }}
          >
            Z
          </span>
          <span
            className="text-sm font-semibold tracking-tight"
            style={{ color: '#111111', fontFamily: 'var(--font-sans)' }}
          >
            Zingly
          </span>
        </a>

        {/* Links */}
        {['Home', 'Explore', 'About', 'Contact'].map((link) => (
          <a
            key={link}
            href="#"
            className="text-sm font-medium transition-colors duration-200 hidden md:block"
            style={{ color: '#555555' }}
            onMouseEnter={(e) => ((e.target as HTMLElement).style.color = '#800080')}
            onMouseLeave={(e) => ((e.target as HTMLElement).style.color = '#555555')}
          >
            {link}
          </a>
        ))}

        {/* CTA */}
        <a
          href="#download"
          className="text-sm font-medium px-5 py-2 transition-all duration-200"
          style={{
            backgroundColor: '#111111',
            color: '#FFFFFF',
            borderRadius: '9999px',
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget
            el.style.backgroundColor = '#800080'
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget
            el.style.backgroundColor = '#111111'
          }}
        >
          Download App
        </a>
      </nav>
    </header>
  )
}
