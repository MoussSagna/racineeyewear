import { cleanup, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {
  createMemoryRouter,
  matchRoutes,
  RouterProvider,
} from 'react-router-dom'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { routes } from '../app/router'

function renderRoute(path: string) {
  const router = createMemoryRouter(routes, { initialEntries: [path] })
  return render(<RouterProvider router={router} />)
}

function getSection(name: string | RegExp) {
  return screen.getByRole('region', { name })
}

beforeEach(() => {
  // ScrollRestoration appelle `scrollTo`, absent de jsdom.
  vi.spyOn(window, 'scrollTo').mockImplementation(() => {})
})

afterEach(cleanup)

describe('Mentions légales', () => {
  it('affiche le titre, le sous-titre et les sections attendues', () => {
    renderRoute('/mentions-legales')

    expect(
      screen.getByRole('heading', { level: 1, name: /mentions\s*légales/i }),
    ).toBeInTheDocument()
    expect(
      screen.getByText('Les informations de RACINE EYEWEAR'),
    ).toBeInTheDocument()
    expect(
      screen
        .getAllByRole('heading', { level: 2 })
        .map((heading) => heading.textContent),
    ).toEqual([
      'Éditeur du site',
      'Contact',
      'Hébergement',
      'Propriété intellectuelle',
      'Crédits',
      'Responsabilité',
      'Données personnelles',
    ])
  })

  it('laisse en attente explicite les informations que le projet ne fournit pas', () => {
    renderRoute('/mentions-legales')

    const publisher = getSection('Éditeur du site')
    for (const todo of [
      '[À COMPLÉTER — numéro de TVA, si applicable]',
      '[À COMPLÉTER — numéro de téléphone]',
    ]) {
      expect(within(publisher).getByText(todo)).toBeInTheDocument()
    }
    expect(
      within(getSection('Hébergement')).getByText('[À COMPLÉTER — hébergeur]'),
    ).toBeInTheDocument()
  })

  it('identifie l’éditeur du site', () => {
    renderRoute('/mentions-legales')

    const publisher = getSection('Éditeur du site')
    for (const value of [
      'RACINE',
      'SASU',
      '500 €',
      '99461164800019',
      'Saint-Etienne',
      'Carine BEYSSAC',
      'www.racineeyewear.fr',
    ]) {
      expect(within(publisher).getByText(value)).toBeInTheDocument()
    }
    expect(publisher).toHaveTextContent(
      '8 rue de la Sablière42380 Saint-Bonnet-le-ChâteauFrance',
    )
  })

  it('crédite les photographes et vidéastes', () => {
    renderRoute('/mentions-legales')

    const credits = getSection('Crédits')
    expect(within(credits).getByText('@jaydelinspiration')).toBeInTheDocument()
    expect(within(credits).getByText('@nthfly')).toBeInTheDocument()
  })

  it('donne l’email de contact, cliquable', () => {
    renderRoute('/mentions-legales')

    expect(
      within(getSection('Contact')).getByRole('link', {
        name: 'hello@racineeyewear.com',
      }),
    ).toHaveAttribute('href', 'mailto:hello@racineeyewear.com')
  })

  it('renvoie vers la Politique de confidentialité', async () => {
    const user = userEvent.setup()
    renderRoute('/mentions-legales')

    const pager = screen.getByRole('navigation', { name: 'Pages légales' })
    await user.click(
      within(pager).getByRole('link', { name: 'Politique de confidentialité' }),
    )
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /politique\s*de confidentialité/i,
      }),
    ).toBeInTheDocument()
  })
})

describe('Politique de confidentialité', () => {
  it('affiche le titre, le sous-titre et les sections attendues', () => {
    renderRoute('/politique-de-confidentialite')

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /politique\s*de confidentialité/i,
      }),
    ).toBeInTheDocument()
    expect(screen.getByText('Vos données, votre regard.')).toBeInTheDocument()
    expect(
      screen
        .getAllByRole('heading', { level: 2 })
        .map((heading) => heading.textContent),
    ).toEqual([
      'Responsable du traitement',
      'Données collectées',
      'Finalités',
      'Base légale',
      'Destinataires',
      'Durée de conservation',
      'Vos droits',
      'Cookies et traceurs',
      'Services tiers',
      'Mise à jour',
    ])
  })

  it('ne décrit que les emails reçus, sans formulaire ni prestataire d’envoi', () => {
    const { container } = renderRoute('/politique-de-confidentialite')

    const data = getSection('Données collectées')
    expect(data).toHaveTextContent(
      /ce site ne collecte aucune donnée personnelle/i,
    )
    expect(
      within(data)
        .getAllByRole('listitem')
        .map((item) => item.textContent),
    ).toEqual([
      'votre adresse email ;',
      'le contenu de votre message ;',
      'les informations que vous choisissez d’y faire figurer.',
    ])
    expect(data).not.toHaveTextContent(/téléphone|adresse postale|naissance/i)

    const page = container.querySelector('.legal-page')
    expect(page).not.toHaveTextContent(/resend/i)
    expect(page).not.toHaveTextContent(/prestataire d’envoi/i)
    expect(page).not.toHaveTextContent(
      /via le formulaire|depuis le formulaire/i,
    )
  })

  it('ne tranche pas ce qui reste à décider', () => {
    renderRoute('/politique-de-confidentialite')

    expect(
      within(getSection('Base légale')).getByText(
        '[À VALIDER — base légale du traitement des emails reçus]',
      ),
    ).toBeInTheDocument()
    expect(
      within(getSection('Durée de conservation')).getByText(
        '[À VALIDER — durée de conservation des emails reçus]',
      ),
    ).toBeInTheDocument()
    expect(
      within(getSection('Responsable du traitement')).getByText(
        '[À COMPLÉTER — raison sociale du responsable du traitement]',
      ),
    ).toBeInTheDocument()
    const recipients = getSection('Destinataires')
    expect(recipients).toHaveTextContent('[À COMPLÉTER — hébergeur]')
    expect(within(recipients).queryAllByRole('link')).toHaveLength(0)
  })

  it('présente les six droits et l’adresse pour les exercer', () => {
    renderRoute('/politique-de-confidentialite')

    const rights = getSection('Vos droits')
    const items = within(rights)
      .getAllByRole('listitem')
      .map((item) => item.textContent)
    expect(items).toHaveLength(6)
    for (const [index, word] of [
      'accès',
      'rectification',
      'effacement',
      'opposition',
      'limitation',
      'portabilité',
    ].entries()) {
      expect(items[index]).toContain(word)
    }
    expect(
      within(rights).getByRole('link', { name: 'hello@racineeyewear.com' }),
    ).toHaveAttribute('href', 'mailto:hello@racineeyewear.com')
  })

  it('décrit l’état réel du site : aucun cookie, aucun outil de mesure ou de publicité', () => {
    renderRoute('/politique-de-confidentialite')

    expect(getSection('Cookies et traceurs')).toHaveTextContent(
      /ne dépose aucun cookie et n’utilise aucun outil de mesure\s*d’audience ni de publicité/i,
    )
    expect(getSection('Services tiers')).toHaveTextContent(/google\s*fonts/i)
  })

  it('renvoie vers les Mentions légales', async () => {
    const user = userEvent.setup()
    renderRoute('/politique-de-confidentialite')

    const pager = screen.getByRole('navigation', { name: 'Pages légales' })
    await user.click(
      within(pager).getByRole('link', { name: 'Mentions légales' }),
    )
    expect(
      screen.getByRole('heading', { level: 1, name: /mentions\s*légales/i }),
    ).toBeInTheDocument()
  })
})

describe('Accès aux pages légales', () => {
  it.each([
    ['Mentions légales', '/mentions-legales', /mentions\s*légales/i],
    [
      'Politique de confidentialité',
      '/politique-de-confidentialite',
      /politique\s*de confidentialité/i,
    ],
  ])('mène du footer à « %s »', async (name, path, title) => {
    const user = userEvent.setup()
    renderRoute('/')

    const link = within(
      screen.getByRole('navigation', { name: 'Informations légales' }),
    ).getByRole('link', { name })
    expect(link).toHaveAttribute('href', path)

    await user.click(link)
    expect(
      screen.getByRole('heading', { level: 1, name: title }),
    ).toBeInTheDocument()
    expect(screen.getByRole('banner')).not.toHaveClass('site-header--overlay')
  })

  it('n’expose ni route ni lien Cookies', () => {
    expect(matchRoutes(routes, '/cookies')).toBeNull()
    expect(matchRoutes(routes, '/mentions-legales')).not.toBeNull()
    expect(matchRoutes(routes, '/politique-de-confidentialite')).not.toBeNull()

    renderRoute('/')
    expect(screen.queryByRole('link', { name: /cookies/i })).toBeNull()
  })
})
