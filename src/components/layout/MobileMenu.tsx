import { useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { NavLink } from 'react-router-dom'
import { navigationItems } from '../../data/navigation'
import { easeOutSoft } from '../../lib/motion'

type MobileMenuProps = {
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
}

export function MobileMenu({ isOpen, onOpenChange }: MobileMenuProps) {
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (!isOpen) return

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onOpenChange(false)
    }
    document.addEventListener('keydown', closeOnEscape)
    // On fige la page derrière le panneau.
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', closeOnEscape)
      document.body.style.overflow = previousOverflow
    }
  }, [isOpen, onOpenChange])

  return (
    <div className="mobile-navigation">
      <button
        aria-controls="mobile-navigation-panel"
        aria-expanded={isOpen}
        aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
        className="menu-toggle"
        onClick={() => onOpenChange(!isOpen)}
        type="button"
      >
        {isOpen ? (
          <X aria-hidden="true" strokeWidth={1.5} />
        ) : (
          <Menu aria-hidden="true" strokeWidth={1.5} />
        )}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            animate={{ opacity: 1, y: 0 }}
            aria-label="Navigation mobile"
            className="mobile-navigation-panel"
            exit={prefersReducedMotion ? undefined : { opacity: 0, y: -8 }}
            id="mobile-navigation-panel"
            initial={prefersReducedMotion ? false : { opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: easeOutSoft }}
          >
            {navigationItems.map((item, index) => (
              <motion.div
                animate={{ opacity: 1, y: 0 }}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
                key={item.to}
                transition={{
                  duration: 0.4,
                  delay: 0.06 + index * 0.05,
                  ease: easeOutSoft,
                }}
              >
                <NavLink
                  end={item.to === '/'}
                  onClick={() => onOpenChange(false)}
                  to={item.to}
                >
                  {item.label}
                </NavLink>
              </motion.div>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  )
}
