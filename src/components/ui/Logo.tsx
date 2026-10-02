import racineLogo from '../../assets/images/logo/logo.png'
import { cn } from '../../lib/utils'

type LogoProps = {
  alt?: string
  className?: string
}

/**
 * Logo officiel RACINE. Le fichier source contient de larges marges
 * transparentes : `.logo` le recadre en CSS sur le tracé visible.
 */
export function Logo({ alt = 'RACINE', className }: LogoProps) {
  return (
    <span className={cn('logo', className)}>
      <img alt={alt} decoding="async" src={racineLogo} />
    </span>
  )
}
