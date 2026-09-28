import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { ClientEntry } from './content'

// ── Clients masonry grid ─────────────────────────────────────────────────────
// Pinterest-style reveal for the "Ils nous font confiance" section: brand-
// colored gradient tiles (no stock photography — these are real named clients
// with no project imagery on hand, so a fabricated "project photo" would be
// misleading) staggered into view on scroll. Each tile shows just the client
// name by default; tapping/clicking it expands the card in place to reveal
// the mission description and tags — the disclosure doubles as the touch
// equivalent of a hover reveal, since it works identically on mobile.

const ACCENTS: [string, string][] = [
  ['#00A6A3', '#00615F'], // turquoise
  ['#F26F76', '#B83138'], // coral
  ['#2E9BD6', '#115D84'], // blue
  ['#8FD1AE', '#3F8A68'], // mint
  ['#FBC968', '#C98F17'], // gold
  ['#9B1257', '#4D062C'], // bordeaux
]

// Deterministic height rhythm so the columns interlock like a real masonry
// wall instead of lining back up into a plain grid.
const HEIGHTS = [300, 230, 340, 260, 290, 320, 240, 360]

// Short teaser shown by default on the tile; the full sentence only appears
// once the card is expanded.
const PREVIEW_WORD_COUNT = 6

function previewOf(desc: string) {
  const words = desc.trim().split(/\s+/)
  if (words.length <= PREVIEW_WORD_COUNT) return desc
  return `${words.slice(0, PREVIEW_WORD_COUNT).join(' ')}…`
}

const tileVariants = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const } },
}

function ClientTile({ c, index }: { c: ClientEntry; index: number }) {
  const [open, setOpen] = useState(false)
  const [from, to] = ACCENTS[index % ACCENTS.length]
  const height = HEIGHTS[index % HEIGHTS.length]

  return (
    <motion.div
      className="client-tile"
      style={{ minHeight: height }}
      variants={tileVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ type: 'spring', stiffness: 320, damping: 24 }}
    >
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
    </motion.div>
  )
}

export function ClientsMasonry({ clients }: { clients: ClientEntry[] }) {
  return (
    <div className="clients-masonry">
      {clients.map((c, i) => (
        <ClientTile key={c.name} c={c} index={i} />
      ))}
    </div>
  )
}
