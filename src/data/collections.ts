// Contenus issus de `assets/Textes site vitrine.pdf` (voir doc/CONTENT_SOURCE.md).
// Les photographies sont des copies allégées des fichiers de `src/assets/images/`.

import allPowerCampaign01 from '../assets/images/collection/all-power-campagne-01.jpg'
import allPowerCampaign02 from '../assets/images/collection/all-power-campagne-02.jpg'
import allPowerCampaign03 from '../assets/images/collection/all-power-campagne-03.jpg'
import allPowerChapter from '../assets/images/collection/all-power-chapitre.jpg'
import allPowerManifesto01 from '../assets/images/collection/all-power-manifeste-01.jpg'
import allPowerManifesto02 from '../assets/images/collection/all-power-manifeste-02.jpg'
import allPowerManifesto03 from '../assets/images/collection/all-power-manifeste-03.jpg'
import allPowerPoster from '../assets/images/collection/all-power-poster.jpg'
import humanBook01 from '../assets/images/collection/human-book-01.jpg'
import humanBook02 from '../assets/images/collection/human-book-02.jpg'
import humanBook03 from '../assets/images/collection/human-book-03.jpg'
import humanBook04 from '../assets/images/collection/human-book-04.jpg'
import humanBook05 from '../assets/images/collection/human-book-05.jpg'
import humanBook06 from '../assets/images/collection/human-book-06.jpg'
import humanBook07 from '../assets/images/collection/human-book-07.jpg'
import humanBook08 from '../assets/images/collection/human-book-08.jpg'
import humanBook09 from '../assets/images/collection/human-book-09.jpg'
import humanBook10 from '../assets/images/collection/human-book-10.jpg'
import humanBook11 from '../assets/images/collection/human-book-11.jpg'
import finishBlack from '../assets/images/collection/matiere-noir.jpg'
import finishTortoise from '../assets/images/collection/matiere-ecaille.jpg'
import frameElaine from '../assets/images/collection/monture-elaine.jpg'
import frameElaineTortoise from '../assets/images/collection/monture-elaine-ecaille.jpg'
import frameElaineBlack from '../assets/images/collection/monture-elaine-noir.jpg'
import frameFred from '../assets/images/collection/monture-fred.jpg'
import frameFredTortoise from '../assets/images/collection/monture-fred-ecaille.jpg'
import frameFredBlack from '../assets/images/collection/monture-fred-noir.jpg'
import frameShakur from '../assets/images/collection/monture-shakur.jpg'
import frameShakurTortoise from '../assets/images/collection/monture-shakur-ecaille.jpg'
import frameShakurBlack from '../assets/images/collection/monture-shakur-noir.jpg'
import summer01 from '../assets/images/collection/summer-01.jpg'
import summer02 from '../assets/images/collection/summer-02.jpg'
import summer03 from '../assets/images/collection/summer-03.jpg'
import summer04 from '../assets/images/collection/summer-04.jpg'
import summer05 from '../assets/images/collection/summer-05.jpg'
import allPowerFilm from '../assets/video/all-power.mp4'

export type Photo = {
  src: string
  alt: string
  width: number
  height: number
}

export type FrameFinish = {
  label: string
  photo: Photo
}

export type Frame = {
  id: string
  name: string
  /** Intention de la monture — à renseigner quand la marque la communique. */
  intention?: string
  photo: Photo
  finishes: FrameFinish[]
}

export type Finish = {
  id: string
  title: string
  label: string
  words: string[]
  photo: Photo
}

type ChapterBase = {
  id: string
  /** Nom de la série à laquelle appartient le chapitre. */
  title: string
  chapter: string
}

export type AvailableChapter = ChapterBase & {
  status: 'available'
  film: { src: string; poster: string }
  lead: string[]
  intro: string
  campaign: Photo[]
  manifesto: {
    opening: string
    statement: string
    paragraphs: string[]
    themes: string[]
    /** Grande photographie, son écho en noir et blanc, puis le portrait. */
    photos: [Photo, Photo, Photo]
  }
  chapterNote: { lines: string[]; foundation: string; photo: Photo }
  frames: { intro: string[]; items: Frame[] }
  finishes: { statement: string; items: Finish[] }
}

/** Chapitre annoncé : aucun contenu tant que la marque ne l'a pas dévoilé. */
export type UpcomingChapter = ChapterBase & { status: 'upcoming' }

export type Chapter = AvailableChapter | UpcomingChapter

const allPowerChapter01: AvailableChapter = {
  id: 'all-power-01',
  title: 'ALL POWER',
  chapter: '01',
  status: 'available',
  film: { src: allPowerFilm, poster: allPowerPoster },
  lead: ['Une histoire de force.', 'De fierté.', 'De transmission.'],
  intro:
    'Une collection inspirée du Black Panther Party, pensée autour de l’identité, de la visibilité, de l’émancipation et de la puissance collective.',
  campaign: [
    {
      src: allPowerCampaign01,
      alt: 'Un homme barbu en veste de cuir et casquette, adossé à un mur de pierre, portant une monture ALL POWER aux verres teintés',
      width: 933,
      height: 1400,
    },
    {
      src: allPowerCampaign02,
      alt: 'Un homme et une femme en cuir noir assis sur un banc de pierre sous une fenêtre aux volets clos, montures ALL POWER sur le regard',
      width: 933,
      height: 1400,
    },
    {
      src: allPowerCampaign03,
      alt: 'Une femme en veste de cuir, la main levée vers ses lunettes ALL POWER, devant un mur de pierre',
      width: 933,
      height: 1400,
    },
  ],
  manifesto: {
    opening:
      'Pour sa première collection, RACINE puise son inspiration dans un mouvement qui a profondément marqué l’histoire des luttes noires aux États-Unis : le Black Panther Party.',
    statement:
      'Cette collection ne parle pas de nostalgie mais de représentation.',
    paragraphs: [
      'Au-delà de son histoire politique, c’est son langage visuel, sa puissance collective et sa capacité à transformer l’identité en affirmation qui ont retenu notre attention.',
      'Les silhouettes, les regards, le look, les images militantes, mais aussi cette idée essentielle : reprendre le pouvoir de raconter sa propre histoire.',
    ],
    themes: [
      'Identité',
      'Visibilité',
      'Émancipation',
      'Transmission',
      'Réinvention',
    ],
    photos: [
      {
        src: allPowerManifesto01,
        alt: 'Sur un escalier de Montmartre, une femme en long manteau de cuir ajuste sa monture ALL POWER aux côtés d’un homme en casquette et blouson de cuir, lunettes aux verres ambrés sur le nez',
        width: 1199,
        height: 1800,
      },
      {
        src: allPowerManifesto03,
        alt: 'Portrait en noir et blanc d’une femme en veste de cuir accoudée à une rampe, le menton sur la main, lunettes ALL POWER sur le regard',
        width: 1000,
        height: 1763,
      },
      {
        src: allPowerManifesto02,
        alt: 'Portrait serré d’un homme barbu, le menton sur le poing, portant une monture noire ALL POWER aux verres miroir',
        width: 744,
        height: 1300,
      },
    ],
  },
  chapterNote: {
    lines: [
      'Une collection inspirée du passé,',
      'pensée dans le présent',
      'et imaginée pour la suite.',
    ],
    foundation: 'Avec ce premier chapitre, RACINE pose ses fondations.',
    photo: {
      src: allPowerChapter,
      alt: 'Photographie en noir et blanc : un homme en casquette et une femme qui rit, en cuir, assis sur un banc sous une fenêtre cintrée aux volets clos, lunettes ALL POWER sur le nez',
      width: 1058,
      height: 1925,
    },
  },
  frames: {
    intro: [
      'ALL POWER traduit cette énergie à travers des montures aux lignes affirmées, pensées comme des pièces intemporelles plutôt que comme de simples accessoires de mode.',
      'Chaque modèle porte le nom d’un membre du BPP et une intention.',
    ],
    items: [
      {
        id: 'elaine',
        name: 'Elaine',
        photo: {
          src: frameElaine,
          alt: 'Les montures ELAINE noire et écaille posées sur un muret de pierre, avec leur étui et une chamoisine RACINE',
          width: 1350,
          height: 1800,
        },
        finishes: [
          {
            label: 'Noir',
            photo: {
              src: frameElaineBlack,
              alt: 'Monture ELAINE noire vue de face, verres verts',
              width: 750,
              height: 1000,
            },
          },
          {
            label: 'Écaille',
            photo: {
              src: frameElaineTortoise,
              alt: 'Monture ELAINE écaille vue de face, verres ambrés',
              width: 750,
              height: 1000,
            },
          },
        ],
      },
      {
        id: 'fred',
        name: 'Fred',
        photo: {
          src: frameFred,
          alt: 'Les montures FRED noire et écaille posées sur un muret de pierre, avec leur étui et une chamoisine RACINE',
          width: 1350,
          height: 1800,
        },
        finishes: [
          {
            label: 'Noir',
            photo: {
              src: frameFredBlack,
              alt: 'Monture FRED noire vue de face, double pont et verres verts',
              width: 750,
              height: 1000,
            },
          },
          {
            label: 'Écaille',
            photo: {
              src: frameFredTortoise,
              alt: 'Monture FRED écaille vue de face, double pont et verres jaunes',
              width: 750,
              height: 1000,
            },
          },
        ],
      },
      {
        id: 'shakur',
        name: 'Shakur',
        photo: {
          src: frameShakur,
          alt: 'Les montures SHAKUR noire et écaille, rondes, posées sur leur étui et une chamoisine RACINE, sur un muret de pierre',
          width: 1350,
          height: 1800,
        },
        finishes: [
          {
            label: 'Noir',
            photo: {
              src: frameShakurBlack,
              alt: 'Monture SHAKUR noire vue de face, ronde, verres orangés',
              width: 750,
              height: 1000,
            },
          },
          {
            label: 'Écaille',
            photo: {
              src: frameShakurTortoise,
              alt: 'Monture SHAKUR écaille vue de face, ronde, verres verts',
              width: 750,
              height: 1000,
            },
          },
        ],
      },
    ],
  },
  finishes: {
    statement: 'Le noir et l’écaille deviennent ici plus qu’une couleur.',
    items: [
      {
        id: 'black',
        title: 'Black',
        label: 'Noir',
        words: ['Force', 'Élégance', 'Profondeur'],
        photo: {
          src: finishBlack,
          alt: 'Gros plan sur une monture noire ELAINE posée sur la pierre, devant un feuillage',
          width: 1410,
          height: 1998,
        },
      },
      {
        id: 'tortoise',
        title: 'Tortoise',
        label: 'Écaille',
        words: ['Caractère', 'Chaleur', 'Intemporalité'],
        photo: {
          src: finishTortoise,
          alt: 'Gros plan sur une monture écaille FRED posée sur la pierre, les verres traversés par le soleil',
          width: 1350,
          height: 1800,
        },
      },
    ],
  },
}

/**
 * La série ALL POWER. Pour publier un nouveau chapitre, remplacer l'entrée
 * `upcoming` correspondante par un `AvailableChapter` complet.
 */
export const allPower = {
  id: 'all-power',
  title: 'ALL POWER',
  chapters: [
    allPowerChapter01,
    {
      id: 'all-power-02',
      title: 'ALL POWER',
      chapter: '02',
      status: 'upcoming',
    },
  ] satisfies Chapter[],
}

/** Chapitre mis en avant sur la page Collection. */
export const featuredChapter = allPowerChapter01

export const humanBook = {
  id: 'human-book',
  title: 'Human Book',
  quote:
    'Une monture n’existe pleinement qu’à travers la personne qui la porte.',
  paragraphs: [
    'Ce Human Book a été imaginé pour montrer RACINE en mouvement, sur des visages, avec leurs différences, leurs expressions et leurs personnalités.',
    'Chaque photo illustre la rencontre entre une monture et un regard.',
  ],
  invitation:
    'Ce livre est une invitation à découvrir les modèles à travers celles et ceux qui lui donnent vie.',
  portraits: [
    {
      src: humanBook01,
      alt: 'Femme souriante, la main sur le cœur, portant une monture solaire aux reflets verts',
      width: 975,
      height: 1300,
    },
    {
      src: humanBook02,
      alt: 'Portrait serré en noir et blanc d’un homme qui rit, les yeux plissés derrière une monture noire épaisse',
      width: 975,
      height: 1459,
    },
    {
      src: humanBook03,
      alt: 'Femme coiffée d’un foulard orange, souriante, portant une monture sombre aux verres miroir',
      width: 975,
      height: 1300,
    },
    {
      src: humanBook09,
      alt: 'Femme aux longs cheveux bouclés, accroupie devant un mur rouge, portant une monture aux verres jaunes',
      width: 975,
      height: 1300,
    },
    {
      src: humanBook10,
      alt: 'Homme en casquette, tout sourire sur la plage, portant une monture translucide aux verres miroir',
      width: 975,
      height: 1300,
    },
    {
      src: humanBook11,
      alt: 'Deux amies souriantes, côte à côte au soleil, lunettes de soleil sur le nez',
      width: 975,
      height: 1463,
    },
    {
      src: humanBook04,
      alt: 'Homme aux cheveux bouclés et à la barbe courte, souriant, portant une large monture sombre',
      width: 975,
      height: 1300,
    },
    {
      src: humanBook05,
      alt: 'Femme aux cheveux rouges, rieuse, tenant ses lunettes de soleil à deux mains',
      width: 975,
      height: 1300,
    },
    {
      src: humanBook06,
      alt: 'Femme en tee-shirt jaune, souriante, portant une monture aux verres miroir',
      width: 975,
      height: 1300,
    },
    {
      src: humanBook07,
      alt: 'Portrait en noir et blanc d’un homme aux locks, lunettes de soleil noires, le visage sortant de l’ombre',
      width: 869,
      height: 1300,
    },
    {
      src: humanBook08,
      alt: 'Femme en terrasse, un verre de vin à la main, le regard au loin derrière des lunettes de soleil',
      width: 975,
      height: 1300,
    },
  ] satisfies Photo[],
}

export const summerCollection = {
  id: 'summer',
  title: 'Summer Collection',
  collaboration: {
    lead: 'Collaboration avec la marque de bijoux upcyclés artisanale',
    partner: 'Facette by Nat',
  },
  photos: [
    {
      src: summer02,
      alt: 'Deux femmes allongées sur une serviette de plage, lunettes de soleil colorées, sous un ciel bleu',
      width: 1133,
      height: 1700,
    },
    {
      src: summer01,
      alt: 'Deux femmes rieuses dans la mer, lunettes de soleil sur le nez',
      width: 956,
      height: 1700,
    },
    {
      src: summer03,
      alt: 'Deux visages allongés au soleil sur la plage, lunettes de soleil rouges et boucle d’oreille en tissu madras',
      width: 1200,
      height: 1669,
    },
    {
      src: summer04,
      alt: 'Profil en gros plan d’une femme aux fines tresses, monture rose aux verres miroir',
      width: 1000,
      height: 1778,
    },
    {
      src: summer05,
      alt: 'Femme de profil allongée sur le sable, en maillot coloré, lunettes de soleil écaille sur le nez',
      width: 1000,
      height: 1778,
    },
  ] satisfies Photo[],
}

/** Les univers RACINE, dans leur ordre d'apparition sur la page. */
export const collections = [allPower, humanBook, summerCollection] as const
