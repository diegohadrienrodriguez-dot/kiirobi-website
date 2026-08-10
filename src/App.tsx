import { useState, useEffect, useRef } from 'react'

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
function FadeSection({ children, style = {}, className = '' }: { children: React.ReactNode; style?: React.CSSProperties; className?: string }) {
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
    <div ref={ref} className={className} style={{ opacity: vis ? 1 : 0, transform: vis ? 'translateY(0)' : 'translateY(28px)', transition: 'opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1)', ...style }}>
      {children}
    </div>
  )
}

// ── Mentions légales modal ────────────────────────────────────────────────────
function MentionsModal({ onClose }: { onClose: () => void }) {
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
        <button onClick={onClose} aria-label="Fermer les mentions légales" style={{ position: 'absolute', top: 20, right: 24, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Barlow Condensed', fontWeight: 800, fontSize: '1.4rem', color: 'var(--ink)', transition: 'color 0.2s' }}>✕</button>
        <h2 id="mentions-title" style={{ fontFamily: 'Barlow Condensed', fontWeight: 900, fontSize: '2rem', textTransform: 'uppercase', letterSpacing: '0.02em', marginBottom: 32 }}>Mentions légales</h2>
        {[
          ['Éditeur du site', 'Kiirobi SARL — Près de Sheraton Hotel, TVZ, Nouakchott, Mauritanie. Directeur de publication : Direction Kiirobi.'],
          ['Hébergeur', 'OVH SAS — 2 rue Kellermann, 59100 Roubaix, France.'],
          ['Données personnelles', "Les informations recueillies via ce site font l'objet d'un traitement informatique destiné exclusivement à répondre à vos demandes. Conformément aux réglementations en vigueur, vous disposez d'un droit d'accès et de rectification."],
          ['Propriété intellectuelle', "L'ensemble des contenus présents sur ce site (textes, visuels, logo, vidéos) sont la propriété exclusive de Kiirobi ou font l'objet d'une autorisation d'utilisation."],
          ['Cookies', 'Ce site utilise uniquement des cookies techniques nécessaires à son bon fonctionnement. Aucun cookie publicitaire tiers.'],
        ].map(([t, c]) => (
          <div key={t} style={{ marginBottom: 24, paddingBottom: 24, borderBottom: '1px solid var(--rule)' }}>
            <h3 style={{ fontFamily: 'Barlow Condensed', fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--turquoise)', marginBottom: 8 }}>{t}</h3>
            <p style={{ fontSize: '0.85rem', lineHeight: 1.7, color: 'var(--ink-muted)' }}>{c}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Lang switch (FR live, AR coming soon — no i18n dictionary exists yet) ──────
function LangSwitch({ size = 'md' }: { size?: 'sm' | 'md' }) {
  const padding = size === 'sm' ? '5px 12px' : '8px 18px'
  const fontSize = size === 'sm' ? '0.8rem' : '0.85rem'
  const base: React.CSSProperties = {
    fontFamily: 'Barlow Condensed', fontWeight: 700, fontSize, letterSpacing: '0.08em', textTransform: 'uppercase',
    padding, border: 'none', transition: 'background 0.2s, color 0.2s',
  }
  return (
    <>
      <button type="button" aria-current="true" style={{ ...base, cursor: 'default', background: 'var(--turquoise)', color: 'white' }}>
        fr
      </button>
      <button
        type="button"
        disabled
        aria-disabled="true"
        title="Version arabe — bientôt disponible"
        style={{ ...base, cursor: 'not-allowed', background: 'transparent', color: 'var(--ink-muted)', opacity: 0.4 }}
      >
        ar
      </button>
    </>
  )
}

// ── Section split layout (text left, media right) ─────────────────────────────
function SplitSection({ num, line1, line2, para, media, bg = '#fff' }: {
  num: string; line1: string; line2: string; para: string;
  media: React.ReactNode; bg?: string;
}) {
  return (
    <section id={`section${num}`} style={{ background: bg, padding: '100px 48px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1440, margin: '0 auto' }}>
        <div className="section-number">{num}</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start', paddingTop: 80 }}>
          <FadeSection>
            <h2 className="section-title" style={{ marginBottom: 32, color: 'var(--ink)' }}>
              {line1}<br />
              <span style={{ color: 'var(--turquoise)' }}>{line2}</span>
            </h2>
            <p style={{ fontSize: '1rem', lineHeight: 1.8, color: 'var(--ink-muted)', maxWidth: 440 }}>{para}</p>
          </FadeSection>
          <FadeSection style={{ paddingTop: 8 }}>{media}</FadeSection>
        </div>
      </div>
    </section>
  )
}

// ── Clients data ──────────────────────────────────────────────────────────────
const clients = [
  { name: 'UNICEF', logo: 'UNICEF', desc: "Accompagnement médiatique et production de contenus audiovisuels pour les campagnes de sensibilisation en Mauritanie.", tags: ['Audiovisuel', 'Digital', 'Campagne'] },
  { name: 'World Vision', logo: 'WORLD VISION', desc: "Production de reportages de terrain et diffusion via Tawatur pour les programmes humanitaires au Sahel.", tags: ['Reportage', 'Social media'] },
  { name: 'PAM & FAO', logo: 'PAM / FAO', desc: "Couverture médiatique des programmes alimentaires et agricoles, production de films institutionnels.", tags: ['Institutionnel', 'Vidéo'] },
  { name: 'SWEDD', logo: 'SWEDD', desc: "Stratégie de communication digitale et production de contenus pour le programme régional d'autonomisation des femmes.", tags: ['Stratégie', 'Digital', 'Genre'] },
  { name: 'SNIM', logo: 'SNIM', desc: "Communication corporate et couverture événementielle pour la Société Nationale Industrielle et Minière.", tags: ['Corporate', 'Événement'] },
  { name: 'Bankily – BPM', logo: 'BANKILY', desc: "Campagnes digitales de promotion du mobile banking et production de spots publicitaires.", tags: ['Pub', 'Digital', 'Finance'] },
  { name: 'VISA', logo: 'VISA', desc: "Activation de marque et production de contenus promotionnels pour le marché mauritanien.", tags: ['Branding', 'Activation'] },
  { name: 'GIMTEL', logo: 'GIMTEL', desc: "Refonte de communication institutionnelle et gestion des réseaux sociaux de la plateforme monétique.", tags: ['Social media', 'Institutionnel'] },
  { name: 'BPC', logo: 'BPC', desc: "Conseil en stratégie de communication et production de supports print et digitaux.", tags: ['Conseil', 'Print', 'Digital'] },
  { name: 'Grande Muraille Verte', logo: 'GRANDE MURAILLE VERTE', desc: "Couverture de terrain et productions documentaires sur l'initiative africaine de reforestation.", tags: ['Documentaire', 'RSE'] },
  { name: 'PEJ', logo: 'PEJ', desc: "Stratégie digitale et production multimédia pour le Programme Emplois des Jeunes en Mauritanie.", tags: ['Stratégie', 'Digital'] },
  { name: 'UBM', logo: 'UBM', desc: "Communication événementielle et gestion des réseaux sociaux de l'Union des Banques de Mauritanie.", tags: ['Événement', 'Social media'] },
  { name: 'Same Paris', logo: 'SAME PARIS', desc: "Identité visuelle et production de contenus pour le lancement mauritanien de la marque.", tags: ['Identité', 'Lancement'] },
  { name: 'Union Européenne', logo: 'UNION EUROPÉENNE', desc: "Couverture presse et production vidéo pour les programmes de développement financés par l'UE.", tags: ['Presse', 'Vidéo', 'Institutionnel'] },
  { name: 'Tasiast Mauritanie', logo: 'TASIAST', desc: "Communication RSE et reportages terrain pour la mine d'or de Tasiast.", tags: ['RSE', 'Reportage', 'Mine'] },
  { name: 'DipNdip', logo: 'DIPNDIP', desc: "Lancement de marque et stratégie de communication digitale pour l'ouverture sur le marché mauritanien.", tags: ['Branding', 'Digital', 'Food'] },
]

// ── Main App ──────────────────────────────────────────────────────────────────
export default function App() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [mentions, setMentions] = useState(false)
  const [form, setForm] = useState({ nom: '', email: '', tel: '', message: '', rgpd: false })
  const [sent, setSent] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const nav = [
    { label: 'À propos', href: '#section00' },
    { label: 'Nos valeurs', href: '#section01' },
    { label: 'Notre expertise', href: '#section04' },
    { label: 'Nos clients', href: '#section05' },
    { label: 'Contact', href: '#contact' },
  ]

  const go = (href: string) => {
    setMenuOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div style={{ background: '#fff', minHeight: '100vh' }}>

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
            {nav.map((l) => (
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
          {nav.map((l) => (
            <a key={l.label} href={l.href} onClick={(e) => { e.preventDefault(); go(l.href) }}
              style={{ fontFamily: 'Barlow Condensed', fontWeight: 900, fontSize: '2.8rem', textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--ink)', textDecoration: 'none', transition: 'color 0.2s' }}
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
        {/* Watermark */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', pointerEvents: 'none' }}>
          <CircuitTree size={520} muted />
        </div>

        <div style={{ animation: 'fadeUp 0.6s 0.1s both', position: 'relative', zIndex: 1 }}>
          <CircuitTree size={96} animated />
        </div>

        <div style={{ position: 'relative', zIndex: 1, marginTop: 32 }}>
          {/* Each line sits behind a curtain that slides away on load, instead
              of the line itself fading/translating in. */}
          <h1 style={{ fontFamily: 'Barlow Condensed', fontWeight: 900, fontSize: 'clamp(2.8rem,7vw,7rem)', lineHeight: 0.92, letterSpacing: '-0.02em', textTransform: 'uppercase', color: 'var(--ink)' }}>
            <span style={{ display: 'block', position: 'relative', overflow: 'hidden' }}>
              {"L'agence de communication"}
              <span className="reveal-mask" style={{ animationDelay: '0.3s' }} />
            </span>
            <span style={{ display: 'block', position: 'relative', overflow: 'hidden', color: 'var(--turquoise)' }}>
              qui connecte vos idées à vos publics
              <span className="reveal-mask" style={{ animationDelay: '0.5s' }} />
            </span>
          </h1>
        </div>

        <div style={{ animation: 'fadeUp 0.7s 0.4s both', position: 'relative', zIndex: 1, maxWidth: 620, marginTop: 28 }}>
          <p style={{ fontSize: '1rem', lineHeight: 1.8, color: 'var(--ink-muted)' }}>
            Kiirobi est une agence de communication spécialisée en Conseil, Création, Évènementiel, Élaboration et mise en place de stratégies web, communication digitale et production de contenus multimédias.
          </p>
        </div>

        <div style={{ animation: 'fadeUp 0.7s 0.6s both', position: 'relative', zIndex: 1, marginTop: 48 }}>
          <button onClick={() => go('#section00')} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10, fontFamily: 'Barlow Condensed', fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink)' }}>
            {"Découvrir l'agence"}
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none" style={{ animation: 'floatArrow 2s ease-in-out infinite' }}>
              <path d="M10 4v12M5 12l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </section>

      {/* ── SECTION 00 — Positionnement (bordeaux) ──────────────────────────── */}
      <section id="section00" style={{ background: 'var(--bordeaux)', padding: '100px 48px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '50%', right: -60, transform: 'translateY(-50%)' }}>
          <CircuitTree size={420} muted />
        </div>
        <div style={{ maxWidth: 1440, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div className="section-number section-number-dark">00</div>
          <FadeSection>
            <div style={{ maxWidth: 780, margin: '80px auto 0', textAlign: 'center' }}>
              <p style={{ fontFamily: 'Barlow Condensed', fontWeight: 800, fontSize: 'clamp(2rem,4.5vw,4rem)', lineHeight: 1.05, letterSpacing: '-0.02em', textTransform: 'uppercase', color: '#fff', marginBottom: 36 }}>
                {"« L'excellence et le sens du détail »"}<br />
                <span style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.6em', fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>comme devise fondamentale</span>
              </p>
              <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.18)', margin: '0 auto 36px', width: 80 }} />
              <p style={{ fontSize: '1rem', lineHeight: 1.85, color: 'rgba(255,255,255,0.6)' }}>
                Basée en Mauritanie, Kiirobi intervient en tant que régie publicitaire et agence de production au niveau national et dans la sous-région. Kiirobi appuie son action de production audiovisuelle par la capitalisation sur l'expertise de son média digital Tawatur, première plateforme mauritanienne en termes de visibilité, de taux de pénétration et d'impact sur l'opinion publique.
              </p>
            </div>
          </FadeSection>
        </div>
      </section>

      {/* ── SECTION 01 — Excellente ─────────────────────────────────────────── */}
      <SplitSection
        num="01"
        line1="KIIROBI EST"
        line2="EXCELLENTE."
        para="Un engagement envers l'excellence qui se reflète dans la qualité de nos productions. Plus de 12 000 vidéos produites et diffusées sur les réseaux sociaux via les canaux de notre média digital Tawatur."
        media={
          <>
            <div style={{ background: '#1a1a1a', aspectRatio: '16/9', position: 'relative', cursor: 'pointer', overflow: 'hidden' }}>
              <img src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&h=450&fit=crop&auto=format" alt="Studio de production audiovisuelle Kiirobi" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.75 }} />
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: 60, height: 60, borderRadius: '50%', border: '2px solid white', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,142,140,0.3)', backdropFilter: 'blur(4px)' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M5 3l14 9-14 9V3z" /></svg>
                </div>
              </div>
            </div>
            <p style={{ fontSize: '0.75rem', letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--ink-muted)', marginTop: 10 }}>Voir nos productions audiovisuelles — Studio Kiirobi</p>
            <div style={{ marginTop: 20 }}>
              <img src="https://images.unsplash.com/photo-1493863641943-9b68992a8d07?w=800&h=400&fit=crop&auto=format" alt="Accompagnement médiatique Nations Unies FAO PAM UNICEF" style={{ width: '100%', aspectRatio: '16/8', objectFit: 'cover' }} />
              <p style={{ fontSize: '0.75rem', letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--ink-muted)', marginTop: 10 }}>Accompagnement médiatique et audiovisuel — FAO, PAM, UNICEF</p>
            </div>
          </>
        }
      />

      {/* ── SECTION 02 — Créative ───────────────────────────────────────────── */}
      <SplitSection
        num="02"
        line1="KIIROBI EST"
        line2="CRÉATIVE."
        bg="var(--ground-alt)"
        para="Le Studio Kiirobi réunit une équipe multidisciplinaire de graphistes, web designers, développeurs, community managers et chefs de projet, dans un processus continu et interconnecté qui vise à fournir des solutions de communication de haute qualité, efficaces et personnalisées."
        media={
          <>
            <img src="https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=560&fit=crop&auto=format" alt="Création d'identités visuelles et motion design Kiirobi" style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover' }} />
            <p style={{ fontSize: '0.75rem', letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--ink-muted)', marginTop: 10 }}>{"Création d'identités visuelles, motion design et contenus sur mesure"}</p>
          </>
        }
      />

      {/* ── SECTION 03 — Transparente ───────────────────────────────────────── */}
      <SplitSection
        num="03"
        line1="KIIROBI EST"
        line2="TRANSPARENTE."
        para="Un suivi attentif et un accompagnement étroit à chaque étape, pour maximiser les avantages de nos services. Nous croyons en une relation de long terme avec nos clients, dans le cadre d'une étroite collaboration avec des acteurs du secteur privé et public, des ONG internationales et les agences des Nations Unies."
        media={
          <>
            <img src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=560&fit=crop&auto=format" alt="Coordination terrain SWEDD Banque mondiale Kiirobi" style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover' }} />
            <p style={{ fontSize: '0.75rem', letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--ink-muted)', marginTop: 10 }}>Coordination sur le terrain — SWEDD & Banque mondiale</p>
          </>
        }
      />

      {/* ── SECTION 04 — Technologique ──────────────────────────────────────── */}
      <section id="section04" style={{ background: 'var(--ground-alt)', padding: '100px 48px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: 1440, margin: '0 auto' }}>
          <div className="section-number">04</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start', paddingTop: 80 }}>
            <FadeSection>
              <h2 className="section-title" style={{ marginBottom: 32 }}>
                KIIROBI EST<br />
                <span style={{ color: 'var(--turquoise)' }}>TECHNOLOGIQUE.</span>
              </h2>
              <p style={{ fontSize: '1rem', lineHeight: 1.8, color: 'var(--ink-muted)', maxWidth: 440 }}>
                Nos équipements et compétences techniques couvrent l'intégralité de la chaîne de production : tournage multi-caméras, prises de vue par drone, studio professionnel, montage non linéaire et post-production audiovisuelle de haut niveau.
              </p>
            </FadeSection>
            <div />
          </div>

          {/* Full-width image */}
          <FadeSection style={{ marginTop: 56 }}>
            <div style={{ position: 'relative' }}>
              <img src="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1440&h=560&fit=crop&auto=format" alt="Équipement de production audiovisuelle Kiirobi" style={{ width: '100%', height: 460, objectFit: 'cover' }} />
              <div style={{ position: 'absolute', bottom: 16, left: 20, background: 'rgba(255,255,255,0.92)', padding: '6px 14px', backdropFilter: 'blur(8px)' }}>
                <p style={{ fontSize: '0.72rem', letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--ink-muted)' }}>Studio de production — Kiirobi, Nouakchott</p>
              </div>
            </div>
          </FadeSection>

          {/* 4 pôles */}
          <FadeSection style={{ marginTop: 64 }}>
            <p style={{ fontFamily: 'Barlow Condensed', fontWeight: 700, fontSize: '1rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-muted)', marginBottom: 36 }}>
              Nous proposons 4 pôles d'expertise
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0 }}>
              {[
                { n: '01', color: 'var(--coral)', title: 'Conseil & Stratégie', desc: 'Conseil éditorial / Stratégie de communication / Planning stratégique digital / Veille et e-réputation' },
                { n: '02', color: 'var(--blue)', title: 'Digital & Web', desc: 'Web & webdesign / Social media management / Community management / Media planning / Traffic management' },
                { n: '03', color: 'var(--mint)', title: 'Design & Branding', desc: 'Design graphique / Identité visuelle / Illustration / Branding et rebranding' },
                { n: '04', color: 'var(--gold)', title: 'Production & Événementiel', desc: 'Production audiovisuelle TV/Web/Radio / Reportages / Motion design / Relations publiques / Événementiel' },
              ].map((item) => (
                <div key={item.n} className="expertise-item" style={{ padding: '28px 24px 28px 0' }}>
                  <div style={{ fontFamily: 'Barlow Condensed', fontWeight: 900, fontSize: '0.8rem', letterSpacing: '0.1em', color: item.color, marginBottom: 10 }}>{item.n}</div>
                  <h3 style={{ fontFamily: 'Barlow Condensed', fontWeight: 800, fontSize: '1.1rem', letterSpacing: '0.02em', textTransform: 'uppercase', marginBottom: 10, color: 'var(--ink)' }}>{item.title}</h3>
                  <p style={{ fontSize: '0.8rem', lineHeight: 1.7, color: 'var(--ink-muted)' }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </FadeSection>
        </div>
      </section>

      {/* ── SECTION 05 — Clients ────────────────────────────────────────────── */}
      <section id="section05" style={{ background: '#fff', padding: '100px 48px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: 1440, margin: '0 auto' }}>
          <div className="section-number">05</div>
          <FadeSection style={{ paddingTop: 80, marginBottom: 56 }}>
            <h2 className="section-title">
              ILS NOUS FONT<br />
              <span style={{ color: 'var(--turquoise)' }}>CONFIANCE.</span>
            </h2>
          </FadeSection>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {clients.map((c, i) => {
              const accent = [
                'var(--turquoise)', 'var(--coral)', 'var(--blue)',
                'var(--mint)', 'var(--gold)', 'var(--bordeaux)',
              ][i % 6]
              return (
                <FadeSection key={c.name}>
                  <div className="client-card">
                    <div style={{ fontFamily: 'Barlow Condensed', fontWeight: 900, fontSize: '1.05rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: accent, paddingBottom: 14, borderBottom: '1px solid var(--rule)' }}>{c.logo}</div>
                    <p style={{ fontSize: '0.84rem', lineHeight: 1.7, color: 'var(--ink-muted)', flexGrow: 1 }}>{c.desc}</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                      {c.tags.map((t) => <span key={t} className="tag-pill">{t}</span>)}
                    </div>
                  </div>
                </FadeSection>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── CONTACT ─────────────────────────────────────────────────────────── */}
      <section id="contact" style={{ background: 'var(--ground-alt)', padding: '100px 48px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', bottom: -80, right: -60, opacity: 0.06 }}>
          <CircuitTree size={500} muted />
        </div>
        <div style={{ maxWidth: 1440, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start' }}>
            <FadeSection>
              <h2 className="section-title" style={{ marginBottom: 48 }}>
                PARLONS DE<br />
                VOTRE<br />
                <span style={{ color: 'var(--turquoise)' }}>PROJET</span>
              </h2>
              {/* Coordinates */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {[
                  { icon: '✉', label: 'Email', val: 'bridge@kiirobi.com' },
                  { icon: '☎', label: 'Téléphone', val: '36 13 43 49 / +222 20 43 29 30' },
                  { icon: '⊕', label: 'Adresse', val: 'Près de Sheraton Hotel, TVZ, Nouakchott, Mauritanie' },
                ].map((item) => (
                  <div key={item.label} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                    <div style={{ width: 32, height: 32, background: 'var(--turquoise-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '0.9rem', color: 'var(--turquoise)' }}>{item.icon}</div>
                    <div>
                      <div style={{ fontFamily: 'Barlow Condensed', fontWeight: 700, fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-muted)', marginBottom: 2 }}>{item.label}</div>
                      <div style={{ fontSize: '0.9rem', color: 'var(--ink)' }}>{item.val}</div>
                    </div>
                  </div>
                ))}
              </div>
            </FadeSection>

            <FadeSection>
              {sent ? (
                <div style={{ paddingTop: 16 }}>
                  <p style={{ fontFamily: 'Barlow Condensed', fontWeight: 900, fontSize: '2.2rem', textTransform: 'uppercase', color: 'var(--turquoise)', marginBottom: 12 }}>Message envoyé !</p>
                  <p style={{ color: 'var(--ink-muted)', lineHeight: 1.7 }}>Nous reviendrons vers vous dans les meilleurs délais.</p>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setSent(true) }} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                  <input className="form-input" type="text" placeholder="Nom & Prénom" required value={form.nom} onChange={(e) => setForm((f) => ({ ...f, nom: e.target.value }))} />
                  <input className="form-input" type="email" placeholder="Adresse e-mail" required value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} />
                  <input className="form-input" type="tel" placeholder="Téléphone" value={form.tel} onChange={(e) => setForm((f) => ({ ...f, tel: e.target.value }))} />
                  <textarea className="form-input" placeholder="Votre message" rows={5} required value={form.message} onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))} style={{ resize: 'vertical' }} />
                  <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    <input type="checkbox" id="rgpd" required checked={form.rgpd} onChange={(e) => setForm((f) => ({ ...f, rgpd: e.target.checked }))} style={{ marginTop: 3, accentColor: 'var(--turquoise)', flexShrink: 0 }} />
                    <label htmlFor="rgpd" style={{ fontSize: '0.78rem', lineHeight: 1.6, color: 'var(--ink-muted)' }}>
                      J'accepte que mes données soient utilisées par Kiirobi dans le cadre du traitement de ma demande, conformément à notre politique de confidentialité.
                    </label>
                  </div>
                  <div><button type="submit" className="cta-btn">Envoyer</button></div>
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
              <span style={{ fontFamily: 'Barlow Condensed', fontWeight: 900, fontSize: '1.4rem', letterSpacing: '-0.01em', textTransform: 'uppercase' }}>Kiirobi</span>
            </div>
            <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.45)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Agence de Communication & Production</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 28, flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.76rem', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.06em' }}>Kiirobi © {new Date().getFullYear()}</span>
            <button onClick={() => setMentions(true)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.76rem', letterSpacing: '0.06em', color: 'rgba(255,255,255,0.5)', textDecoration: 'underline', textUnderlineOffset: 3, fontFamily: 'Inter', transition: 'color 0.2s' }}>Mentions légales</button>
          </div>
        </div>
      </footer>

      {mentions && <MentionsModal onClose={() => setMentions(false)} />}
    </div>
  )
}
