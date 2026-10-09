import { motion, useReducedMotion } from 'motion/react'
import type { Article } from '../../../data/articles'
import { easeOutSoft } from '../../../lib/motion'
import { cn } from '../../../lib/utils'
import { ArticleVideo } from './ArticleVideo'
import { NewsMeta } from './NewsMeta'
import { PressClipping } from './PressClipping'

type ArticleHeroProps = {
  article: Article
}

export function ArticleHero({ article }: ArticleHeroProps) {
  const prefersReducedMotion = useReducedMotion()
  const animate = !prefersReducedMotion

  return (
    <header
      className={cn('article-hero', article.video && 'article-hero--video')}
    >
      <div className="article-hero__copy">
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          initial={animate ? { opacity: 0, y: 10 } : false}
          transition={{ duration: 0.5, delay: 0.15, ease: easeOutSoft }}
        >
          <NewsMeta article={article} date="year" />
        </motion.div>
        <motion.h1
          animate={{ opacity: 1, y: 0 }}
          className="article-hero__title"
          id="article-title"
          initial={animate ? { opacity: 0, y: 28 } : false}
          transition={{ duration: 0.85, delay: 0.25, ease: easeOutSoft }}
        >
          {article.title}
        </motion.h1>
        {article.subtitle && (
          <motion.p
            animate={{ opacity: 1, y: 0 }}
            className="article-hero__subtitle"
            initial={animate ? { opacity: 0, y: 14 } : false}
            transition={{ duration: 0.6, delay: 0.5, ease: easeOutSoft }}
          >
            {article.subtitle}
          </motion.p>
        )}
      </div>
      {article.video ? (
        <ArticleVideo className="article-hero__video" video={article.video} />
      ) : (
        <PressClipping
          className="article-hero__image"
          image={article.image}
          priority
        />
      )}
    </header>
  )
}
