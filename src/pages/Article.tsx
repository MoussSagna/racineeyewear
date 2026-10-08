import { ArrowLeft } from 'lucide-react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { ArticleHero } from '../components/sections/news/ArticleHero'
import { ArticleSections } from '../components/sections/news/ArticleSections'
import { ArticleVideo } from '../components/sections/news/ArticleVideo'
import { ScrollReveal } from '../components/ui/ScrollReveal'
import { getArticle } from '../data/articles'
import { usePageDescription } from '../lib/usePageDescription'
import '../styles/news.css'

export function Article() {
  const { slug } = useParams()
  const article = getArticle(slug)
  usePageDescription(article?.seoDescription ?? '')

  if (!article) return <Navigate replace to="/actualites" />

  const { sections, video } = article
  // La vidéo coupe le récit en deux ; sans vidéo, tout tient dans le premier groupe.
  const videoIndex = video
    ? sections.findIndex((section) => section.id === video.afterSection) + 1
    : sections.length
  const splitIndex = videoIndex > 0 ? videoIndex : sections.length

  return (
    <article aria-labelledby="article-title" className="article-page">
      <title>{`${article.title} — RACINE`}</title>
      <ArticleHero article={article} />

      <ScrollReveal className="article-intro">
        <p>{article.intro}</p>
      </ScrollReveal>

      <ArticleSections
        sections={sections.slice(0, splitIndex)}
        startIndex={0}
      />
      {video && <ArticleVideo video={video} />}
      <ArticleSections
        sections={sections.slice(splitIndex)}
        startIndex={splitIndex}
      />

      <footer className="article-end">
        {article.source && (
          <ScrollReveal variant="fade">
            <p className="article-end__source">{article.source}</p>
          </ScrollReveal>
        )}
        <ScrollReveal delay={0.08} variant="fade">
          <Link className="article-end__back" to="/actualites">
            <ArrowLeft aria-hidden="true" size={16} strokeWidth={1.5} />
            Retour aux Actualités
          </Link>
        </ScrollReveal>
      </footer>
    </article>
  )
}
