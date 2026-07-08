import { useState, useEffect } from 'react'

interface ScrapEntry {
  id: number
  text: string
  x: number
  y: number
  rot: number
  fontSize: number
  color: string
}

const SEED_ENTRIES: ScrapEntry[] = [
  { id: 1,  text: 'Ralph was here',            x: 6,  y: 8,  rot: -4, fontSize: 1.6, color: '#111' },
  { id: 2,  text: 'Ama found her apartment ✓', x: 54, y: 5,  rot: 2,  fontSize: 1.1, color: '#333' },
  { id: 3,  text: 'Kojo',                      x: 35, y: 30, rot: -2, fontSize: 2.8, color: '#111' },
  { id: 4,  text: 'Sandra & Tom moved in!',    x: 12, y: 48, rot: 3,  fontSize: 1.2, color: '#555' },
  { id: 5,  text: 'Found my dream home 🏡',    x: 64, y: 20, rot: -1, fontSize: 1.0, color: '#333' },
  { id: 6,  text: 'Emeka was here 2024',        x: 70, y: 48, rot: 2,  fontSize: 1.1, color: '#444' },
  { id: 7,  text: '— Abena loves Accra',        x: 5,  y: 70, rot: 1,  fontSize: 1.2, color: '#222' },
  { id: 8,  text: 'Mawuli',                    x: 42, y: 60, rot: -5, fontSize: 2.4, color: '#111' },
  { id: 9,  text: 'Jay visited today',          x: 62, y: 70, rot: -2, fontSize: 1.3, color: '#444' },
  { id: 10, text: 'Nana Akua 💜',               x: 78, y: 12, rot: -1, fontSize: 1.5, color: '#800080' },
  { id: 11, text: 'Seun & family',             x: 20, y: 82, rot: 4,  fontSize: 1.4, color: '#333' },
  { id: 12, text: 'Yaw found his office',       x: 44, y: 82, rot: -3, fontSize: 1.1, color: '#555' },
  { id: 13, text: 'Akosua',                    x: 82, y: 60, rot: 3,  fontSize: 2.0, color: '#222' },
  { id: 14, text: 'This app is everything',    x: 25, y: 16, rot: -1, fontSize: 1.0, color: '#666' },
]

const COLORS = ['#111111', '#222222', '#333333', '#555555', '#800080']

function getRandomColor() {
  return COLORS[Math.floor(Math.random() * COLORS.length)]
}

const STORAGE_KEY = 'zingly-wall'

function loadEntries(): ScrapEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch {}
  return []
}

function saveEntries(entries: ScrapEntry[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries))
  } catch {}
}

function placeNew(text: string): ScrapEntry {
  const newId = Date.now()
  // Simple random placement avoiding obvious pile-ups
  const x = 5 + Math.random() * 75
  const y = 5 + Math.random() * 80
  const rot = (Math.random() - 0.5) * 12
  const fontSize = 1.0 + Math.random() * 1.2
  return { id: newId, text, x, y, rot, fontSize, color: getRandomColor() }
}

export default function Scrapbook() {
  const [userEntries, setUserEntries] = useState<ScrapEntry[]>([])
  const [input, setInput] = useState('')
  const [justAdded, setJustAdded] = useState<number | null>(null)

  useEffect(() => {
    setUserEntries(loadEntries())
  }, [])

  const allEntries = [...SEED_ENTRIES, ...userEntries]

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const trimmed = input.trim()
    if (!trimmed || trimmed.length > 60) return

    const newEntry = placeNew(trimmed)
    const updated = [...userEntries, newEntry]
    setUserEntries(updated)
    saveEntries(updated)
    setInput('')
    setJustAdded(newEntry.id)
    setTimeout(() => setJustAdded(null), 2000)
  }

  return (
    <section
      className="py-24 px-6"
      style={{ backgroundColor: '#111111' }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="mb-12 text-center">
          <div
            className="text-xs font-medium mb-4 uppercase tracking-widest"
            style={{ color: '#800080', fontFamily: 'var(--font-sans)' }}
          >
            Community
          </div>
          <h2
            className="leading-tight mb-4"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.2rem, 4vw, 3.5rem)',
              fontWeight: '600',
              color: '#FFFFFF',
              letterSpacing: '-0.02em',
            }}
          >
            The Zingly Wall
          </h2>
          <p
            className="text-sm max-w-sm mx-auto"
            style={{ color: '#888888', fontFamily: 'var(--font-sans)', fontWeight: '300', lineHeight: 1.7 }}
          >
            Everyone who's found their space leaves a mark.
          </p>
        </div>

        {/* Scrapbook canvas */}
        <div
          className="relative w-full overflow-hidden"
          style={{
            height: '520px',
            backgroundColor: '#F7F3ED',
            borderRadius: '28px',
            backgroundImage: `
              repeating-linear-gradient(
                0deg,
                transparent,
                transparent 27px,
                rgba(0,0,0,0.04) 27px,
                rgba(0,0,0,0.04) 28px
              )
            `,
          }}
        >
          {/* Notebook margin line */}
          <div
            className="absolute top-0 bottom-0"
            style={{
              left: '60px',
              width: '1px',
              backgroundColor: 'rgba(200,150,150,0.3)',
            }}
          />

          {/* Entries */}
          {allEntries.map((entry) => (
            <div
              key={entry.id}
              className="absolute select-none transition-opacity duration-500"
              style={{
                left: `${entry.x}%`,
                top: `${entry.y}%`,
                transform: `rotate(${entry.rot}deg)`,
                fontFamily: 'var(--font-hand)',
                fontSize: `${entry.fontSize}rem`,
                color: entry.color,
                whiteSpace: 'nowrap',
                opacity: justAdded === entry.id ? 0 : 1,
                animation: justAdded === entry.id ? 'none' : undefined,
              }}
            >
              {entry.text}
            </div>
          ))}

          {/* New entry animation */}
          {justAdded !== null && (() => {
            const e = allEntries.find((x) => x.id === justAdded)
            if (!e) return null
            return (
              <div
                className="absolute select-none"
                style={{
                  left: `${e.x}%`,
                  top: `${e.y}%`,
                  transform: `rotate(${e.rot}deg)`,
                  fontFamily: 'var(--font-hand)',
                  fontSize: `${e.fontSize}rem`,
                  color: '#800080',
                  whiteSpace: 'nowrap',
                  animation: 'fadeInScale 0.4s ease forwards',
                }}
              >
                {e.text}
              </div>
            )
          })()}
        </div>

        {/* Input */}
        <div className="mt-10 flex justify-center">
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-3 p-2"
            style={{
              backgroundColor: '#1E1E1E',
              borderRadius: '9999px',
              border: '1px solid #2E2E2E',
              width: '100%',
              maxWidth: '480px',
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              maxLength={60}
              placeholder="Leave your mark… e.g. Kofi was here"
              className="flex-1 bg-transparent outline-none text-sm px-4"
              style={{
                color: '#FFFFFF',
                fontFamily: 'var(--font-hand)',
                fontSize: '1rem',
              }}
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="px-5 py-2.5 text-sm font-medium transition-all duration-200 flex-shrink-0"
              style={{
                backgroundColor: input.trim() ? '#800080' : '#333333',
                color: '#FFFFFF',
                borderRadius: '9999px',
                fontFamily: 'var(--font-sans)',
                cursor: input.trim() ? 'pointer' : 'not-allowed',
              }}
            >
              Sign the wall
            </button>
          </form>
        </div>

        <p
          className="text-center mt-4 text-xs"
          style={{ color: '#555555', fontFamily: 'var(--font-sans)' }}
        >
          {allEntries.length} people have signed the Zingly Wall
        </p>
      </div>

      <style>{`
        @keyframes fadeInScale {
          from { opacity: 0; transform: rotate(var(--rot, 0deg)) scale(0.6); }
          to   { opacity: 1; transform: rotate(var(--rot, 0deg)) scale(1); }
        }
      `}</style>
    </section>
  )
}
