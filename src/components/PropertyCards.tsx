const properties = [
  {
    img: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&h=400&fit=crop&auto=format',
    location: 'Labone, Accra',
    type: 'Apartment',
    price: 'GH₵ 6,500 / mo',
    beds: 3,
    area: '142 m²',
    tag: 'For Rent',
    offset: '0px',
  },
  {
    img: 'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=600&h=400&fit=crop&auto=format',
    location: 'East Legon, Accra',
    type: 'House',
    price: 'GH₵ 12,000 / mo',
    beds: 5,
    area: '280 m²',
    tag: 'For Rent',
    offset: '40px',
  },
  {
    img: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop&auto=format',
    location: 'Cantonments, Accra',
    type: 'Office',
    price: 'GH₵ 22,000 / mo',
    beds: 0,
    area: '450 m²',
    tag: 'For Rent',
    offset: '80px',
  },
  {
    img: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600&h=400&fit=crop&auto=format',
    location: 'Ridge, Accra',
    type: 'Apartment',
    price: 'GH₵ 850,000',
    beds: 2,
    area: '95 m²',
    tag: 'For Sale',
    offset: '20px',
  },
]

function PropertyCard({ p, index }: { p: typeof properties[0]; index: number }) {
  const isEven = index % 2 === 0
  return (
    <div
      className="group relative overflow-hidden transition-all duration-300 hover:-translate-y-2"
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '24px',
        boxShadow: '0 4px 24px rgba(0,0,0,0.07)',
        marginTop: p.offset,
      }}
    >
      {/* Image */}
      <div
        className="w-full overflow-hidden"
        style={{
          height: isEven ? '220px' : '180px',
          backgroundColor: '#E5E5E5',
        }}
      >
        <img
          src={p.img}
          alt={p.location}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Badge */}
      <div
        className="absolute top-4 left-4 text-xs font-medium px-2.5 py-1 rounded-full"
        style={{
          backgroundColor: '#111111',
          color: '#FFFFFF',
          fontSize: '10px',
          letterSpacing: '0.03em',
        }}
      >
        {p.tag}
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div>
            <div
              className="font-semibold text-sm"
              style={{ color: '#111111', fontFamily: 'var(--font-sans)' }}
            >
              {p.location}
            </div>
            <div className="text-xs mt-0.5" style={{ color: '#999999' }}>
              {p.type} · {p.area}
            </div>
          </div>
          <div
            className="text-sm font-semibold"
            style={{ color: '#111111', fontFamily: 'var(--font-display)', fontStyle: 'italic' }}
          >
            {p.price}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            {p.beds > 0 && (
              <>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2">
                  <path d="M2 20v-8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8M2 12V7a2 2 0 0 1 2-2h4l2 3h6l2-3h4a2 2 0 0 1 2 2v5"/>
                </svg>
                <span className="text-xs" style={{ color: '#888888' }}>{p.beds} beds</span>
              </>
            )}
          </div>
          <button
            className="text-xs font-medium px-3 py-1.5 transition-all duration-200"
            style={{
              color: '#800080',
              border: '1.5px solid rgba(128,0,128,0.25)',
              borderRadius: '9999px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#800080'
              e.currentTarget.style.color = '#FFFFFF'
              e.currentTarget.style.borderColor = '#800080'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent'
              e.currentTarget.style.color = '#800080'
              e.currentTarget.style.borderColor = 'rgba(128,0,128,0.25)'
            }}
          >
            Contact Agent
          </button>
        </div>
      </div>
    </div>
  )
}

export default function PropertyCards() {
  return (
    <section className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section heading */}
        <div className="mb-16 max-w-lg">
          <div
            className="text-xs font-medium mb-4 uppercase tracking-widest"
            style={{ color: '#800080', fontFamily: 'var(--font-sans)' }}
          >
            On Zingly now
          </div>
          <h2
            className="leading-tight"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.2rem, 4vw, 3.5rem)',
              fontWeight: '600',
              color: '#111111',
              letterSpacing: '-0.02em',
            }}
          >
            Spaces that<br />
            <em style={{ fontStyle: 'italic', fontWeight: '400' }}>move you.</em>
          </h2>
        </div>

        {/* Cards — staggered layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
          {properties.map((p, i) => (
            <PropertyCard key={i} p={p} index={i} />
          ))}
        </div>

        {/* Footnote */}
        <div className="mt-12 text-center">
          <p className="text-sm" style={{ color: '#AAAAAA', fontFamily: 'var(--font-sans)' }}>
            Thousands of listings updated daily — no bookings, no fees.
            <span style={{ color: '#800080' }}> Just connect.</span>
          </p>
        </div>
      </div>
    </section>
  )
}
