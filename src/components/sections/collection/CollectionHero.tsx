import { useRef } from 'react'
import { ArrowDown } from 'lucide-react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { collections, featuredChapter } from '../../../data/collections'
import { easeOutSoft } from '../../../lib/motion'

const titleLines = ['ALL', 'POWER.'] as const

const pad = (value: number) => String(value).padStart(2, '0')

export function CollectionHero() {
  const prefersReducedMotion = useReducedMotion()
  const animate = !prefersReducedMotion
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const filmY = useTransform(scrollYProgress, [0, 1], ['0%', '-7%'])
  const { film, lead, intro, chapter } = featuredChapter

  return (
    <section
      aria-labelledby="collection-title"
      className="collection-hero"
      ref={heroRef}
    >
      <div className="collection-hero__film">
        <motion.div
          animate={{ clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 }}
          className="collection-hero__film-frame"
          initial={
            animate ? { clipPath: 'inset(100% 0% 0% 0%)', opacity: 0.6 } : false
          }
          style={animate ? { y: filmY } : undefined}
          transition={{ duration: 1.3, delay: 0.15, ease: easeOutSoft }}
        >
          <motion.video
            animate={{ scale: 1 }}
            aria-hidden="true"
            autoPlay
            initial={animate ? { scale: 1.08 } : false}
            loop
            muted
            playsInline
            poster={film.poster}
            preload="auto"
            tabIndex={-1}
            transition={{ duration: 2.2, delay: 0.15, ease: easeOutSoft }}
          >
            <source src={film.src} type="video/mp4" />
          </motion.video>
        </motion.div>
      </div>
      <div aria-hidden="true" className="collection-hero__veil" />

      <div className="collection-hero__heading">
        <motion.p
          animate={{ opacity: 1, y: 0 }}
          className="collection-label collection-hero__eyebrow"
          initial={animate ? { opacity: 0, y: 12 } : false}
          transition={{ duration: 0.6, delay: 0.5, ease: easeOutSoft }}
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
                  duration: 1,
                  delay: 0.55 + index * 0.14,
                  ease: easeOutSoft,
                }}
              >
                {line}
              </motion.span>{' '}
            </span>
          ))}
          <motion.span
            animate={{ opacity: 1 }}
            className="collection-hero__chapter"
            initial={animate ? { opacity: 0 } : false}
            transition={{ duration: 0.8, delay: 1.1 }}
          >
            Chapter {chapter}
          </motion.span>
        </h1>
      </div>

      <motion.p
        animate={{ opacity: 1, y: 0 }}
        className="collection-hero__lead"
        initial={animate ? { opacity: 0, y: 16 } : false}
        transition={{ duration: 0.8, delay: 1.2, ease: easeOutSoft }}
      >
        {lead.map((line) => (
          <span key={line}>{line} </span>
        ))}
      </motion.p>

      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="collection-hero__intro"
        initial={animate ? { opacity: 0, y: 16 } : false}
        transition={{ duration: 0.8, delay: 1.35, ease: easeOutSoft }}
      >
        <p>{intro}</p>
        <a className="collection-hero__cta" href="#chapter-01">
          Explorer Chapter {chapter}
          <ArrowDown aria-hidden="true" size={16} strokeWidth={1.5} />
        </a>
      </motion.div>

      <motion.p
        animate={{ opacity: 1 }}
        aria-label={`Collection 1 sur ${collections.length}`}
        className="collection-label collection-hero__counter"
        initial={animate ? { opacity: 0 } : false}
        transition={{ duration: 0.8, delay: 1.5 }}
      >
        <span aria-hidden="true">
          {pad(1)} / {pad(collections.length)}
        </span>
      </motion.p>
    </section>
  )
}
