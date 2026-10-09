import pressClipping from '../assets/images/actualites/presse-carine-beyssac-lance-racine.jpg'
import artinovPoster from '../assets/images/actualites/racine-artinov-poster.jpg'
import artinovFilm from '../assets/video/racine-artinov.mp4'

export const articleCategories = {
  presse: 'Presse',
  evenement: 'Événement',
  collaboration: 'Collaboration',
  coulisses: 'Coulisses',
  portrait: 'Portrait',
  interview: 'Interview',
  marque: 'La marque',
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

export type Article = {
  slug: string
  category: ArticleCategory
  /** Date ISO, sert au tri : les plus récents d'abord. Absente si elle n'est pas connue. */
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
}

/**
 * Pour publier un article : ajouter une entrée ici. La page Actualités met le
 * plus récent à la une et liste les autres ; `/actualites/<slug>` en découle.
 */
const allArticles: Article[] = [
  {
    // Contenu repris de la coupure de presse `assets/article.jpeg`.
    slug: 'carine-beyssac-lance-racine',
    category: 'presse',
    date: '2026-10-01',
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
