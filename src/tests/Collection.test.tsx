import { cleanup, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { routes } from '../app/router'
import { allPower, collections, featuredChapter } from '../data/collections'

function renderRoute(path: string) {
  const router = createMemoryRouter(routes, { initialEntries: [path] })
  return render(<RouterProvider router={router} />)
}

beforeEach(() => {
  // ScrollRestoration appelle `scrollTo`, absent de jsdom.
  vi.spyOn(window, 'scrollTo').mockImplementation(() => {})
})

afterEach(cleanup)

describe('Collection', () => {
  it('annonce ALL POWER — Chapter 01 dans le Hero', () => {
    renderRoute('/collection')

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /all\s*power\.\s*chapter 01/i,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByText(/une collection inspirée du black panther party/i),
    ).toBeInTheDocument()
    expect(screen.getByLabelText('Collection 1 sur 3')).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: /explorer chapter 01/i }),
    ).toHaveAttribute('href', '#chapter-01')
    expect(document.getElementById('chapter-01')).not.toBeNull()
  })

  it('utilise le film ALL POWER, au format web, avec un poster', () => {
    const { container } = renderRoute('/collection')

    const video = container.querySelector<HTMLVideoElement>(
      '.collection-hero video',
    )
    expect(video).not.toBeNull()
    expect(video).toHaveAttribute('autoplay')
    expect(video).toHaveAttribute('loop')
    expect(video).toHaveAttribute('playsinline')
    expect(video).toHaveAttribute('poster')
    expect(video!.muted).toBe(true)
    expect(video!.querySelector('source')).toHaveAttribute(
      'src',
      expect.stringContaining('all-power.mp4'),
    )
    expect(video!.querySelector('source')).toHaveAttribute('type', 'video/mp4')
  })

  it('déroule le récit : manifeste, chapitre, montures, matières, autres univers, suite', () => {
    renderRoute('/collection')

    for (const name of [
      /une histoire de force\.\s*de fierté\.\s*de transmission\./i,
      /all power\s*chapter 01/i,
      /les montures/i,
      /le noir et l’écaille deviennent ici plus qu’une couleur\./i,
      /human book/i,
      /summer\s*collection/i,
      /the story continues\./i,
    ]) {
      expect(
        screen.getByRole('heading', { level: 2, name }),
      ).toBeInTheDocument()
    }
    expect(
      screen.getByText(
        'Cette collection ne parle pas de nostalgie mais de représentation.',
      ),
    ).toBeInTheDocument()
  })

  it('présente chaque monture avec son nom, son rang et ses deux matières', () => {
    renderRoute('/collection')

    const frames = featuredChapter.frames.items
    const list = screen.getByRole('list', { name: 'Montures ALL POWER' })
    const names = within(list)
      .getAllByRole('heading', { level: 3 })
      .map((heading) => heading.textContent)
    expect(names).toEqual(frames.map((frame) => frame.name))
    expect(names).toEqual(['Elaine', 'Fred', 'Shakur'])

    expect(within(list).getByText('01 / 03')).toBeInTheDocument()
    expect(within(list).getByText('03 / 03')).toBeInTheDocument()
    expect(within(list).getAllByText('Noir')).toHaveLength(frames.length)
    expect(within(list).getAllByText('Écaille')).toHaveLength(frames.length)
  })

  it('oppose les univers Black et Tortoise', () => {
    renderRoute('/collection')

    const black = screen
      .getByRole('heading', { level: 3, name: 'Black' })
      .closest('article')!
    for (const word of ['Force', 'Élégance', 'Profondeur']) {
      expect(within(black).getByText(word)).toBeInTheDocument()
    }
    const tortoise = screen
      .getByRole('heading', { level: 3, name: 'Tortoise' })
      .closest('article')!
    for (const word of ['Caractère', 'Chaleur', 'Intemporalité']) {
      expect(within(tortoise).getByText(word)).toBeInTheDocument()
    }
  })

  it('annonce le chapitre suivant sans en inventer le contenu', () => {
    renderRoute('/collection')

    expect(collections).toHaveLength(3)
    expect(allPower.chapters.map((chapter) => chapter.status)).toEqual([
      'available',
      'upcoming',
    ])

    const future = screen.getByRole('region', { name: 'The story continues.' })
    const chapters = within(future).getAllByRole('listitem')
    expect(chapters).toHaveLength(2)
    expect(chapters[0]).toHaveTextContent('Chapter 01')
    expect(chapters[0]).not.toHaveTextContent('À venir')
    expect(chapters[1]).toHaveTextContent('Chapter 02')
    expect(chapters[1]).toHaveTextContent('À venir')
  })

  it('montre les portraits du Human Book et les images de la Summer Collection', () => {
    renderRoute('/collection')

    expect(
      within(
        screen.getByRole('list', { name: 'Portraits du Human Book' }),
      ).getAllByRole('img'),
    ).toHaveLength(11)
    expect(
      within(
        screen.getByRole('list', {
          name: 'Photographies de la Summer Collection',
        }),
      ).getAllByRole('img'),
    ).toHaveLength(5)
    expect(
      screen.getByText(
        'Une monture n’existe pleinement qu’à travers la personne qui la porte.',
      ),
    ).toBeInTheDocument()
  })

  it('donne à chaque photographie un texte alternatif et des dimensions', () => {
    const { container } = renderRoute('/collection')

    const images = [...container.querySelectorAll('.collection-page img')]
    expect(images.length).toBeGreaterThan(25)
    for (const image of images) {
      expect(image.getAttribute('alt')).toBeTruthy()
    }
    for (const image of container.querySelectorAll(
      '.collection-page img[loading="lazy"]:not(.parallax-image img)',
    )) {
      expect(image).toHaveAttribute('width')
      expect(image).toHaveAttribute('height')
    }
  })

  it('ne contient aucun élément e-commerce', () => {
    const { container } = renderRoute('/collection')

    const text = container.querySelector('.collection-page')!.textContent ?? ''
    expect(text).not.toMatch(
      /acheter|panier|ajouter|prix|€|boutique|commander/i,
    )
  })

  it('marque « Collection » comme page active et pose le header sur le Hero', () => {
    renderRoute('/collection')

    const navigation = screen.getByRole('navigation', {
      name: 'Navigation principale',
    })
    expect(
      within(navigation).getByRole('link', { name: 'Collection' }),
    ).toHaveAttribute('aria-current', 'page')
    expect(screen.getByRole('banner')).toHaveClass('site-header--overlay')
  })

  it('se termine sur les futurs chapitres, sans bloc de conclusion', () => {
    const { container } = renderRoute('/collection')
    const page = container.querySelector<HTMLElement>('.collection-page')!

    expect(page.lastElementChild).toHaveClass('collection-future')
    expect(page.querySelector('.collection-closing')).toBeNull()
    expect(page).not.toHaveTextContent(/nos histoires ne sont pas seulement/i)
    expect(within(page).queryByRole('link', { name: /la marque/i })).toBeNull()
  })

  it('est accessible depuis la homepage', async () => {
    const user = userEvent.setup()
    renderRoute('/')

    await user.click(
      screen.getByRole('link', { name: /découvrir la collection/i }),
    )
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /all\s*power\.\s*chapter 01/i,
      }),
    ).toBeInTheDocument()
  })
})
