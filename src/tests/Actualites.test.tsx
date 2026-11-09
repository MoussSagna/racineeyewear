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
const interviewPath = '/actualites/racine-se-raconte'
const interviewTitle = 'RACINE se raconte.'
const tl7Path = '/actualites/racine-sur-tl7'
const tl7Title = 'RACINE sur TL7, la chaîne TV locale de Saint-Etienne'
const radioPath = '/actualites/racine-sur-ici-saint-etienne-loire'
const radioTitle = 'RACINE à l’honneur sur ICI Saint-Étienne Loire'

function expectExternal(link: HTMLElement, href: string) {
  expect(link).toHaveAttribute('href', href)
  expect(link).toHaveAttribute('target', '_blank')
  expect(link).toHaveAttribute('rel', 'noopener noreferrer')
}

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

  it('classe les actualités de la plus récente à la plus ancienne', () => {
    expect(articles.map((article) => article.slug)).toEqual([
      'racine-sur-tl7',
      'racine-sur-ici-saint-etienne-loire',
      'carine-beyssac-lance-racine',
      'racine-se-raconte',
    ])
  })

  it('met à la une le passage sur TL7', () => {
    renderRoute('/actualites')

    const feature = screen.getByRole('region', { name: tl7Title })
    expect(within(feature).getByText('Télévision')).toBeInTheDocument()
    expect(within(feature).getByText('TL7')).toBeInTheDocument()
    expect(within(feature).getByText('30 octobre 2026')).toHaveAttribute(
      'datetime',
      '2026-10-30',
    )
    expect(
      within(feature).getByRole('img', { name: /dans son atelier/i }),
    ).toBeInTheDocument()
    expect(
      within(feature).getByText('Découvrir le reportage'),
    ).toBeInTheDocument()

    const links = within(feature).getAllByRole('link')
    expect(links).toHaveLength(1)
    expect(links[0]).toHaveAttribute('href', tl7Path)
  })

  it('liste la radio, la presse et l’interview à la suite', () => {
    renderRoute('/actualites')

    const list = screen.getByRole('region', { name: 'Toutes les actualités' })
    const cards = within(list).getAllByRole('article')
    expect(cards).toHaveLength(3)

    const radio = within(cards[0])
    expect(radio.getByText('Radio')).toBeInTheDocument()
    expect(radio.getByText('ICI Saint-Étienne Loire')).toBeInTheDocument()
    expect(radio.getByText('15 octobre 2026')).toBeInTheDocument()
    expect(radio.getByText('Découvrir l’émission')).toBeInTheDocument()
    expect(radio.getByRole('link', { name: radioTitle })).toHaveAttribute(
      'href',
      radioPath,
    )

    const press = within(cards[1])
    expect(press.getByText('Presse')).toBeInTheDocument()
    expect(press.getByText('Octobre 2026')).toHaveAttribute(
      'datetime',
      '2026-10',
    )
    expect(press.getByRole('link', { name: articleTitle })).toHaveAttribute(
      'href',
      articlePath,
    )

    const interview = within(cards[2])
    expect(interview.getByText('Interview')).toBeInTheDocument()
    expect(cards[2].querySelector('time')).toBeNull()
    expect(
      interview.getByRole('img', { name: /carine beyssac/i }),
    ).toBeInTheDocument()
    expect(
      interview.getByText(/quelques minutes pour raconter l’histoire/i),
    ).toBeInTheDocument()
    expect(interview.getByText('Lire l’article')).toBeInTheDocument()
    expect(
      interview.getByRole('link', { name: interviewTitle }),
    ).toHaveAttribute('href', interviewPath)
  })

  it('mène à l’interview depuis sa carte, puis revient aux Actualités', async () => {
    const user = userEvent.setup()
    renderRoute('/actualites')

    await user.click(screen.getByRole('link', { name: interviewTitle }))
    expect(
      screen.getByRole('heading', { level: 1, name: interviewTitle }),
    ).toBeInTheDocument()

    await user.click(
      screen.getByRole('link', { name: /retour aux actualités/i }),
    )
    expect(
      screen.getByRole('heading', { level: 1, name: /les histoires/i }),
    ).toBeInTheDocument()
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

describe('Passages dans les médias', () => {
  it('présente l’émission de radio et le lien pour l’écouter', () => {
    renderRoute(radioPath)

    const article = screen.getByRole('article', { name: radioTitle })
    expect(within(article).getByText('Radio')).toBeInTheDocument()
    expect(
      within(article).getByRole('img', { name: /trophée ARTINOV/i }),
    ).toBeInTheDocument()
    expect(
      within(article).getAllByText(/dans l’émission Ici ça marche/i).length,
    ).toBeGreaterThan(0)

    const coverage = within(article).getByRole('region', { name: 'L’émission' })
    expect(within(coverage).getByText('Ici ça marche')).toBeInTheDocument()
    expect(
      within(coverage).getByText(/une épicerie solidaire pour les étudiants/i),
    ).toBeInTheDocument()
    expect(within(coverage).getByText('15 octobre 2026')).toBeInTheDocument()

    const links = within(coverage).getAllByRole('link')
    expect(links).toHaveLength(1)
    expect(links[0]).toHaveAccessibleName('Écouter l’émission (nouvel onglet)')
    expectExternal(
      links[0],
      'https://www.ici.fr/emissions/l-eco-d-ici/saint-etienne-loire?page=2',
    )
    expect(document.title).toBe(`${radioTitle} — RACINE`)
  })

  it('présente le reportage TL7, l’article et les publications de la chaîne', () => {
    renderRoute(tl7Path)

    const article = screen.getByRole('article', { name: tl7Title })
    expect(within(article).getByText('Télévision')).toBeInTheDocument()
    expect(within(article).getByText(/prix Artinov/)).toBeInTheDocument()

    const coverage = within(article).getByRole('region', {
      name: 'Le reportage',
    })
    for (const [name, href] of [
      [
        'Lire l’article',
        'https://www.tl7.fr/actualites-loire/actualite/actualite_1/saint-bonnet-le-chateau-elle-recoit-un-prix-pour-ses-lunettes-plus-inclusive_15297.html',
      ],
      ['Voir sur Facebook', 'https://www.facebook.com/share/v/1JDFvvr87d/'],
      ['Voir sur TikTok', 'https://vm.tiktok.com/ZGdXUqrke/'],
      ['Voir sur Instagram', 'https://www.instagram.com/reel/DfIIUtXg3J7/'],
    ]) {
      expectExternal(
        within(coverage).getByRole('link', { name: `${name} (nouvel onglet)` }),
        href,
      )
    }
    expect(within(coverage).getAllByRole('link')).toHaveLength(4)
  })

  it('garde une hiérarchie de titres simple : un h1, puis le bloc média en h2', () => {
    renderRoute(radioPath)

    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
    expect(
      screen
        .getAllByRole('heading', { level: 2 })
        .map((heading) => heading.textContent),
    ).toEqual(['L’émission'])
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
    expect(article.querySelector('.news-clipping__caption')?.textContent).toBe(
      'Archive de presse — Texte et photo Ève Robertle Progrès - Forez',
    )
    expect(document.title).toBe(`${articleTitle} — RACINE`)
  })

  it('déroule les chapitres dans l’ordre, sans vidéo', () => {
    const { container } = renderRoute(articlePath)

    expect(
      screen
        .getAllByRole('heading', { level: 2 })
        .map((heading) => heading.textContent),
    ).toEqual([
      'Une marque née à Saint-Bonnet-le-Château',
      'Des montures pensées pour les morphologies',
      'Un nom pour chaque monture',
      'Une fabrication française',
      'La suite de l’aventure',
    ])
    expect(
      screen.getByText(/commandé à Oyonnax, dans l’Ain/),
    ).toBeInTheDocument()
    expect(screen.getByText(/« Initiative Loire »/)).toBeInTheDocument()
    expect(
      screen.getByText(/d’après l’article de presse d’Ève Robert/i),
    ).toBeInTheDocument()
    expect(container.querySelector('video')).toBeNull()
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

describe('Article vidéo « RACINE se raconte. »', () => {
  it('affiche le label Interview, le titre et le texte fourni, sans date', () => {
    renderRoute(interviewPath)

    const article = screen.getByRole('article', { name: interviewTitle })
    expect(within(article).getByText('Interview')).toBeInTheDocument()
    expect(article.querySelector('time')).toBeNull()
    expect(
      Array.from(article.querySelectorAll('.article-intro p')).map(
        (paragraph) => paragraph.textContent,
      ),
    ).toEqual([
      'Lauréate du concours Artinov pour Innovation de savoir-faire, j’ai eu l’occasion de parler de RACINE à travers une interview réalisée avec la Chambre des Métiers et de l’Artisanat.',
      'Quelques minutes pour raconter l’histoire derrière la marque, mon parcours d’opticienne-lunetière, mais aussi ce qui m’a poussée à créer mes propres montures.',
    ])
    expect(article.querySelector('.news-clipping')).toBeNull()
    expect(
      within(article).getByRole('link', { name: /retour aux actualités/i }),
    ).toHaveAttribute('href', '/actualites')
    expect(document.title).toBe(`${interviewTitle} — RACINE`)
  })

  it('intègre la vidéo muette, avec poster et ratio natif, sans lecture automatique', () => {
    const { container } = renderRoute(interviewPath)

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
    const { container } = renderRoute(interviewPath)
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
    const { container } = renderRoute(interviewPath)
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
    const { container } = renderRoute(interviewPath)
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
})
