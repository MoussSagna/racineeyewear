import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import heroImage from '../../../assets/images/all-power/01.jpg'
import { heroTitleLines } from '../../../data/home'
import { easeOutSoft } from '../../../lib/motion'
import { ArrowLink } from '../../ui/ArrowLink'

export function HomeHero() {
  const prefersReducedMotion = useReducedMotion()
  const animate = !prefersReducedMotion
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const photoY = useTransform(scrollYProgress, [0, 1], ['0%', '9%'])

  return (
    <section aria-labelledby="home-title" className="home-hero" ref={heroRef}>
      <motion.div
        animate={{ clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 }}
        className="home-hero__media"
        initial={
          animate ? { clipPath: 'inset(0% 0% 100% 0%)', opacity: 0.4 } : false
        }
        transition={{ duration: 1, delay: 0.3, ease: easeOutSoft }}
      >
        <motion.img
          alt="Une femme et un homme en vestes de cuir regardent au loin, portant des montures RACINE de la collection ALL POWER"
          animate={{ scale: 1 }}
          className="home-hero__photo"
          fetchPriority="high"
          initial={animate ? { scale: 1.04 } : false}
          loading="eager"
          src={heroImage}
          style={animate ? { y: photoY } : undefined}
          transition={{ duration: 1.8, delay: 0.3, ease: easeOutSoft }}
        />
        <div aria-hidden="true" className="home-hero__veil" />
      </motion.div>

      <div className="home-hero__content">
        <h1 className="home-hero__title" id="home-title">
          {heroTitleLines.map((line, index) => (
            <span className="home-hero__line" key={line}>
              <motion.span
                animate={{ y: '0%' }}
                initial={animate ? { y: '110%' } : false}
                transition={{
                  duration: 0.75,
                  delay: 0.55 + index * 0.1,
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
          className="home-hero__description"
          initial={animate ? { opacity: 0, y: 18 } : false}
          transition={{ duration: 0.55, delay: 0.95, ease: easeOutSoft }}
        >
          Chaque monture raconte une histoire, un mélange de cultures et de
          créativité.
        </motion.p>
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          initial={animate ? { opacity: 0, y: 14 } : false}
          transition={{ duration: 0.5, delay: 1.1, ease: easeOutSoft }}
        >
          <ArrowLink to="/la-marque" tone="light">
            Découvrir la marque
          </ArrowLink>
        </motion.div>
      </div>

      <motion.p
        animate={{ opacity: 1 }}
        className="home-hero__caption"
        initial={animate ? { opacity: 0 } : false}
        transition={{ duration: 0.6, delay: 1.2 }}
      >
        <span aria-hidden="true">01</span>
        <span aria-hidden="true" className="home-hero__caption-rule" />
        ALL POWER · Chapter 01
      </motion.p>
    </section>
  )
}
