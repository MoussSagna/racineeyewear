import type { Photo } from '../../../data/collections'

type CollectionPhotoProps = {
  photo: Photo
  className?: string
}

/** Photographie hors premier écran : dimensions explicites et chargement différé. */
export function CollectionPhoto({ photo, className }: CollectionPhotoProps) {
  return (
    <img
      alt={photo.alt}
      className={className}
      decoding="async"
      height={photo.height}
      loading="lazy"
      src={photo.src}
      width={photo.width}
    />
  )
}
