import { lazy, Suspense, useEffect, useState } from 'react'
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { LazyMotion, MotionConfig, useReducedMotion } from 'motion/react'

const loadMotionFeatures = () => import('./motion-features').then((mod) => mod.default)
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Sectors from './components/Sectors'
import Contact from './components/Contact'
import FinalCTA from './components/FinalCTA'
import Footer from './components/Footer'
import CookieConsent from './components/CookieConsent'
import { HOME_TITLE, LEGACY_HASH_ROUTES, NAV_LINKS } from './nav'

// Rutas fuera de Home: se cargan bajo demanda para no engordar el bundle
// inicial con código que la primera pintura no necesita. Contact no va aquí:
// vive en Home (ver más abajo), así que ya viaja en el bundle inicial.
const Approach = lazy(() => import('./components/Approach'))
const ExpressServices = lazy(() => import('./components/ExpressServices'))
const Testimonials = lazy(() => import('./components/Testimonials'))
const Blackline = lazy(() => import('./components/Blackline'))

// Recomprimido desde el original de CloudFront (16.5 MB, 1080p, 16 Mb/s) a
// 720p/CRF 28 sin audio (el <video> ya va muted): 907 KB, ~94% más ligero.
// Servirlo local también evita la conexión extra a un origen externo.
const VIDEO_SRC = '/video/hero.mp4'

/*
 * Variante para pantallas pequeñas: 640x360 y CRF 32, 55 KB frente a 991. Un
 * fondo a pantalla completa en un móvil se ve a ~400 px de ancho, así que los
 * 720p se estaban tirando: medido contra el original, este archivo da SSIM
 * 0.932 y el de 480p —130 KB, más del doble— solo sube a 0.936. Se mantiene
 * `-bf 0` del original, que es lo que evita el tirón al reiniciar el bucle.
 */
const VIDEO_SRC_SM = '/video/hero-sm.mp4'
const SMALL_SCREEN = '(max-width: 768px)'

/**
 * El video es puramente decorativo (fondo fijo) y pesa varios MB: si se monta
 * de inmediato compite por ancho de banda con el JS y las fuentes críticas.
 * Se retrasa su montaje al primer 'idle' del navegador (en todos los tamaños,
 * incluido móvil: la animación se conserva, solo deja de bloquear la primera
 * pintura) para que esa carga quede detrás de todo lo que sí afecta el LCP.
 */
function useDeferredVideo() {
  const [src, setSrc] = useState<string | null>(null)

  useEffect(() => {
    const idle = 'requestIdleCallback' in window ? window.requestIdleCallback : setTimeout
    const cancel = 'cancelIdleCallback' in window ? window.cancelIdleCallback : clearTimeout
    /*
     * El tamaño se decide una sola vez, aquí, y no se re-evalúa al girar el
     * teléfono: cambiar el `src` remonta el vídeo y lo reinicia desde el
     * primer fotograma, que se nota mucho más que servir 55 KB de más.
     */
    const id = idle(() => setSrc(window.matchMedia(SMALL_SCREEN).matches ? VIDEO_SRC_SM : VIDEO_SRC))
    return () => cancel(id)
  }, [])

  return src
}

/**
 * Un enlace /#servicios de la época en que todo vivía en una sola página debe
 * seguir llevando a Servicios, no a la portada.
 */
function useLegacyHashRedirect() {
  const navigate = useNavigate()
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) return
    const to = LEGACY_HASH_ROUTES[decodeURIComponent(hash.slice(1))]
    if (to && to !== pathname) navigate(to, { replace: true })
  }, [hash, pathname, navigate])
}

/**
 * Al cambiar de ruta el navegador conserva el desplazamiento, así que se
 * entraría a mitad de la sección nueva. 'instant' y no el valor por defecto
 * porque el <html> lleva scroll-behavior: smooth y convertiría cada cambio de
 * página en un viaje animado.
 *
 * Si la navegación trae un hash (el CTA "Empieza a operar sin límites" manda a
 * "/#contacto" desde cualquier ruta), se salta a ese elemento en vez de al
 * tope: es lo que permite que el mismo botón funcione estando ya en Home o
 * viniendo de Enfoque/Servicios/etc.
 */
function useScrollToTopOnNavigate() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1))
      if (el) {
        el.scrollIntoView({ behavior: 'instant' })
        return
      }
    }
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname, hash])
}

/** El <title> lo fija la ruta activa. */
function useDocumentTitle() {
  const { pathname } = useLocation()

  useEffect(() => {
    document.title = NAV_LINKS.find((l) => l.to === pathname)?.title ?? HOME_TITLE
  }, [pathname])
}

/**
 * Portada: la promesa y los sectores. El detalle de cada frente vive en su
 * propia ruta, que es lo que evita el scroll largo.
 */
function Home() {
  return (
    <>
      <Hero />
      <Sectors />
      <Contact />
    </>
  )
}

export default function App() {
  // Con movimiento reducido no se monta el video: un bucle a pantalla completa
  // es justo lo que esa preferencia pide evitar.
  const reduceMotion = useReducedMotion()
  const videoSrc = useDeferredVideo()

  useLegacyHashRedirect()
  useScrollToTopOnNavigate()
  useDocumentTitle()

  /*
   * El contenedor raíz recorta el eje X con 'clip', no con 'hidden'.
   *
   * Era la razón por la que el navbar sticky no se quedaba fijo: 'overflow-x:
   * hidden' obliga al eje Y a computar 'auto', así que este div pasaba a ser el
   * contenedor de scroll del navbar. Y como crece con el contenido en lugar de
   * desplazarse por dentro, el sticky no tenía scroll contra el que reaccionar y
   * quedaba inerte.
   *
   * 'clip' recorta el desbordamiento horizontal igual, pero NO crea contenedor
   * de scroll, así que el viewport vuelve a ser el ancestro que scrollea.
   */
  return (
    <div className="relative min-h-screen overflow-x-clip bg-ink text-white">
      {/* Video de fondo global */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {reduceMotion || !videoSrc ? null : (
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

      {/* Filtro de ruido global (titular con gradiente) */}
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
        <filter id="c3-noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="2"
            stitchTiles="stitch"
          />
          <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.35 0" />
          <feComposite in2="SourceGraphic" operator="in" result="noise" />
          <feBlend in="SourceGraphic" in2="noise" mode="multiply" />
        </filter>
      </svg>

      {/* El override CSS de prefers-reduced-motion no alcanza a las animaciones
          de Framer Motion, que son JS: sin esto los reveals de entrada se
          seguían ejecutando para quien pide menos movimiento. */}
      {/* LazyMotion + los componentes `m` en vez de `motion`: asi solo entra al
          bundle el subconjunto de features que el sitio usa de verdad
          —animaciones, exit (AnimatePresence) y hover—, y se queda fuera todo
          el motor de drag, layout animations y proyeccion, que aqui no se toca.
          `strict` hace que un `motion.div` colado reviente en desarrollo en vez
          de volver a arrastrar el paquete completo sin que nadie se entere. */}
      <LazyMotion features={loadMotionFeatures} strict>
        <MotionConfig reducedMotion="user">
          <div className="relative z-10 flex min-h-screen flex-col">
            <Navbar />

            {/* El CTA final y el footer son comunes a todas las rutas: así nunca
                se llega al fondo de una sección sin una salida a la vista. */}
            <main className="flex-1">
              {/*
                El fallback reserva una pantalla de alto, y no es un detalle
                estético: con `null`, entrar directo a una ruta diferida pintaba
                `main` vacío, así que el CTA final y el footer aparecían pegados
                al Navbar y el chunk de la ruta los empujaba hacia abajo al
                llegar. Medido en /blackline, eso era un CLS de 0.90 —la portada
                daba 0, porque Home no va diferida—. Reservando el alto, el
                footer nace fuera de pantalla y no hay salto.

                `min-h-screen` y no un alto exacto: las cuatro rutas diferidas
                pasan de sobra de una pantalla, así que sirve de suelo para
                cualquiera de ellas sin tener que medirlas una a una.
              */}
              <Suspense fallback={<div className="min-h-screen" />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/enfoque" element={<Approach />} />
                  <Route path="/servicios" element={<ExpressServices />} />
                  <Route path="/blackline" element={<Blackline />} />
                  <Route path="/casos" element={<Testimonials />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </Suspense>
            </main>

            <FinalCTA />
            <Footer />
          </div>
        </MotionConfig>
      </LazyMotion>

      <CookieConsent />
    </div>
  )
}
