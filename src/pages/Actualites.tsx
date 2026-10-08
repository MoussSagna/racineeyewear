import { NewsFeature } from '../components/sections/news/NewsFeature'
import { NewsHero } from '../components/sections/news/NewsHero'
import { NewsList } from '../components/sections/news/NewsList'
import { articles } from '../data/articles'
import { usePageDescription } from '../lib/usePageDescription'
import '../styles/news.css'

export function Actualites() {
  const [featured, ...others] = articles
  usePageDescription(
    'Découvrez les actualités, rencontres, collaborations et histoires qui font vivre RACINE.',
  )

  return (
    <div className="news-page">
      <title>Actualités — RACINE</title>
      <NewsHero />
      {featured && <NewsFeature article={featured} />}
      <NewsList articles={others} />
    </div>
  )
}
