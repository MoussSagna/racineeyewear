import { useRef, type CSSProperties } from 'react'
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'motion/react'
import { featuredChapter, type Frame } from '../../../data/collections'
import { cn } from '../../../lib/utils'
import { ScrollReveal } from '../../ui/ScrollReveal'
import { CollectionPhoto } from './CollectionPhoto'

const pad = (value: number) => String(value).padStart(2, '0')

type FrameSlideProps = {
  frame: Frame
  index: number
  total: number
  /** Avancement du défilement dans le lookbook, de 0 à 1. */
  progress: MotionValue<number>
  isStatic: boolean
}

function FrameSlide({
  frame,
  index,
  total,
  progress,
  isStatic,
}: FrameSlideProps) {
  // La photographie se resserre très légèrement quand sa page est au centre.
  const center = total > 1 ? index / (total - 1) : 0
  const step = total > 1 ? 1 / (total - 1) : 1
  const scale = useTransform(
    progress,
    [center - step, center, center + step],
    [1.07, 1, 1.07],
  )

  return (
    <li className="collection-frames__slide">
      <div className="collection-frames__photo">
        <motion.div style={isStatic ? undefined : { scale }}>
          <CollectionPhoto photo={frame.photo} />
        </motion.div>
      </div>
      <div className="collection-frames__info">
        <p className="collection-label collection-frames__counter">
          <span aria-hidden="true">
            {pad(index + 1)} / {pad(total)}
          </span>
        </p>
        <h3 className="collection-frames__name">{frame.name}</h3>
        {frame.intention && (
          <p className="collection-frames__intention">{frame.intention}</p>
        )}
        <ul className="collection-frames__finishes">
          {frame.finishes.map((finish) => (
            <li key={finish.label}>
              <figure>
                <CollectionPhoto photo={finish.photo} />
                <figcaption className="collection-label">
                  {finish.label}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </li>
  )
}

export function CollectionFrames() {
  const prefersReducedMotion = useReducedMotion()
  const pinRef = useRef<HTMLDivElement>(null)
  const { intro, items } = featuredChapter.frames
  const { scrollYProgress } = useScroll({
    target: pinRef,
    offset: ['start start', 'end end'],
  })
  // Le défilement vertical fait tourner les pages du lookbook à l'horizontale.
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ['0%', `-${((items.length - 1) / items.length) * 100}%`],
  )
  const isStatic = Boolean(prefersReducedMotion)

  return (
    <section
      aria-labelledby="collection-frames-title"
      className={cn(
        'collection-frames',
        isStatic && 'collection-frames--static',
      )}
    >
      <div className="collection-frames__header">
        <div>
          <ScrollReveal>
            <p className="collection-label">Lookbook</p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2
              className="collection-frames__title"
              id="collection-frames-title"
            >
              Les montures
            </h2>
          </ScrollReveal>
        </div>
        <div className="collection-frames__intro">
          {intro.map((paragraph, index) => (
            <ScrollReveal delay={0.1 + index * 0.1} key={paragraph}>
              <p>{paragraph}</p>
            </ScrollReveal>
          ))}
        </div>
      </div>

      <div
        className="collection-frames__pin"
        ref={pinRef}
        style={{ '--slides': items.length } as CSSProperties}
      >
        <div className="collection-frames__viewport">
          <motion.ol
            aria-label="Montures ALL POWER"
            className="collection-frames__track"
            style={isStatic ? undefined : { x }}
            tabIndex={0}
          >
            {items.map((frame, index) => (
              <FrameSlide
                frame={frame}
                index={index}
                key={frame.id}
                isStatic={isStatic}
                progress={scrollYProgress}
                total={items.length}
              />
            ))}
          </motion.ol>
          <div aria-hidden="true" className="collection-frames__progress">
            <motion.span
              style={isStatic ? undefined : { scaleX: scrollYProgress }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
