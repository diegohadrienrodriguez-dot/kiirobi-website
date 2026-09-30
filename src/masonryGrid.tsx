import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { ClientEntry } from './content'

// ── Clients marquee — "Ils nous font confiance" ─────────────────────────────
// Vertically scrolling columns, each looping seamlessly (rendered twice,
// scrubbed from 0 to -50% so the seam is invisible). Brand-colored gradient
// tiles (no stock photography — these are real named clients with no project
// imagery on hand, so a fabricated "project photo" would be misleading).
// Tapping/clicking a tile expands it in place to reveal the mission
// description and tags — the disclosure doubles as the touch equivalent of a
// hover reveal, since it works identically on mobile. Hovering a column
// pauses its scroll so a tile can be read/expanded without it drifting away.

const ACCENTS: [string, string][] = [
  ['#00A6A3', '#00615F'], // turquoise
  ['#F26F76', '#B83138'], // coral
  ['#2E9BD6', '#115D84'], // blue
  ['#8FD1AE', '#3F8A68'], // mint
  ['#FBC968', '#C98F17'], // gold
  ['#9B1257', '#4D062C'], // bordeaux
]

// Deterministic height rhythm so a column doesn't read as a flat, uniform list.
const HEIGHTS = [300, 230, 340, 260, 290, 320, 240, 360]

// One duration per column — slow and mutually offset so the columns never
// fall back into visual sync with one another.
const COLUMN_DURATIONS = [42, 52, 46, 58]
const COLUMN_CLASSES = ['', 'clients-col-2', 'clients-col-3', 'clients-col-4']

// Short teaser shown by default on the tile; the full sentence only appears
// once the card is expanded.
const PREVIEW_WORD_COUNT = 6

function previewOf(desc: string) {
  const words = desc.trim().split(/\s+/)
  if (words.length <= PREVIEW_WORD_COUNT) return desc
  return `${words.slice(0, PREVIEW_WORD_COUNT).join(' ')}…`
}

function ClientTile({ c, index }: { c: ClientEntry; index: number }) {
  const [open, setOpen] = useState(false)
  const [from, to] = ACCENTS[index % ACCENTS.length]
  const height = HEIGHTS[index % HEIGHTS.length]

  return (
    <div className="client-tile" style={{ minHeight: height }}>
      <div className="client-tile-photo" style={{ backgroundImage: `url(${c.image})` }} />
      <div className="client-tile-tint" style={{ background: `linear-gradient(155deg, ${from}b3, ${to}b3)` }} />
      <button
        type="button"
        className="client-tile-trigger"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="client-tile-toggle" aria-hidden="true">+</span>
        <div className="client-tile-body">
          <div className="client-tile-name">{c.logo}</div>
          {!open && <p className="client-tile-preview">{previewOf(c.desc)}</p>}
          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                style={{ overflow: 'hidden' }}
              >
                <p className="client-tile-desc">{c.desc}</p>
                <div className="client-tile-tags">
                  {c.tags.map((tag) => (
                    <span key={tag} className="client-tile-tag">{tag}</span>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </button>
    </div>
  )
}

function ClientColumn({ clients, offset, duration, className }: {
  clients: ClientEntry[]; offset: number; duration: number; className: string
}) {
  return (
    <div className={`clients-column ${className}`}>
      <div className="clients-column-track" style={{ animationDuration: `${duration}s` }}>
        {[0, 1].map((rep) => (
          <div className="clients-column-set" key={rep} aria-hidden={rep === 1 || undefined}>
            {clients.map((c, i) => (
              <ClientTile key={`${rep}-${c.name}`} c={c} index={offset + i} />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export function ClientsMasonry({ clients }: { clients: ClientEntry[] }) {
  const columnCount = 4
  const perColumn = Math.ceil(clients.length / columnCount)
  const columns = Array.from({ length: columnCount }, (_, i) => clients.slice(i * perColumn, (i + 1) * perColumn)).filter((c) => c.length > 0)

  return (
    <div className="clients-marquee">
      {columns.map((columnClients, i) => (
        <ClientColumn
          key={i}
          clients={columnClients}
          offset={i * perColumn}
          duration={COLUMN_DURATIONS[i % COLUMN_DURATIONS.length]}
          className={COLUMN_CLASSES[i]}
        />
      ))}
    </div>
  )
}
