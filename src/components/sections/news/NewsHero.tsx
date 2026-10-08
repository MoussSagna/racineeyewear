import { motion, useReducedMotion } from 'motion/react'
import heroImage from '../../../assets/images/actualites/hero-magazine.jpg'
import { easeOutSoft } from '../../../lib/motion'

const titleLines = ['Les histoires', 'qui font vivre', 'RACINE.'] as const

export function NewsHero() {
  const prefersReducedMotion = useReducedMotion()
  const animate = !prefersReducedMotion

  return (
    <section aria-labelledby="news-title" className="news-hero">
      <div className="news-hero__copy">
        <motion.p
          animate={{ opacity: 1, y: 0 }}
          className="news-hero__label"
          initial={animate ? { opacity: 0, y: 10 } : false}
          transition={{ duration: 0.5, delay: 0.15, ease: easeOutSoft }}
        >
          Actualités
        </motion.p>
        <h1 className="news-hero__title" id="news-title">
          {titleLines.map((line, index) => (
            <span className="news-hero__line" key={line}>
              <motion.span
                animate={{ y: '0%' }}
                initial={animate ? { y: '108%' } : false}
                transition={{
                  duration: 0.85,
                  delay: 0.25 + index * 0.1,
                  ease: easeOutSoft,
                }}
              >
                {line}
              </motion.span>{' '}
            </span>
          ))}
        </h1>
        <motion.p
          animate={{ opacity: 1, y: 0 }}
          className="news-hero__text"
          initial={animate ? { opacity: 0, y: 14 } : false}
          transition={{ duration: 0.6, delay: 0.7, ease: easeOutSoft }}
        >
          Rencontres, collaborations, événements, coulisses... Découvrez
          l’actualité de RACINE et tout ce qui fait vivre la marque.
        </motion.p>
      </div>

      <motion.div
        animate={{ clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 }}
        className="news-hero__media"
        initial={
          animate ? { clipPath: 'inset(0% 0% 100% 0%)', opacity: 0.5 } : false
        }
        transition={{ duration: 1.1, delay: 0.2, ease: easeOutSoft }}
      >
        <motion.img
          alt="Dans une boutique de disques aux lumières chaudes, un homme en casquette et une femme, tous deux en cuir, feuillettent un magazine, lunettes RACINE sur le nez"
          animate={{ scale: 1 }}
          fetchPriority="high"
          height={1800}
          initial={animate ? { scale: 1.06 } : false}
          src={heroImage}
          transition={{ duration: 1.8, delay: 0.2, ease: easeOutSoft }}
          width={1200}
        />
      </motion.div>
    </section>
  )
}
