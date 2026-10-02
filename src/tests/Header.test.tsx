import { cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, describe, expect, it } from 'vitest'
import userEvent from '@testing-library/user-event'
import { Header } from '../components/layout/Header'

function scrollTo(y: number) {
  Object.defineProperty(window, 'scrollY', { configurable: true, value: y })
  fireEvent.scroll(window)
}

afterEach(() => {
  cleanup()
  Object.defineProperty(window, 'scrollY', { configurable: true, value: 0 })
})

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

  it('est transparent en haut de page puis passe en état glass au scroll', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    )

    const header = screen.getByRole('banner')
    expect(header).toHaveClass('site-header', 'site-header--overlay')
    expect(header).not.toHaveClass('site-header--scrolled')

    scrollTo(24)
    expect(header).not.toHaveClass('site-header--scrolled')

    scrollTo(25)
    expect(header).toHaveClass('site-header--scrolled')
    expect(screen.getByRole('img', { name: 'RACINE' })).toBeInTheDocument()
    expect(
      within(
        screen.getByRole('navigation', { name: 'Navigation principale' }),
      ).getAllByRole('link'),
    ).toHaveLength(4)

    scrollTo(0)
    expect(header).not.toHaveClass('site-header--scrolled')
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

  it('referme le menu mobile au bouton et à la touche Échap', async () => {
    const user = userEvent.setup()

    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    )

    await user.click(screen.getByRole('button', { name: 'Ouvrir le menu' }))
    expect(
      screen.getByRole('button', { name: 'Fermer le menu' }),
    ).toHaveAttribute('aria-expanded', 'true')
    expect(document.body.style.overflow).toBe('hidden')

    await user.keyboard('{Escape}')
    expect(
      screen.getByRole('button', { name: 'Ouvrir le menu' }),
    ).toHaveAttribute('aria-expanded', 'false')
    expect(document.body.style.overflow).toBe('')

    await user.click(screen.getByRole('button', { name: 'Ouvrir le menu' }))
    await user.click(screen.getByRole('button', { name: 'Fermer le menu' }))
    expect(
      screen.getByRole('button', { name: 'Ouvrir le menu' }),
    ).toHaveAttribute('aria-expanded', 'false')
  })
})