import {
  cleanup,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react'
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
  vi.mocked(HTMLMediaElement.prototype.play).mockClear()
  vi.mocked(HTMLMediaElement.prototype.pause).mockClear()
})

describe('La marque', () => {
  it('affiche le Hero sur la route /la-marque', () => {
    renderRoute('/la-marque')

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /une histoire\s*de regard\./i,
      }),
    ).toBeInTheDocument()
    expect(screen.getByText('La marque', { selector: 'p' })).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /voir la vidéo/i }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: 'Défiler vers la suite' }),
    ).toHaveAttribute('href', '#les-origines')
  })

  it('utilise la vidéo de la marque en fond de Hero', () => {
    const { container } = renderRoute('/la-marque')

    const video = container.querySelector<HTMLVideoElement>('.brand-hero video')
    expect(video).not.toBeNull()
    expect(video).toHaveAttribute('autoplay')
    expect(video).toHaveAttribute('loop')
    expect(video).toHaveAttribute('playsinline')
    expect(video!.muted).toBe(true)
    expect(video!.querySelector('source')).toHaveAttribute(
      'src',
      expect.stringContaining('la-marque.mp4'),
    )
    expect(video!.querySelector('source')).toHaveAttribute('type', 'video/mp4')
  })

  it('présente les sept chapitres de la page', () => {
    renderRoute('/la-marque')

    for (const name of [
      /tout a commencé\s*avec un regard\./i,
      /une trajectoire\s*guidée par la passion\./i,
      /racine,\s*plus qu’un nom\./i,
      /carine beyssac/i,
      /des visages,\s*une diversité\./i,
      /des matériaux\s*d’exception\./i,
      /élargir la norme\./i,
    ]) {
      expect(
        screen.getByRole('heading', { level: 2, name }),
      ).toBeInTheDocument()
    }

    for (const label of [
      'Les origines',
      'Mon parcours',
      'Un nom, plusieurs racines',
      'La créatrice',
      'Voir autrement',
      'Le savoir-faire',
      'Notre engagement',
    ]) {
      expect(screen.getByText(label)).toBeInTheDocument()
    }
  })

  it('détaille le parcours et les cinq racines du nom', () => {
    renderRoute('/la-marque')

    const journey = screen.getByRole('region', {
      name: /une trajectoire\s*guidée par la passion\./i,
    })
    expect(
      within(journey)
        .getAllByRole('listitem')
        .map((step) => step.querySelector('span')?.textContent),
    ).toEqual(['2016', '2019', 'Ensuite', 'Aujourd’hui'])

    const roots = screen.getByRole('region', {
      name: /racine,\s*plus qu’un nom\./i,
    })
    expect(
      within(roots)
        .getAllByRole('heading', { level: 3 })
        .map((heading) => heading.textContent),
    ).toEqual([
      'L’ancrage',
      'Carine',
      'La racine nasale',
      'La racine culturelle',
      'La racine artisanale',
    ])
  })

  it('conserve la nuance sur les morphologies', () => {
    renderRoute('/la-marque')

    expect(
      screen.getByText(/on parle de\s*tendances, pas de vérités absolues\./i),
    ).toBeInTheDocument()
  })

  it('ouvre le film dans une fenêtre et la referme avec Échap', async () => {
    const user = userEvent.setup()
    renderRoute('/la-marque')

    const trigger = screen.getByRole('button', { name: /voir la vidéo/i })
    await user.click(trigger)

    const dialog = screen.getByRole('dialog', { name: 'Film RACINE' })
    expect(dialog.querySelector('video')).toHaveAttribute('controls')
    expect(
      screen.getByRole('button', { name: 'Fermer la vidéo' }),
    ).toHaveFocus()
    expect(HTMLMediaElement.prototype.pause).toHaveBeenCalled()

    await user.keyboard('{Escape}')
    expect(trigger).toHaveFocus()
    expect(HTMLMediaElement.prototype.play).toHaveBeenCalled()
    await waitFor(() =>
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument(),
    )
  })

  it('marque « La marque » comme page active et pose le header sur le Hero', () => {
    renderRoute('/la-marque')

    const navigation = screen.getByRole('navigation', {
      name: 'Navigation principale',
    })
    expect(
      within(navigation).getByRole('link', { name: 'La marque' }),
    ).toHaveAttribute('aria-current', 'page')
    expect(
      within(navigation).getByRole('link', { name: 'Accueil' }),
    ).not.toHaveAttribute('aria-current')
    expect(screen.getByRole('banner')).toHaveClass('site-header--overlay')
  })

  it('mène à la page Contact depuis l’appel à l’action final', async () => {
    const user = userEvent.setup()
    renderRoute('/la-marque')

    const contactLink = screen.getByRole('link', { name: /nous contacter/i })
    expect(contactLink).toHaveAttribute('href', '/contact')

    await user.click(contactLink)
    expect(
      screen.getByRole('heading', { level: 1, name: /parlons\./i }),
    ).toBeInTheDocument()
    expect(screen.getByRole('banner')).not.toHaveClass('site-header--overlay')
  })

  it('est accessible depuis la navigation de la homepage', async () => {
    const user = userEvent.setup()
    renderRoute('/')

    await user.click(
      within(
        screen.getByRole('navigation', { name: 'Navigation principale' }),
      ).getByRole('link', { name: 'La marque' }),
    )
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /une histoire\s*de regard\./i,
      }),
    ).toBeInTheDocument()
  })
})
