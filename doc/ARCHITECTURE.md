# RACINE EYEWEAR — Architecture

## 1. Objectif

RACINE EYEWEAR est un **site vitrine éditorial**, pas un e-commerce.

Le site doit présenter :
- la marque RACINE ;
- son histoire et sa créatrice ;
- la collection **ALL POWER — Chapter 01** ;
- le savoir-faire et les matériaux ;
- l'approche des différentes morphologies ;
- le Human Book ;
- les moyens de contact.

Aucune fonctionnalité e-commerce dans le MVP :
- pas de panier ;
- pas de paiement ;
- pas de compte client ;
- pas de tunnel d'achat ;
- pas de stock ;
- pas de prix affichés comme dans une boutique en ligne.

## 2. Navigation principale

Navigation desktop et mobile :

1. Accueil
2. La marque
3. Collection
4. Contact

Le logo RACINE renvoie vers Accueil.

La navigation doit rester simple, éditoriale et premium.

## 3. Routes

- `/` → Accueil
- `/la-marque` → La marque
- `/collection` → Collection ALL POWER
- `/contact` → Contact

Les pages secondaires pourront être enrichies par sprints successifs.

## 4. Architecture applicative

```text
src/
├── app/
│   ├── App.tsx
│   ├── router.tsx
│   └── providers/
│
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── MobileMenu.tsx
│   │
│   ├── ui/
│   │   └── ...
│   │
│   └── sections/
│       └── ...
│
├── pages/
│   ├── Home.tsx
│   ├── Brand.tsx
│   ├── Collection.tsx
│   └── Contact.tsx
│
├── data/
│   └── ...
│
├── assets/
│   ├── images/
│   ├── logo/
│   └── icons/
│
├── lib/
│   └── utils.ts
│
├── styles/
│   ├── globals.css
│   └── tokens.css
│
└── tests/
    └── ...
```

## 5. Principes

### Components
Les composants doivent être petits, réutilisables et orientés interface.

### Pages
Les pages composent les sections et ne doivent pas contenir toute la logique UI.

### Data
Les contenus éditoriaux réutilisables doivent être séparés du JSX lorsque cela apporte de la clarté.

### Assets
Ne pas inventer de logo ou de photographie finale. Utiliser des placeholders clairement identifiés jusqu'à réception des assets définitifs.

### Responsive
Mobile-first, puis adaptation tablette et desktop.

## 6. Direction artistique

L'interface doit reprendre l'esprit de la maquette validée :
- éditorial ;
- chaleureux ;
- premium mais humain ;
- inspiré de la mode et de la lunetterie ;
- beaucoup d'espace ;
- photographie très présente ;
- transitions douces ;
- aucun effet gadget.

Le site ne doit pas ressembler à une boutique Shopify générique.

## 7. Responsive

Breakpoints indicatifs :

```text
mobile  : < 768px
tablet  : 768px - 1023px
desktop : >= 1024px
```

Le header devient compact sur mobile avec menu hamburger.

Le contenu doit rester confortable à lire sur petits écrans.

## 8. Accessibilité

Prévoir dès la base :
- HTML sémantique ;
- navigation clavier ;
- focus visibles ;
- alt text sur les images ;
- contrastes suffisants ;
- respect de `prefers-reduced-motion`.

## 9. SEO

Prévoir une base SEO propre :
- title par page ;
- meta description ;
- structure H1/H2/H3 ;
- Open Graph préparé ;
- URLs propres.

Pas besoin de mettre en place une stratégie SEO complexe dans le premier sprint.
