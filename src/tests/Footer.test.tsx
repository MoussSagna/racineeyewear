import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { Footer } from '../components/layout/Footer'

describe('Footer', () => {
  it('affiche les routes et les réseaux sociaux officiels', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    )

    const navigation = screen.getByRole('navigation', {
      name: 'Navigation de pied de page',
    })
    expect(
      within(navigation).getByRole('link', { name: 'Accueil' }),
    ).toHaveAttribute('href', '/')
    expect(
      within(navigation).getByRole('link', { name: 'La marque' }),
    ).toHaveAttribute('href', '/la-marque')
    expect(
      within(navigation).getByRole('link', { name: 'Collection' }),
    ).toHaveAttribute('href', '/collection')
    expect(
      within(navigation).getByRole('link', { name: 'Contact' }),
    ).toHaveAttribute('href', '/contact')
    expect(
      screen.getByRole('link', { name: 'Instagram RACINE EYEWEAR' }),
    ).toHaveAttribute('href', 'https://www.instagram.com/racineeyewear/')
    expect(
      screen.getByRole('link', { name: 'LinkedIn de Carine Beyssac' }),
    ).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/carine-beyssac-a87362146/',
    )
    expect(
      screen.getByRole('link', { name: 'hello@racineeyewear.com' }),
    ).toHaveAttribute('href', 'mailto:hello@racineeyewear.com')
    expect(screen.getByText('© RACINE EYEWEAR')).toBeInTheDocument()
  })
})
