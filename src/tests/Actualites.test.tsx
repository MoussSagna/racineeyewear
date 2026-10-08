import {
  cleanup,
  fireEvent,
  render,
  screen,
  within,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { routes } from '../app/router'
import { articles } from '../data/articles'

const articlePath = '/actualites/carine-beyssac-lance-racine'
const articleTitle = 'Carine Beyssac lance RACINE, sa marque de lunettes'

function renderRoute(path: string) {
  const router = createMemoryRouter(routes, { initialEntries: [path] })
  return { router, ...render(<RouterProvider router={router} />) }
}

beforeEach(() => {
  // ScrollRestoration appelle `scrollTo`, absent de jsdom.
  vi.spyOn(window, 'scrollTo').mockImplementation(() => {})
})

afterEach(cleanup)

describe('Actualités', () => {
  it('ouvre sur le Hero « Les histoires qui font vivre RACINE. »', () => {
    renderRoute('/actualites')

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /les histoires\s*qui font vivre\s*racine\./i,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByText(/rencontres, collaborations, événements, coulisses/i),
    ).toBeInTheDocument()
    expect(document.title).toBe('Actualités — RACINE')
  })

  it('place « Actualités » entre Collection et Contact et la marque active', () => {
    renderRoute('/actualites')

    const navigation = screen.getByRole('navigation', {
      name: 'Navigation principale',
    })
    expect(
      within(navigation)
        .getAllByRole('link')
        .map((link) => link.textContent),
    ).toEqual(['Accueil', 'La marque', 'Collection', 'Actualités', 'Contact'])
    expect(
      within(navigation).getByRole('link', { name: 'Actualités' }),
    ).toHaveAttribute('aria-current', 'page')
  })

  it('met à la une l’article de presse, sans autre article', () => {
    const { container } = renderRoute('/actualites')

    expect(articles).toHaveLength(1)
    const feature = screen.getByRole('region', { name: articleTitle })
    expect(within(feature).getByText('Presse')).toBeInTheDocument()
    expect(within(feature).getByText('Octobre 2026')).toBeInTheDocument()
    expect(
      within(feature).getByText(/depuis son atelier de création/i),
    ).toBeInTheDocument()
    expect(
      within(feature).getByRole('img', { name: /coupure de presse/i }),
    ).toBeInTheDocument()

    const links = within(feature).getAllByRole('link')
    expect(links).toHaveLength(1)
    expect(links[0]).toHaveAttribute('href', articlePath)
    expect(container.querySelector('.news-list')).toBeNull()
  })

  it('mène à l’article depuis la carte, puis revient aux Actualités', async () => {
    const user = userEvent.setup()
    renderRoute('/actualites')

    await user.click(screen.getByRole('link', { name: articleTitle }))
    expect(
      screen.getByRole('heading', { level: 1, name: articleTitle }),
    ).toBeInTheDocument()

    await user.click(
      screen.getByRole('link', { name: /retour aux actualités/i }),
    )
    expect(
      screen.getByRole('heading', { level: 1, name: /les histoires/i }),
    ).toBeInTheDocument()
  })
})

describe('Article', () => {
  it('affiche le titre, le sous-titre, la catégorie et la coupure de presse', () => {
    renderRoute(articlePath)

    const article = screen.getByRole('article', { name: articleTitle })
    expect(within(article).getByText('Presse')).toBeInTheDocument()
    expect(within(article).getByText('2026')).toBeInTheDocument()
    expect(
      within(article).getByText(/une nouvelle maison de lunettes née/i),
    ).toBeInTheDocument()
    expect(
      within(article).getByRole('img', { name: /coupure de presse/i }),
    ).toBeInTheDocument()
    expect(document.title).toBe(`${articleTitle} — RACINE`)
  })

  it('déroule les chapitres dans l’ordre, la vidéo au cœur du récit', () => {
    renderRoute(articlePath)

    expect(
      screen
        .getAllByRole('heading', { level: 2 })
        .map((heading) => heading.textContent),
    ).toEqual([
      'Une marque née à Saint-Bonnet-le-Château',
      'Des montures pensées pour les morphologies',
      'Un nom pour chaque monture',
      'RACINE en images',
      'Une fabrication française',
      'La suite de l’aventure',
    ])
    expect(
      screen.getByText(/commandé à Oyonnax, dans l’Ain/),
    ).toBeInTheDocument()
    expect(screen.getByText(/« Initiative Loire »/)).toBeInTheDocument()
  })

  it('intègre la vidéo muette, avec poster et ratio natif, sans lecture automatique', () => {
    const { container } = renderRoute(articlePath)

    const video = container.querySelector('video')!
    expect(video.muted).toBe(true)
    expect(video).toHaveAttribute('poster')
    expect(video).toHaveAttribute('aria-label')
    expect(video).toHaveAttribute('playsinline')
    expect(video).not.toHaveAttribute('autoplay')
    // Pas de contrôles natifs dans la page : ils donneraient accès au son.
    expect(video).not.toHaveAttribute('controls')
    expect(video.style.aspectRatio).toBe('1920 / 1080')
  })

  it('lit et met en pause la vidéo depuis la page, toujours sans son', async () => {
    const user = userEvent.setup()
    const { container } = renderRoute(articlePath)
    const video = container.querySelector('video')!
    const play = vi.mocked(video.play)
    play.mockClear()

    await user.click(screen.getByRole('button', { name: 'Lire la vidéo' }))
    expect(play).toHaveBeenCalledTimes(1)
    expect(video.muted).toBe(true)

    fireEvent.play(video)
    expect(
      screen.getByRole('button', { name: 'Mettre en pause' }),
    ).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /son/i })).toBeNull()

    fireEvent.pause(video)
    expect(
      screen.getByRole('button', { name: 'Lire la vidéo' }),
    ).toBeInTheDocument()
  })

  it('passe en plein écran sans activer le son, puis redevient muette en sortant', async () => {
    const user = userEvent.setup()
    const { container } = renderRoute(articlePath)
    const video = container.querySelector('video')!
    const requestFullscreen = vi.fn().mockResolvedValue(undefined)
    video.requestFullscreen = requestFullscreen

    await user.click(
      screen.getByRole('button', { name: 'Passer en plein écran' }),
    )
    expect(requestFullscreen).toHaveBeenCalledTimes(1)
    expect(video.muted).toBe(true)

    // jsdom n'implémente pas l'API plein écran.
    const setFullscreenElement = (value: Element | null) =>
      Object.defineProperty(document, 'fullscreenElement', {
        configurable: true,
        value,
      })
    setFullscreenElement(video)
    fireEvent(document, new Event('fullscreenchange'))
    // En plein écran, les contrôles natifs prennent le relais, son compris.
    expect(video).toHaveAttribute('controls')
    expect(video.muted).toBe(true)

    // Le spectateur active le son, puis quitte le plein écran.
    video.muted = false
    setFullscreenElement(null)
    fireEvent(document, new Event('fullscreenchange'))
    expect(video).not.toHaveAttribute('controls')
    expect(video.muted).toBe(true)
  })

  it('utilise le lecteur natif d’iOS quand l’API plein écran est absente', async () => {
    const user = userEvent.setup()
    const { container } = renderRoute(articlePath)
    const video = container.querySelector('video')! as HTMLVideoElement & {
      webkitEnterFullscreen?: () => void
    }
    const webkitEnterFullscreen = vi.fn()
    video.webkitEnterFullscreen = webkitEnterFullscreen

    await user.click(
      screen.getByRole('button', { name: 'Passer en plein écran' }),
    )
    expect(webkitEnterFullscreen).toHaveBeenCalledTimes(1)
    expect(video.muted).toBe(true)

    video.muted = false
    fireEvent(video, new Event('webkitendfullscreen'))
    expect(video.muted).toBe(true)
  })

  it('garde « Actualités » active dans la navigation', () => {
    renderRoute(articlePath)

    expect(
      within(
        screen.getByRole('navigation', { name: 'Navigation principale' }),
      ).getByRole('link', { name: 'Actualités' }),
    ).toHaveAttribute('aria-current', 'page')
  })

  it('renvoie vers Actualités pour un article inconnu', () => {
    const { router } = renderRoute('/actualites/article-inexistant')

    expect(router.state.location.pathname).toBe('/actualites')
    expect(
      screen.getByRole('heading', { level: 1, name: /les histoires/i }),
    ).toBeInTheDocument()
  })
})
