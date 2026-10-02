import type { ReactNode } from 'react'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { cn } from '../../lib/utils'

type ArrowLinkProps = {
  children: ReactNode
  to: string
  variant?: 'pill' | 'text'
  tone?: 'light' | 'dark'
}

export function ArrowLink({
  children,
  to,
  variant = 'pill',
  tone = 'dark',
}: ArrowLinkProps) {
  return (
    <Link
      className={cn('arrow-link', `arrow-link--${variant}`, `arrow-link--${tone}`)}
      to={to}
    >
      <span>{children}</span>
      <ArrowRight aria-hidden="true" size={16} strokeWidth={1.5} />
    </Link>
  )
}
