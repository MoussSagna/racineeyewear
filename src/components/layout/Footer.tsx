import { Link } from 'react-router-dom'
import { navigationItems } from '../../data/navigation'
import { Logo } from '../ui/Logo'

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__main">
        <Link
          aria-label="RACINE EYEWEAR, accueil"
          className="footer-brand"
          to="/"
        >
          <Logo alt="" />
        </Link>
        <nav
          aria-label="Navigation de pied de page"
          className="footer-navigation"
        >
          {navigationItems.map((item) => (
            <Link key={item.to} to={item.to}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="footer-socials">
          <a href="mailto:hello@racineeyewear.com">hello@racineeyewear.com</a>
          <a
            aria-label="Instagram RACINE EYEWEAR"
            href="https://www.instagram.com/racineeyewear/"
            rel="noreferrer"
            target="_blank"
          >
            Instagram
          </a>
          <a
            aria-label="LinkedIn de Carine Beyssac"
            href="https://www.linkedin.com/in/carine-beyssac-a87362146/"
            rel="noreferrer"
            target="_blank"
          >
            LinkedIn
          </a>
        </div>
      </div>
      <div className="site-footer__legal">
        <p className="footer-copyright">© RACINE EYEWEAR</p>
        <p className="footer-tagline">La Culture dans chaque regard.</p>
      </div>
    </footer>
  )
}
