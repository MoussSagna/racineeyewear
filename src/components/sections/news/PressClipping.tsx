import { motion, useReducedMotion } from 'motion/react'
import type { ArticleImage } from '../../../data/articles'
import { easeOutSoft } from '../../../lib/motion'
import { cn } from '../../../lib/utils'

type PressClippingProps = {
  image: ArticleImage
  className?: string
  /** Au-dessus de la ligne de flottaison : chargée en priorité, révélée sans attendre le scroll. */
  priority?: boolean
  showCaption?: boolean
}

/**
 * Image principale d'un article. Une coupure de presse est montrée entière,
 * posée comme un document d'archive : elle se dépose et retrouve ses couleurs.
 */
export function PressClipping({
  image,
  className,
  priority = false,
  showCaption = true,
}: PressClippingProps) {
  const prefersReducedMotion = useReducedMotion()
  const hidden = {
    opacity: 0,
    y: 44,
    rotate: -2.4,
    filter: 'grayscale(1) contrast(0.9)',
  }
  const visible = {
    opacity: 1,
    y: 0,
    rotate: 0,
    filter: 'grayscale(0) contrast(1)',
  }
  const transition = { duration: 1.25, delay: 0.15, ease: easeOutSoft }

  return (
    <motion.figure
      className={cn('news-clipping', `news-clipping--${image.kind}`, className)}
      {...(prefersReducedMotion
        ? {}
        : priority
          ? { initial: hidden, animate: visible, transition }
          : {
              initial: hidden,
              whileInView: visible,
              viewport: { once: true, amount: 0.15 },
              transition,
            })}
    >
      <div className="news-clipping__sheet">
        <img
          alt={image.alt}
          decoding="async"
          fetchPriority={priority ? 'high' : undefined}
          height={image.height}
          loading={priority ? undefined : 'lazy'}
          src={image.src}
          width={image.width}
        />
      </div>
      {showCaption && (
        <figcaption className="news-clipping__caption">
          {image.caption}
          {image.publication && (
            <span className="news-clipping__publication">
              {image.publication}
            </span>
          )}
        </figcaption>
      )}
    </motion.figure>
  )
}
