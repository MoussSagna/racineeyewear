import { motion, useReducedMotion } from 'motion/react'
import { NavLink, useLocation } from 'react-router-dom'
import { navigationItems } from '../../data/navigation'
import { easeOutSoft } from '../../lib/motion'
import { useScrolled } from '../../lib/useScrolled'
import { cn } from '../../lib/utils'
import { Logo } from '../ui/Logo'
import { MobileMenu } from './MobileMenu'

/** Pages dont le Hero plein écran passe sous le header. */
const overlayRoutes = ['/', '/la-marque']

export function Header() {
  const { pathname } = useLocation()
  const prefersReducedMotion = useReducedMotion()
  const isScrolled = useScrolled(24)
  const isOverlay = overlayRoutes.includes(pathname.replace(/\/+$/, '') || '/')
  const animateEntrance = isOverlay && !prefersReducedMotion

  return (
    <motion.header
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        'site-header',
        isOverlay && 'site-header--overlay',
        isScrolled && 'site-header--scrolled',
      )}
      initial={animateEntrance ? { opacity: 0, y: -16 } : false}
      transition={{ duration: 0.5, delay: 0.1, ease: easeOutSoft }}
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
      <MobileMenu />
    </motion.header>
  )
}
