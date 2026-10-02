import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { cn } from '../../lib/utils'

type ParallaxImageProps = {
  src: string
  alt: string
  className?: string
}

/**
 * Image en `cover` qui glisse très légèrement dans son cadre pendant le scroll.
 * Seul `transform` est animé ; le cadre garde ses dimensions.
 */
export function ParallaxImage({ src, alt, className }: ParallaxImageProps) {
  const frameRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: frameRef,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['-5%', '5%'])

  return (
    <div className={cn('parallax-image', className)} ref={frameRef}>
      <motion.img
        alt={alt}
        decoding="async"
        loading="lazy"
        src={src}
        style={prefersReducedMotion ? undefined : { y }}
      />
    </div>
  )
}
