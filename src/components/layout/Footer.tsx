import { Link } from 'react-router-dom'
import { contactEmail, legalLinks, socialLinks } from '../../data/contact'
import { navigationItems } from '../../data/navigation'
import { Logo } from '../ui/Logo'
import { ScrollReveal } from '../ui/ScrollReveal'
import { SocialIcon } from '../ui/SocialIcon'

export function Footer() {
  return (
    <footer className="site-footer">
      <ScrollReveal className="site-footer__main" variant="fade">
        <div className="footer-identity">
          <Link
            aria-label="RACINE EYEWEAR, accueil"
            className="footer-brand"
            to="/"
          >
            <Logo alt="" />
          </Link>
          <a className="footer-email" href={`mailto:${contactEmail}`}>
            {contactEmail}
          </a>
        </div>

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

        <ul aria-label="Réseaux sociaux" className="footer-socials">
          {socialLinks.map((social) => (
            <li key={social.id}>
              <a
                aria-label={social.label}
                href={social.url}
                rel="noopener noreferrer"
                target="_blank"
              >
                <span className="footer-socials__name">{social.name}</span>
                <SocialIcon id={social.id} size={26} />
              </a>
            </li>
          ))}
        </ul>
      </ScrollReveal>

      <div className="site-footer__legal">
        <nav aria-label="Informations légales" className="footer-legal">
          {legalLinks.map((link) => (
            <Link key={link.to} to={link.to}>
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="footer-signature">
          <p className="footer-copyright">© RACINE EYEWEAR</p>
          <p className="footer-tagline">La Culture dans chaque regard.</p>
        </div>
      </div>
    </footer>
  )
}
