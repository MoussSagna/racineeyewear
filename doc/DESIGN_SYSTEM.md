# RACINE EYEWEAR — Design System

## 1. Direction artistique

Référence : la maquette RACINE validée.

Mots-clés :

**Racines · Culture · Regard · Artisanat · Identité · Élégance · Chaleur · Modernité**

Le rendu doit être :
- haut de gamme ;
- éditorial ;
- organique ;
- culturel ;
- chaleureux ;
- minimal sans être froid.

Éviter :
- gradients néon ;
- glassmorphism ;
- esthétique SaaS ;
- interfaces trop arrondies ;
- animations cartoon ;
- look e-commerce générique.

## 2. Palette

### Primary — RACINE Green

```css
--racine-green: #26351A;
```

Vert profond utilisé pour :
- sections fortes ;
- CTA principaux ;
- navigation active ;
- textes importants sur fonds clairs.

### Background — Warm Ochre

```css
--racine-ochre: #E9B264;
```

Couleur signature inspirée de la première direction artistique.

Utilisation :
- hero ;
- grandes surfaces éditoriales ;
- éléments de marque.

### Cream

```css
--racine-cream: #F5E8D2;
```

Fond clair principal.

### Brown

```css
--racine-brown: #5A351F;
```

Pour certains textes, détails et éléments chaleureux.

### Terracotta / Gold

```css
--racine-gold: #B9823E;
```

Accent discret.

### Ink

```css
--racine-ink: #171711;
```

Texte très sombre.

### White

```css
--racine-white: #FFFDF8;
```

Pour les zones très claires.

## 3. Variables CSS

Préparer les tokens sous forme de variables CSS :

```css
:root {
  --color-primary: #26351A;
  --color-ochre: #E9B264;
  --color-cream: #F5E8D2;
  --color-brown: #5A351F;
  --color-gold: #B9823E;
  --color-ink: #171711;
  --color-white: #FFFDF8;
}
```

Ne pas disperser les hex dans les composants.

## 4. Typographie

### Titres

**Cormorant Garamond**

Usage :
- H1 ;
- H2 ;
- grands titres éditoriaux ;
- accroches.

Style :
- élégant ;
- contrasté ;
- mode/editorial.

### Texte courant

**Inter**

Usage :
- paragraphes ;
- navigation ;
- boutons ;
- informations secondaires.

### Accent éventuel

Une police serif italique peut être utilisée ponctuellement via Cormorant Garamond Italic.

## 5. Hiérarchie

Exemple desktop :

```text
H1 : 64–88px
H2 : 42–60px
H3 : 28–36px
Body : 16–18px
Small : 12–14px
```

Sur mobile, réduire progressivement sans rendre les titres disproportionnés.

## 6. Logo

Utiliser le logo RACINE fourni par la marque dès qu'il est disponible.

Ne pas redessiner le logo en texte.

Prévoir :
```text
src/assets/logo/
├── racine-logo.svg
├── racine-logo-dark.svg
└── racine-logo-light.svg
```

Si les fichiers n'existent pas encore, utiliser un placeholder clairement identifié.

## 7. Boutons

Style privilégié :
- forme plutôt capsule mais pas excessive ;
- hauteur confortable ;
- texte en petites capitales ou uppercase avec tracking léger ;
- animation de hover très discrète.

Exemple :

```text
DÉCOUVRIR LA COLLECTION →
```

Les CTA doivent rester élégants et peu nombreux.

## 8. Navigation

Desktop :

```text
[RACINE]    Accueil   La marque   Collection   Contact
```

Pas de lien :
- Boutique
- Panier
- Compte
- Acheter

car RACINE est un site vitrine.

## 9. Grille

Desktop :
- max-width autour de 1440px ;
- grille 12 colonnes ;
- marges généreuses.

Mobile :
- 4 colonnes logiques ;
- padding latéral environ 20–24px.

## 10. Images

La photographie est centrale dans la DA.

Favoriser :
- gros plans visage ;
- détails de montures ;
- textures ;
- portraits ;
- images de fabrication ;
- compositions éditoriales.

Les images doivent respirer et ne pas être systématiquement encadrées par des cards.

## 11. Animation

Principes :
- 200–700ms selon le contexte ;
- easing doux ;
- translate léger ;
- opacity ;
- scale très léger.

Exemple de logique :

```text
opacity: 0 → 1
y: 24px → 0
duration: 0.6s
```

Les animations doivent renforcer le storytelling.

## 12. Formes

Privilégier :
- rectangles éditoriaux ;
- coins légèrement arrondis ;
- formes organiques inspirées du logo et des racines.

Éviter les interfaces entièrement composées de cards.

## 13. Ton éditorial

Le site doit donner l'impression d'entrer dans l'univers d'une maison de lunettes, pas dans celui d'une boutique en ligne.

Le contenu fourni dans `Textes site vitrine.pdf` constitue la source de référence éditoriale pour les textes du site.
