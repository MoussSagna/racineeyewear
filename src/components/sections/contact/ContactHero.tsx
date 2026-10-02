import { ArrowDown } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import heroImage from '../../../assets/images/contact/atelier-carine.jpg'
import { easeOutSoft } from '../../../lib/motion'

const titleLines = ['Parlons.', 'De regards.', 'De RACINE.'] as const

export function ContactHero() {
  const prefersReducedMotion = useReducedMotion()
  const animate = !prefersReducedMotion

  return (
    <section aria-labelledby="contact-title" className="contact-hero">
      <div className="contact-hero__copy">
        <motion.p
          animate={{ opacity: 1, y: 0 }}
          className="contact-label"
          initial={animate ? { opacity: 0, y: 10 } : false}
          transition={{ duration: 0.5, delay: 0.15, ease: easeOutSoft }}
        >
          <span>04</span>
          <span aria-hidden="true" className="contact-label__rule" />
          Contact
        </motion.p>
        <h1 className="contact-hero__title" id="contact-title">
          {titleLines.map((line, index) => (
            <span className="contact-hero__line" key={line}>
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
          className="contact-hero__text"
          initial={animate ? { opacity: 0, y: 14 } : false}
          transition={{ duration: 0.6, delay: 0.7, ease: easeOutSoft }}
        >
          Une question, une collaboration, une idée ou simplement l’envie
          d’échanger avec RACINE&nbsp;?
        </motion.p>
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          initial={animate ? { opacity: 0, y: 12 } : false}
          transition={{ duration: 0.6, delay: 0.85, ease: easeOutSoft }}
        >
          <a className="contact-hero__cta" href="#nous-ecrire">
            Nous écrire
            <ArrowDown aria-hidden="true" size={16} strokeWidth={1.5} />
          </a>
        </motion.div>
      </div>

      <motion.div
        animate={{ clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 }}
        className="contact-hero__media"
        initial={
          animate ? { clipPath: 'inset(0% 0% 100% 0%)', opacity: 0.5 } : false
        }
        transition={{ duration: 1.1, delay: 0.2, ease: easeOutSoft }}
      >
        <motion.img
          alt="Carine Beyssac, créatrice de RACINE, souriante, assise dans son atelier devant son établi"
          animate={{ scale: 1 }}
          fetchPriority="high"
          height={1900}
          initial={animate ? { scale: 1.06 } : false}
          src={heroImage}
          transition={{ duration: 1.8, delay: 0.2, ease: easeOutSoft }}
          width={1560}
        />
      </motion.div>
    </section>
  )
}
