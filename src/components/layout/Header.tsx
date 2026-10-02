import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { NavLink, useLocation } from 'react-router-dom'
import { navigationItems } from '../../data/navigation'
import { easeOutSoft } from '../../lib/motion'
import { useHideOnScroll } from '../../lib/useHideOnScroll'
import { useScrolled } from '../../lib/useScrolled'
import { cn } from '../../lib/utils'
import { Logo } from '../ui/Logo'
import { MobileMenu } from './MobileMenu'

/** Pages dont le Hero plein écran passe sous le header. */
const overlayRoutes = ['/', '/la-marque', '/collection']

/** En deçà, la page est considérée « en haut » : header visible et transparent. */
const topOffset = 10

export function Header() {
  const { pathname } = useLocation()
  const prefersReducedMotion = useReducedMotion()
  const isScrolled = useScrolled(topOffset)
  const isScrollingDown = useHideOnScroll({ topOffset })
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [hasKeyboardFocus, setHasKeyboardFocus] = useState(false)
  const isOverlay = overlayRoutes.includes(pathname.replace(/\/+$/, '') || '/')
  const animateEntrance = isOverlay && !prefersReducedMotion
  // Le header reste à l'écran menu ouvert, et tant qu'on y navigue au clavier.
  const isHidden = isScrollingDown && !isMenuOpen && !hasKeyboardFocus

  const transition = prefersReducedMotion
    ? { duration: 0 }
    : isScrolled
      ? { duration: 0.32, ease: easeOutSoft }
      : { duration: 0.5, delay: 0.1, ease: easeOutSoft }

  return (
    <motion.header
      animate={isHidden ? { opacity: 0, y: '-100%' } : { opacity: 1, y: 0 }}
      className={cn(
        'site-header',
        isOverlay && 'site-header--overlay',
        isScrolled && 'site-header--scrolled',
        isHidden && 'site-header--hidden',
      )}
      initial={animateEntrance ? { opacity: 0, y: -16 } : false}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setHasKeyboardFocus(false)
        }
      }}
      onKeyUp={(event) => {
        // Tab relâchée dans le header : le focus clavier vient d'y entrer.
        if (event.key === 'Tab') setHasKeyboardFocus(true)
      }}
      transition={transition}
    >
      <span aria-hidden="true" className="site-header__glass" />
      <NavLink aria-label="RACINE, accueil" className="brand-mark" to="/">
        <motion.span
          animate={{ opacity: 1, scale: 1 }}
          className="brand-mark__motion"
          initial={animateEntrance ? { opacity: 0, scale: 0.96 } : false}
          transition={{ duration: 0.55, delay: 0.22, ease: easeOutSoft }}
        >
          <Logo />
        </motion.span>
      </NavLink>
      <nav aria-label="Navigation principale" className="desktop-navigation">
        {navigationItems.map((item) => (
          <NavLink
            key={item.to}
            className={({ isActive }) =>
              isActive ? 'navigation-link is-active' : 'navigation-link'
            }
            end={item.to === '/'}
            to={item.to}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
      <MobileMenu isOpen={isMenuOpen} onOpenChange={setIsMenuOpen} />
    </motion.header>
  )
}
