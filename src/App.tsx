import { FormEvent, useEffect, useId, useMemo, useRef, useState } from 'react'

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
  shape: 'note' | 'sticky' | 'scrap'
  tape: 'top' | 'corner' | 'side'
  ink: string
  fontSize: number
}

type ToastMessage = {
  id: number
  title: string
  copy: string
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

const pagePaths: Record<Exclude<Page, 'missing'>, string> = {
  home: '/',
  explore: '/explore',
  community: '/community',
  about: '/about',
  contact: '/contact',
  download: '/download',
  faq: '/faq',
  privacy: '/privacy',
  terms: '/terms',
}

function pageFromLocation(): Page {
  const hashPage = window.location.hash.replace('#', '') as Page
  if (routePages.includes(hashPage)) return hashPage

  const path = window.location.pathname.replace(/\/+$/, '') || '/'
  const match = Object.entries(pagePaths).find(([, routePath]) => routePath === path)
  return match ? (match[0] as Page) : 'missing'
}

function pathForPage(page: Page) {
  return page === 'missing' ? '/404' : pagePaths[page]
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
  ['Rooms for Rent', 'Simple rooms close to campus, work, and daily routines.', 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=900&q=80'],
  ['Family Homes', 'Homes with room for mornings, guests, and growing plans.', properties[1].image],
  ['Luxury Villas', 'Private residences with architectural presence.', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80'],
  ['Office Spaces', 'Studios, suites, and offices for focused work.', properties[2].image],
  ['Stores for Rent', 'Retail spaces and small storefronts ready for local business.', 'https://images.unsplash.com/photo-1604014238170-4def1e4e6fcf?auto=format&fit=crop&w=900&q=80'],
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

function seededUnit(seed: number) {
  const value = Math.sin(seed * 9301 + 49297) * 233280
  return value - Math.floor(value)
}

function makeNotes(count: number): Note[] {
  const papers = ['#fffaf0', '#f7f0df', '#ffffff', '#f2ead8', '#f8f8f8']
  const shapes: Note['shape'][] = ['note', 'sticky', 'scrap']
  const tapes: Note['tape'][] = ['top', 'corner', 'side']
  const inks = ['#111111', '#262626', '#3a3028', '#5a4a3f', '#800080']
  const columns = 13
  const rows = Math.ceil(count / columns)
  const cells = Array.from({ length: columns * rows }, (_, cell) => ({
    col: cell % columns,
    row: Math.floor(cell / columns),
    order: seededUnit(cell + 11),
  })).sort((a, b) => a.order - b.order)

  return Array.from({ length: count }, (_, index) => {
    const text = seedMessages[index % seedMessages.length]
    const cell = cells[index]
    const xJitter = 0.18 + seededUnit(index + 101) * 0.54
    const yJitter = 0.18 + seededUnit(index + 201) * 0.54

    return {
      id: index + 1,
      text,
      name: text.split(' ')[0],
      x: 3 + ((cell.col + xJitter) / columns) * 88,
      y: 4 + ((cell.row + yJitter) / rows) * 88,
      rotate: -10 + seededUnit(index + 301) * 20,
      scale: 0.86 + seededUnit(index + 401) * 0.42,
      paper: papers[index % papers.length],
      popular: Math.round(seededUnit(index + 501) * 100),
      shape: shapes[index % shapes.length],
      tape: tapes[Math.floor(seededUnit(index + 601) * tapes.length)],
      ink: inks[Math.floor(seededUnit(index + 701) * inks.length)],
      fontSize: 18 + Math.round(seededUnit(index + 801) * 12),
    }
  })
}

const wallNotes = makeNotes(240)
const WALL_BATCH_MS = 12000

function getNoteBatch(notes: Note[], batchIndex: number, batchSize: number) {
  if (notes.length <= batchSize) return notes

  const batchCount = Math.ceil(notes.length / batchSize)
  const start = (batchIndex % batchCount) * batchSize
  const batch = notes.slice(start, start + batchSize)

  if (batch.length === batchSize) return batch
  return [...batch, ...notes.slice(0, batchSize - batch.length)]
}

function AppButton({
  children,
  tone = 'dark',
  onClick,
  type = 'button',
  disabled = false,
}: {
  children: React.ReactNode
  tone?: 'dark' | 'light' | 'purple'
  onClick?: () => void
  type?: 'button' | 'submit'
  disabled?: boolean
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
      disabled={disabled}
      className={`${toneClass} rounded-full px-5 py-3 text-sm font-semibold transition duration-300 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:translate-y-0`}
    >
      {children}
    </button>
  )
}

function StoreIcon({ store }: { store: string }) {
  if (store === 'App Store') {
    return (
      <svg className="h-8 w-8" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
        <path d="M21.48 5.12c.93-1.1 1.56-2.62 1.39-4.12-1.34.06-2.96.89-3.92 2-.86.98-1.62 2.56-1.42 4.06 1.5.12 3.02-.76 3.95-1.94Z" />
        <path d="M27.74 22.62c-.66 1.52-.98 2.2-1.84 3.55-1.19 1.82-2.86 4.08-4.94 4.1-1.84.02-2.31-1.2-4.82-1.19-2.5.01-3.02 1.22-4.86 1.2-2.07-.02-3.65-2.06-4.84-3.88-3.32-5.1-3.67-11.08-1.62-14.26 1.45-2.25 3.75-3.57 5.9-3.57 2.2 0 3.58 1.21 5.4 1.21 1.77 0 2.85-1.21 5.4-1.21 1.93 0 3.98 1.05 5.42 2.86-4.76 2.61-3.99 9.4.8 11.19Z" />
      </svg>
    )
  }

  return (
    <svg className="h-8 w-8" viewBox="0 0 32 32" aria-hidden="true">
      <path d="M4.1 2.7c-.36.38-.58.97-.58 1.74v23.12c0 .77.22 1.36.58 1.74L17.02 16 4.1 2.7Z" fill="#00A0FF" />
      <path d="m21.36 11.51-4.34 4.49 4.34 4.49 5.14-2.96c1.47-.85 1.47-2.21 0-3.06l-5.14-2.96Z" fill="#FFCE00" />
      <path d="m21.36 20.49-4.34-4.49L4.1 29.3c.57.6 1.52.67 2.58.06l14.68-8.87Z" fill="#F63448" />
      <path d="M21.36 11.51 6.68 2.64C5.62 2.03 4.67 2.1 4.1 2.7L17.02 16l4.34-4.49Z" fill="#00D67F" />
    </svg>
  )
}

function DownloadBadge({ store, dark = false }: { store: string; dark?: boolean }) {
  const isApple = store === 'App Store'

  return (
    <button
      aria-label={`${isApple ? 'Download on the' : 'Get it on'} ${store}`}
      className={`flex min-w-[142px] items-center gap-2 rounded-[0.95rem] px-3 py-2.5 text-left shadow-[0_10px_24px_rgba(17,17,17,0.11)] ring-1 transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(17,17,17,0.14)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet active:translate-y-0 ${
        dark ? 'bg-white text-ink ring-white/20' : 'bg-[#050505] text-white ring-white/10'
      }`}
    >
      <span className="flex h-7 w-7 shrink-0 items-center justify-center [&>svg]:h-6 [&>svg]:w-6">
        <StoreIcon store={store} />
      </span>
      <span>
        <span className="block text-[8px] font-medium uppercase leading-none tracking-wide opacity-70">{isApple ? 'Download on the' : 'Get it on'}</span>
        <span className="mt-0.5 block text-[15px] font-semibold leading-none tracking-tight">{store}</span>
      </span>
    </button>
  )
}

function FormField({
  label,
  name,
  type = 'text',
  multiline = false,
  required = false,
  placeholder,
}: {
  label: string
  name: string
  type?: string
  multiline?: boolean
  required?: boolean
  placeholder?: string
}) {
  const id = useId()
  const fieldClass = 'w-full rounded-2xl bg-canvas px-5 py-4 outline-none transition focus:ring-2 focus:ring-violet'

  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold">
        {label}
        {required ? <span className="text-violet"> *</span> : null}
      </span>
      {multiline ? (
        <textarea id={id} name={name} required={required} placeholder={placeholder} className={`${fieldClass} min-h-40 resize-none`} />
      ) : (
        <input id={id} name={name} type={type} required={required} placeholder={placeholder} className={fieldClass} />
      )}
    </label>
  )
}

function Toast({ message, onClose }: { message: ToastMessage | null; onClose: () => void }) {
  useEffect(() => {
    if (!message) return
    const timer = window.setTimeout(onClose, 4200)
    return () => window.clearTimeout(timer)
  }, [message, onClose])

  if (!message) return null

  return (
    <div role="status" aria-live="polite" className="fixed bottom-5 right-5 z-[90] max-w-sm rounded-[1.5rem] bg-ink p-5 text-white shadow-phone">
      <p className="font-semibold">{message.title}</p>
      <p className="mt-1 text-sm leading-6 text-white/60">{message.copy}</p>
      <button onClick={onClose} className="mt-3 rounded-full text-xs font-semibold text-white/60 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet">
        Dismiss
      </button>
    </div>
  )
}

function Modal({
  title,
  children,
  onClose,
}: {
  title: string
  children: React.ReactNode
  onClose: () => void
}) {
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    closeRef.current?.focus()

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onClose])

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/50 p-6 backdrop-blur-sm"
      onClick={onClose}
    >
      <div className="max-w-md rounded-[2rem] bg-[#fffaf0] p-10 shadow-phone" onClick={(event) => event.stopPropagation()}>
        <h2 id="modal-title" className="sr-only">{title}</h2>
        {children}
        <div className="mt-8">
          <AppButton onClick={onClose}>Close</AppButton>
        </div>
        <button ref={closeRef} onClick={onClose} className="sr-only">Close note</button>
      </div>
    </div>
  )
}

function Breadcrumbs({ current }: { current: string }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8 text-sm text-ink/45">
      <button onClick={() => window.dispatchEvent(new CustomEvent('zingly:navigate', { detail: 'home' }))} className="rounded-full hover:text-violet focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet">
        Home
      </button>
      <span className="mx-2">/</span>
      <span className="text-ink/70">{current}</span>
    </nav>
  )
}

function EmptyState({ title, copy }: { title: string; copy: string }) {
  return (
    <div className="rounded-[2rem] bg-white p-8 text-center">
      <div className="mx-auto mb-5 h-16 w-16 rounded-3xl bg-canvas" />
      <h1 className="font-display text-5xl font-semibold leading-tight">{title}</h1>
      <p className="mx-auto mt-3 max-w-sm leading-7 text-ink/55">{copy}</p>
    </div>
  )
}

function LoadingSkeleton() {
  return (
    <div aria-hidden="true" className="grid gap-4 rounded-[2rem] bg-white p-5 shadow-soft">
      <div className="h-36 animate-pulse rounded-[1.5rem] bg-canvas" />
      <div className="h-4 w-2/3 animate-pulse rounded-full bg-canvas" />
      <div className="h-4 w-1/2 animate-pulse rounded-full bg-canvas" />
    </div>
  )
}

function Pagination({
  page,
  total,
  onChange,
}: {
  page: number
  total: number
  onChange: (page: number) => void
}) {
  return (
    <nav aria-label="Pagination" className="mt-10 flex justify-center gap-2">
      {Array.from({ length: total }, (_, index) => index + 1).map((item) => (
        <button
          key={item}
          onClick={() => onChange(item)}
          aria-current={page === item ? 'page' : undefined}
          className={`h-10 w-10 rounded-full text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet ${
            page === item ? 'bg-violet text-white' : 'bg-white text-ink/55 hover:text-violet'
          }`}
        >
          {item}
        </button>
      ))}
    </nav>
  )
}

function LogoMark({ className = 'h-8 w-8' }: { className?: string }) {
  return (
    <img
      src="/zingly.svg"
      alt=""
      aria-hidden="true"
      className={`${className} rounded-full object-contain`}
    />
  )
}

function Nav({ page, setPage }: { page: Page; setPage: (page: Page) => void }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false)
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  function navigate(next: Page) {
    setOpen(false)
    setPage(next)
  }

  const mobileLinks = [...pageLinks, ...legalLinks]

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <nav className="relative z-[70] mx-auto w-full max-w-5xl rounded-full border border-black/10 bg-white/85 px-4 py-3 shadow-soft backdrop-blur">
        <div className="flex items-center justify-between gap-3 md:justify-center md:gap-8">
          <button onClick={() => navigate('home')} className="flex items-center gap-2 rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet">
            <LogoMark />
            <span className="font-semibold tracking-tight">Zingly</span>
          </button>
          <div className="hidden items-center gap-1 md:flex">
            {pageLinks.map((link) => (
              <button
                key={link.page}
                onClick={() => navigate(link.page)}
                aria-current={page === link.page ? 'page' : undefined}
                className={`rounded-full px-4 py-2 text-sm transition hover:text-violet focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet ${
                  page === link.page ? 'text-violet' : 'text-ink/60'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>
          <div className="hidden md:block">
            <AppButton tone="purple" onClick={() => navigate('download')}>Download App</AppButton>
          </div>
          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen((current) => !current)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet md:hidden ${
              open ? 'bg-violet text-white' : 'bg-ink text-white'
            }`}
          >
            {open ? 'Close' : 'Menu'}
          </button>
        </div>
      </nav>
      {open ? (
        <div
          id="mobile-navigation"
          className="fixed inset-0 z-[60] flex items-start justify-center bg-ink/35 px-4 pt-24 backdrop-blur-sm md:hidden"
          onClick={() => setOpen(false)}
        >
          <div className="max-h-[calc(100vh-7rem)] w-full max-w-sm overflow-y-auto rounded-[1.6rem] bg-white/95 p-2 shadow-phone ring-1 ring-black/10" onClick={(event) => event.stopPropagation()}>
            <div className="grid gap-1.5">
              {mobileLinks.map((link) => (
                <button
                  key={link.page}
                  onClick={() => navigate(link.page)}
                  aria-current={page === link.page ? 'page' : undefined}
                  className={`rounded-[1.1rem] px-4 py-2.5 text-left text-base font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet ${
                    page === link.page ? 'bg-ink text-white' : 'text-ink/70 hover:bg-canvas hover:text-violet'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : null}
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

function WaveEdge({ position, fill = '#F7F7F7' }: { position: 'top' | 'bottom'; fill?: string }) {
  return (
    <svg
      className={`pointer-events-none absolute left-0 w-full ${position === 'top' ? '-top-px' : '-bottom-px rotate-180'}`}
      viewBox="0 0 1440 92"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        fill={fill}
        d="M0 38L80 45.3C160 53 320 67 480 58.7C640 50 800 18 960 16.7C1120 15 1280 45 1360 60L1440 75V0H0V38Z"
      />
    </svg>
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
  const widthClass = note.shape === 'scrap' ? 'min-w-32 max-w-52' : note.shape === 'sticky' ? 'min-w-28 max-w-44' : 'min-w-36 max-w-56'
  const radiusClass = note.shape === 'scrap' ? 'rounded-[1.1rem]' : 'rounded-2xl'
  const tapeClass =
    note.tape === 'corner'
      ? '-right-3 -top-2 h-5 w-14 rotate-[16deg]'
      : note.tape === 'side'
        ? '-left-5 top-1/2 h-5 w-14 -translate-y-1/2 rotate-90'
        : '-top-2 left-1/2 h-4 w-12 -translate-x-1/2 rotate-[-3deg]'

  return (
    <button
      onClick={onClick}
      aria-label={`Open note: ${note.text}`}
      className={`absolute ${widthClass} ${radiusClass} p-3 text-left font-hand leading-none shadow-note transition duration-300 hover:z-20 hover:-translate-y-2 focus-visible:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet`}
      style={{
        left: `${note.x}%`,
        top: `${note.y}%`,
        transform: `rotate(${note.rotate}deg) scale(${note.scale})`,
        backgroundColor: note.paper,
        color: note.ink,
        fontSize: `${note.fontSize}px`,
      }}
    >
      <span>{note.text}</span>
      <span className={`absolute ${tapeClass} rounded-sm bg-white/60`} />
    </button>
  )
}

function ScrapbookPreview({ setPage }: { setPage: (page: Page) => void }) {
  const [batchIndex, setBatchIndex] = useState(0)
  const previewNotes = getNoteBatch(wallNotes, batchIndex, 18)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setBatchIndex((current) => current + 1)
    }, WALL_BATCH_MS)

    return () => window.clearInterval(timer)
  }, [])

  return (
    <section className="relative overflow-hidden bg-white px-6 py-28">
      <WaveEdge position="top" />
      <WaveEdge position="bottom" />
      <div className="relative mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="Community"
          title="The Zingly Wall"
          copy="Thousands of visitors have left their mark. Add yours and become part of the Zingly story."
        />
        <div className="no-scrollbar overflow-x-auto rounded-[2.5rem] shadow-soft">
          <div className="relative h-[520px] min-w-[960px] overflow-hidden bg-paper md:min-w-0">
            <div className="absolute inset-y-0 left-16 w-px bg-red-900/10" />
            {previewNotes.map((note) => <NoteCard key={note.id} note={note} />)}
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
                        <h1 className="font-display text-6xl font-semibold leading-none tracking-tight md:text-8xl">
              Find somewhere <span className="italic">worth</span> calling home.
            </h1>
            <p className="mt-7 max-w-md text-lg leading-8 text-ink/60">
              Rooms, apartments, houses, stores, offices, and land in one quiet app. Browse, shortlist, list your own space, and contact advertisers directly.
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

      <section className="relative overflow-hidden bg-white px-6 py-28">
        <WaveEdge position="top" />
        <WaveEdge position="bottom" />
        <div className="relative mx-auto max-w-6xl">
          <SectionHeader eyebrow="On Zingly now" title={<>Spaces that <span className="italic">move you.</span></>} />
          <div className="no-scrollbar -mx-6 flex snap-x gap-6 overflow-x-auto px-6 pb-6 md:mx-0 md:grid md:grid-cols-4 md:items-start md:overflow-visible md:px-0 md:pb-0">
            {properties.map((property, index) => (
              <PropertyCard key={property.title} property={property} className={`w-[78vw] flex-none snap-center sm:w-[22rem] md:w-auto ${index % 2 ? 'md:mt-16' : ''}`} />
            ))}
          </div>
          <p className="mt-10 text-center text-sm text-ink/45">
            Zingly connects property seekers with owners, landlords, and agents who advertise listings. No bookings, payments, reservations, or contracts are handled by Zingly.
          </p>
        </div>
      </section>

      <section
        className="relative my-16 overflow-hidden bg-ink px-6 py-28 text-white md:my-24 md:py-36"
        style={{ clipPath: 'polygon(0 5%, 100% 0, 100% 94%, 0 100%)' }}
      >
        <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: 'radial-gradient(circle at 20% 20%, #ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="mb-6 text-xs font-semibold uppercase tracking-[0.32em] text-violet">Editorial story</p>
            <h2 className="font-display text-5xl font-semibold leading-[0.98] tracking-tight md:text-8xl">
              Less search.
              <span className="block italic text-white/70">More noticing.</span>
            </h2>
            <p className="mt-8 max-w-md text-lg leading-9 text-white/58">
              Zingly gives each space the quiet it deserves. Details are present, but never louder than the feeling of arriving somewhere that fits.
            </p>
            <div className="mt-10 max-w-sm rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 backdrop-blur">
              <p className="font-display text-3xl italic leading-tight text-white/86">A property app with the restraint of an architecture journal.</p>
            </div>
          </div>
          <div className="relative min-h-[620px]">
            <img
              className="absolute right-0 top-0 h-[31rem] w-[82%] rounded-[2.75rem] object-cover shadow-phone"
              src="https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=1100&q=80"
              alt="Calm luxury living room"
            />
            <img
              className="absolute bottom-0 left-0 h-72 w-[58%] rounded-[2rem] border-[10px] border-ink object-cover shadow-soft"
              src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=80"
              alt="Architectural interior detail"
            />
            <div className="absolute bottom-20 right-6 max-w-48 rounded-[1.75rem] bg-white p-5 text-ink shadow-soft">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet">No booking layer</p>
              <p className="mt-3 text-sm leading-6 text-ink/60">Browse the place, list a space, or contact the advertiser. Keep the process direct.</p>
            </div>
          </div>
        </div>
      </section>

      <ScrapbookPreview setPage={setPage} />
      <DownloadCta setPage={setPage} />
    </>
  )
}

function Explore() {
  const [collectionPage, setCollectionPage] = useState(1)
  const pageSize = 3
  const totalPages = Math.ceil(collections.length / pageSize)
  const visibleCollections = collections.slice((collectionPage - 1) * pageSize, collectionPage * pageSize)

  return (
    <main className="px-6 pb-24 pt-36">
      <div className="mx-auto max-w-6xl">
        <Breadcrumbs current="Explore" />
        <SectionHeader eyebrow="Explore" title="Curated paths into the property market." copy="Collections replace clutter. Each category feels considered, visual, and direct." />
        <div className="grid gap-8 md:grid-cols-2">
          {visibleCollections.map(([title, copy, image], index) => (
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
        <Pagination page={collectionPage} total={totalPages} onChange={setCollectionPage} />
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
      shape: 'sticky',
      tape: 'top',
      ink: '#111111',
      fontSize: 24,
    }
    setNotes([next, ...notes])
    event.currentTarget.reset()
  }

  return (
    <main className="px-6 pb-24 pt-36">
      <div className="mx-auto max-w-6xl">
        <Breadcrumbs current="Community" />
        <SectionHeader eyebrow="The Zingly Wall" title="Leave Your Mark." copy="Add your name, a small note, or a memory from your search. The wall grows like a guestbook filled over many years." />
        <form onSubmit={submitMark} className="mx-auto mb-10 grid max-w-3xl gap-3 rounded-[2rem] bg-white p-3 shadow-soft md:grid-cols-[1fr_1.6fr_auto]">
          <input name="name" aria-label="Name" className="rounded-full bg-canvas px-5 py-4 outline-none focus:ring-2 focus:ring-violet" placeholder="Name" />
          <input name="message" aria-label="Optional short message" maxLength={44} className="rounded-full bg-canvas px-5 py-4 outline-none focus:ring-2 focus:ring-violet" placeholder="Optional short message" />
          <AppButton type="submit" tone="purple">Sign</AppButton>
        </form>
        <div className="mb-5 flex justify-center gap-2" role="group" aria-label="Filter wall notes">
          {(['Recent', 'Popular', 'Random'] as const).map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              aria-pressed={filter === item}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet ${filter === item ? 'bg-violet text-white' : 'bg-white text-ink/60 hover:text-violet'}`}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="no-scrollbar overflow-x-auto rounded-[2.75rem] shadow-soft">
          <div className="relative h-[1380px] min-w-[1420px] overflow-hidden bg-paper md:min-w-0">
            <div className="absolute inset-y-0 left-16 w-px bg-red-900/10" />
            <div className="absolute left-8 top-8 font-hand text-3xl text-ink/20">Zingly, since the first search</div>
            <div className="absolute right-[12%] top-[11%] rotate-6 font-hand text-6xl text-ink/10">home</div>
            <div className="absolute left-[18%] top-[42%] h-14 w-20 rotate-[-8deg] rounded-full border-2 border-ink/10" />
            <div className="absolute bottom-[16%] right-[22%] font-hand text-4xl text-violet/20">call the agent</div>
            {ordered.map((note) => <NoteCard key={note.id} note={note} onClick={() => setSelected(note)} />)}
          </div>
        </div>
      </div>
      {selected ? (
        <Modal title="Community note" onClose={() => setSelected(null)}>
            <p className="font-hand text-5xl leading-tight">{selected.text}</p>
            <p className="mt-8 text-sm text-ink/45">Signed by {selected.name}</p>
        </Modal>
      ) : null}
    </main>
  )
}

function About() {
  return (
    <main className="px-6 pb-24 pt-36">
      <div className="mx-auto max-w-6xl">
        <Breadcrumbs current="About" />
        <SectionHeader eyebrow="About" title="A calmer way to meet the property market." />
        <div className="grid gap-8 md:grid-cols-[1.1fr_0.9fr]">
          <img className="h-[36rem] rounded-[2.5rem] object-cover shadow-soft" src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1000&q=80" alt="Architectural interior with soft light" />
          <div className="space-y-6">
            {[
              ['Mission', 'Help people discover and advertise rooms, homes, stores, offices, and land without making the process feel noisy or transactional.'],
              ['Vision', 'A trusted property discovery layer where good spaces are presented with care and advertisers are simple to contact.'],
              ['Why it exists', 'People do not need another booking engine. They need a beautiful, direct way to see what is available, list what they have, and start a real conversation.'],
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

function Contact({ showToast }: { showToast: (message: Omit<ToastMessage, 'id'>) => void }) {
  function submitContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    showToast({
      title: 'Message ready',
      copy: 'Thanks for reaching out. This prototype captured the message state without sending email.',
    })
    event.currentTarget.reset()
  }

  return (
    <main className="px-6 pb-24 pt-36">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2">
        <div>
          <Breadcrumbs current="Contact" />
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-violet">Contact</p>
          <h1 className="font-display text-6xl font-semibold leading-tight">A simple note is enough.</h1>
          <p className="mt-6 max-w-md leading-8 text-ink/60">Questions about Zingly, advertising, support, or partnerships can start here.</p>
          <img className="mt-10 h-80 rounded-[2rem] object-cover shadow-soft" src="https://images.unsplash.com/photo-1604014237800-1c9102c219da?auto=format&fit=crop&w=900&q=80" alt="Minimal architecture" />
        </div>
        <form onSubmit={submitContact} className="space-y-4 rounded-[2.5rem] bg-white p-6 shadow-soft">
          <FormField label="Name" name="name" required />
          <FormField label="Email" name="email" type="email" required />
          <FormField label="Subject" name="subject" required />
          <FormField label="Message" name="message" multiline required />
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm text-ink/50">hello@zingly.app / Instagram / LinkedIn</p>
            <AppButton type="submit" tone="purple">Send message</AppButton>
          </div>
        </form>
      </div>
    </main>
  )
}

function DownloadCta({ setPage }: { setPage: (page: Page) => void }) {
  return (
    <section className="px-6 py-24">
      <div
        className="mx-auto grid max-w-6xl items-center gap-10 rounded-[2.75rem] bg-ink p-8 text-white shadow-soft md:grid-cols-[0.8fr_1.2fr] md:p-16"
      >
        <div className="flex justify-center"><PhoneMockup light /></div>
        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-violet">Download</p>
          <h2 className="font-display text-5xl font-semibold leading-tight md:text-7xl">Your next place is one tap away.</h2>
          <p className="mt-6 max-w-md leading-8 text-white/55">Download the mobile app to browse curated property listings, advertise your own space, and contact people directly.</p>
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
          <Breadcrumbs current="Download" />
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-violet">Available now</p>
          <h1 className="font-display text-6xl font-semibold leading-tight md:text-8xl">Download Zingly.</h1>
          <p className="mt-6 max-w-md leading-8 text-ink/60">Scan the code, choose your store, and start discovering or advertising rooms, apartments, houses, stores, offices, and land.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <DownloadBadge store="App Store" />
            <DownloadBadge store="Google Play" />
          </div>
          <div className="mt-8 flex h-40 w-40 items-center justify-center rounded-[2rem] bg-white text-center text-xs font-semibold text-ink/40 shadow-soft">QR code placeholder</div>
        </div>
        <div className="relative min-h-[620px] rounded-[2.75rem] bg-white p-8 shadow-soft">
          <div className="absolute left-12 top-16 rotate-[-5deg]"><PhoneMockup /></div>
          <div className="absolute right-12 top-32 rotate-[5deg]"><PhoneMockup light /></div>
          <div className="absolute bottom-8 left-8 right-8 hidden md:block">
            <LoadingSkeleton />
          </div>
        </div>
      </div>
    </main>
  )
}

function FaqItem({
  question,
  answer,
  open,
  onToggle,
}: {
  question: string
  answer: string
  open: boolean
  onToggle: () => void
}) {
  const id = useId()
  const panelId = `${id}-panel`
  const buttonId = `${id}-button`

  return (
    <section className="rounded-[2rem] bg-white p-6 shadow-soft">
      <button
        id={buttonId}
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={panelId}
        className="flex w-full items-center justify-between text-left font-display text-2xl font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet"
      >
        {question}
        <span className="text-violet" aria-hidden="true">{open ? '-' : '+'}</span>
      </button>
      <div id={panelId} role="region" aria-labelledby={buttonId} hidden={!open}>
        <p className="mt-4 leading-8 text-ink/60">{answer}</p>
      </div>
    </section>
  )
}

function Faq() {
  const [open, setOpen] = useState(0)
  const faqs = [
    ['How does Zingly work?', 'Browse listings in the mobile app, save spaces you like, advertise your own space, and contact people directly.'],
    ['Do I pay through Zingly?', 'No. Zingly does not handle payments, reservations, rental agreements, purchase agreements, or contracts.'],
    ['Can anyone advertise?', 'Property owners, landlords, and licensed agents can advertise rooms, apartments, houses, stores, offices, and land.'],
    ['Is the app free?', 'The app is free for property seekers to download and browse. Advertisers can add listings through the app.'],
    ['How do I contact an agent?', 'Open a listing and use the advertiser contact options shown in the app.'],
  ]
  return (
    <main className="px-6 pb-24 pt-36">
      <div className="mx-auto max-w-3xl">
        <Breadcrumbs current="FAQ" />
      </div>
      <SectionHeader eyebrow="FAQ" title="Clear answers, quietly presented." />
      <div className="mx-auto max-w-3xl space-y-3">
        {faqs.map(([question, answer], index) => (
          <FaqItem key={question} question={question} answer={answer} open={open === index} onToggle={() => setOpen(open === index ? -1 : index)} />
        ))}
      </div>
    </main>
  )
}

function ReadingPage({ kind }: { kind: 'Privacy Policy' | 'Terms of Service' }) {
  const sections = [
    ['Overview', 'Zingly is a property discovery platform that connects property seekers with people advertising rooms, apartments, houses, stores, offices, and land.'],
    ['Discovery only', 'Zingly does not process payments, reservations, bookings, rental agreements, purchase agreements, or contracts.'],
    ['Information', 'We may collect account, contact, device, and usage information needed to operate and improve the service.'],
    ['Advertisers', 'Owners, landlords, and agents are responsible for the accuracy, legality, and availability of their listings and communications.'],
    ['Contact', 'Questions can be sent to hello@zingly.app.'],
  ]
  return (
    <main className="px-6 pb-24 pt-36">
      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[16rem_1fr]">
        <div className="md:col-span-2">
          <Breadcrumbs current={kind} />
        </div>
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
        <EmptyState title="Looks like this address moved." copy="This page is not part of the current Zingly public website." />
        <div className="mt-8"><AppButton tone="purple" onClick={() => setPage('home')}>Return home</AppButton></div>
      </section>
    </main>
  )
}

function Footer({
  setPage,
  showToast,
}: {
  setPage: (page: Page) => void
  showToast: (message: Omit<ToastMessage, 'id'>) => void
}) {
  function submitNewsletter(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    showToast({
      title: 'Signed up',
      copy: 'The newsletter form captured your email for this prototype.',
    })
    event.currentTarget.reset()
  }

  return (
    <footer className="w-full bg-ink text-white">
      <div className="w-full p-8 md:p-12">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white p-1">
                <LogoMark className="h-9 w-9" />
              </span>
              <span className="text-lg font-semibold">Zingly</span>
            </div>
            <p className="max-w-sm leading-8 text-white/50">Premium property discovery and listing for rooms, apartments, houses, stores, offices, and land. Direct contact, no booking layer.</p>
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
          <form onSubmit={submitNewsletter}>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-white/30">Newsletter</p>
            <div className="rounded-full bg-white/10 p-2">
              <label className="sr-only" htmlFor="newsletter-email">Email address</label>
              <input id="newsletter-email" name="email" type="email" required className="w-full bg-transparent px-4 py-2 text-sm outline-none placeholder:text-white/30 focus:ring-2 focus:ring-violet" placeholder="Email address" />
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              <AppButton type="submit" tone="purple">Join list</AppButton>
              <DownloadBadge store="App Store" dark />
            </div>
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
  const [page, setPageState] = useState<Page>(() => pageFromLocation())
  const [toast, setToast] = useState<ToastMessage | null>(null)

  useEffect(() => {
    const syncFromLocation = () => {
      setPageState(pageFromLocation())
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    function onCustomNavigate(event: Event) {
      const next = (event as CustomEvent<Page>).detail
      setPage(next)
    }

    window.addEventListener('popstate', syncFromLocation)
    window.addEventListener('hashchange', syncFromLocation)
    window.addEventListener('zingly:navigate', onCustomNavigate)
    return () => {
      window.removeEventListener('popstate', syncFromLocation)
      window.removeEventListener('hashchange', syncFromLocation)
      window.removeEventListener('zingly:navigate', onCustomNavigate)
    }
  }, [])

  function setPage(next: Page) {
    const nextPath = pathForPage(next)
    if (window.location.pathname !== nextPath) window.history.pushState(null, '', nextPath)
    setPageState(next)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function showToast(message: Omit<ToastMessage, 'id'>) {
    setToast({ ...message, id: Date.now() })
  }

  const pageContent = {
    home: <Home setPage={setPage} />,
    explore: <Explore />,
    community: <Community />,
    about: <About />,
    contact: <Contact showToast={showToast} />,
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
      {page !== 'missing' ? <Footer setPage={setPage} showToast={showToast} /> : null}
      <Toast message={toast} onClose={() => setToast(null)} />
    </div>
  )
}
