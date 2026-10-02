import { cleanup, render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, describe, expect, it } from 'vitest'
import { Footer } from '../components/layout/Footer'

function renderFooter() {
  return render(
    <MemoryRouter>
      <Footer />
    </MemoryRouter>,
  )
}

afterEach(cleanup)

describe('Footer', () => {
  it('affiche les routes, l’email et la signature de la marque', () => {
    renderFooter()

    const navigation = screen.getByRole('navigation', {
      name: 'Navigation de pied de page',
    })
    for (const [name, href] of [
      ['Accueil', '/'],
      ['La marque', '/la-marque'],
      ['Collection', '/collection'],
      ['Contact', '/contact'],
    ]) {
      expect(within(navigation).getByRole('link', { name })).toHaveAttribute(
        'href',
        href,
      )
    }
    expect(
      screen.getByRole('link', { name: 'RACINE EYEWEAR, accueil' }),
    ).toHaveAttribute('href', '/')
    expect(
      screen.getByRole('link', { name: 'hello@racineeyewear.com' }),
    ).toHaveAttribute('href', 'mailto:hello@racineeyewear.com')
    expect(screen.getByText('© RACINE EYEWEAR')).toBeInTheDocument()
    expect(
      screen.getByText('La Culture dans chaque regard.'),
    ).toBeInTheDocument()
  })

  it('relie les réseaux officiels par des icônes nommées, dans un nouvel onglet', () => {
    renderFooter()

    const socials = screen.getByRole('list', { name: 'Réseaux sociaux' })
    expect(within(socials).getAllByRole('link')).toHaveLength(2)

    for (const [name, href] of [
      ['Instagram RACINE', 'https://www.instagram.com/racineeyewear/'],
      [
        'LinkedIn RACINE',
        'https://www.linkedin.com/in/carine-beyssac-a87362146/',
      ],
    ]) {
      const link = within(socials).getByRole('link', { name })
      expect(link).toHaveAttribute('href', href)
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')
      const icon = link.querySelector('svg')
      expect(icon).not.toBeNull()
      expect(icon).toHaveAttribute('aria-hidden', 'true')
    }
  })

  it('renvoie vers les trois pages légales', () => {
    renderFooter()

    const legal = screen.getByRole('navigation', {
      name: 'Informations légales',
    })
    for (const [name, href] of [
      ['Mentions légales', '/mentions-legales'],
      ['Politique de confidentialité', '/politique-de-confidentialite'],
      ['Cookies & traceurs', '/cookies'],
    ]) {
      expect(within(legal).getByRole('link', { name })).toHaveAttribute(
        'href',
        href,
      )
    }
  })
})
