import { FormEvent, useEffect, useMemo, useState } from 'react'

type Page =
  | 'home'
  | 'explore'
  | 'community'
  | 'about'
  | 'contact'
  | 'download'
  | 'faq'
  | 'privacy'
  | 'terms'
  | 'missing'

type Property = {
  title: string
  location: string
  price: string
  meta: string
  image: string
  tag: string
}

type Note = {
  id: number
  text: string
  name: string
  x: number
  y: number
  rotate: number
  scale: number
  paper: string
  popular: number
}

const pageLinks: { label: string; page: Page }[] = [
  { label: 'Home', page: 'home' },
  { label: 'Explore', page: 'explore' },
  { label: 'Community', page: 'community' },
  { label: 'About', page: 'about' },
  { label: 'Contact', page: 'contact' },
]

const legalLinks: { label: string; page: Page }[] = [
  { label: 'Download', page: 'download' },
  { label: 'FAQ', page: 'faq' },
  { label: 'Privacy', page: 'privacy' },
  { label: 'Terms', page: 'terms' },
]

const routePages: Page[] = ['home', 'explore', 'community', 'about', 'contact', 'download', 'faq', 'privacy', 'terms']

function pageFromHash(): Page {
  const hash = window.location.hash.replace('#', '') as Page
  if (!hash) return 'home'
  return routePages.includes(hash) ? hash : 'missing'
}

const properties: Property[] = [
  {
    title: 'Quiet three-bedroom apartment',
    location: 'Labone, Accra',
    price: 'GHS 6,500 / mo',
    meta: '3 beds / 142 m2',
    tag: 'Contact Agent',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Garden house near the city',
    location: 'East Legon, Accra',
    price: 'GHS 12,000 / mo',
    meta: '5 beds / 280 m2',
    tag: 'Contact Agent',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Minimal studio office',
    location: 'Cantonments, Accra',
    price: 'GHS 22,000 / mo',
    meta: '450 m2 office',
    tag: 'Contact Agent',
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Elevated two-bedroom suite',
    location: 'Ridge, Accra',
    price: 'GHS 850,000',
    meta: '2 beds / 95 m2',
    tag: 'Contact Agent',
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=80',
  },
]

const collections = [
  ['Modern Apartments', 'Refined apartments with light, proportion, and calm.', properties[0].image],
  ['Student Rooms', 'Simple rooms close to campus and daily routines.', 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=900&q=80'],
  ['Family Homes', 'Homes with room for mornings, guests, and growing plans.', properties[1].image],
  ['Luxury Villas', 'Private residences with architectural presence.', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80'],
  ['Office Spaces', 'Studios, suites, and offices for focused work.', properties[2].image],
  ['Land Opportunities', 'Plots and sites ready for what comes next.', 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=900&q=80'],
]

const seedMessages = [
  'Ralph was here',
  'Ama found her apartment',
  'Kojo visited today',
  'Lydia says hello',
  'Samuel found his office',
  'Abena loves Zingly',
  'Kofi found a room',
  'Nadia came back twice',
  'Yaw found land',
  'Mina saved three homes',
  'Akosua found light',
  'Esi made a shortlist',
  'Kwame found his studio',
  'Selasi loves the wall',
  'Adjoa found a villa',
  'Nana was here',
  'Theo found a new view',
  'Mawuli signed today',
  'Araba found calm',
  'Kweku called the agent',
]

function makeNotes(count: number): Note[] {
  const papers = ['#fffaf0', '#f7f0df', '#ffffff', '#f2ead8', '#f8f8f8']
  return Array.from({ length: count }, (_, index) => {
    const text = seedMessages[index % seedMessages.length]
    const row = Math.floor(index / 10)
    const col = index % 10
    return {
      id: index + 1,
      text,
      name: text.split(' ')[0],
      x: 3 + col * 9.4 + ((index * 17) % 5),
      y: 4 + row * 8.2 + ((index * 13) % 6),
      rotate: ((index * 37) % 18) - 9,
      scale: 0.86 + ((index * 11) % 9) / 20,
      paper: papers[index % papers.length],
      popular: (index * 29) % 100,
    }
  })
}

const wallNotes = makeNotes(130)

function AppButton({
  children,
  tone = 'dark',
  onClick,
  type = 'button',
}: {
  children: React.ReactNode
  tone?: 'dark' | 'light' | 'purple'
  onClick?: () => void
  type?: 'button' | 'submit'
}) {
  const toneClass =
    tone === 'purple'
      ? 'bg-violet text-white hover:bg-ink'
      : tone === 'light'
        ? 'bg-white text-ink ring-1 ring-black/10 hover:ring-violet/30'
        : 'bg-ink text-white hover:bg-violet'

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${toneClass} rounded-full px-5 py-3 text-sm font-semibold transition duration-300 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet active:translate-y-0`}
    >
      {children}
    </button>
  )
}

function DownloadBadge({ store, dark = false }: { store: string; dark?: boolean }) {
  return (
    <button
      className={`flex min-w-40 items-center gap-3 rounded-2xl px-5 py-3 text-left transition duration-300 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet ${
        dark ? 'bg-white text-ink' : 'bg-ink text-white'
      }`}
    >
      <span className={`flex h-8 w-8 items-center justify-center rounded-xl ${dark ? 'bg-ink text-white' : 'bg-white text-ink'}`}>
        {store === 'App Store' ? 'A' : 'G'}
      </span>
      <span>
        <span className="block text-[11px] opacity-60">{store === 'App Store' ? 'Download on the' : 'Get it on'}</span>
        <span className="block text-sm font-semibold">{store}</span>
      </span>
    </button>
  )
}

function Nav({ page, setPage }: { page: Page; setPage: (page: Page) => void }) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <nav className="flex max-w-5xl items-center gap-3 rounded-full border border-black/10 bg-white/80 px-4 py-3 shadow-soft backdrop-blur md:gap-8">
        <button onClick={() => setPage('home')} className="flex items-center gap-2 rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink font-display text-sm italic text-white">Z</span>
          <span className="font-semibold tracking-tight">Zingly</span>
        </button>
        <div className="hidden items-center gap-1 md:flex">
          {pageLinks.map((link) => (
            <button
              key={link.page}
              onClick={() => setPage(link.page)}
              className={`rounded-full px-4 py-2 text-sm transition hover:text-violet focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet ${
                page === link.page ? 'text-violet' : 'text-ink/60'
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>
        <AppButton tone="purple" onClick={() => setPage('download')}>Download App</AppButton>
      </nav>
    </header>
  )
}

function SectionHeader({ eyebrow, title, copy }: { eyebrow: string; title: React.ReactNode; copy?: string }) {
  return (
    <div className="mx-auto mb-12 max-w-3xl text-center">
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-violet">{eyebrow}</p>
      <h2 className="font-display text-4xl font-semibold leading-tight tracking-tight md:text-6xl">{title}</h2>
      {copy ? <p className="mx-auto mt-5 max-w-xl text-base leading-8 text-ink/60">{copy}</p> : null}
    </div>
  )
}

function PhoneMockup({ light = false }: { light?: boolean }) {
  return (
    <div className="relative mx-auto h-[520px] w-[260px] rounded-[44px] bg-ink p-3 shadow-phone">
      <div className={`h-full overflow-hidden rounded-[34px] ${light ? 'bg-white' : 'bg-canvas'}`}>
        <div className="mx-auto mt-3 h-5 w-20 rounded-full bg-ink" />
        <div className="p-5">
          <p className="text-xs text-ink/40">Good morning</p>
          <h3 className="font-display text-2xl font-semibold">Find your space</h3>
          <div className="mt-4 rounded-2xl bg-white p-3 text-xs text-ink/40 shadow-sm">Search area or address</div>
          <div className="mt-4 overflow-hidden rounded-3xl bg-white shadow-sm">
            <img className="h-40 w-full object-cover" src={properties[0].image} alt="Modern apartment preview" />
            <div className="p-4">
              <p className="text-sm font-semibold">Labone, Accra</p>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-xs font-semibold">GHS 6,500/mo</span>
                <span className="rounded-full bg-violet px-2 py-1 text-[10px] text-white">Contact</span>
              </div>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-white p-3 text-xs shadow-sm">Rooms</div>
            <div className="rounded-2xl bg-white p-3 text-xs shadow-sm">Offices</div>
          </div>
        </div>
      </div>
    </div>
  )
}

function PropertyCard({ property, className = '' }: { property: Property; className?: string }) {
  return (
    <article className={`group overflow-hidden rounded-[2rem] bg-white shadow-soft transition duration-500 hover:-translate-y-2 ${className}`}>
      <img className="h-56 w-full object-cover transition duration-700 group-hover:scale-105" src={property.image} alt={property.title} />
      <div className="p-5">
        <div className="mb-3 flex items-start justify-between gap-4">
          <div>
            <h3 className="font-semibold">{property.title}</h3>
            <p className="mt-1 text-sm text-ink/50">{property.location}</p>
          </div>
          <p className="font-display text-lg italic">{property.price}</p>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-ink/45">{property.meta}</span>
          <span className="rounded-full border border-violet/20 px-3 py-1 text-xs font-semibold text-violet">{property.tag}</span>
        </div>
      </div>
    </article>
  )
}

function NoteCard({ note, onClick }: { note: Note; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="absolute rounded-2xl p-3 text-left font-hand text-xl leading-none shadow-note transition duration-300 hover:z-20 hover:-translate-y-2 focus-visible:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet"
      style={{
        left: `${note.x}%`,
        top: `${note.y}%`,
        transform: `rotate(${note.rotate}deg) scale(${note.scale})`,
        backgroundColor: note.paper,
      }}
    >
      <span>{note.text}</span>
      <span className="absolute -top-2 left-1/2 h-4 w-12 -translate-x-1/2 rotate-[-3deg] rounded-sm bg-white/60" />
    </button>
  )
}

function ScrapbookPreview({ setPage }: { setPage: (page: Page) => void }) {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="Community"
          title="The Zingly Wall"
          copy="Thousands of visitors have left their mark. Add yours and become part of the Zingly story."
        />
        <div className="no-scrollbar overflow-x-auto rounded-[2.5rem] shadow-soft">
          <div className="relative h-[520px] min-w-[960px] overflow-hidden bg-paper md:min-w-0">
            <div className="absolute inset-y-0 left-16 w-px bg-red-900/10" />
            {wallNotes.slice(0, 22).map((note) => <NoteCard key={note.id} note={note} />)}
          </div>
        </div>
        <div className="mt-8 text-center">
          <AppButton tone="purple" onClick={() => setPage('community')}>Explore the Zingly Wall</AppButton>
        </div>
      </div>
    </section>
  )
}

function Home({ setPage }: { setPage: (page: Page) => void }) {
  return (
    <>
      <section className="relative overflow-hidden px-6 pb-20 pt-36 md:pt-44">
        <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="mb-6 inline-flex rounded-full bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-violet shadow-soft">
              Property discovery, simplified
            </p>
            <h1 className="font-display text-6xl font-semibold leading-none tracking-tight md:text-8xl">
              Find somewhere <span className="italic">worth</span> calling home.
            </h1>
            <p className="mt-7 max-w-md text-lg leading-8 text-ink/60">
              Rooms, apartments, houses, offices, and land in one quiet app. Browse, shortlist, and contact the advertiser directly.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <DownloadBadge store="App Store" />
              <DownloadBadge store="Google Play" />
            </div>
          </div>
          <div className="relative min-h-[620px]">
            <div className="absolute inset-10 rounded-[3rem] bg-white shadow-soft" />
            <img
              className="absolute right-0 top-0 h-72 w-80 rounded-[2rem] object-cover shadow-soft md:h-96 md:w-[28rem]"
              src="https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1000&q=80"
              alt="Premium architectural interior"
            />
            <div className="absolute bottom-0 left-8 md:left-20"><PhoneMockup /></div>
            <PropertyCard property={properties[0]} className="absolute left-0 top-24 hidden w-72 -rotate-3 md:block" />
            <PropertyCard property={properties[2]} className="absolute bottom-16 right-0 hidden w-72 rotate-2 md:block" />
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <SectionHeader eyebrow="On Zingly now" title={<>Spaces that <span className="italic">move you.</span></>} />
          <div className="no-scrollbar -mx-6 flex snap-x gap-6 overflow-x-auto px-6 pb-6 md:mx-0 md:grid md:grid-cols-4 md:items-start md:overflow-visible md:px-0 md:pb-0">
            {properties.map((property, index) => (
              <PropertyCard key={property.title} property={property} className={`w-[78vw] flex-none snap-center sm:w-[22rem] md:w-auto ${index % 2 ? 'md:mt-16' : ''}`} />
            ))}
          </div>
          <p className="mt-10 text-center text-sm text-ink/45">
            Zingly connects property seekers with advertisers. No bookings, payments, reservations, or contracts are handled by Zingly.
          </p>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2">
          <img className="h-[34rem] w-full rounded-[2.5rem] object-cover shadow-soft" src="https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=1000&q=80" alt="Calm luxury living room" />
          <div className="md:pl-10">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.28em] text-violet">Editorial</p>
            <h2 className="font-display text-5xl font-semibold leading-tight md:text-7xl">Discovery should feel less like searching, and more like noticing.</h2>
            <p className="mt-7 max-w-md leading-8 text-ink/60">
              Zingly keeps the experience clear and atmospheric, so the place has room to speak before the details take over.
            </p>
          </div>
        </div>
      </section>

      <ScrapbookPreview setPage={setPage} />
      <DownloadCta setPage={setPage} />
    </>
  )
}

function Explore() {
  return (
    <main className="px-6 pb-24 pt-36">
      <div className="mx-auto max-w-6xl">
        <SectionHeader eyebrow="Explore" title="Curated paths into the property market." copy="Collections replace clutter. Each category feels considered, visual, and direct." />
        <div className="grid gap-8 md:grid-cols-2">
          {collections.map(([title, copy, image], index) => (
            <article key={title} className={`group overflow-hidden rounded-[2.5rem] bg-white shadow-soft ${index === 1 || index === 4 ? 'md:mt-16' : ''}`}>
              <img className="h-80 w-full object-cover transition duration-700 group-hover:scale-105" src={image} alt={title} />
              <div className="flex items-end justify-between gap-6 p-7">
                <div>
                  <h2 className="font-display text-4xl font-semibold">{title}</h2>
                  <p className="mt-3 max-w-sm text-sm leading-7 text-ink/55">{copy}</p>
                </div>
                <span className="rounded-full bg-canvas px-4 py-2 text-xs font-semibold text-violet">Open</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  )
}

function Community() {
  const [filter, setFilter] = useState<'Recent' | 'Popular' | 'Random'>('Recent')
  const [selected, setSelected] = useState<Note | null>(null)
  const [notes, setNotes] = useState(wallNotes)

  const ordered = useMemo(() => {
    if (filter === 'Popular') return [...notes].sort((a, b) => b.popular - a.popular)
    if (filter === 'Random') return [...notes].sort((a, b) => ((a.id * 17) % 31) - ((b.id * 17) % 31))
    return notes
  }, [filter, notes])

  function submitMark(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const name = String(form.get('name') || '').trim() || 'Someone'
    const message = String(form.get('message') || '').trim() || `${name} was here`
    const next: Note = {
      id: Date.now(),
      text: message.length > 44 ? message.slice(0, 44) : message,
      name,
      x: 8 + Math.random() * 74,
      y: 5 + Math.random() * 82,
      rotate: Math.random() * 18 - 9,
      scale: 0.95 + Math.random() * 0.35,
      paper: '#fffaf0',
      popular: 1,
    }
    setNotes([next, ...notes])
    event.currentTarget.reset()
  }

  return (
    <main className="px-6 pb-24 pt-36">
      <div className="mx-auto max-w-6xl">
        <SectionHeader eyebrow="The Zingly Wall" title="Leave Your Mark." copy="Add your name, a small note, or a memory from your search. The wall grows like a guestbook filled over many years." />
        <form onSubmit={submitMark} className="mx-auto mb-10 grid max-w-3xl gap-3 rounded-[2rem] bg-white p-3 shadow-soft md:grid-cols-[1fr_1.6fr_auto]">
          <input name="name" className="rounded-full bg-canvas px-5 py-4 outline-none focus:ring-2 focus:ring-violet" placeholder="Name" />
          <input name="message" className="rounded-full bg-canvas px-5 py-4 outline-none focus:ring-2 focus:ring-violet" placeholder="Optional short message" />
          <AppButton type="submit" tone="purple">Sign</AppButton>
        </form>
        <div className="mb-5 flex justify-center gap-2">
          {(['Recent', 'Popular', 'Random'] as const).map((item) => (
            <button key={item} onClick={() => setFilter(item)} className={`rounded-full px-4 py-2 text-sm font-semibold transition ${filter === item ? 'bg-violet text-white' : 'bg-white text-ink/60 hover:text-violet'}`}>
              {item}
            </button>
          ))}
        </div>
        <div className="relative h-[980px] overflow-hidden rounded-[2.75rem] bg-paper shadow-soft">
          <div className="absolute inset-y-0 left-16 w-px bg-red-900/10" />
          <div className="absolute left-8 top-8 font-hand text-3xl text-ink/20">Zingly, since the first search</div>
          {ordered.map((note) => <NoteCard key={note.id} note={note} onClick={() => setSelected(note)} />)}
        </div>
      </div>
      {selected ? (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/50 p-6 backdrop-blur-sm" onClick={() => setSelected(null)}>
          <div className="max-w-md rounded-[2rem] bg-[#fffaf0] p-10 shadow-phone" onClick={(event) => event.stopPropagation()}>
            <p className="font-hand text-5xl leading-tight">{selected.text}</p>
            <p className="mt-8 text-sm text-ink/45">Signed by {selected.name}</p>
            <div className="mt-8"><AppButton onClick={() => setSelected(null)}>Close</AppButton></div>
          </div>
        </div>
      ) : null}
    </main>
  )
}

function About() {
  return (
    <main className="px-6 pb-24 pt-36">
      <div className="mx-auto max-w-6xl">
        <SectionHeader eyebrow="About" title="A calmer way to meet the property market." />
        <div className="grid gap-8 md:grid-cols-[1.1fr_0.9fr]">
          <img className="h-[36rem] rounded-[2.5rem] object-cover shadow-soft" src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1000&q=80" alt="Architectural interior with soft light" />
          <div className="space-y-6">
            {[
              ['Mission', 'Help people discover rooms, homes, offices, and land without making the process feel noisy or transactional.'],
              ['Vision', 'A trusted property discovery layer where good spaces are presented with care and advertisers are simple to contact.'],
              ['Why it exists', 'People do not need another booking engine. They need a beautiful, direct way to see what is available and start a real conversation.'],
            ].map(([title, copy]) => (
              <section key={title} className="rounded-[2rem] bg-white p-8 shadow-soft">
                <h2 className="font-display text-4xl font-semibold">{title}</h2>
                <p className="mt-4 leading-8 text-ink/60">{copy}</p>
              </section>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}

function Contact() {
  return (
    <main className="px-6 pb-24 pt-36">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2">
        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-violet">Contact</p>
          <h1 className="font-display text-6xl font-semibold leading-tight">A simple note is enough.</h1>
          <p className="mt-6 max-w-md leading-8 text-ink/60">Questions about Zingly, advertising, support, or partnerships can start here.</p>
          <img className="mt-10 h-80 rounded-[2rem] object-cover shadow-soft" src="https://images.unsplash.com/photo-1604014237800-1c9102c219da?auto=format&fit=crop&w=900&q=80" alt="Minimal architecture" />
        </div>
        <form className="rounded-[2.5rem] bg-white p-6 shadow-soft">
          {['Name', 'Email', 'Subject'].map((label) => (
            <label key={label} className="mb-4 block">
              <span className="mb-2 block text-sm font-semibold">{label}</span>
              <input className="w-full rounded-2xl bg-canvas px-5 py-4 outline-none focus:ring-2 focus:ring-violet" />
            </label>
          ))}
          <label className="block">
            <span className="mb-2 block text-sm font-semibold">Message</span>
            <textarea className="min-h-40 w-full resize-none rounded-2xl bg-canvas px-5 py-4 outline-none focus:ring-2 focus:ring-violet" />
          </label>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm text-ink/50">hello@zingly.app / Instagram / LinkedIn</p>
            <AppButton tone="purple">Send message</AppButton>
          </div>
        </form>
      </div>
    </main>
  )
}

function DownloadCta({ setPage }: { setPage: (page: Page) => void }) {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-10 rounded-[2.75rem] bg-ink p-8 text-white shadow-soft md:grid-cols-[0.8fr_1.2fr] md:p-16">
        <div className="flex justify-center"><PhoneMockup light /></div>
        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-violet">Download</p>
          <h2 className="font-display text-5xl font-semibold leading-tight md:text-7xl">Your next place is one tap away.</h2>
          <p className="mt-6 max-w-md leading-8 text-white/55">Download the mobile app to browse curated property listings and contact advertisers directly.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <DownloadBadge store="App Store" dark />
            <DownloadBadge store="Google Play" dark />
            <AppButton tone="purple" onClick={() => setPage('download')}>Open download page</AppButton>
          </div>
        </div>
      </div>
    </section>
  )
}

function DownloadPage() {
  return (
    <main className="px-6 pb-24 pt-36">
      <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2">
        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-violet">Available now</p>
          <h1 className="font-display text-6xl font-semibold leading-tight md:text-8xl">Download Zingly.</h1>
          <p className="mt-6 max-w-md leading-8 text-ink/60">Scan the code, choose your store, and start discovering rooms, apartments, houses, offices, and land.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <DownloadBadge store="App Store" />
            <DownloadBadge store="Google Play" />
          </div>
          <div className="mt-8 flex h-40 w-40 items-center justify-center rounded-[2rem] bg-white text-center text-xs font-semibold text-ink/40 shadow-soft">QR code placeholder</div>
        </div>
        <div className="relative min-h-[620px] rounded-[2.75rem] bg-white p-8 shadow-soft">
          <div className="absolute left-12 top-16 rotate-[-5deg]"><PhoneMockup /></div>
          <div className="absolute right-12 top-32 rotate-[5deg]"><PhoneMockup light /></div>
        </div>
      </div>
    </main>
  )
}

function Faq() {
  const [open, setOpen] = useState(0)
  const faqs = [
    ['How does Zingly work?', 'Browse listings in the mobile app, save spaces you like, and contact the advertiser directly.'],
    ['Do I pay through Zingly?', 'No. Zingly does not handle payments, reservations, rental agreements, purchase agreements, or contracts.'],
    ['Can anyone advertise?', 'Property owners, landlords, and licensed agents can advertise listings.'],
    ['Is the app free?', 'The app is free for property seekers to download and browse.'],
    ['How do I contact an agent?', 'Open a listing and use the advertiser contact options shown in the app.'],
  ]
  return (
    <main className="px-6 pb-24 pt-36">
      <SectionHeader eyebrow="FAQ" title="Clear answers, quietly presented." />
      <div className="mx-auto max-w-3xl space-y-3">
        {faqs.map(([question, answer], index) => (
          <section key={question} className="rounded-[2rem] bg-white p-6 shadow-soft">
            <button onClick={() => setOpen(open === index ? -1 : index)} className="flex w-full items-center justify-between text-left font-display text-2xl font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet">
              {question}
              <span className="text-violet">{open === index ? '-' : '+'}</span>
            </button>
            {open === index ? <p className="mt-4 leading-8 text-ink/60">{answer}</p> : null}
          </section>
        ))}
      </div>
    </main>
  )
}

function ReadingPage({ kind }: { kind: 'Privacy Policy' | 'Terms of Service' }) {
  const sections = [
    ['Overview', 'Zingly is a property discovery platform that connects property seekers with property advertisers.'],
    ['Discovery only', 'Zingly does not process payments, reservations, bookings, rental agreements, purchase agreements, or contracts.'],
    ['Information', 'We may collect account, contact, device, and usage information needed to operate and improve the service.'],
    ['Advertisers', 'Advertisers are responsible for the accuracy, legality, and availability of their listings and communications.'],
    ['Contact', 'Questions can be sent to hello@zingly.app.'],
  ]
  return (
    <main className="px-6 pb-24 pt-36">
      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[16rem_1fr]">
        <aside className="top-28 h-fit rounded-[2rem] bg-white p-6 shadow-soft md:sticky">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-violet">Contents</p>
          {sections.map(([title]) => <a key={title} href={`#${title}`} className="block rounded-full px-3 py-2 text-sm text-ink/55 hover:text-violet">{title}</a>)}
        </aside>
        <article className="rounded-[2.5rem] bg-white p-8 shadow-soft md:p-14">
          <h1 className="font-display text-6xl font-semibold">{kind}</h1>
          <p className="mt-4 text-sm text-ink/45">Last updated July 8, 2026</p>
          <div className="mt-10 space-y-10">
            {sections.map(([title, copy]) => (
              <section id={title} key={title}>
                <h2 className="font-display text-4xl font-semibold">{title}</h2>
                <p className="mt-4 max-w-2xl leading-8 text-ink/60">{copy}</p>
              </section>
            ))}
          </div>
        </article>
      </div>
    </main>
  )
}

function Missing({ setPage }: { setPage: (page: Page) => void }) {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 pt-24">
      <section className="max-w-2xl rounded-[2.5rem] bg-white p-10 text-center shadow-soft">
        <div className="mx-auto mb-8 h-44 w-44 rounded-[2rem] bg-canvas" />
        <h1 className="font-display text-6xl font-semibold">Looks like this address moved.</h1>
        <p className="mx-auto mt-5 max-w-md leading-8 text-ink/60">The page is not part of the current Zingly public website.</p>
        <div className="mt-8"><AppButton tone="purple" onClick={() => setPage('home')}>Return home</AppButton></div>
      </section>
    </main>
  )
}

function Footer({ setPage }: { setPage: (page: Page) => void }) {
  return (
    <footer className="pb-8">
      <div className="w-full rounded-[2.75rem] bg-ink p-8 text-white md:p-12">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white font-display italic text-ink">Z</span>
              <span className="text-lg font-semibold">Zingly</span>
            </div>
            <p className="max-w-sm leading-8 text-white/50">Premium property discovery for rooms, apartments, houses, offices, and land. Direct contact, no booking layer.</p>
          </div>
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-white/30">Navigate</p>
            {[...pageLinks, ...legalLinks].map((link) => (
              <button key={link.page} onClick={() => setPage(link.page)} className="block py-1.5 text-sm text-white/55 hover:text-white">{link.label}</button>
            ))}
          </div>
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-white/30">Social</p>
            {['Instagram', 'X', 'LinkedIn', 'Facebook'].map((item) => <a key={item} href="#" className="block py-1.5 text-sm text-white/55 hover:text-white">{item}</a>)}
          </div>
          <form>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-white/30">Newsletter</p>
            <div className="rounded-full bg-white/10 p-2">
              <input className="w-full bg-transparent px-4 py-2 text-sm outline-none placeholder:text-white/30" placeholder="Email address" />
            </div>
            <div className="mt-4 flex gap-3"><DownloadBadge store="App Store" dark /></div>
          </form>
        </div>
        <div className="mt-10 flex flex-col justify-between gap-3 text-xs text-white/30 md:flex-row">
          <p>Copyright {new Date().getFullYear()} Zingly. All rights reserved.</p>
          <p>No payments. No reservations. No contracts. Just connection.</p>
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  const [page, setPageState] = useState<Page>(() => pageFromHash())

  useEffect(() => {
    const onHashChange = () => {
      setPageState(pageFromHash())
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  function setPage(next: Page) {
    const nextHash = next === 'home' ? '' : `#${next}`
    if (window.location.hash !== nextHash) {
      window.location.hash = nextHash
      return
    }
    setPageState(next)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const pageContent = {
    home: <Home setPage={setPage} />,
    explore: <Explore />,
    community: <Community />,
    about: <About />,
    contact: <Contact />,
    download: <DownloadPage />,
    faq: <Faq />,
    privacy: <ReadingPage kind="Privacy Policy" />,
    terms: <ReadingPage kind="Terms of Service" />,
    missing: <Missing setPage={setPage} />,
  }[page]

  return (
    <div className="min-h-screen bg-canvas text-ink">
      <Nav page={page} setPage={setPage} />
      {pageContent}
      {page !== 'missing' ? <Footer setPage={setPage} /> : null}
    </div>
  )
}
