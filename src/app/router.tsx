import { createBrowserRouter, type RouteObject } from 'react-router-dom'
import { SiteLayout } from '../components/layout/SiteLayout'
import { Brand } from '../pages/Brand'
import { Collection } from '../pages/Collection'
import { Contact } from '../pages/Contact'
import { Home } from '../pages/Home'

export const routes: RouteObject[] = [
  {
    element: <SiteLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/la-marque', element: <Brand /> },
      { path: '/collection', element: <Collection /> },
      { path: '/contact', element: <Contact /> },
    ],
  },
]

export const router = createBrowserRouter(routes)
