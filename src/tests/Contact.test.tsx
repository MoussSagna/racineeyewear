import { cleanup, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { routes } from '../app/router'

function renderRoute(path: string) {
  const router = createMemoryRouter(routes, { initialEntries: [path] })
  return render(<RouterProvider router={router} />)
}

function getForm() {
  return screen.getByRole('form', { name: /envoyer\s*un message/i })
}

async function fillForm(
  user: ReturnType<typeof userEvent.setup>,
  values: Partial<Record<'Nom' | 'Email' | 'Sujet' | 'Message', string>>,
) {
  for (const [label, value] of Object.entries(values)) {
    await user.type(
      within(getForm()).getByRole('textbox', { name: label }),
      value,
    )
  }
}

beforeEach(() => {
  // ScrollRestoration appelle `scrollTo`, absent de jsdom.
  vi.spyOn(window, 'scrollTo').mockImplementation(() => {})
})

afterEach(cleanup)

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

  it('met en avant l’adresse email, cliquable', () => {
    renderRoute('/contact')

    const section = screen.getByRole('region', { name: 'Écrire à RACINE' })
    expect(
      within(section).getByRole('link', { name: 'hello@racineeyewear.com' }),
    ).toHaveAttribute('href', 'mailto:hello@racineeyewear.com')
  })

  it('propose un formulaire à quatre champs requis et étiquetés', () => {
    renderRoute('/contact')

    const form = getForm()
    expect(within(form).getByRole('textbox', { name: 'Nom' })).toHaveAttribute(
      'type',
      'text',
    )
    expect(
      within(form).getByRole('textbox', { name: 'Email' }),
    ).toHaveAttribute('type', 'email')
    expect(
      within(form).getByRole('textbox', { name: 'Sujet' }),
    ).toHaveAttribute('type', 'text')
    expect(within(form).getByRole('textbox', { name: 'Message' }).tagName).toBe(
      'TEXTAREA',
    )
    for (const label of ['Nom', 'Email', 'Sujet', 'Message']) {
      expect(within(form).getByRole('textbox', { name: label })).toBeRequired()
    }
    expect(
      within(form).getByRole('button', { name: 'Envoyer' }),
    ).toHaveAttribute('type', 'submit')
  })

  it('signale les champs vides et place le focus sur le premier', async () => {
    const user = userEvent.setup()
    renderRoute('/contact')
    const form = getForm()

    await user.click(within(form).getByRole('button', { name: 'Envoyer' }))

    expect(within(form).getAllByText('Ce champ est requis.')).toHaveLength(4)
    const name = within(form).getByRole('textbox', { name: 'Nom' })
    expect(name).toHaveFocus()
    expect(name).toBeInvalid()
    expect(name).toHaveAccessibleDescription('Ce champ est requis.')
    expect(within(form).getByRole('status')).toBeEmptyDOMElement()
  })

  it('refuse une adresse email invalide puis efface l’erreur une fois corrigée', async () => {
    const user = userEvent.setup()
    renderRoute('/contact')
    const form = getForm()

    await fillForm(user, {
      Nom: 'Awa',
      Email: 'awa@exemple',
      Sujet: 'Collaboration',
      Message: 'Bonjour RACINE',
    })
    await user.click(within(form).getByRole('button', { name: 'Envoyer' }))

    const email = within(form).getByRole('textbox', { name: 'Email' })
    expect(email).toHaveAccessibleDescription(
      'Veuillez renseigner une adresse email valide.',
    )
    expect(email).toHaveFocus()
    expect(within(form).queryByText('Ce champ est requis.')).toBeNull()
    expect(within(form).getByRole('status')).toBeEmptyDOMElement()

    await user.type(email, '.fr')
    expect(email).toBeValid()
    expect(
      within(form).queryByText('Veuillez renseigner une adresse email valide.'),
    ).toBeNull()
  })

  it('ne prétend pas avoir envoyé le message et propose la messagerie', async () => {
    const user = userEvent.setup()
    renderRoute('/contact')
    const form = getForm()

    await fillForm(user, {
      Nom: 'Awa Diop',
      Email: 'awa@exemple.fr',
      Sujet: 'Collaboration',
      Message: 'Bonjour RACINE',
    })
    await user.click(within(form).getByRole('button', { name: 'Envoyer' }))

    const status = within(form).getByRole('status')
    expect(status).toHaveTextContent(/rien n’a été transmis à RACINE/i)
    expect(status).toHaveTextContent(/pas encore\s*relié à un service d’envoi/i)
    expect(status).not.toHaveTextContent(/message envoyé|merci/i)

    const mailto = within(status).getByRole('link', {
      name: /depuis votre messagerie/i,
    })
    const href = mailto.getAttribute('href')!
    expect(href.startsWith('mailto:hello@racineeyewear.com?')).toBe(true)
    const params = new URLSearchParams(href.split('?')[1])
    expect(params.get('subject')).toBe('Collaboration')
    expect(params.get('body')).toBe(
      'Bonjour RACINE\n\nAwa Diop\nawa@exemple.fr',
    )

    // Modifier le message retire l'état « prêt » : le lien ne doit pas rester périmé.
    await user.type(
      within(form).getByRole('textbox', { name: 'Message' }),
      ' !',
    )
    expect(status).toBeEmptyDOMElement()
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

  it('garde le header plein et marque « Contact » comme page active', () => {
    renderRoute('/contact')

    expect(
      within(
        screen.getByRole('navigation', { name: 'Navigation principale' }),
      ).getByRole('link', { name: 'Contact' }),
    ).toHaveAttribute('aria-current', 'page')
    expect(screen.getByRole('banner')).not.toHaveClass('site-header--overlay')
  })

  it.each([
    ['Mentions légales', '/mentions-legales'],
    ['Politique de confidentialité', '/politique-de-confidentialite'],
    ['Cookies & traceurs', '/cookies'],
  ])(
    'mène du footer à la page « %s », sans contenu juridique inventé',
    async (name, path) => {
      const user = userEvent.setup()
      renderRoute('/contact')

      const link = within(
        screen.getByRole('navigation', { name: 'Informations légales' }),
      ).getByRole('link', { name })
      expect(link).toHaveAttribute('href', path)

      await user.click(link)
      expect(
        screen.getByRole('heading', { level: 1, name }),
      ).toBeInTheDocument()
      expect(
        screen.getByText('Cette page est en cours de rédaction.'),
      ).toBeInTheDocument()
    },
  )

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
