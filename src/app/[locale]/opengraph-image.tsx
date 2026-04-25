import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Caio Johnston - Data Scientist & AI Consultant'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#252525',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-end',
          padding: '72px 80px',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* Entangle logo — top right */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${process.env.NEXT_PUBLIC_SITE_URL}/entangle.svg`}
          alt=""
          width={420}
          height={72}
          style={{ position: 'absolute', top: 64, right: 80, opacity: 0.35 }}
        />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <span style={{ fontSize: 20, color: '#888888', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            caiojohnston.com
          </span>
          <span style={{ fontSize: 72, fontWeight: 700, color: '#FBFBFD', lineHeight: 1.1 }}>
            Caio Johnston
          </span>
          <span style={{ fontSize: 28, color: '#888888', marginTop: 8 }}>
            Data Scientist &amp; AI Consultant
          </span>
        </div>
      </div>
    ),
    { ...size },
  )
}
