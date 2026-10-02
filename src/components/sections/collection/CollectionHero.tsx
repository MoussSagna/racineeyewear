import { useRef, type MouseEvent } from 'react'
import { ArrowDown } from 'lucide-react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { collections, featuredChapter } from '../../../data/collections'
import { easeOutSoft } from '../../../lib/motion'

const titleLines = ['ALL', 'POWER.'] as const
const chapterAnchor = 'chapter-01'

const pad = (value: number) => String(value).padStart(2, '0')

export function CollectionHero() {
  const prefersReducedMotion = useReducedMotion()
  const animate = !prefersReducedMotion
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  // En quittant le Hero : le film glisse plus lentement et se fond dans le noir
  // de la section suivante, le texte s'efface.
  const filmY = useTransform(scrollYProgress, [0, 1], ['0%', '12%'])
  const shadeOpacity = useTransform(scrollYProgress, [0, 1], [0, 0.9])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -72])
  const { film, intro, chapter } = featuredChapter

  const scrollToChapter = (event: MouseEvent<HTMLAnchorElement>) => {
    const target = document.getElementById(chapterAnchor)
    if (!target?.scrollIntoView) return
    event.preventDefault()
    target.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    })
  }

  return (
    <section
      aria-labelledby="collection-title"
      className="collection-hero"
      ref={heroRef}
    >
      <motion.div
        className="collection-hero__film"
        style={animate ? { y: filmY } : undefined}
      >
        <motion.video
          animate={{ opacity: 1 }}
          aria-hidden="true"
          autoPlay
          initial={animate ? { opacity: 0 } : false}
          loop
          muted
          playsInline
          poster={film.poster}
          preload="auto"
          tabIndex={-1}
          transition={{ duration: 0.9, ease: 'easeOut' }}
        >
          <source src={film.src} type="video/mp4" />
        </motion.video>
      </motion.div>
      <div aria-hidden="true" className="collection-hero__overlay" />
      {animate && (
        <motion.div
          aria-hidden="true"
          className="collection-hero__shade"
          style={{ opacity: shadeOpacity }}
        />
      )}

      <motion.div
        className="collection-hero__content"
        style={animate ? { opacity: contentOpacity, y: contentY } : undefined}
      >
        <div className="collection-hero__heading">
          <motion.p
            animate={{ opacity: 1, y: 0 }}
            className="collection-label collection-hero__eyebrow"
            initial={animate ? { opacity: 0, y: 10 } : false}
            transition={{ duration: 0.5, delay: 0.35, ease: easeOutSoft }}
          >
            Collection
          </motion.p>
          <h1 className="collection-hero__title" id="collection-title">
            {titleLines.map((line, index) => (
              <span className="collection-hero__line" key={line}>
                <motion.span
                  animate={{ y: '0%' }}
                  initial={animate ? { y: '108%' } : false}
                  transition={{
                    duration: 0.9,
                    delay: 0.45 + index * 0.12,
                    ease: easeOutSoft,
                  }}
                >
                  {line}
                </motion.span>{' '}
              </span>
            ))}
            <motion.span
              animate={{ opacity: 1, y: 0 }}
              className="collection-hero__chapter"
              initial={animate ? { opacity: 0, y: 8 } : false}
              transition={{ duration: 0.6, delay: 0.95, ease: easeOutSoft }}
            >
              Chapter {chapter}
            </motion.span>
          </h1>
        </div>

        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="collection-hero__aside"
          initial={animate ? { opacity: 0, y: 12 } : false}
          transition={{ duration: 0.6, delay: 1.1, ease: easeOutSoft }}
        >
          <p>{intro}</p>
          <a
            className="collection-hero__cta"
            href={`#${chapterAnchor}`}
            onClick={scrollToChapter}
          >
            Explorer Chapter {chapter}
            <ArrowDown aria-hidden="true" size={14} strokeWidth={1.5} />
          </a>
        </motion.div>
      </motion.div>

      <motion.p
        animate={{ opacity: 1 }}
        aria-label={`Collection 1 sur ${collections.length}`}
        className="collection-label collection-hero__counter"
        initial={animate ? { opacity: 0 } : false}
        transition={{ duration: 0.6, delay: 1.2 }}
      >
        <span aria-hidden="true">
          {pad(1)} / {pad(collections.length)}
        </span>
      </motion.p>

      <motion.p
        animate={{ opacity: 1 }}
        aria-hidden="true"
        className="collection-label collection-hero__scroll"
        initial={animate ? { opacity: 0 } : false}
        transition={{ duration: 0.6, delay: 1.3 }}
      >
        Scroll
        <span className="collection-hero__scroll-line" />
      </motion.p>
    </section>
  )
}
