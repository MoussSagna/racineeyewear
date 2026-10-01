import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { Home } from '../pages/Home'

describe('Home', () => {
  it('présente les sections éditoriales et les appels à l’action', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    )

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /la culture\s*dans chaque\s*regard\./i,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('img', {
        name: 'Deux modèles RACINE portent des lunettes de la collection ALL POWER',
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        name: /des racines\s*pour voir plus loin/i,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'ALL POWER' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: /une fabrication\s*française/i }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: /des visages,\s*des histoires/i }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: /découvrir la marque/i }),
    ).toHaveAttribute('href', '/la-marque')
    expect(
      screen.getByRole('link', { name: /découvrir la collection/i }),
    ).toHaveAttribute('href', '/collection')
    expect(screen.getByRole('link', { name: /nous contacter/i })).toHaveAttribute(
      'href',
      '/contact',
    )
  })
})