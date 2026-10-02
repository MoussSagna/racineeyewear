import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { easeOutSoft } from '../../../lib/motion'

type BrandFilmDialogProps = {
  isOpen: boolean
  onClose: () => void
  src: string
}

/**
 * Le film de la marque dans son cadrage d'origine, avec les contrôles du
 * navigateur. Le Hero n'en montre qu'un recadrage muet.
 */
export function BrandFilmDialog({
  isOpen,
  onClose,
  src,
}: BrandFilmDialogProps) {
  const prefersReducedMotion = useReducedMotion()
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!isOpen) return

    const previousFocus = document.activeElement
    closeRef.current?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
        return
      }
      if (event.key !== 'Tab') return

      // Le focus reste dans la fenêtre tant qu'elle est ouverte.
      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
        'button, video[controls]',
      )
      if (!focusable?.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
      if (previousFocus instanceof HTMLElement) previousFocus.focus()
    }
  }, [isOpen, onClose])

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          animate={{ opacity: 1 }}
          aria-label="Film RACINE"
          aria-modal="true"
          className="brand-film"
          exit={prefersReducedMotion ? undefined : { opacity: 0 }}
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          onClick={(event) => {
            if (event.target === event.currentTarget) onClose()
          }}
          ref={dialogRef}
          role="dialog"
          transition={{ duration: 0.35, ease: easeOutSoft }}
        >
          <button
            aria-label="Fermer la vidéo"
            className="brand-film__close"
            onClick={onClose}
            ref={closeRef}
            type="button"
          >
            <X aria-hidden="true" strokeWidth={1.5} />
          </button>
          <motion.video
            animate={{ opacity: 1, scale: 1 }}
            autoPlay
            className="brand-film__video"
            controls
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.97 }}
            playsInline
            src={src}
            transition={{ duration: 0.5, delay: 0.1, ease: easeOutSoft }}
          />
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
