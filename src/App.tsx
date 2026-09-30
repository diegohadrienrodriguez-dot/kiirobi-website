import { useState, useEffect, useRef, useContext, createContext } from 'react'
import { content, type Lang, type SiteContent, type StorySection } from './content'
import { useParallaxRef, ParallaxImage, ScrollProgress, refreshScrollFx } from './scrollFx'
import { ClientsMasonry } from './masonryGrid'

// ── Language context ───────────────────────────────────────────────────────
// Client-side toggle only (no separate routes per language — this stays a
// one-page app), so SEO metadata in .figma/make/site.json/index.html is not
// affected by this and remains French-only for now.
const LangContext = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({
  lang: 'fr',
  setLang: () => {},
})
function useLang() {
  return useContext(LangContext)
}

// ── Kiirobi Circuit-Tree Logo SVG ─────────────────────────────────────────────
// `speed` scales the whole draw-in timeline (1 = normal hero pace, <1 = faster
// — used by the intro splash to finish the drawing quickly before it
// shrinks into the header). `pulses` lets a caller opt out of the looping
// signal animation independently of the one-shot draw-in (`animated`).
function CircuitTree({ size = 80, animated = false, muted = false, speed = 1, pulses: showPulses }: {
  size?: number; animated?: boolean; muted?: boolean; speed?: number; pulses?: boolean
}) {
  const opacity = muted ? 0.07 : 1
  const cls = animated ? 'circuit-line' : ''
  const nodeCls = animated ? 'circuit-node' : ''
  const colors = muted
    ? { c: '#008E8C', b: '#008E8C', m: '#008E8C', g: '#008E8C', t: '#008E8C' }
    : { c: '#EE545C', b: '#1980BA', m: '#73C39C', g: '#F8BA40', t: '#008E8C' }

  const delay = (s: number) => `${(s * speed).toFixed(3)}s`
  const lineDuration = (s: number) => `${Math.max(s * speed, 0.12).toFixed(3)}s`
  const nodeDuration = `${Math.max(0.4 * speed, 0.15).toFixed(3)}s`

  // Continuous "signal" loop once the draw-in is done: a colored pulse
  // travels from the root up each of the 4 branches to its leaf, with a
  // ping-style flash on arrival. Defaults to following `animated`, but the
  // intro splash turns it off (its own draw-in is too short-lived to matter).
  const pulses = [
    { path: 'M40,72 L40,44 L18,28 L10,12', x: 10, y: 12, color: colors.c, offset: 0 },
    { path: 'M40,72 L40,44 L18,28 L28,12', x: 28, y: 12, color: colors.b, offset: 0.12 },
    { path: 'M40,72 L40,44 L62,28 L52,12', x: 52, y: 12, color: colors.m, offset: 0.24 },
    { path: 'M40,72 L40,44 L62,28 L70,12', x: 70, y: 12, color: colors.g, offset: 0.36 },
  ]
  const pulseDuration = 2.6
  const renderPulses = showPulses ?? animated

  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" style={{ opacity, overflow: 'visible' }}>
      {/* trunk */}
      <line x1="40" y1="72" x2="40" y2="44" stroke={colors.t} strokeWidth="2.5" className={cls} style={animated ? { animationDelay: delay(0), animationDuration: lineDuration(0.8) } : {}} />
      {/* main branches */}
      <line x1="40" y1="44" x2="18" y2="28" stroke={colors.t} strokeWidth="2" className={cls} style={animated ? { animationDelay: delay(0.4), animationDuration: lineDuration(0.7) } : {}} />
      <line x1="40" y1="44" x2="62" y2="28" stroke={colors.t} strokeWidth="2" className={cls} style={animated ? { animationDelay: delay(0.4), animationDuration: lineDuration(0.7) } : {}} />
      {/* sub-branches left */}
      <line x1="18" y1="28" x2="10" y2="14" stroke={colors.t} strokeWidth="1.5" className={cls} style={animated ? { animationDelay: delay(0.9), animationDuration: lineDuration(0.6) } : {}} />
      <line x1="18" y1="28" x2="28" y2="14" stroke={colors.t} strokeWidth="1.5" className={cls} style={animated ? { animationDelay: delay(0.9), animationDuration: lineDuration(0.6) } : {}} />
      {/* sub-branches right */}
      <line x1="62" y1="28" x2="52" y2="14" stroke={colors.t} strokeWidth="1.5" className={cls} style={animated ? { animationDelay: delay(0.9), animationDuration: lineDuration(0.6) } : {}} />
      <line x1="62" y1="28" x2="70" y2="14" stroke={colors.t} strokeWidth="1.5" className={cls} style={animated ? { animationDelay: delay(0.9), animationDuration: lineDuration(0.6) } : {}} />
      {/* nodes — leaf tips */}
      <circle cx="10" cy="12" r="4" fill={colors.c} className={nodeCls} style={animated ? { animationDelay: delay(1.4), animationDuration: nodeDuration } : {}} />
      <circle cx="28" cy="12" r="4" fill={colors.b} className={nodeCls} style={animated ? { animationDelay: delay(1.55), animationDuration: nodeDuration } : {}} />
      <circle cx="52" cy="12" r="4" fill={colors.m} className={nodeCls} style={animated ? { animationDelay: delay(1.7), animationDuration: nodeDuration } : {}} />
      <circle cx="70" cy="12" r="4" fill={colors.g} className={nodeCls} style={animated ? { animationDelay: delay(1.85), animationDuration: nodeDuration } : {}} />
      {/* junction nodes */}
      <circle cx="18" cy="28" r="3" fill={colors.t} className={nodeCls} style={animated ? { animationDelay: delay(1.0), animationDuration: nodeDuration } : {}} />
      <circle cx="62" cy="28" r="3" fill={colors.t} className={nodeCls} style={animated ? { animationDelay: delay(1.0), animationDuration: nodeDuration } : {}} />
      <circle cx="40" cy="44" r="3.5" fill={colors.t} className={nodeCls} style={animated ? { animationDelay: delay(0.45), animationDuration: nodeDuration } : {}} />
      {/* root node */}
      <circle cx="40" cy="72" r="3" fill={colors.t} className={nodeCls} style={animated ? { animationDelay: delay(0), animationDuration: nodeDuration } : {}} />

      {/* ── Signal pulses — continuous loop, starts once the draw-in has finished ── */}
      {renderPulses && (
        <g className="circuit-pulses">
          {pulses.map(({ path, x, y, color, offset }) => {
            const begin = `${(2.3 + offset).toFixed(2)}s`
            return (
              <g key={path}>
                <circle r="2.2" fill={color} opacity="0">
                  <animateMotion path={path} dur={`${pulseDuration}s`} begin={begin} repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.05;0.92;1" dur={`${pulseDuration}s`} begin={begin} repeatCount="indefinite" />
                </circle>
                <circle cx={x} cy={y} r="4" fill="none" stroke={color} strokeWidth="1.4" opacity="0">
                  <animate attributeName="r" values="4;4;10" keyTimes="0;0.85;1" dur={`${pulseDuration}s`} begin={begin} repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0;0;0.8;0" keyTimes="0;0.85;0.93;1" dur={`${pulseDuration}s`} begin={begin} repeatCount="indefinite" />
                </circle>
              </g>
            )
          })}
        </g>
      )}
    </svg>
  )
}

// ── FadeSection wrapper ───────────────────────────────────────────────────────
// `delay` (seconds) staggers siblings that reveal at roughly the same time —
// e.g. a grid of cards — mirroring the reference site's `data-reveal-group`.
function FadeSection({ children, style = {}, className = '', delay = 0 }: { children: React.ReactNode; style?: React.CSSProperties; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect() } }, { threshold: 0.07 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return (
    <div ref={ref} className={className} style={{ opacity: vis ? 1 : 0, transform: vis ? 'translateY(0)' : 'translateY(28px)', transition: `opacity 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}s`, ...style }}>
      {children}
    </div>
  )
}

// ── Small inline field icons — kept as hand-drawn SVG (no icon package in
// this project's dependencies) so the contact form can carry the same
// icon-in-field language as the reference design without adding a dependency.
function FieldIcon({ name, size = 18 }: { name: 'user' | 'mail' | 'phone' | 'message' | 'alert' | 'check'; size?: number }) {
  const common = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
  if (name === 'user') return <svg {...common}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
  if (name === 'mail') return <svg {...common}><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-10 5L2 7" /></svg>
  if (name === 'phone') return <svg {...common}><path d="M13.83 16.57a1 1 0 0 0 1.21-.3l.36-.47A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.47.35a1 1 0 0 0-.29 1.23 14 14 0 0 0 6.4 6.38Z" /></svg>
  if (name === 'message') return <svg {...common}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z" /></svg>
  if (name === 'alert') return <svg {...common}><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" /><path d="M12 9v4" /><path d="M12 17h.01" /></svg>
  return <svg {...common}><path d="M21.8 10A10 10 0 1 1 17 3.34" /><path d="m9 11 3 3L22 4" /></svg>
}

// A form field: icon-prefixed input/textarea, inline error on blur.
function Field({ icon, error, textarea, ...props }: {
  icon: 'user' | 'mail' | 'phone' | 'message'
  error?: string
  textarea?: boolean
} & React.InputHTMLAttributes<HTMLInputElement> & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const Tag = textarea ? 'textarea' : 'input'
  return (
    <div className="field">
      <span className="field-icon" aria-hidden="true"><FieldIcon name={icon} /></span>
      <Tag className={`field-input${error ? ' field-input-error' : ''}`} {...props} />
      {error && (
        <p className="field-error"><FieldIcon name="alert" size={13} />{error}</p>
      )}
    </div>
  )
}

// ── Mentions légales modal ────────────────────────────────────────────────────
function MentionsModal({ onClose, copy }: { onClose: () => void; copy: SiteContent['mentions'] }) {
  const dialogRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null
    const dialog = dialogRef.current

    // Lock body scroll while the modal is open
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    // Move focus into the modal
    dialog?.focus()

    function getFocusable(): HTMLElement[] {
      if (!dialog) return []
      return Array.from(dialog.querySelectorAll<HTMLElement>('a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'))
    }

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
        return
      }
      if (e.key === 'Tab') {
        const focusable = getFocusable()
        if (focusable.length === 0) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = prevOverflow
      previouslyFocused?.focus()
    }
  }, [onClose])

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="mentions-title"
        tabIndex={-1}
        style={{ background: '#fff', maxWidth: 640, width: '100%', maxHeight: '80vh', overflowY: 'auto', padding: 48, position: 'relative', outline: 'none' }}
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} aria-label={copy.closeLabel} style={{ position: 'absolute', top: 20, insetInlineEnd: 24, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.4rem', color: 'var(--ink)', transition: 'color 0.2s' }}>✕</button>
        <h2 id="mentions-title" style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '2rem', textTransform: 'uppercase', letterSpacing: '0.02em', marginBottom: 32 }}>{copy.title}</h2>
        {copy.sections.map(({ title, body }) => (
          <div key={title} style={{ marginBottom: 24, paddingBottom: 24, borderBottom: '1px solid var(--rule)' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--turquoise)', marginBottom: 8 }}>{title}</h3>
            <p style={{ fontSize: '0.85rem', lineHeight: 1.7, color: 'var(--ink-muted)' }}>{body}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Lang switch (FR ⇄ AR, both live) ────────────────────────────────────────
function LangSwitch({ size = 'md' }: { size?: 'sm' | 'md' }) {
  const { lang, setLang } = useLang()
  const padding = size === 'sm' ? '5px 12px' : '8px 18px'
  const fontSize = size === 'sm' ? '0.8rem' : '0.85rem'
  const base: React.CSSProperties = {
    fontFamily: 'var(--font-display)', fontWeight: 700, fontSize, letterSpacing: '0.08em', textTransform: 'uppercase',
    padding, border: 'none', transition: 'background 0.2s, color 0.2s',
  }
  return (
    <>
      <button
        type="button"
        aria-current={lang === 'fr' || undefined}
        onClick={() => setLang('fr')}
        style={{ ...base, cursor: lang === 'fr' ? 'default' : 'pointer', background: lang === 'fr' ? 'var(--turquoise)' : 'transparent', color: lang === 'fr' ? 'white' : 'var(--ink-muted)' }}
      >
        fr
      </button>
      <button
        type="button"
        aria-current={lang === 'ar' || undefined}
        onClick={() => setLang('ar')}
        style={{ ...base, cursor: lang === 'ar' ? 'default' : 'pointer', background: lang === 'ar' ? 'var(--turquoise)' : 'transparent', color: lang === 'ar' ? 'white' : 'var(--ink-muted)' }}
      >
        ar
      </button>
    </>
  )
}

// ── Story intro (bordeaux, centered) — the opening line before the history ──
function StoryIntro({ kicker, title }: { kicker: string; title: string }) {
  const watermarkRef = useParallaxRef<HTMLDivElement>(50)
  return (
    <section style={{ background: 'var(--bordeaux)', padding: '130px 48px 110px', position: 'relative', overflow: 'hidden' }}>
      {/* marginTop (not a translateY transform) centers this so GSAP's own
          y-parallax transform below doesn't clobber it */}
      <div ref={watermarkRef} style={{ position: 'absolute', top: '50%', insetInlineEnd: -60, marginTop: -210 }}>
        <CircuitTree size={420} muted />
      </div>
      <div style={{ maxWidth: 1440, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <FadeSection>
          <div style={{ maxWidth: 780, margin: '0 auto', textAlign: 'center' }}>
            <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)', marginBottom: 20 }}>{kicker}</p>
            <p style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(2.2rem,5vw,4.4rem)', lineHeight: 'var(--lh-display-loose)', letterSpacing: '-0.02em', color: '#fff' }}>{title}</p>
          </div>
        </FadeSection>
      </div>
    </section>
  )
}

// ── Story section — one numbered chapter of the narrative (editorial layout) ─
function Story({ s, bg, idx }: { s: StorySection; bg: string; idx: number }) {
  const imageFirst = idx % 2 === 1
  const numberRef = useParallaxRef<HTMLDivElement>(30)

  const textBlock = (
    <div style={{ maxWidth: s.media ? 520 : 760, position: 'relative' }}>
      {s.media && <div ref={numberRef} className="section-number" style={{ insetInlineStart: 0 }}>{s.num}</div>}
      {s.kicker && (
        <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--turquoise)', marginBottom: 18 }}>{s.kicker}</p>
      )}
      <h2 className="section-title" style={{ marginBottom: s.subtitle ? 14 : 28, color: 'var(--ink)', fontSize: 'clamp(2.1rem, 4.4vw, 4rem)' }}>{s.title}</h2>
      {s.subtitle && (
        <p style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.1rem', color: 'var(--turquoise)', marginBottom: 28, letterSpacing: '0.01em' }}>{s.subtitle}</p>
      )}
      {s.attribution && (
        <p style={{ fontSize: '0.8rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink-muted)', marginBottom: 28 }}>— {s.attribution}</p>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {s.paragraphs.map((p, i) => (
          <p key={i} style={{ fontSize: '1rem', lineHeight: 1.85, color: 'var(--ink-muted)' }}>{p}</p>
        ))}
      </div>

      {s.disciplines && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 36 }}>
          {s.disciplines.map((d, i) => {
            const color = ['var(--turquoise)', 'var(--coral)', 'var(--blue)', 'var(--mint)', 'var(--gold)', 'var(--bordeaux)'][i % 6]
            return <span key={d} className="tag-pill" style={{ color, borderColor: color }}>{d}</span>
          })}
        </div>
      )}

      {s.pullQuote && (
        <p style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(1.4rem,2.4vw,2rem)', lineHeight: 1.32, color: 'var(--ink)', margin: '32px 0 0', maxWidth: 600 }}>
          {s.pullQuote}
        </p>
      )}

      {s.process && (
        <div style={{ marginTop: 32, display: 'flex', flexWrap: 'wrap', gap: '6px 26px' }}>
          {s.process.map((step) => (
            <span key={step} style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.95rem', letterSpacing: '0.02em', color: 'var(--ink)' }}>{step}</span>
          ))}
        </div>
      )}

      {s.closing && (
        <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.15rem', color: 'var(--turquoise)', marginTop: 30, lineHeight: 1.5 }}>{s.closing}</p>
      )}
    </div>
  )

  const mediaBlock = s.media && (
    <ParallaxImage
      src={s.media.src}
      alt={s.media.alt}
      caption={
        <p style={{ fontSize: '0.75rem', letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--ink-muted)', marginTop: 10 }}>{s.media.caption}</p>
      }
    />
  )

  return (
    <section id={`section${s.num}`} style={{ background: bg, padding: '100px 48px', position: 'relative', overflow: s.media ? 'visible' : 'hidden' }}>
      <div style={{ maxWidth: 1440, margin: '0 auto', position: 'relative' }}>
        {!s.media && <div ref={numberRef} className="section-number">{s.num}</div>}
        {s.media ? (
          <div className="story-split" style={{ alignItems: 'start', paddingTop: 80 }}>
            <FadeSection style={{ order: imageFirst ? 2 : 1 }}>{textBlock}</FadeSection>
            <FadeSection style={{ order: imageFirst ? 1 : 2, position: 'sticky', top: 108, alignSelf: 'start' }}>{mediaBlock}</FadeSection>
          </div>
        ) : (
          <div className="story-split story-split-solo" style={{ alignItems: 'center', paddingTop: 80 }}>
            <FadeSection style={{ order: imageFirst ? 2 : 1 }}>{textBlock}</FadeSection>
            <FadeSection style={{ order: imageFirst ? 1 : 2 }} className="quote-decor">
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 360 }}>
                <span aria-hidden="true" style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(12rem, 20vw, 22rem)', lineHeight: 0.6, color: 'var(--turquoise-light)', userSelect: 'none' }}>"</span>
                <div style={{ position: 'absolute' }}>
                  <CircuitTree size={130} muted />
                </div>
              </div>
            </FadeSection>
          </div>
        )}
      </div>
    </section>
  )
}

// ── Story closing — final chapter (bordeaux, centered) bridging into contact ─
function StoryClosing({ s }: { s: StorySection }) {
  const watermarkRef = useParallaxRef<HTMLDivElement>(50)
  return (
    <section id={`section${s.num}`} style={{ background: 'var(--bordeaux)', padding: '110px 48px', position: 'relative', overflow: 'hidden' }}>
      <div ref={watermarkRef} style={{ position: 'absolute', bottom: -80, insetInlineStart: -60 }}>
        <CircuitTree size={420} muted />
      </div>
      <div style={{ maxWidth: 1440, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div className="section-number section-number-dark">{s.num}</div>
        <FadeSection>
          <div style={{ maxWidth: 740, margin: '80px auto 0', textAlign: 'center' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(2.2rem,5vw,4rem)', lineHeight: 'var(--lh-display-loose)', letterSpacing: '-0.02em', textTransform: 'uppercase', color: '#fff', marginBottom: 32 }}>{s.title}</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              {s.paragraphs.map((p, i) => (
                <p key={i} style={{ fontSize: '1rem', lineHeight: 1.85, color: 'rgba(255,255,255,0.65)' }}>{p}</p>
              ))}
            </div>
            {s.closing && (
              <p style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(1.3rem,2.4vw,1.8rem)', color: '#fff', marginTop: 28 }}>{s.closing}</p>
            )}
          </div>
        </FadeSection>
      </div>
    </section>
  )
}

// ── Main App shell — sets up language state, then renders the page ─────────
export default function App() {
  const [lang, setLang] = useState<Lang>(() => {
    if (typeof window === 'undefined') return 'fr'
    const stored = window.localStorage.getItem('kiirobi-lang')
    return stored === 'ar' || stored === 'fr' ? stored : 'fr'
  })

  useEffect(() => {
    window.localStorage.setItem('kiirobi-lang', lang)
    document.documentElement.lang = content[lang].htmlLang
    document.documentElement.dir = content[lang].dir
    document.title = content[lang].documentTitle
  }, [lang])

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      <Page />
    </LangContext.Provider>
  )
}

// ── Page content ─────────────────────────────────────────────────────────────
function Page() {
  const { lang } = useLang()
  const t = content[lang]
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [mentions, setMentions] = useState(false)
  const [form, setForm] = useState({ nom: '', email: '', tel: '', message: '', rgpd: false })
  const [sent, setSent] = useState(false)
  const [formErrors, setFormErrors] = useState<Partial<Record<'nom' | 'email' | 'message' | 'rgpd', string>>>({})
  const [formTouched, setFormTouched] = useState<Partial<Record<'nom' | 'email' | 'message' | 'rgpd', boolean>>>({})

  const validateField = (field: 'nom' | 'email' | 'message' | 'rgpd', value: string | boolean) => {
    const err = t.contact.form.errors
    if (field === 'nom') return typeof value === 'string' && !value.trim() ? err.nameRequired : ''
    if (field === 'email') {
      if (typeof value === 'string' && !value.trim()) return err.emailRequired
      if (typeof value === 'string' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return err.emailInvalid
      return ''
    }
    if (field === 'message') return typeof value === 'string' && !value.trim() ? err.messageRequired : ''
    if (field === 'rgpd') return !value ? err.rgpdRequired : ''
    return ''
  }

  const handleFieldChange = (field: 'nom' | 'email' | 'message' | 'rgpd', value: string | boolean) => {
    setForm((f) => ({ ...f, [field]: value }))
    if (formTouched[field]) setFormErrors((e) => ({ ...e, [field]: validateField(field, value) || undefined }))
  }

  const handleFieldBlur = (field: 'nom' | 'email' | 'message' | 'rgpd', value: string | boolean) => {
    setFormTouched((t) => ({ ...t, [field]: true }))
    setFormErrors((e) => ({ ...e, [field]: validateField(field, value) || undefined }))
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const next = {
      nom: validateField('nom', form.nom) || undefined,
      email: validateField('email', form.email) || undefined,
      message: validateField('message', form.message) || undefined,
      rgpd: validateField('rgpd', form.rgpd) || undefined,
    }
    setFormErrors(next)
    setFormTouched({ nom: true, email: true, message: true, rgpd: true })
    if (Object.values(next).some(Boolean)) return
    setSent(true)
  }
  const heroWatermarkRef = useParallaxRef<HTMLDivElement>(35)
  const contactWatermarkRef = useParallaxRef<HTMLDivElement>(45)
  const clientsNumberRef = useParallaxRef<HTMLDivElement>(30)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  // Text length/direction flips on language switch, which shifts every
  // section's position — recalc ScrollTrigger offsets once the new layout
  // has painted so parallax stays lined up with its trigger element.
  useEffect(() => { refreshScrollFx() }, [lang])

  const go = (href: string) => {
    setMenuOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div style={{ background: '#fff', minHeight: '100vh' }}>
      <ScrollProgress />

      {/* ── HEADER ──────────────────────────────────────────────────────────── */}
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
        background: scrolled ? 'rgba(255,255,255,0.97)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        boxShadow: scrolled ? '0 1px 0 var(--rule)' : 'none',
        transition: 'background 0.3s, box-shadow 0.3s',
      }}>
        <div style={{ maxWidth: 1440, margin: '0 auto', padding: '0 48px', height: 68, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo */}
          <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }} style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <CircuitTree size={36} />
          </a>

          {/* Nav desktop */}
          <nav style={{ gap: 32 }} className="hidden md:flex">
            {t.nav.map((l) => (
              <a key={l.label} href={l.href} className="nav-link" onClick={(e) => { e.preventDefault(); go(l.href) }}>{l.label}</a>
            ))}
          </nav>

          {/* Lang + burger */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div className="hidden md:flex" style={{ gap: 0, border: '1px solid var(--rule)', overflow: 'hidden' }}>
              <LangSwitch size="sm" />
            </div>
            <button className="flex md:hidden flex-col gap-[5px]" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }} onClick={() => setMenuOpen((v) => !v)}>
              <span className="burger-line" style={{ transform: menuOpen ? 'translateY(6.5px) rotate(45deg)' : 'none' }} />
              <span className="burger-line" style={{ opacity: menuOpen ? 0 : 1 }} />
              <span className="burger-line" style={{ transform: menuOpen ? 'translateY(-6.5px) rotate(-45deg)' : 'none' }} />
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        <div style={{
          position: 'fixed', inset: 0, background: '#fff', zIndex: 190,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 32,
          opacity: menuOpen ? 1 : 0, transform: menuOpen ? 'none' : 'translateX(100%)',
          transition: 'opacity 0.3s, transform 0.3s', pointerEvents: menuOpen ? 'auto' : 'none',
        }}>
          {t.nav.map((l) => (
            <a key={l.label} href={l.href} onClick={(e) => { e.preventDefault(); go(l.href) }}
              style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '2.8rem', textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--ink)', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--turquoise)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--ink)')}
            >{l.label}</a>
          ))}
          <div style={{ display: 'flex', gap: 0, border: '1px solid var(--rule)', overflow: 'hidden', marginTop: 8 }}>
            <LangSwitch />
          </div>
        </div>
      </header>

      {/* ── HERO ────────────────────────────────────────────────────────────── */}
      <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '80px 48px 80px', textAlign: 'center', position: 'relative', overflow: 'hidden', background: '#fff' }}>
        {/* Watermark — marginTop/Left (not a translate transform) centers it
            so GSAP's own y-parallax transform doesn't clobber the centering */}
        <div ref={heroWatermarkRef} style={{ position: 'absolute', top: '50%', left: '50%', marginTop: -260, marginLeft: -260, pointerEvents: 'none' }}>
          <CircuitTree size={520} muted />
        </div>

        <div style={{ animation: 'fadeUp 0.6s 0.1s both', position: 'relative', zIndex: 1 }}>
          <CircuitTree size={96} animated />
        </div>

        <div style={{ position: 'relative', zIndex: 1, marginTop: 32 }}>
          {/* Each line sits behind a curtain that slides away on load, instead
              of the line itself fading/translating in. */}
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(2.8rem,7vw,7rem)', lineHeight: 'var(--lh-display-hero)', letterSpacing: '-0.02em', textTransform: 'uppercase', color: 'var(--ink)' }}>
            <span style={{ display: 'block', position: 'relative', overflow: 'hidden' }}>
              {t.hero.line1}
              <span className="reveal-mask" style={{ animationDelay: '0.3s' }} />
            </span>
            <span style={{ display: 'block', position: 'relative', overflow: 'hidden', color: 'var(--turquoise)' }}>
              {t.hero.line2}
              <span className="reveal-mask" style={{ animationDelay: '0.5s' }} />
            </span>
          </h1>
        </div>

        <div style={{ animation: 'fadeUp 0.7s 0.4s both', position: 'relative', zIndex: 1, maxWidth: 620, marginTop: 28 }}>
          <p style={{ fontSize: '1rem', lineHeight: 1.8, color: 'var(--ink-muted)' }}>
            {t.hero.intro}
          </p>
        </div>

        <div style={{ animation: 'fadeUp 0.7s 0.6s both', position: 'relative', zIndex: 1, marginTop: 48 }}>
          <button onClick={() => go('#section00')} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10, fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink)' }}>
            {t.hero.cta}
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none" style={{ animation: 'floatArrow 2s ease-in-out infinite' }}>
              <path d="M10 4v12M5 12l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </section>

      {/* ── STORY INTRO — "Kiirobi.. Au commencement était l'observation" ───── */}
      <StoryIntro kicker={t.storyIntro.kicker} title={t.storyIntro.title} />

      {/* ── STORY — 10 numbered chapters (00 → 09), alternating background ──── */}
      {t.story.map((s, i) =>
        s.num === '09'
          ? <StoryClosing key={s.num} s={s} />
          : <Story key={s.num} s={s} bg={i % 2 === 0 ? '#fff' : 'var(--ground-alt)'} idx={i} />
      )}

      {/* ── CLIENTS ─────────────────────────────────────────────────────────── */}
      <section id="section-clients" style={{ background: '#fff', padding: '100px 48px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: 1440, margin: '0 auto' }}>
          <div ref={clientsNumberRef} className="section-number">+</div>
          <FadeSection style={{ paddingTop: 80, marginBottom: 56 }}>
            <h2 className="section-title">
              {t.clientsHeading.line1}<br />
              <span style={{ color: 'var(--turquoise)' }}>{t.clientsHeading.line2}</span>
            </h2>
          </FadeSection>
          <ClientsMasonry clients={t.clients} />
        </div>
      </section>

      {/* ── CONTACT ─────────────────────────────────────────────────────────── */}
      <section id="contact" style={{ background: 'var(--ground-alt)', padding: '100px 48px', position: 'relative', overflow: 'hidden' }}>
        <div ref={contactWatermarkRef} style={{ position: 'absolute', bottom: -80, insetInlineEnd: -60, opacity: 0.06 }}>
          <CircuitTree size={500} muted />
        </div>
        <div style={{ maxWidth: 1440, margin: '0 auto' }}>
          <div className="contact-grid" style={{ alignItems: 'start' }}>
            <FadeSection>
              <h2 className="section-title" style={{ marginBottom: 48 }}>
                {t.contact.heading[0]}<br />
                {t.contact.heading[1]}<br />
                <span style={{ color: 'var(--turquoise)' }}>{t.contact.heading[2]}</span>
              </h2>
              {/* Coordinates */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {[
                  { icon: '✉', label: t.contact.labels.email, val: 'bridge@kiirobi.com' },
                  { icon: '☎', label: t.contact.labels.phone, val: '36 13 43 49 / +222 20 43 29 30' },
                  { icon: '⊕', label: t.contact.labels.address, val: t.contact.addressValue },
                ].map((item) => (
                  <div key={item.label} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                    <div style={{ width: 32, height: 32, background: 'var(--turquoise-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '0.9rem', color: 'var(--turquoise)' }}>{item.icon}</div>
                    <div>
                      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-muted)', marginBottom: 2 }}>{item.label}</div>
                      <div style={{ fontSize: '0.9rem', color: 'var(--ink)' }}>{item.val}</div>
                    </div>
                  </div>
                ))}
              </div>
            </FadeSection>

            <FadeSection>
              {sent ? (
                <div className="form-banner form-banner-success">
                  <span className="form-banner-icon"><FieldIcon name="check" size={20} /></span>
                  <div>
                    <p className="form-banner-title">{t.contact.form.sentTitle}</p>
                    <p className="form-banner-body">{t.contact.form.sentBody}</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
                  <Field
                    icon="user"
                    type="text"
                    placeholder={t.contact.form.name}
                    value={form.nom}
                    error={formErrors.nom}
                    onChange={(e) => handleFieldChange('nom', e.target.value)}
                    onBlur={(e) => handleFieldBlur('nom', e.target.value)}
                  />
                  <Field
                    icon="mail"
                    type="email"
                    placeholder={t.contact.form.email}
                    value={form.email}
                    error={formErrors.email}
                    onChange={(e) => handleFieldChange('email', e.target.value)}
                    onBlur={(e) => handleFieldBlur('email', e.target.value)}
                  />
                  <Field
                    icon="phone"
                    type="tel"
                    placeholder={t.contact.form.phone}
                    value={form.tel}
                    onChange={(e) => setForm((f) => ({ ...f, tel: e.target.value }))}
                  />
                  <Field
                    icon="message"
                    textarea
                    placeholder={t.contact.form.message}
                    rows={5}
                    value={form.message}
                    error={formErrors.message}
                    onChange={(e) => handleFieldChange('message', e.target.value)}
                    onBlur={(e) => handleFieldBlur('message', e.target.value)}
                    style={{ resize: 'vertical' }}
                  />
                  <div>
                    <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                      <input
                        type="checkbox"
                        id="rgpd"
                        checked={form.rgpd}
                        onChange={(e) => handleFieldChange('rgpd', e.target.checked)}
                        onBlur={() => handleFieldBlur('rgpd', form.rgpd)}
                        style={{ marginTop: 3, accentColor: 'var(--turquoise)', flexShrink: 0 }}
                      />
                      <label htmlFor="rgpd" style={{ fontSize: '0.78rem', lineHeight: 1.6, color: 'var(--ink-muted)' }}>
                        {t.contact.form.rgpd}
                      </label>
                    </div>
                    {formErrors.rgpd && <p className="field-error" style={{ marginInlineStart: 32 }}><FieldIcon name="alert" size={13} />{formErrors.rgpd}</p>}
                  </div>
                  <div>
                    <button type="submit" className="cta-btn">
                      <span className="cta-btn-label">{t.contact.form.submit}</span>
                      <span className="cta-btn-icon" aria-hidden="true">→</span>
                    </button>
                  </div>
                </form>
              )}
            </FadeSection>
          </div>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────────────────── */}
      <footer style={{ background: 'var(--bordeaux)', color: '#fff', padding: '56px 48px' }}>
        <div style={{ maxWidth: 1440, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 24 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <CircuitTree size={32} />
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '1.4rem', letterSpacing: '-0.01em', textTransform: 'uppercase' }}>{t.footer.brand}</span>
            </div>
            <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.45)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{t.footer.tagline}</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 28, flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.76rem', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.06em' }}>{t.footer.brand} © {new Date().getFullYear()}</span>
            <button onClick={() => setMentions(true)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.76rem', letterSpacing: '0.06em', color: 'rgba(255,255,255,0.5)', textDecoration: 'underline', textUnderlineOffset: 3, fontFamily: 'var(--font-body)', transition: 'color 0.2s' }}>{t.footer.legalLink}</button>
          </div>
        </div>
      </footer>

      {mentions && <MentionsModal onClose={() => setMentions(false)} copy={t.mentions} />}
    </div>
  )
}
