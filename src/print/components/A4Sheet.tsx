import { type CSSProperties, type ReactNode } from 'react'

interface A4SheetProps {
  title?: string
  subtitle?: string
  footer?: ReactNode
  children: ReactNode
  variant?: 'internal' | 'external'
  contentStyle?: CSSProperties
}

export function A4Sheet({
  title,
  subtitle,
  footer,
  children,
  variant = 'internal',
  contentStyle,
}: A4SheetProps) {
  const hasHeader = Boolean(title) || Boolean(subtitle)

  return (
    <article className={`a4-sheet a4-sheet--${variant}`}>
      {hasHeader ? (
        <header className="a4-sheet__header">
          {subtitle ? <p className="a4-sheet__subtitle">{subtitle}</p> : null}
          {title ? <h2 className="a4-sheet__title">{title}</h2> : null}
        </header>
      ) : null}

      <div className="a4-sheet__body">
        <div className="a4-sheet__content" style={contentStyle}>
          {children}
        </div>
      </div>

      {footer ? <footer className="a4-sheet__footer">{footer}</footer> : null}
    </article>
  )
}
