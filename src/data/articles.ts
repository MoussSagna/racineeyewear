import pressClipping from '../assets/images/actualites/presse-carine-beyssac-lance-racine.jpg'
import radioPortrait from '../assets/images/actualites/racine-ici-saint-etienne-loire.jpg'
import artinovPoster from '../assets/images/actualites/racine-artinov-poster.jpg'
import workshopPortrait from '../assets/images/contact/atelier-carine.jpg'
import artinovFilm from '../assets/video/racine-artinov.mp4'
import type { SocialId } from './contact'

export const articleCategories = {
  presse: 'Presse',
  evenement: 'Événement',
  collaboration: 'Collaboration',
  coulisses: 'Coulisses',
  portrait: 'Portrait',
  interview: 'Interview',
  marque: 'La marque',
  radio: 'Radio',
  television: 'Télévision',
} as const

export type ArticleCategory = keyof typeof articleCategories

export type ArticleQuote = {
  text: string
  author: string
}

export type ArticleSection = {
  id: string
  title: string
  paragraphs: string[]
  quote?: ArticleQuote
}

export type ArticleImage = {
  src: string
  alt: string
  width: number
  height: number
  caption?: string
  /** Publication d'origine, affichée sous le crédit. */
  publication?: string
  /** `press` : coupure de journal, montrée entière comme une archive. */
  kind: 'press' | 'photo'
}

export type ArticleVideo = {
  src: string
  poster: string
  /** Dimensions natives : le lecteur garde ce ratio, quel qu'il soit. */
  width: number
  height: number
  label: string
  caption: string
}

/** Lien vers le contenu d'un média, ouvert dans un nouvel onglet. */
export type ArticleLink = {
  /** Texte du lien, explicite : « Écouter l’émission », « Voir sur TikTok »… */
  label: string
  url: string
  icon: 'listen' | 'read' | Exclude<SocialId, 'linkedin'>
}

/** Passage de RACINE dans un média : radio, télévision… */
export type ArticleCoverage = {
  /** Nom du média, affiché sur les cartes et en tête d'article. */
  media: string
  /** Titre du bloc dans l'article : « L’émission », « Le reportage »… */
  title: string
  /** Fiche affichée dans l'article : média, émission, date… */
  facts: { label: string; value: string }[]
  /** Le premier lien est l'action principale. */
  links: ArticleLink[]
}

export type Article = {
  slug: string
  category: ArticleCategory
  /**
   * Date ISO (`2026-10-15`, ou `2026-10` si le jour n'est pas connu), sert au
   * tri : les plus récents d'abord. Absente si elle n'est pas connue.
   */
  date?: string
  /** Date affichée sur la carte de la page Actualités. */
  dateLabel?: string
  year?: string
  title: string
  subtitle?: string
  excerpt: string
  seoDescription: string
  /** Image de couverture : en tête d'article, sauf si une vidéo en tient lieu. */
  image: ArticleImage
  intro: string
  /** Paragraphes courants à la suite de l'introduction. */
  body?: string[]
  sections: ArticleSection[]
  /** Média principal de l'article, à la place de l'image. */
  video?: ArticleVideo
  /** Mention de source affichée en fin d'article. */
  source?: string
  /** Passage dans un média : sa fiche et les liens pour l'écouter ou le voir. */
  coverage?: ArticleCoverage
  /** Texte de l'invitation sur les cartes. Par défaut : « Lire l’article ». */
  cardCta?: string
}

/**
 * Pour publier un article : ajouter une entrée ici. La page Actualités met le
 * plus récent à la une et liste les autres ; `/actualites/<slug>` en découle.
 */
const allArticles: Article[] = [
  {
    // Informations vérifiées sur tl7.fr (article du 30 octobre 2026).
    slug: 'racine-sur-tl7',
    category: 'television',
    date: '2026-10-30',
    dateLabel: '30 octobre 2026',
    year: '2026',
    title: 'RACINE sur TL7, la chaîne TV locale de Saint-Etienne',
    excerpt:
      'TL7 met en lumière RACINE et Carine Beyssac, récompensée par le prix Artinov pour ses lunettes pensées pour la diversité des morphologies.',
    seoDescription:
      'RACINE sur TL7 : la chaîne de télévision locale de Saint-Étienne présente Carine Beyssac et ses lunettes pensées pour la diversité des morphologies.',
    image: {
      src: workshopPortrait,
      alt: 'Carine Beyssac, créatrice de RACINE, souriante, lunettes sur le nez, assise dans son atelier devant son établi',
      width: 1560,
      height: 1900,
      kind: 'photo',
    },
    intro:
      'TL7, la chaîne de télévision locale de Saint-Étienne, met en lumière RACINE et Carine Beyssac, lauréate du prix Artinov dans la catégorie « Innovation de savoir-faire ».',
    body: [
      'Au programme : des montures pensées pour valoriser la diversité morphologique des visages, et leur fabrication à l’atelier de Saint-Bonnet-le-Château.',
      'L’article est à lire sur le site de TL7, et le reportage à retrouver sur les réseaux sociaux de la chaîne.',
    ],
    sections: [],
    coverage: {
      media: 'TL7',
      title: 'Le reportage',
      facts: [
        { label: 'Média', value: 'TL7, Télévision Loire 7' },
        {
          label: 'Article',
          value:
            '« Saint-Bonnet-le-Château : Elle reçoit un prix pour ses lunettes plus inclusive »',
        },
        { label: 'Publication', value: '30 octobre 2026' },
      ],
      links: [
        {
          label: 'Lire l’article',
          url: 'https://www.tl7.fr/actualites-loire/actualite/actualite_1/saint-bonnet-le-chateau-elle-recoit-un-prix-pour-ses-lunettes-plus-inclusive_15297.html',
          icon: 'read',
        },
        {
          label: 'Voir sur Facebook',
          url: 'https://www.facebook.com/share/v/1JDFvvr87d/',
          icon: 'facebook',
        },
        {
          label: 'Voir sur TikTok',
          url: 'https://vm.tiktok.com/ZGdXUqrke/',
          icon: 'tiktok',
        },
        {
          label: 'Voir sur Instagram',
          url: 'https://www.instagram.com/reel/DfIIUtXg3J7/',
          icon: 'instagram',
        },
      ],
    },
    cardCta: 'Découvrir le reportage',
    source:
      'D’après l’article de Thibault Rivière, journaliste, publié sur tl7.fr le 30 octobre 2026.',
  },
  {
    // Texte fourni par Carine, repris tel quel. Épisode vérifié sur ici.fr.
    slug: 'racine-sur-ici-saint-etienne-loire',
    category: 'radio',
    date: '2026-10-15',
    dateLabel: '15 octobre 2026',
    year: '2026',
    title: 'RACINE à l’honneur sur ICI Saint-Étienne Loire',
    excerpt:
      'RACINE à l’honneur sur ici Saint-Etienne Loire dans l’émission Ici ça marche, qui met en lumière les projets et initiatives du département.',
    seoDescription:
      'RACINE à l’honneur sur ICI Saint-Étienne Loire dans l’émission Ici ça marche, qui met en lumière les projets et initiatives du département.',
    image: {
      src: radioPortrait,
      alt: 'Carine Beyssac souriante à son bureau, lunettes RACINE sur le nez, entourée d’une machine de fabrication, d’un ordinateur affichant le dessin d’une monture, d’un présentoir de lunettes et du trophée ARTINOV',
      width: 1146,
      height: 845,
      kind: 'photo',
    },
    intro:
      'RACINE à l’honneur sur ici Saint-Etienne Loire dans l’émission Ici ça marche, qui met en lumière les projets et initiatives du département.',
    sections: [],
    coverage: {
      media: 'ICI Saint-Étienne Loire',
      title: 'L’émission',
      facts: [
        { label: 'Média', value: 'ICI Saint-Étienne Loire' },
        { label: 'Émission', value: 'Ici ça marche' },
        {
          label: 'Épisode',
          value:
            '« Une épicerie solidaire pour les étudiants et des lunettes repensées pour toutes les morphologies »',
        },
        { label: 'Diffusion', value: '15 octobre 2026' },
      ],
      links: [
        {
          label: 'Écouter l’émission',
          url: 'https://www.ici.fr/emissions/l-eco-d-ici/saint-etienne-loire?page=2',
          icon: 'listen',
        },
      ],
    },
    cardCta: 'Découvrir l’émission',
  },
  {
    // Contenu repris de la coupure de presse `assets/article.jpeg`.
    slug: 'carine-beyssac-lance-racine',
    category: 'presse',
    // Jour de parution inconnu : le mois seul.
    date: '2026-10',
    dateLabel: 'Octobre 2026',
    year: '2026',
    title: 'Carine Beyssac lance RACINE, sa marque de lunettes',
    subtitle:
      'Une nouvelle maison de lunettes née à Saint-Bonnet-le-Château, entre création, fabrication française et diversité des morphologies.',
    excerpt:
      'Carine Beyssac lance RACINE depuis son atelier de création à Saint-Bonnet-le-Château, avec l’ambition de proposer des montures uniques adaptées aux différentes morphologies de visage.',
    seoDescription:
      'Découvrez l’histoire du lancement de RACINE par Carine Beyssac, entre création, fabrication française et diversité des morphologies.',
    image: {
      src: pressClipping,
      alt: 'Coupure de presse titrée « Carine Beyssac lance RACINE, sa marque de lunettes », datée de Saint-Bonnet-le-Château, avec un portrait de Carine Beyssac souriante portant une monture RACINE',
      width: 1800,
      height: 1800,
      caption: 'Archive de presse — Texte et photo Ève Robert',
      publication: 'le Progrès - Forez',
      kind: 'press',
    },
    intro:
      'En créant son atelier de création RACINE, Carine Beyssac offre de l’inédit : des montures de lunettes en modèle unique, adaptées à la morphologie des visages.',
    sections: [
      {
        id: 'saint-bonnet-le-chateau',
        title: 'Une marque née à Saint-Bonnet-le-Château',
        paragraphs: [
          'Carine Beyssac vient d’installer son atelier de création de montures de lunettes à Saint-Bonnet-le-Château, en créant sa marque RACINE. Une anagramme de son prénom, qui évoque aussi ses origines familiales.',
          'Opticienne diplômée en première formation, elle s’est ensuite orientée vers un Bachelor lunetier créateur à Paris, en effectuant plusieurs stages chez des créateurs parisiens.',
        ],
      },
      {
        id: 'morphologies',
        title: 'Des montures pensées pour les morphologies',
        paragraphs: [
          'En choisissant la création, Carine s’est tout spécialement penchée sur la diversité morphologique des visages.',
        ],
        quote: {
          text: 'L’ensemble des marques sont adaptées sans tenir compte de l’importance d’un nez par exemple. Voire aussi des fronts plus larges.',
          author: 'Carine Beyssac',
        },
      },
      {
        id: 'un-nom-pour-chaque-monture',
        title: 'Un nom pour chaque monture',
        paragraphs: [
          'La jeune créatrice travaille en modèle unique, en ajoutant une touche originale : donner un nom ou un prénom à chaque monture. Une nomination qui conte sa petite histoire.',
        ],
      },
      {
        id: 'fabrication-francaise',
        title: 'Une fabrication française',
        paragraphs: [
          'Son matériel de fabrication est 100 % français. L’acétate, en fil de coton et pulpe de bois, est commandé à Oyonnax, dans l’Ain. Des choix qui visent la grande qualité, présentés en modèle solaire mais bien sûr également ajustables à la vue.',
          'L’assemblage s’effectue en numérique et en manuel. « Le numérique permet un gain de temps sur la fabrication », précise la créatrice.',
        ],
      },
      {
        id: 'la-suite',
        title: 'La suite de l’aventure',
        paragraphs: [
          'Avant de se lancer dans cette aventure de création à son propre compte, Carine Beyssac a participé au projet « Initiative Loire » et obtenu le prix d’honneur. « C’est ce qui m’a vraiment motivée pour me lancer, ce prix étant accompagné d’aides. »',
          'Dans un premier temps, les montures sont présentées Au coin des lunettes, rue Chevalier. Dans un deuxième temps, Carine profitera des chutes de ses plaques d’acétate pour créer des accessoires pour lunettes.',
        ],
      },
    ],
    source:
      'D’après l’article de presse d’Ève Robert, correspondante, consacré au lancement de RACINE.',
  },
  {
    // Texte fourni par Carine, repris tel quel. Pas de date connue.
    slug: 'racine-se-raconte',
    category: 'interview',
    title: 'RACINE se raconte.',
    excerpt:
      'Quelques minutes pour raconter l’histoire derrière la marque, mon parcours d’opticienne-lunetière, mais aussi ce qui m’a poussée à créer mes propres montures.',
    seoDescription:
      'Quelques minutes pour raconter l’histoire derrière la marque, mon parcours d’opticienne-lunetière, mais aussi ce qui m’a poussée à créer mes propres montures.',
    image: {
      src: artinovPoster,
      alt: 'Carine Beyssac, souriante, lunettes RACINE sur le nez, filmée dans son atelier devant ses outils et des affiches RACINE',
      width: 1600,
      height: 900,
      kind: 'photo',
    },
    intro:
      'Lauréate du concours Artinov pour Innovation de savoir-faire, j’ai eu l’occasion de parler de RACINE à travers une interview réalisée avec la Chambre des Métiers et de l’Artisanat.',
    body: [
      'Quelques minutes pour raconter l’histoire derrière la marque, mon parcours d’opticienne-lunetière, mais aussi ce qui m’a poussée à créer mes propres montures.',
    ],
    sections: [],
    video: {
      src: artinovFilm,
      poster: artinovPoster,
      width: 1920,
      height: 1080,
      label:
        'Film de présentation de RACINE par Carine Beyssac, sous-titré en français',
      caption:
        'Carine Beyssac présente RACINE dans son atelier. Film réalisé pour ARTINOV, le concours de l’innovation artisanale de la CMA Auvergne-Rhône-Alpes. Sous-titré en français.',
    },
  },
]

// Les articles sans date suivent les articles datés, dans l'ordre de saisie.
export const articles = [...allArticles].sort((a, b) =>
  (b.date ?? '').localeCompare(a.date ?? ''),
)

export function getArticle(slug: string | undefined) {
  return articles.find((article) => article.slug === slug)
}
