import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { navigationItems } from '../../data/navigation'

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="mobile-navigation">
      <button
        aria-expanded={isOpen}
        aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
        className="menu-toggle"
        onClick={() => setIsOpen((open) => !open)}
        type="button"
      >
        {isOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
      </button>
      {isOpen && (
        <nav aria-label="Navigation mobile" className="mobile-navigation-panel">
          {navigationItems.map((item) => (
            <NavLink
              key={item.to}
              onClick={() => setIsOpen(false)}
              to={item.to}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      )}
    </div>
  )
}