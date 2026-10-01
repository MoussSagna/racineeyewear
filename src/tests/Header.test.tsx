import { cleanup, render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, describe, expect, it } from 'vitest'
import userEvent from '@testing-library/user-event'
import { Header } from '../components/layout/Header'

afterEach(cleanup)

describe('Header', () => {
  it('affiche les quatre liens de navigation principaux', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    )

    expect(screen.getByRole('img', { name: 'RACINE' })).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: 'RACINE, accueil' }),
    ).toHaveAttribute('href', '/')
    expect(screen.getByRole('link', { name: 'Accueil' })).toHaveAttribute(
      'href',
      '/',
    )
    expect(screen.getByRole('link', { name: 'La marque' })).toHaveAttribute(
      'href',
      '/la-marque',
    )
    expect(screen.getByRole('link', { name: 'Collection' })).toHaveAttribute(
      'href',
      '/collection',
    )
    expect(screen.getByRole('link', { name: 'Contact' })).toHaveAttribute(
      'href',
      '/contact',
    )
  })

  it('ouvre le menu mobile et expose les mêmes routes', async () => {
    const user = userEvent.setup()

    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    )

    await user.click(screen.getByRole('button', { name: 'Ouvrir le menu' }))

    const mobileNavigation = screen.getByRole('navigation', {
      name: 'Navigation mobile',
    })
    expect(
      within(mobileNavigation).getByRole('link', { name: 'Accueil' }),
    ).toHaveAttribute('href', '/')
    expect(
      within(mobileNavigation).getByRole('link', { name: 'La marque' }),
    ).toHaveAttribute('href', '/la-marque')
    expect(
      within(mobileNavigation).getByRole('link', { name: 'Collection' }),
    ).toHaveAttribute('href', '/collection')
    expect(
      within(mobileNavigation).getByRole('link', { name: 'Contact' }),
    ).toHaveAttribute('href', '/contact')
  })
})