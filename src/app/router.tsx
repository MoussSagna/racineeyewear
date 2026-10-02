import { createBrowserRouter, type RouteObject } from 'react-router-dom'
import { SiteLayout } from '../components/layout/SiteLayout'
import { Brand } from '../pages/Brand'
import { Collection } from '../pages/Collection'
import { Contact } from '../pages/Contact'
import { Home } from '../pages/Home'
import { Legal } from '../pages/Legal'

export const routes: RouteObject[] = [
  {
    element: <SiteLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/la-marque', element: <Brand /> },
      { path: '/collection', element: <Collection /> },
      { path: '/contact', element: <Contact /> },
      {
        path: '/mentions-legales',
        element: <Legal title="Mentions légales" />,
      },
      {
        path: '/politique-de-confidentialite',
        element: <Legal title="Politique de confidentialité" />,
      },
      { path: '/cookies', element: <Legal title="Cookies & traceurs" /> },
    ],
  },
]

export const router = createBrowserRouter(routes)
