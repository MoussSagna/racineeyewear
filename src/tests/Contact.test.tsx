import { cleanup, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { routes } from '../app/router'

function renderRoute(path: string) {
  const router = createMemoryRouter(routes, { initialEntries: [path] })
  return render(<RouterProvider router={router} />)
}

beforeEach(() => {
  // ScrollRestoration appelle `scrollTo`, absent de jsdom.
  vi.spyOn(window, 'scrollTo').mockImplementation(() => {})
})

afterEach(() => {
  cleanup()
  vi.unstubAllGlobals()
})

describe('Contact', () => {
  it('ouvre sur le Hero « Parlons. De regards. De RACINE. »', () => {
    renderRoute('/contact')

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /parlons\.\s*de regards\.\s*de racine\./i,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByText(/une question, une collaboration, une idée/i),
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /nous écrire/i })).toHaveAttribute(
      'href',
      '#nous-ecrire',
    )
    expect(document.getElementById('nous-ecrire')).not.toBeNull()
    expect(
      screen.getByRole('img', { name: /carine beyssac.*atelier/i }),
    ).toBeInTheDocument()
  })

  it('fait de l’adresse email, en mailto, le moyen de contact de la page', () => {
    renderRoute('/contact')

    const section = screen.getByRole('region', { name: 'Écrire à RACINE' })
    expect(section).toHaveAttribute('id', 'nous-ecrire')

    const link = within(section).getByRole('link', {
      name: 'hello@racineeyewear.com',
    })
    expect(link).toHaveAttribute('href', 'mailto:hello@racineeyewear.com')
    expect(link).not.toHaveAttribute('target')
    expect(within(section).getAllByRole('link')).toHaveLength(1)
  })

  it('ne contient plus aucun formulaire ni mention liée au formulaire', () => {
    const { container } = renderRoute('/contact')
    const page = container.querySelector('.contact-page')!

    expect(page.querySelector('form')).toBeNull()
    expect(page.querySelectorAll('input, textarea, select')).toHaveLength(0)
    expect(within(page as HTMLElement).queryAllByRole('button')).toHaveLength(0)
    expect(within(page as HTMLElement).queryAllByRole('textbox')).toHaveLength(
      0,
    )
    expect(page).not.toHaveTextContent(
      /formulaire|envoyer un message|champs requis|envoi en cours/i,
    )
    expect(
      within(page as HTMLElement).queryByRole('link', {
        name: /politique de confidentialité/i,
      }),
    ).toBeNull()
  })

  it('n’appelle aucune API : le contact n’utilise que le lien mailto', async () => {
    const fetchMock = vi.fn()
    vi.stubGlobal('fetch', fetchMock)
    const user = userEvent.setup()
    renderRoute('/contact')

    const link = within(
      screen.getByRole('region', { name: 'Écrire à RACINE' }),
    ).getByRole('link', { name: 'hello@racineeyewear.com' })
    // jsdom ne suit pas les liens mailto : on neutralise la navigation.
    link.addEventListener('click', (event) => event.preventDefault())
    await user.click(link)

    expect(fetchMock).not.toHaveBeenCalled()
    expect(
      screen.getByRole('heading', { level: 1, name: /parlons\./i }),
    ).toBeInTheDocument()
  })

  it('enchaîne les sections sans vide : email, réseaux, manifeste, image', () => {
    const { container } = renderRoute('/contact')

    expect(
      [...container.querySelectorAll('.contact-page > *')]
        .filter((node) => node.tagName !== 'TITLE')
        .map((node) => node.className),
    ).toEqual([
      'contact-hero',
      'contact-email',
      'contact-socials',
      'contact-manifesto',
      'contact-closing',
    ])
  })

  it('affiche Instagram et LinkedIn avec leurs icônes dans la page', () => {
    renderRoute('/contact')

    const section = screen.getByRole('region', {
      name: /retrouvez-nous\s*aussi ici\./i,
    })
    for (const [name, href] of [
      ['Instagram RACINE', 'https://www.instagram.com/racineeyewear/'],
      [
        'LinkedIn RACINE',
        'https://www.linkedin.com/in/carine-beyssac-a87362146/',
      ],
    ]) {
      const link = within(section).getByRole('link', { name })
      expect(link).toHaveAttribute('href', href)
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')
      expect(link.querySelector('svg.social-icon')).not.toBeNull()
    }
    expect(within(section).getAllByRole('link')).toHaveLength(2)
  })

  it('reprend le manifeste officiel et la signature finale', () => {
    renderRoute('/contact')

    expect(
      screen.getByRole('heading', {
        level: 2,
        name: /la culture\s*dans chaque\s*regard\./i,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        /parce que porter des lunettes, ce n’est pas seulement voir\./i,
      ),
    ).toHaveTextContent('C’est aussi se reconnaître.')

    const closing = screen.getByRole('region', { name: 'RACINE' })
    expect(within(closing).getAllByRole('img')).toHaveLength(2)
  })

  it('garde dans le footer l’email, les réseaux et les deux liens légaux', () => {
    renderRoute('/contact')

    const footer = screen.getByRole('contentinfo')
    expect(
      within(footer).getByRole('link', { name: 'hello@racineeyewear.com' }),
    ).toHaveAttribute('href', 'mailto:hello@racineeyewear.com')
    expect(
      within(footer).getByRole('link', { name: 'Instagram RACINE' }),
    ).toHaveAttribute('href', 'https://www.instagram.com/racineeyewear/')
    expect(
      within(footer).getByRole('link', { name: 'LinkedIn RACINE' }),
    ).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/carine-beyssac-a87362146/',
    )

    const legal = within(footer).getByRole('navigation', {
      name: 'Informations légales',
    })
    expect(
      within(legal)
        .getAllByRole('link')
        .map((link) => link.getAttribute('href')),
    ).toEqual(['/mentions-legales', '/politique-de-confidentialite'])
    expect(within(footer).queryByRole('link', { name: /cookies/i })).toBeNull()
  })

  it('garde le header plein et marque « Contact » comme page active', () => {
    renderRoute('/contact')

    expect(
      within(
        screen.getByRole('navigation', { name: 'Navigation principale' }),
      ).getByRole('link', { name: 'Contact' }),
    ).toHaveAttribute('aria-current', 'page')
    expect(screen.getByRole('banner')).not.toHaveClass('site-header--overlay')
  })

  it('est accessible depuis la navigation et renvoie vers les autres pages', async () => {
    const user = userEvent.setup()
    renderRoute('/')

    const navigation = screen.getByRole('navigation', {
      name: 'Navigation principale',
    })
    await user.click(within(navigation).getByRole('link', { name: 'Contact' }))
    expect(
      screen.getByRole('heading', { level: 1, name: /parlons\./i }),
    ).toBeInTheDocument()

    await user.click(
      within(navigation).getByRole('link', { name: 'Collection' }),
    )
    expect(
      screen.getByRole('heading', { level: 1, name: /all\s*power\./i }),
    ).toBeInTheDocument()
  })
})
