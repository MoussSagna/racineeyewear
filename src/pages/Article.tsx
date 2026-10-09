import { ArrowLeft } from 'lucide-react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { ArticleHero } from '../components/sections/news/ArticleHero'
import { ArticleSections } from '../components/sections/news/ArticleSections'
import { ScrollReveal } from '../components/ui/ScrollReveal'
import { getArticle } from '../data/articles'
import { usePageDescription } from '../lib/usePageDescription'
import '../styles/news.css'

export function Article() {
  const { slug } = useParams()
  const article = getArticle(slug)
  usePageDescription(article?.seoDescription ?? '')

  if (!article) return <Navigate replace to="/actualites" />

  return (
    <article aria-labelledby="article-title" className="article-page">
      <title>{`${article.title} — RACINE`}</title>
      <ArticleHero article={article} />

      <div className="article-intro">
        <ScrollReveal>
          <p className="article-intro__lede">{article.intro}</p>
        </ScrollReveal>
        {article.body?.map((paragraph, index) => (
          <ScrollReveal delay={0.08 + index * 0.06} key={paragraph}>
            <p className="article-text">{paragraph}</p>
          </ScrollReveal>
        ))}
      </div>

      <ArticleSections sections={article.sections} startIndex={0} />

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
