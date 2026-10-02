type BrandEyebrowProps = {
  index: number
  children: string
}

/** Sur-titre numéroté des chapitres de la page : « 01 — Les origines ». */
export function BrandEyebrow({ index, children }: BrandEyebrowProps) {
  return (
    <p className="brand-eyebrow">
      <span>{String(index).padStart(2, '0')}</span>
      <span aria-hidden="true" className="brand-eyebrow__rule" />
      {children}
    </p>
  )
}
