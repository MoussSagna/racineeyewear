# RACINE EYEWEAR — Stack technique

## Core

- React
- Vite
- TypeScript
- React Router
- CSS moderne + Tailwind CSS
- shadcn/ui pour les primitives utiles

## Animation

Utiliser **Motion** (`motion/react`), successeur moderne de Framer Motion.

Objectifs :
- apparition progressive des sections ;
- transitions de navigation ;
- micro-interactions ;
- menu mobile ;
- hover subtils ;
- animations liées au scroll uniquement lorsqu'elles apportent quelque chose.

Éviter les animations permanentes ou lourdes.

Respecter `prefers-reduced-motion`.

## UI

shadcn/ui doit être utilisé avec discernement.

RACINE est un site éditorial : ne pas transformer l'interface en collection de composants SaaS.

Les composants shadcn servent principalement pour :
- boutons ;
- navigation mobile ;
- éventuellement Dialog/Sheet ;
- éléments accessibles.

Le design visuel doit rester propre à RACINE.

## Tests

Stack recommandée :

- Vitest
- React Testing Library
- jsdom

Tester en priorité :
- rendu du header ;
- navigation ;
- liens principaux ;
- menu mobile ;
- composants réutilisables ;
- comportement des boutons.

Pas besoin de tests end-to-end dans le premier sprint.

## Qualité

Prévoir :
- ESLint ;
- Prettier ;
- TypeScript strict ;
- scripts npm/pnpm cohérents.

Scripts attendus :

```bash
npm run dev
npm run build
npm run preview
npm run lint
npm run test
npm run test:watch
```

Si le projet utilise pnpm, conserver les mêmes scripts.

## Dépendances indicatives

```text
react
react-dom
react-router-dom
motion
tailwindcss
class-variance-authority
clsx
tailwind-merge
lucide-react
vitest
@testing-library/react
@testing-library/jest-dom
@testing-library/user-event
jsdom
```

Ne pas installer une dépendance uniquement parce qu'elle est disponible. Garder le projet léger.

## Pas de backend dans le MVP

Le premier sprint ne doit pas créer :
- API ;
- base de données ;
- authentification ;
- CMS ;
- paiement ;
- panier.

Le contenu sera statique dans un premier temps.
