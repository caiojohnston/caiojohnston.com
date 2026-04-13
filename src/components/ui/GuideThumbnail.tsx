'use client'

import { useRef, useEffect } from 'react'

interface GuideThumbnailProps {
  title: string
  className?: string
  size?: number
  fill?: boolean
}

// djb2 hash
function djb2(str: string): number {
  let h = 5381
  for (let i = 0; i < str.length; i++) h = ((h << 5) + h) ^ str.charCodeAt(i)
  return h >>> 0
}

// LCG random from seed
function lcg(seed: number) {
  let s = seed >>> 0
  return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296 }
}

// Standard HSL → RGB
function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  s /= 100; l /= 100
  const k = (n: number) => (n + h / 30) % 12
  const a = s * Math.min(l, 1 - l)
  const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))
  return [Math.round(f(0) * 255), Math.round(f(8) * 255), Math.round(f(4) * 255)]
}

const SIZE = 16
const HALF = Math.ceil(SIZE / 2)

function draw(canvas: HTMLCanvasElement, title: string, dark: boolean) {
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const rand = lcg(djb2(title))

  // ── Palette ──────────────────────────────────────────────────────────────
  const hue = rand() * 360
  const sat = 55 + rand() * 35
  const lAdj = dark ? 0 : -10

  const scheme = Math.floor(rand() * 4)
  let palette: [number, number, number][]

  if (scheme === 0) {
    // complementary
    const l1 = 55 + rand() * 15
    const l2 = 50 + rand() * 20
    palette = [
      hslToRgb(hue, sat, l1 + lAdj),
      hslToRgb((hue + 180) % 360, sat, l2 + lAdj),
    ]
  } else if (scheme === 1) {
    // triadic
    palette = [
      hslToRgb(hue, sat, 55 + rand() * 15 + lAdj),
      hslToRgb((hue + 120) % 360, sat, 50 + rand() * 20 + lAdj),
      hslToRgb((hue + 240) % 360, sat, 55 + rand() * 15 + lAdj),
    ]
  } else if (scheme === 2) {
    // monochromatic
    palette = [
      hslToRgb(hue, sat, 40 + lAdj),
      hslToRgb(hue, sat, 55 + lAdj),
      hslToRgb(hue, sat, 70 + lAdj),
    ]
  } else {
    // analogous
    palette = [
      hslToRgb((hue - 30 + 360) % 360, sat, 55 + rand() * 15 + lAdj),
      hslToRgb(hue, sat, 50 + rand() * 20 + lAdj),
      hslToRgb((hue + 30) % 360, sat, 55 + rand() * 15 + lAdj),
    ]
  }

  // ── Pattern mask (left half, mirrored) ───────────────────────────────────
  const patternType = Math.floor(rand() * 6)
  const mask: boolean[][] = Array.from({ length: SIZE }, () => new Array(HALF).fill(false))
  const cx = SIZE / 2
  const cy = SIZE / 2

  if (patternType === 0) {
    // ring
    const r1 = 2 + rand() * 3
    const r2 = r1 + 1.5 + rand() * 3
    for (let y = 0; y < SIZE; y++)
      for (let x = 0; x < HALF; x++) {
        const d = Math.sqrt((x + 0.5 - cx) ** 2 + (y + 0.5 - cy) ** 2)
        mask[y][x] = d >= r1 && d <= r2
      }
  } else if (patternType === 1) {
    // wave
    const freq = 0.3 + rand() * 0.5
    const amp  = 2 + rand() * 3
    const thick = 1 + rand() * 2
    const phase = rand() * Math.PI * 2
    for (let y = 0; y < SIZE; y++)
      for (let x = 0; x < HALF; x++) {
        const wy = cy + amp * Math.sin(x * freq + phase)
        mask[y][x] = Math.abs(y + 0.5 - wy) < thick
      }
  } else if (patternType === 2) {
    // diagonal stripes
    const spacing = 2 + Math.floor(rand() * 4)
    for (let y = 0; y < SIZE; y++)
      for (let x = 0; x < HALF; x++)
        mask[y][x] = ((x + y) % spacing) < Math.floor(spacing / 2)
  } else if (patternType === 3) {
    // scattered rectangles
    const count   = 3 + Math.floor(rand() * 5)
    const rSize   = 1 + Math.floor(rand() * 3)
    for (let i = 0; i < count; i++) {
      const rx = Math.floor(rand() * (HALF - rSize))
      const ry = Math.floor(rand() * (SIZE - rSize))
      for (let dy = 0; dy < rSize; dy++)
        for (let dx = 0; dx < rSize; dx++)
          if (ry + dy < SIZE && rx + dx < HALF)
            mask[ry + dy][rx + dx] = true
    }
  } else if (patternType === 4) {
    // radial sectors
    const numSectors = (4 + Math.floor(rand() * 5)) * 2
    for (let y = 0; y < SIZE; y++)
      for (let x = 0; x < HALF; x++) {
        const angle = Math.atan2(y + 0.5 - cy, x + 0.5 - cx)
        const idx   = Math.floor(((angle + Math.PI) / (2 * Math.PI)) * numSectors)
        mask[y][x]  = idx % 2 === 0
      }
  } else {
    // sine grid
    const fx = 0.5 + rand() * 1.5
    const fy = 0.5 + rand() * 1.5
    for (let y = 0; y < SIZE; y++)
      for (let x = 0; x < HALF; x++)
        mask[y][x] = Math.sin(x * fx) * Math.sin(y * fy) > 0
  }

  // ── Render ────────────────────────────────────────────────────────────────
  ctx.fillStyle = dark ? '#010101' : '#f0f0f2'
  ctx.fillRect(0, 0, SIZE, SIZE)

  for (let y = 0; y < SIZE; y++) {
    for (let x = 0; x < HALF; x++) {
      if (!mask[y][x]) continue
      const [r, g, b] = palette[Math.floor(rand() * palette.length)]
      const fill = `rgb(${r},${g},${b})`
      ctx.fillStyle = fill
      ctx.fillRect(x, y, 1, 1)
      const mx = SIZE - 1 - x
      if (mx !== x) ctx.fillRect(mx, y, 1, 1)
    }
  }
}

export function GuideThumbnail({ title, className, size = 320, fill = false }: GuideThumbnailProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const isDark = () => document.documentElement.dataset.theme !== 'light'

    draw(canvas, title, isDark())

    // Redraw on system preference change
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const onMq = () => draw(canvas, title, isDark())
    mq.addEventListener('change', onMq)

    // Redraw on data-theme attribute change
    const observer = new MutationObserver(() => draw(canvas, title, isDark()))
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

    return () => {
      mq.removeEventListener('change', onMq)
      observer.disconnect()
    }
  }, [title])

  return (
    <canvas
      ref={canvasRef}
      width={SIZE}
      height={SIZE}
      className={className}
      style={fill
        ? { width: '100%', height: '100%', imageRendering: 'pixelated', display: 'block' }
        : { width: size, height: size, imageRendering: 'pixelated', aspectRatio: '1/1' }
      }
    />
  )
}
