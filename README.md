# RACINE EYEWEAR

Site vitrine éditorial de la marque française RACINE EYEWEAR. Le projet n'inclut
aucune fonctionnalité e-commerce.

## Développement

```bash
npm install
npm run dev
```

## Scripts

- `npm run dev` : serveur de développement Vite
- `npm run build` : vérification TypeScript et build de production
- `npm run preview` : prévisualisation du build
- `npm run lint` : vérification ESLint
- `npm run test` : tests Vitest
- `npm run test:watch` : tests en mode watch

## Routes

- `/` : Accueil
- `/la-marque` : La marque
- `/collection` : Collection
- `/contact` : Contact
- `/mentions-legales`, `/politique-de-confidentialite` : pages légales

## Contact

Le site n'a ni formulaire ni backend : le contact passe par un lien
`mailto:hello@racineeyewear.com` (page Contact et footer).

Les textes de référence et les décisions d'architecture sont dans `doc/`.
