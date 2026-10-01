import { NavLink } from 'react-router-dom'
import racineLogo from '../../../assets/LOGO/NOM SANS FOND.png'
import { navigationItems } from '../../data/navigation'
import { MobileMenu } from './MobileMenu'

export function Header() {
  return (
    <header className="site-header">
      <NavLink aria-label="RACINE, accueil" className="brand-mark" to="/">
        <img src={racineLogo} alt="RACINE" />
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
    </header>
  )
}