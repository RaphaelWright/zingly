const navLinks = ['Home', 'Explore', 'About', 'Contact', 'Privacy', 'Terms']

const socialLinks = [
  {
    label: 'Instagram',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    label: 'Twitter / X',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    label: 'Facebook',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
]

export default function Footer() {
  return (
    <footer className="px-6 pb-8">
      <div className="max-w-6xl mx-auto">
        <div
          className="relative overflow-hidden"
          style={{
            backgroundColor: '#111111',
            borderRadius: '32px',
            padding: 'clamp(2.5rem, 4vw, 4rem)',
          }}
        >
          {/* Top row */}
          <div className="flex flex-col md:flex-row justify-between gap-10 mb-12">
            {/* Brand */}
            <div className="max-w-xs">
              <div className="flex items-center gap-2.5 mb-4">
                <div
                  className="w-9 h-9 flex items-center justify-center rounded-full"
                  style={{ backgroundColor: '#FFFFFF' }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontStyle: 'italic',
                      color: '#111111',
                      fontSize: '1.1rem',
                      fontWeight: '600',
                    }}
                  >
                    Z
                  </span>
                </div>
                <span
                  className="text-lg font-semibold text-white"
                  style={{ fontFamily: 'var(--font-sans)' }}
                >
                  Zingly
                </span>
              </div>
              <p
                className="text-sm leading-relaxed"
                style={{ color: '#666666', fontFamily: 'var(--font-sans)', fontWeight: '300' }}
              >
                Property discovery, simplified. Find rooms, apartments, houses, offices, and land — then connect directly with the agent.
              </p>

              {/* Social */}
              <div className="flex items-center gap-3 mt-6">
                {socialLinks.map((s) => (
                  <a
                    key={s.label}
                    href="#"
                    aria-label={s.label}
                    className="w-9 h-9 flex items-center justify-center transition-all duration-200"
                    style={{
                      backgroundColor: '#1E1E1E',
                      color: '#888888',
                      borderRadius: '10px',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#FFFFFF'
                      e.currentTarget.style.backgroundColor = '#800080'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = '#888888'
                      e.currentTarget.style.backgroundColor = '#1E1E1E'
                    }}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Nav links */}
            <div>
              <div
                className="text-xs font-medium mb-4 uppercase tracking-widest"
                style={{ color: '#555555', fontFamily: 'var(--font-sans)' }}
              >
                Navigate
              </div>
              <ul className="flex flex-col gap-2.5">
                {navLinks.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm transition-colors duration-150"
                      style={{ color: '#888888', fontFamily: 'var(--font-sans)' }}
                      onMouseEnter={(e) => ((e.target as HTMLElement).style.color = '#FFFFFF')}
                      onMouseLeave={(e) => ((e.target as HTMLElement).style.color = '#888888')}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Download */}
            <div>
              <div
                className="text-xs font-medium mb-4 uppercase tracking-widest"
                style={{ color: '#555555', fontFamily: 'var(--font-sans)' }}
              >
                Get the app
              </div>
              <div className="flex flex-col gap-3">
                <a
                  href="#"
                  className="flex items-center gap-3 px-4 py-3 transition-all duration-200 hover:-translate-y-0.5"
                  style={{
                    backgroundColor: '#FFFFFF',
                    color: '#111111',
                    borderRadius: '12px',
                    width: '160px',
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="#111">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  <div>
                    <div className="text-xs opacity-40" style={{ fontFamily: 'var(--font-sans)', lineHeight: 1 }}>App Store</div>
                    <div className="text-xs font-semibold" style={{ fontFamily: 'var(--font-sans)', lineHeight: 1.4 }}>iOS</div>
                  </div>
                </a>
                <a
                  href="#"
                  className="flex items-center gap-3 px-4 py-3 transition-all duration-200 hover:-translate-y-0.5"
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.08)',
                    color: '#FFFFFF',
                    borderRadius: '12px',
                    border: '1.5px solid rgba(255,255,255,0.1)',
                    width: '160px',
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M3.18 23.76a2.03 2.03 0 0 0 2.17-.2l11.84-6.97-2.64-2.64-11.37 9.81z" fill="#EA4335"/>
                    <path d="M20.77 9.38 17.19 7.3 14.29 10l3.12 3.12 3.38-1.96a2.03 2.03 0 0 0-.02-3.78z" fill="#FBBC04"/>
                    <path d="M3.18.24A2.03 2.03 0 0 0 2 2.04v19.92a2.03 2.03 0 0 0 1.18 1.8l.09.04L14.29 12 3.18.24z" fill="#4285F4"/>
                    <path d="M3.35.24 14.29 12l3.12-3.12-10.88-6.4a2.05 2.05 0 0 0-3.18-2.24z" fill="#34A853"/>
                  </svg>
                  <div>
                    <div className="text-xs opacity-40" style={{ fontFamily: 'var(--font-sans)', lineHeight: 1 }}>Google Play</div>
                    <div className="text-xs font-semibold" style={{ fontFamily: 'var(--font-sans)', lineHeight: 1.4 }}>Android</div>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: '1px', backgroundColor: '#1E1E1E' }} />

          {/* Bottom row */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-6">
            <p
              className="text-xs"
              style={{ color: '#444444', fontFamily: 'var(--font-sans)' }}
            >
              © {new Date().getFullYear()} Zingly. All rights reserved.
            </p>
            <p
              className="text-xs"
              style={{ color: '#333333', fontFamily: 'var(--font-sans)' }}
            >
              Connecting property seekers with property advertisers.
              <span style={{ color: '#800080' }}> No bookings. No fees.</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
