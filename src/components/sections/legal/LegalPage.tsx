import type { ReactNode } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { Link } from 'react-router-dom'
import { easeOutSoft } from '../../../lib/motion'
import '../../../styles/legal.css'

type LegalPageProps = {
  titleLines: readonly string[]
  subtitle: string
  /** L'autre page légale, proposée en pied de page. */
  sibling: { label: string; to: string; direction: 'previous' | 'next' }
  children: ReactNode
}

/** Gabarit commun aux pages légales : Hero minimal, colonne de lecture, renvoi. */
export function LegalPage({
  titleLines,
  subtitle,
  sibling,
  children,
}: LegalPageProps) {
  const prefersReducedMotion = useReducedMotion()
  const animate = !prefersReducedMotion
  const isNext = sibling.direction === 'next'

  return (
    <article className="legal-page">
      <title>{`${titleLines.join(' ')} — RACINE EYEWEAR`}</title>

      <div className="legal-hero">
        <motion.p
          animate={{ opacity: 1, y: 0 }}
          className="legal-hero__eyebrow"
          initial={animate ? { opacity: 0, y: 10 } : false}
          transition={{ duration: 0.5, delay: 0.1, ease: easeOutSoft }}
        >
          Informations légales
        </motion.p>
        <h1 className="legal-hero__title">
          {titleLines.map((line, index) => (
            <span className="legal-hero__line" key={line}>
              <motion.span
                animate={{ y: '0%' }}
                initial={animate ? { y: '108%' } : false}
                transition={{
                  duration: 0.8,
                  delay: 0.18 + index * 0.1,
                  ease: easeOutSoft,
                }}
              >
                {line}
              </motion.span>{' '}
            </span>
          ))}
        </h1>
        <motion.p
          animate={{ opacity: 1, y: 0 }}
          className="legal-hero__subtitle"
          initial={animate ? { opacity: 0, y: 10 } : false}
          transition={{ duration: 0.5, delay: 0.5, ease: easeOutSoft }}
        >
          {subtitle}
        </motion.p>
      </div>

      <div className="legal-body">{children}</div>

      <nav aria-label="Pages légales" className="legal-pager">
        <Link
          className={`legal-pager__link legal-pager__link--${sibling.direction}`}
          to={sibling.to}
        >
          {!isNext && (
            <ArrowLeft aria-hidden="true" size={18} strokeWidth={1.25} />
          )}
          {sibling.label}
          {isNext && (
            <ArrowRight aria-hidden="true" size={18} strokeWidth={1.25} />
          )}
        </Link>
      </nav>
    </article>
  )
}

type LegalSectionProps = {
  id: string
  title: string
  children: ReactNode
}

export function LegalSection({ id, title, children }: LegalSectionProps) {
  return (
    <section aria-labelledby={id} className="legal-section">
      <h2 id={id}>{title}</h2>
      {children}
    </section>
  )
}
