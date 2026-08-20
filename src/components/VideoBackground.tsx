import { useEffect, useState } from 'react'

/**
 * Fondo de video original del sitio, antes de reemplazarlo por
 * `BackgroundGlow` (CSS/SVG). Se conserva como alternativa montable en una
 * ruta aparte (`/inicio2`, ver App.tsx) para comparar una versión contra la
 * otra sin tener que revertir el sitio entero.
 *
 * Usa los mismos archivos que antes, ya en su versión de mejor calidad (CRF
 * 23/26 en vez de 28/32 — ver CLAUDE.md, sección "Fondo animado"): el cambio
 * de calidad se queda aunque el video ya no sea el fondo por defecto.
 *
 * A propósito NO respeta `prefers-reduced-motion` (a diferencia del original,
 * ver git log de App.tsx anterior a esta ruta): `/inicio2` solo se visita a
 * propósito para comparar contra `BackgroundGlow`, así que ocultar el video
 * bajo esa preferencia le quitaría el sentido a la comparación. El sitio real
 * (`/`) sigue respetándola a través de `BackgroundGlow`.
 */
const VIDEO_SRC = '/video/hero.mp4'
const VIDEO_SRC_SM = '/video/hero-sm.mp4'
const SMALL_SCREEN = '(max-width: 768px)'

function useDeferredVideo() {
  const [src, setSrc] = useState<string | null>(null)

  useEffect(() => {
    const idle = 'requestIdleCallback' in window ? window.requestIdleCallback : setTimeout
    const cancel = 'cancelIdleCallback' in window ? window.cancelIdleCallback : clearTimeout
    const id = idle(() => setSrc(window.matchMedia(SMALL_SCREEN).matches ? VIDEO_SRC_SM : VIDEO_SRC))
    return () => cancel(id)
  }, [])

  return src
}

export default function VideoBackground() {
  const videoSrc = useDeferredVideo()

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      {!videoSrc ? null : (
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          aria-hidden="true"
          className="w-full h-full object-cover pointer-events-none"
          src={videoSrc}
        />
      )}
    </div>
  )
}
