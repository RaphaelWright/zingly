function MiniPhone({ light = false }) {
  return (
    <div
      className="relative mx-auto"
      style={{ width: '200px', height: '400px' }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: light ? '#FFFFFF' : '#111111',
          borderRadius: '40px',
          border: light ? '2px solid #E8E8E8' : '2px solid #2A2A2A',
          boxShadow: light
            ? '0 20px 60px rgba(0,0,0,0.12)'
            : '0 20px 60px rgba(0,0,0,0.5)',
        }}
      />
      <div
        className="absolute overflow-hidden flex flex-col items-center justify-center gap-3"
        style={{
          top: '10px',
          left: '10px',
          right: '10px',
          bottom: '10px',
          borderRadius: '32px',
          backgroundColor: light ? '#F7F7F7' : '#1A1A1A',
        }}
      >
        {/* Dynamic island */}
        <div
          className="absolute top-3"
          style={{
            width: '70px',
            height: '18px',
            backgroundColor: light ? '#111111' : '#000000',
            borderRadius: '9999px',
          }}
        />
        <div style={{ marginTop: '20px' }}>
          <div
            className="w-10 h-10 flex items-center justify-center rounded-2xl mx-auto mb-3"
            style={{ backgroundColor: '#800080' }}
          >
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontStyle: 'italic',
                color: '#FFFFFF',
                fontSize: '1.2rem',
                fontWeight: '600',
              }}
            >
              Z
            </span>
          </div>
          <div
            className="text-center text-xs font-semibold"
            style={{
              color: light ? '#111111' : '#FFFFFF',
              fontFamily: 'var(--font-sans)',
              letterSpacing: '0.05em',
            }}
          >
            ZINGLY
          </div>
          <div
            className="text-center text-xs mt-1"
            style={{
              color: light ? '#888888' : '#666666',
              fontFamily: 'var(--font-sans)',
            }}
          >
            Find your space
          </div>
        </div>
      </div>
    </div>
  )
}

export default function DownloadSection() {
  return (
    <section
      id="download"
      className="py-28 px-6"
      style={{ backgroundColor: '#F7F7F7' }}
    >
      <div className="max-w-5xl mx-auto">
        <div
          className="relative overflow-hidden"
          style={{
            backgroundColor: '#111111',
            borderRadius: '32px',
            padding: 'clamp(2.5rem, 5vw, 5rem)',
          }}
        >
          {/* Background accent glow */}
          <div
            className="absolute pointer-events-none"
            style={{
              top: '-20%',
              right: '-10%',
              width: '400px',
              height: '400px',
              background: 'radial-gradient(circle, rgba(128,0,128,0.15) 0%, transparent 65%)',
              borderRadius: '50%',
            }}
          />

          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12">
            {/* Phone mockups */}
            <div className="flex gap-6 items-end flex-shrink-0">
              <div style={{ transform: 'translateY(20px) rotate(-3deg)' }}>
                <MiniPhone light={false} />
              </div>
              <div style={{ transform: 'rotate(2deg)' }}>
                <MiniPhone light={true} />
              </div>
            </div>

            {/* Copy + CTA */}
            <div>
              <div
                className="text-xs font-medium mb-4 uppercase tracking-widest"
                style={{ color: '#800080', fontFamily: 'var(--font-sans)' }}
              >
                Available now
              </div>
              <h2
                className="mb-4 leading-tight"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2rem, 4vw, 3rem)',
                  fontWeight: '600',
                  color: '#FFFFFF',
                  letterSpacing: '-0.02em',
                }}
              >
                Your next home<br />
                <em style={{ fontStyle: 'italic', fontWeight: '400' }}>is one tap away.</em>
              </h2>
              <p
                className="mb-8 leading-relaxed"
                style={{
                  color: '#888888',
                  fontFamily: 'var(--font-sans)',
                  fontWeight: '300',
                  fontSize: '0.95rem',
                  maxWidth: '320px',
                }}
              >
                Download Zingly and start discovering spaces that feel like they were built for you.
              </p>

              <div className="flex flex-wrap gap-3">
                <a
                  href="#"
                  className="flex items-center gap-3 px-5 py-3.5 transition-all duration-200 hover:-translate-y-0.5"
                  style={{
                    backgroundColor: '#FFFFFF',
                    color: '#111111',
                    borderRadius: '14px',
                    boxShadow: '0 4px 16px rgba(255,255,255,0.1)',
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#111">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  <div>
                    <div className="text-xs opacity-50" style={{ fontFamily: 'var(--font-sans)', lineHeight: 1 }}>Download on the</div>
                    <div className="text-sm font-semibold" style={{ fontFamily: 'var(--font-sans)', lineHeight: 1.4 }}>App Store</div>
                  </div>
                </a>
                <a
                  href="#"
                  className="flex items-center gap-3 px-5 py-3.5 transition-all duration-200 hover:-translate-y-0.5"
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.08)',
                    color: '#FFFFFF',
                    borderRadius: '14px',
                    border: '1.5px solid rgba(255,255,255,0.12)',
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
          </div>
        </div>
      </div>
    </section>
  )
}
