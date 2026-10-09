import { useEffect, useRef, useState } from 'react'
import { Maximize, Pause, Play, VolumeX } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import type { ArticleVideo as ArticleVideoData } from '../../../data/articles'
import { easeOutSoft } from '../../../lib/motion'
import { cn } from '../../../lib/utils'

type ArticleVideoProps = {
  video: ArticleVideoData
  className?: string
}

/** Plein écran préfixé : Safari desktop ancien, et lecteur natif d'iOS sur iPhone. */
type FullscreenVideo = HTMLVideoElement & {
  webkitRequestFullscreen?: () => void
  webkitEnterFullscreen?: () => void
}

type FullscreenDocument = Document & {
  webkitFullscreenElement?: Element | null
}

/**
 * La vidéo d'un article, son média principal, dans son ratio natif : paysage
 * en grande largeur, verticale centrée. Dans la page elle reste muette, avec deux contrôles
 * discrets. Le son appartient au plein écran, où les contrôles natifs du
 * navigateur prennent le relais : c'est le spectateur qui l'active.
 */
export function ArticleVideo({ video, className }: ArticleVideoProps) {
  const prefersReducedMotion = useReducedMotion()
  const videoRef = useRef<FullscreenVideo>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const isPortrait = video.height > video.width

  useEffect(() => {
    const element = videoRef.current
    if (!element) return

    const sync = (fullscreen: boolean) => {
      // De retour dans la page, la vidéo redevient silencieuse.
      if (!fullscreen) element.muted = true
      setIsFullscreen(fullscreen)
    }
    const onFullscreenChange = () => {
      const doc: FullscreenDocument = document
      sync((doc.fullscreenElement ?? doc.webkitFullscreenElement) === element)
    }
    const onNativeBegin = () => sync(true)
    const onNativeEnd = () => sync(false)

    document.addEventListener('fullscreenchange', onFullscreenChange)
    document.addEventListener('webkitfullscreenchange', onFullscreenChange)
    element.addEventListener('webkitbeginfullscreen', onNativeBegin)
    element.addEventListener('webkitendfullscreen', onNativeEnd)
    return () => {
      document.removeEventListener('fullscreenchange', onFullscreenChange)
      document.removeEventListener('webkitfullscreenchange', onFullscreenChange)
      element.removeEventListener('webkitbeginfullscreen', onNativeBegin)
      element.removeEventListener('webkitendfullscreen', onNativeEnd)
    }
  }, [])

  const play = () => {
    // Un refus du navigateur laisse simplement la vidéo en pause.
    videoRef.current?.play()?.catch(() => {})
  }

  const togglePlayback = () => {
    const element = videoRef.current
    if (!element) return
    if (element.paused) play()
    else element.pause()
  }

  const enterFullscreen = () => {
    const element = videoRef.current
    if (!element) return
    // Le son n'est pas touché ici : la vidéo entre en plein écran muette.
    if (element.requestFullscreen) {
      element.requestFullscreen().catch(() => {})
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen()
    } else if (element.webkitEnterFullscreen) {
      element.webkitEnterFullscreen()
    } else {
      return
    }
    play()
  }

  return (
    <motion.figure
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        'article-video',
        isPortrait && 'article-video--portrait',
        className,
      )}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 36 }}
      transition={{ duration: 1.1, delay: 0.45, ease: easeOutSoft }}
    >
      <div className="article-video__frame">
        <video
          aria-label={video.label}
          controls={isFullscreen}
          height={video.height}
          muted
          onClick={isFullscreen ? undefined : togglePlayback}
          onPause={() => setIsPlaying(false)}
          onPlay={() => setIsPlaying(true)}
          playsInline
          poster={video.poster}
          preload="none"
          ref={videoRef}
          src={video.src}
          style={{ aspectRatio: `${video.width} / ${video.height}` }}
          width={video.width}
        />
        <div className="article-video__controls">
          <button
            aria-label={isPlaying ? 'Mettre en pause' : 'Lire la vidéo'}
            className="article-video__button"
            onClick={togglePlayback}
            type="button"
          >
            {isPlaying ? (
              <Pause aria-hidden="true" size={16} strokeWidth={1.5} />
            ) : (
              <Play aria-hidden="true" size={16} strokeWidth={1.5} />
            )}
          </button>
          <p className="article-video__hint">
            <VolumeX aria-hidden="true" size={14} strokeWidth={1.5} />
            Son disponible en plein écran
          </p>
          <button
            aria-label="Passer en plein écran"
            className="article-video__button article-video__button--label"
            onClick={enterFullscreen}
            type="button"
          >
            <span aria-hidden="true">Plein écran</span>
            <Maximize aria-hidden="true" size={16} strokeWidth={1.5} />
          </button>
        </div>
      </div>
      <figcaption>{video.caption}</figcaption>
    </motion.figure>
  )
}
