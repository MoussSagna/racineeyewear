# Prompt Agent — Sprint 00 — Initialisation RACINE EYEWEAR

Tu es l'agent de développement du projet **RACINE EYEWEAR**.

## Objectif du sprint

Pour ce premier sprint, tu dois **uniquement initialiser le projet et créer sa structure de base**.

⚠️ Ne développe pas encore le site complet.
⚠️ Ne crée pas les sections finales de la homepage.
⚠️ Ne développe pas les animations complexes.
⚠️ Ne crée pas de système e-commerce.
⚠️ Ne crée pas de backend.

Le but est d'obtenir un repository propre, compilable et prêt pour les prochains sprints.

## Contexte produit

RACINE EYEWEAR est une marque française de lunettes.

Le projet est un **site vitrine éditorial**, pas un e-shop.

Navigation principale obligatoire :

- Accueil
- La marque
- Collection
- Contact

Routes prévues :

```text
/
 /la-marque
 /collection
 /contact
```

## Stack obligatoire

Utilise :

- React
- Vite
- TypeScript
- React Router
- Tailwind CSS
- shadcn/ui
- Motion (`motion/react`)
- Vitest
- React Testing Library
- ESLint
- Prettier

TypeScript doit être en mode strict.

## Ce que tu dois mettre en place

### 1. Initialisation

Créer un projet Vite React TypeScript propre.

### 2. Routing

Installer React Router et préparer les quatre routes :

```text
/
 /la-marque
 /collection
 /contact
```

Pour le moment, chaque page peut afficher uniquement un placeholder très simple indiquant son nom.

### 3. Layout

Créer la structure :

```text
App
└── Router
    └── SiteLayout
        ├── Header
        ├── Main
        └── Footer
```

Créer au minimum :

```text
Header.tsx
Footer.tsx
MobileMenu.tsx
```

Le Header doit déjà contenir la navigation :

```text
Accueil
La marque
Collection
Contact
```

Le logo peut être un placeholder tant que l'asset officiel n'est pas disponible.

Il ne doit y avoir aucun lien "Panier", "Boutique" ou "Compte".

### 4. Design tokens

Mettre en place les variables de couleurs dans un fichier central.

Palette :

```text
RACINE Green   #26351A
Warm Ochre     #E9B264
Cream          #F5E8D2
Brown          #5A351F
Gold           #B9823E
Ink            #171711
White          #FFFDF8
```

Typographie :

```text
Titres : Cormorant Garamond
Texte : Inter
```

Préparer le chargement des fonts de manière propre.

### 5. Structure des dossiers

Créer une architecture proche de :

```text
src/
├── app/
│   ├── App.tsx
│   ├── router.tsx
│   └── providers/
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── MobileMenu.tsx
│   ├── ui/
│   └── sections/
├── pages/
│   ├── Home.tsx
│   ├── Brand.tsx
│   ├── Collection.tsx
│   └── Contact.tsx
├── assets/
│   ├── images/
│   ├── logo/
│   └── icons/
├── data/
├── lib/
│   └── utils.ts
├── styles/
│   ├── globals.css
│   └── tokens.css
└── tests/
```

Créer uniquement les fichiers nécessaires au fonctionnement initial.

### 6. shadcn/ui

Configurer shadcn/ui mais ne pas construire toute l'interface avec ses composants.

Installer/configurer uniquement ce qui est nécessaire à la base.

### 7. Motion

Installer/configurer Motion.

Ne pas ajouter de grosses animations dans ce sprint.

Créer éventuellement un petit composant ou utilitaire permettant d'ajouter des animations dans les prochains sprints.

### 8. Tests

Configurer Vitest + React Testing Library.

Créer au minimum un test simple qui vérifie que le Header affiche :

```text
Accueil
La marque
Collection
Contact
```

Le test doit passer.

### 9. Qualité

Ajouter :

- ESLint
- Prettier
- TypeScript strict
- `.gitignore`

Vérifier :

```bash
npm run lint
npm run test
npm run build
```

Les trois doivent fonctionner.

## Contenu éditorial

Un document `Textes site vitrine.pdf` est fourni au projet.

Il contient le contenu éditorial officiel de RACINE.

Ne réécris pas et ne paraphrase pas ce contenu dans ce sprint.

Les prochains sprints pourront l'intégrer section par section.

Quelques éléments structurants du contenu :

- "RACINE - La Culture dans chaque regard"
- histoire de la créatrice ;
- origine du nom RACINE ;
- collection ALL POWER — Chapter 01 ;
- fabrication française ;
- acétate de cellulose ;
- diversité des morphologies ;
- Human Book ;
- contact.

## Important : pas d'invention

Ne crée pas :
- de faux produits ;
- de faux prix ;
- de faux témoignages ;
- de fausses boutiques ;
- de fausses informations de contact ;
- de faux réseaux sociaux.

Utilise uniquement les informations fournies dans les fichiers du projet.

## Git

Une fois le sprint terminé :

```bash
git init
git add .
git commit -m "chore: initialize racine eyewear website"
git branch -M main
git remote add origin https://github.com/MoussSagna/racineeyewear.git
git push -u origin main
```

Si le repository distant contient déjà un historique ou si une commande échoue, **ne force pas le push**.

Signale clairement le problème.

## Ce que tu dois me rendre à la fin

Avant de considérer le sprint terminé, donne-moi :

1. l'arborescence créée ;
2. les dépendances installées ;
3. les scripts disponibles ;
4. le résultat de `npm run lint` ;
5. le résultat de `npm run test` ;
6. le résultat de `npm run build` ;
7. le commit créé ;
8. le résultat du push GitHub.

Ne passe pas au sprint suivant.

Attends ma validation avant de développer la première vraie section du site.
