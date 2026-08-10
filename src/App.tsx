import { useEffect } from 'react'
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { MotionConfig, useReducedMotion } from 'motion/react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import MethodStrip from './components/MethodStrip'
import Approach from './components/Approach'
import ExpressServices from './components/ExpressServices'
import Sectors from './components/Sectors'
import Testimonials from './components/Testimonials'
import Blackline from './components/Blackline'
import FinalCTA from './components/FinalCTA'
import Footer from './components/Footer'
import { HOME_TITLE, LEGACY_HASH_ROUTES, NAV_LINKS } from './nav'

const VIDEO_SRC =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_064122_c4750c0e-7476-4b44-94a2-a85a65c63bf2.mp4'

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
 */
function useScrollToTopOnNavigate() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
}

/** El <title> lo fija la ruta activa. */
function useDocumentTitle() {
  const { pathname } = useLocation()

  useEffect(() => {
    document.title = NAV_LINKS.find((l) => l.to === pathname)?.title ?? HOME_TITLE
  }, [pathname])
}

/**
 * Portada: la promesa, la franja de método y los sectores. El detalle de cada
 * frente vive en su propia ruta, que es lo que evita el scroll largo.
 */
function Home() {
  return (
    <>
      <Hero />
      <MethodStrip />
      <Sectors />
    </>
  )
}

export default function App() {
  // Con movimiento reducido no se monta el video: un bucle a pantalla completa
  // es justo lo que esa preferencia pide evitar.
  const reduceMotion = useReducedMotion()

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
        {reduceMotion ? null : (
          <video
            autoPlay
            loop
            muted
            playsInline
            aria-hidden="true"
            className="w-full h-full object-cover pointer-events-none"
            src={VIDEO_SRC}
          />
        )}
      </div>

      {/* Vertical guide lines, ancladas a los bordes del shell */}
      <div
        className="hidden md:block pointer-events-none fixed inset-y-0 left-1/2 w-px bg-white/10 z-[5]"
        style={{ transform: 'translateX(calc(-50% - var(--shell) / 2))' }}
      />
      <div
        className="hidden md:block pointer-events-none fixed inset-y-0 left-1/2 w-px bg-white/10 z-[5]"
        style={{ transform: 'translateX(calc(-50% + var(--shell) / 2))' }}
      />

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
      <MotionConfig reducedMotion="user">
        <div className="relative z-10 flex min-h-screen flex-col">
          <Navbar />

          {/* El CTA final y el footer son comunes a todas las rutas: así nunca
              se llega al fondo de una sección sin una salida a la vista. */}
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/enfoque" element={<Approach />} />
              <Route path="/servicios" element={<ExpressServices />} />
              <Route path="/blackline" element={<Blackline />} />
              <Route path="/casos" element={<Testimonials />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          <FinalCTA />
          <Footer />
        </div>
      </MotionConfig>
    </div>
  )
}
