import { motion, useReducedMotion } from 'motion/react'
import { NavLink, useLocation } from 'react-router-dom'
import racineLogo from '../../assets/images/logo/logo.png'
import { navigationItems } from '../../data/navigation'
import { MobileMenu } from './MobileMenu'

export function Header() {
  const { pathname } = useLocation()
  const prefersReducedMotion = useReducedMotion()
  const animateEntrance = pathname === '/' && !prefersReducedMotion

  return (
    <motion.header
      animate={{ opacity: 1, y: 0 }}
      className="site-header"
      initial={animateEntrance ? { opacity: 0, y: -14 } : false}
      transition={{ duration: 0.45, ease: 'easeOut' }}
    >
      <NavLink aria-label="RACINE, accueil" className="brand-mark" to="/">
        <motion.img
          alt="RACINE"
          animate={{ opacity: 1, scale: 1 }}
          initial={animateEntrance ? { opacity: 0, scale: 0.96 } : false}
          src={racineLogo}
          transition={{ duration: 0.45, delay: animateEntrance ? 0.12 : 0 }}
        />
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