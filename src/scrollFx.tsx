// ── Scroll effects (parallax, scroll progress) ─────────────────────────────
// Lightweight GSAP/ScrollTrigger helpers modeled on the reference site's
// `gsap-paralax` / `data-depth` pattern: background watermarks and story
// images drift at a different speed than the page scroll, plus a thin
// progress bar tracking overall scroll position. All of it is inert under
// prefers-reduced-motion.
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

let registered = false
function ensureGsap() {
  if (!registered && typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger)
    registered = true
  }
}

export function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// Call after layout-affecting changes (language toggle flips text length/dir,
// images finish loading) so ScrollTrigger start/end offsets stay accurate.
export function refreshScrollFx() {
  if (typeof window === 'undefined' || prefersReducedMotion()) return
  ensureGsap()
  requestAnimationFrame(() => ScrollTrigger.refresh())
}

// Vertical drift tied to an element's own position in the viewport — attach
// to background watermarks / big section numbers for a subtle depth cue.
export function useParallaxRef<T extends HTMLElement>(distance = 40) {
  const ref = useRef<T>(null)
  useEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion()) return
    ensureGsap()
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { y: -distance },
        {
          y: distance,
          ease: 'none',
          scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
        },
      )
    })
    return () => ctx.revert()
  }, [distance])
  return ref
}

// Image that drifts inside a fixed, overflow-hidden frame as the page
// scrolls — the "gsap-paralax-inner" effect from the reference site.
export function ParallaxImage({ src, alt, caption, className, style }: {
  src: string; alt: string; caption?: React.ReactNode; className?: string; style?: React.CSSProperties
}) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const img = imgRef.current
    if (!wrap || !img || prefersReducedMotion()) return
    ensureGsap()
    const ctx = gsap.context(() => {
      gsap.fromTo(
        img,
        { y: -36 },
        {
          y: 36,
          ease: 'none',
          scrollTrigger: { trigger: wrap, start: 'top bottom', end: 'bottom top', scrub: true },
        },
      )
      // Reveal: the photo wipes into view from behind a curtain as the frame
      // scrolls up into the viewport — done once, early, rather than tracking
      // the whole transit like the drift/parallax above.
      gsap.fromTo(
        wrap,
        { clipPath: 'inset(0 0 100% 0)', opacity: 0.4 },
        {
          clipPath: 'inset(0 0 0% 0)',
          opacity: 1,
          ease: 'none',
          scrollTrigger: { trigger: wrap, start: 'top 92%', end: 'top 35%', scrub: true },
        },
      )
    })
    return () => ctx.revert()
  }, [src])

  return (
    <div className={className} style={style}>
      <div ref={wrapRef} style={{ overflow: 'hidden', aspectRatio: '4/3', position: 'relative' }}>
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          style={{ position: 'absolute', inset: '-60px 0', width: '100%', height: 'calc(100% + 120px)', objectFit: 'cover' }}
        />
      </div>
      {caption}
    </div>
  )
}

// Thin fixed bar at the very top tracking overall page scroll progress.
export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const bar = barRef.current
    if (!bar) return
    gsap.set(bar, { scaleX: 0, transformOrigin: 'left center' })
    if (prefersReducedMotion()) return
    ensureGsap()
    const ctx = gsap.context(() => {
      gsap.to(bar, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: { trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: true },
      })
    })
    return () => ctx.revert()
  }, [])
  return (
    <div style={{ position: 'fixed', top: 0, insetInlineStart: 0, insetInlineEnd: 0, height: 3, zIndex: 300, pointerEvents: 'none' }}>
      <div ref={barRef} style={{ height: '100%', width: '100%', background: 'var(--turquoise)' }} />
    </div>
  )
}
