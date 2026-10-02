import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { easeOutSoft } from '../../lib/motion'

type ScrollRevealProps = {
  children: ReactNode
  /** `span` pour révéler une ligne à l'intérieur d'un titre. */
  as?: 'div' | 'span'
  className?: string
  delay?: number
  /** `rise` : opacity + translateY. `unveil` : clip-path, pour les images. */
  variant?: 'rise' | 'unveil'
}

const hidden = {
  rise: { opacity: 0, y: 40 },
  unveil: { opacity: 0, clipPath: 'inset(14% 0% 0% 0%)', y: 24 },
}

const visible = {
  rise: { opacity: 1, y: 0 },
  unveil: { opacity: 1, clipPath: 'inset(0% 0% 0% 0%)', y: 0 },
}

export function ScrollReveal({
  children,
  as = 'div',
  className,
  delay = 0,
  variant = 'rise',
}: ScrollRevealProps) {
  const prefersReducedMotion = useReducedMotion()
  const Tag = as
  const MotionTag = as === 'span' ? motion.span : motion.div

  if (prefersReducedMotion) {
    return <Tag className={className}>{children}</Tag>
  }

  return (
    <MotionTag
      className={className}
      initial={hidden[variant]}
      transition={{
        duration: variant === 'unveil' ? 0.95 : 0.7,
        delay,
        ease: easeOutSoft,
      }}
      viewport={{ once: true, amount: 0.2 }}
      whileInView={visible[variant]}
    >
      {children}
    </MotionTag>
  )
}
