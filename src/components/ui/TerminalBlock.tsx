'use client'

import { useState } from 'react'

interface TerminalBlockProps {
  code: string
  language?: string
  filename?: string
}

interface Parsed {
  style: 'mac' | 'win' | 'plain'
  title: string
  code: string
}

function parse(code: string, filename?: string): Parsed {
  // Priority 1: filename field
  if (filename?.startsWith('mac:')) return { style: 'mac', title: filename.slice(4), code }
  if (filename?.startsWith('win:')) return { style: 'win', title: filename.slice(4), code }

  // Priority 2: first line of code contains the prefix
  const lines = code.split('\n')
  const firstLine = lines[0].trim()
  if (firstLine.startsWith('mac:')) {
    return { style: 'mac', title: firstLine.slice(4), code: lines.slice(1).join('\n').trimStart() }
  }
  if (firstLine.startsWith('win:')) {
    return { style: 'win', title: firstLine.slice(4), code: lines.slice(1).join('\n').trimStart() }
  }

  return { style: 'plain', title: '', code }
}

function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1 text-xs font-mono px-2 py-1 rounded transition-colors"
      style={{ color: copied ? '#28C840' : '#888888' }}
      aria-label="Copiar código"
    >
      {copied ? (
        'Copiado!'
      ) : (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
      )}
    </button>
  )
}

export function TerminalBlock({ code, language: _language, filename }: TerminalBlockProps) {
  const { style, title, code: displayCode } = parse(code, filename)

  const codeArea = (
    <div className="relative">
      <div className="absolute top-2 right-2 z-10">
        <CopyButton code={displayCode} />
      </div>
      <pre
        className="p-4 overflow-x-auto text-sm leading-relaxed"
        style={{
          background: 'var(--terminal-body-bg)',
          color: 'var(--terminal-body-text)',
          fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
          margin: 0,
        }}
      >
        <code>{displayCode}</code>
      </pre>
    </div>
  )

  if (style === 'mac') {
    return (
      <div className="my-6 rounded-lg overflow-hidden border border-(--color-border) text-sm">
        {/* macOS title bar — always dark */}
        <div className="relative flex items-center h-9 px-3" style={{ background: '#2C2C2C' }}>
          {/* Traffic lights */}
          <div className="flex items-center gap-2 z-10">
            <span className="block w-3 h-3 rounded-full" style={{ background: '#FF5F57' }} />
            <span className="block w-3 h-3 rounded-full" style={{ background: '#FEBC2E' }} />
            <span className="block w-3 h-3 rounded-full" style={{ background: '#28C840' }} />
          </div>
          {/* Centered title */}
          {title && (
            <span
              className="absolute inset-x-0 text-center text-xs font-mono pointer-events-none"
              style={{ color: '#999999' }}
            >
              {title}
            </span>
          )}
        </div>
        {codeArea}
      </div>
    )
  }

  if (style === 'win') {
    return (
      <div className="my-6 rounded-lg overflow-hidden border border-(--color-border) text-sm">
        {/* Windows title bar — always light */}
        <div className="flex items-center justify-between h-9 px-3" style={{ background: '#D0D0D0' }}>
          {/* Left: title */}
          <span className="text-xs font-sans" style={{ color: '#1a1a1a' }}>
            {title}
          </span>
          {/* Right: window controls */}
          <div className="flex items-center">
            <button
              className="w-8 h-9 flex items-center justify-center text-xs hover:bg-black/10 transition-colors"
              style={{ color: '#1a1a1a' }}
              aria-label="Minimizar"
              tabIndex={-1}
            >
              ─
            </button>
            <button
              className="w-8 h-9 flex items-center justify-center text-xs hover:bg-black/10 transition-colors"
              style={{ color: '#1a1a1a' }}
              aria-label="Maximizar"
              tabIndex={-1}
            >
              □
            </button>
            <button
              className="w-8 h-9 flex items-center justify-center text-xs hover:bg-red-500 hover:text-white transition-colors"
              style={{ color: '#1a1a1a' }}
              aria-label="Fechar"
              tabIndex={-1}
            >
              ✕
            </button>
          </div>
        </div>
        {codeArea}
      </div>
    )
  }

  // Plain
  return (
    <div className="my-6 rounded-lg overflow-hidden border border-(--color-border) text-sm">
      {codeArea}
    </div>
  )
}
