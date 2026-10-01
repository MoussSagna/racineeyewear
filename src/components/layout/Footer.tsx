import { Link } from 'react-router-dom'
import { navigationItems } from '../../data/navigation'

export function Footer() {
  return (
    <footer className="site-footer">
      <Link aria-label="RACINE EYEWEAR, accueil" className="footer-wordmark" to="/">
        RACINE
      </Link>
      <nav aria-label="Navigation de pied de page" className="footer-navigation">
        {navigationItems.map((item) => (
          <Link key={item.to} to={item.to}>
            {item.label}
          </Link>
        ))}
      </nav>
      <div aria-label="Réseaux sociaux" className="footer-socials">
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
      <p className="footer-copyright">© RACINE EYEWEAR</p>
    </footer>
  )
}