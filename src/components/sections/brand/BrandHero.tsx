import { useCallback, useRef, useState } from 'react'
import { ArrowDown, Play } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import heroVideo from '../../../assets/video/la-marque.mp4'
import {
  brandHeroTitleLines,
  brandKeywords,
  brandSectionCount,
} from '../../../data/brand'
import { easeOutSoft } from '../../../lib/motion'
import { BrandFilmDialog } from './BrandFilmDialog'

export function BrandHero() {
  const prefersReducedMotion = useReducedMotion()
  const animate = !prefersReducedMotion
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isFilmOpen, setIsFilmOpen] = useState(false)

  // Une seule vidéo joue à la fois : le fond se met en pause pendant le film.
  const openFilm = () => {
    videoRef.current?.pause()
    setIsFilmOpen(true)
  }
  const closeFilm = useCallback(() => {
    setIsFilmOpen(false)
    videoRef.current?.play()?.catch(() => {})
  }, [])

  return (
    <section aria-labelledby="brand-title" className="brand-hero">
      <div className="brand-hero__media">
        <motion.video
          animate={{ opacity: 1, scale: 1 }}
          aria-hidden="true"
          autoPlay
          className="brand-hero__video"
          initial={animate ? { opacity: 0, scale: 1.03 } : false}
          loop
          muted
          playsInline
          preload="auto"
          ref={videoRef}
          tabIndex={-1}
          transition={{
            opacity: { duration: 0.8, ease: 'easeOut' },
            scale: { duration: 1.8, ease: easeOutSoft },
          }}
        >
          <source src={heroVideo} type="video/mp4" />
        </motion.video>
        <div aria-hidden="true" className="brand-hero__veil" />
      </div>

      <div className="brand-hero__content">
        <motion.p
          animate={{ opacity: 1, y: 0 }}
          className="brand-hero__eyebrow"
          initial={animate ? { opacity: 0, y: 12 } : false}
          transition={{ duration: 0.5, delay: 0.4, ease: easeOutSoft }}
        >
          La marque
        </motion.p>
        <h1 className="brand-hero__title" id="brand-title">
          {brandHeroTitleLines.map((line, index) => (
            <span className="brand-hero__line" key={line}>
              <motion.span
                animate={{ y: '0%' }}
                initial={animate ? { y: '110%' } : false}
                transition={{
                  duration: 0.75,
                  delay: 0.5 + index * 0.1,
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
          className="brand-hero__description"
          initial={animate ? { opacity: 0, y: 18 } : false}
          transition={{ duration: 0.55, delay: 0.85, ease: easeOutSoft }}
        >
          Des lunettes qui s’adaptent aux morphologies de visage trop longtemps
          ignorées par les standards du marché, à travers un design engagé, un
          ancrage culturel fort et une fabrication française.
        </motion.p>
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          initial={animate ? { opacity: 0, y: 14 } : false}
          transition={{ duration: 0.5, delay: 1, ease: easeOutSoft }}
        >
          <button
            aria-haspopup="dialog"
            className="brand-hero__play"
            onClick={openFilm}
            type="button"
          >
            <span aria-hidden="true" className="brand-hero__play-icon">
              <Play fill="currentColor" size={14} strokeWidth={0} />
            </span>
            Voir la vidéo
          </button>
        </motion.div>
      </div>

      <motion.ul
        animate={{ opacity: 1 }}
        className="brand-hero__keywords"
        initial={animate ? { opacity: 0 } : false}
        transition={{ duration: 0.6, delay: 1.15 }}
      >
        {brandKeywords.map((keyword) => (
          <li key={keyword}>{keyword}</li>
        ))}
      </motion.ul>

      <motion.div
        animate={{ opacity: 1 }}
        className="brand-hero__footer"
        initial={animate ? { opacity: 0 } : false}
        transition={{ duration: 0.6, delay: 1.15 }}
      >
        <p aria-hidden="true" className="brand-hero__counter">
          <span>01</span>
          <span className="brand-hero__counter-rule" />
          <span>{String(brandSectionCount).padStart(2, '0')}</span>
        </p>
        <a
          aria-label="Défiler vers la suite"
          className="brand-hero__scroll"
          href="#les-origines"
        >
          Scroll
          <ArrowDown aria-hidden="true" size={14} strokeWidth={1.5} />
        </a>
      </motion.div>

      <BrandFilmDialog
        isOpen={isFilmOpen}
        onClose={closeFilm}
        src={heroVideo}
      />
    </section>
  )
}
