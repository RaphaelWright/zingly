const floatingCards = [
  {
    img: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=240&h=160&fit=crop&auto=format',
    location: 'East Legon, Accra',
    price: 'GH₵ 4,500/mo',
    beds: '3 bed',
    style: { top: '14%', left: '-8%', rotate: '-4deg' },
  },
  {
    img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=240&h=160&fit=crop&auto=format',
    location: 'Cantonments, Accra',
    price: 'GH₵ 7,200/mo',
    beds: '4 bed',
    style: { bottom: '18%', right: '-6%', rotate: '3deg' },
  },
  {
    img: 'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=240&h=160&fit=crop&auto=format',
    location: 'Airport Residential',
    price: 'GH₵ 9,000/mo',
    beds: '5 bed',
    style: { top: '52%', left: '-12%', rotate: '2deg' },
  },
]

function PhoneMockup() {
  return (
    <div
      className="relative mx-auto"
      style={{ width: '260px', height: '520px' }}
    >
      {/* Phone body */}
      <div
        className="absolute inset-0 shadow-2xl"
        style={{
          backgroundColor: '#111111',
          borderRadius: '44px',
          border: '2px solid #2a2a2a',
        }}
      />
      {/* Screen */}
      <div
        className="absolute overflow-hidden"
        style={{
          top: '10px',
          left: '10px',
          right: '10px',
          bottom: '10px',
          borderRadius: '36px',
          backgroundColor: '#F7F7F7',
        }}
      >
        {/* Dynamic island */}
        <div
          className="mx-auto mt-3"
          style={{
            width: '80px',
            height: '20px',
            backgroundColor: '#111111',
            borderRadius: '9999px',
          }}
        />

        {/* App header */}
        <div className="px-4 pt-4 pb-2">
          <div className="text-xs font-medium" style={{ color: '#888', fontFamily: 'var(--font-sans)' }}>
            Good morning
          </div>
          <div className="text-lg font-semibold mt-0.5" style={{ color: '#111', fontFamily: 'var(--font-display)' }}>
            Find your space
          </div>
        </div>

        {/* Search bar */}
        <div className="mx-4 mb-3 px-3 py-2 flex items-center gap-2" style={{ backgroundColor: '#FFFFFF', borderRadius: '12px' }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2.5">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
          <span className="text-xs" style={{ color: '#999', fontFamily: 'var(--font-sans)' }}>Search area or address…</span>
        </div>

        {/* Mini listing card */}
        <div className="mx-4 rounded-2xl overflow-hidden" style={{ backgroundColor: '#FFFFFF' }}>
          <div
            className="w-full"
            style={{
              height: '110px',
              backgroundImage: 'url(https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=300&h=200&fit=crop&auto=format)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <div className="p-3">
            <div className="text-xs font-medium" style={{ color: '#111', fontFamily: 'var(--font-sans)' }}>
              Labone, Accra
            </div>
            <div className="flex justify-between items-center mt-1">
              <span className="text-xs font-semibold" style={{ color: '#111' }}>GH₵ 6,500/mo</span>
              <span
                className="text-xs px-2 py-0.5 rounded-full"
                style={{ backgroundColor: '#800080', color: '#fff', fontSize: '9px' }}
              >
                Contact Agent
              </span>
            </div>
          </div>
        </div>

        {/* Bottom tab bar */}
        <div
          className="absolute bottom-0 left-0 right-0 flex justify-around items-center px-4 py-3"
          style={{ backgroundColor: '#FFFFFF', borderTop: '1px solid #F0F0F0' }}
        >
          {['home', 'search', 'heart', 'user'].map((icon) => (
            <div key={icon} className="w-5 h-5 flex items-center justify-center">
              <div
                className="rounded"
                style={{
                  width: '16px',
                  height: '16px',
                  backgroundColor: icon === 'home' ? '#800080' : '#DDDDDD',
                  borderRadius: '4px',
                  opacity: icon === 'home' ? 1 : 0.5,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function FloatingCard({ card }: { card: typeof floatingCards[0] }) {
  return (
    <div
      className="absolute transition-transform duration-300 hover:-translate-y-1"
      style={{
        ...card.style,
        width: '160px',
        backgroundColor: '#FFFFFF',
        borderRadius: '18px',
        overflow: 'hidden',
        boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
        transform: `rotate(${card.style.rotate})`,
      }}
    >
      <div
        style={{
          height: '90px',
          backgroundImage: `url(${card.img})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundColor: '#E5E5E5',
        }}
      />
      <div className="p-2.5">
        <div className="text-xs font-medium truncate" style={{ color: '#111', fontFamily: 'var(--font-sans)' }}>
          {card.location}
        </div>
        <div className="flex justify-between items-center mt-1">
          <span className="text-xs font-semibold" style={{ color: '#111', fontSize: '10px' }}>{card.price}</span>
          <span className="text-xs" style={{ color: '#888', fontSize: '9px' }}>{card.beds}</span>
        </div>
      </div>
    </div>
  )
}

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ paddingTop: '100px', paddingBottom: '80px' }}
    >
      <div className="max-w-6xl mx-auto px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: copy */}
          <div className="max-w-lg">
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-8 text-xs font-medium"
              style={{ backgroundColor: '#FFFFFF', color: '#888', border: '1px solid #E8E8E8' }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: '#800080' }}
              />
              Property discovery — simplified
            </div>

            <h1
              className="leading-none mb-6"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(3rem, 6vw, 5rem)',
                fontWeight: '600',
                color: '#111111',
                letterSpacing: '-0.02em',
                lineHeight: '1.05',
              }}
            >
              Find somewhere<br />
              <em style={{ fontStyle: 'italic', fontWeight: '400' }}>worth</em> calling<br />
              home.
            </h1>

            <p
              className="mb-10 leading-relaxed"
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '1.05rem',
                color: '#666666',
                maxWidth: '380px',
                fontWeight: '300',
              }}
            >
              Rooms, apartments, houses, offices, and land — all in one place. Browse listings and connect with agents directly.
            </p>

            {/* Download buttons */}
            <div className="flex flex-wrap gap-3">
              <a
                href="#"
                className="flex items-center gap-3 px-5 py-3.5 transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  backgroundColor: '#111111',
                  color: '#FFFFFF',
                  borderRadius: '14px',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                <div>
                  <div className="text-xs opacity-70" style={{ fontFamily: 'var(--font-sans)', lineHeight: 1 }}>Download on the</div>
                  <div className="text-sm font-semibold" style={{ fontFamily: 'var(--font-sans)', lineHeight: 1.4 }}>App Store</div>
                </div>
              </a>
              <a
                href="#"
                className="flex items-center gap-3 px-5 py-3.5 transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  backgroundColor: '#FFFFFF',
                  color: '#111111',
                  borderRadius: '14px',
                  border: '1.5px solid #E0E0E0',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M3.18 23.76a2.03 2.03 0 0 0 2.17-.2l11.84-6.97-2.64-2.64-11.37 9.81z" fill="#EA4335"/>
                  <path d="M20.77 9.38 17.19 7.3 14.29 10l3.12 3.12 3.38-1.96a2.03 2.03 0 0 0-.02-3.78z" fill="#FBBC04"/>
                  <path d="M3.18.24A2.03 2.03 0 0 0 2 2.04v19.92a2.03 2.03 0 0 0 1.18 1.8l.09.04L14.29 12 3.18.24z" fill="#4285F4"/>
                  <path d="M3.35.24 14.29 12l3.12-3.12-10.88-6.4a2.05 2.05 0 0 0-3.18-2.24z" fill="#34A853"/>
                </svg>
                <div>
                  <div className="text-xs opacity-50" style={{ fontFamily: 'var(--font-sans)', lineHeight: 1 }}>Get it on</div>
                  <div className="text-sm font-semibold" style={{ fontFamily: 'var(--font-sans)', lineHeight: 1.4 }}>Google Play</div>
                </div>
              </a>
            </div>
          </div>

          {/* Right: phone + floating cards */}
          <div
            className="relative flex justify-center items-center"
            style={{ minHeight: '580px', marginLeft: '5%' }}
          >
            <PhoneMockup />
            {floatingCards.map((card, i) => (
              <FloatingCard key={i} card={card} />
            ))}
          </div>
        </div>
      </div>

      {/* Subtle background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 70% 50%, rgba(128,0,128,0.04) 0%, transparent 70%)',
          zIndex: -1,
        }}
      />
    </section>
  )
}
