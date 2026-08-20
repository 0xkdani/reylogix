import { lazy, Suspense, useEffect } from 'react'
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { LazyMotion, MotionConfig } from 'motion/react'

const loadMotionFeatures = () => import('./motion-features').then((mod) => mod.default)
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Sectors from './components/Sectors'
import Contact from './components/Contact'
import FinalCTA from './components/FinalCTA'
import Footer from './components/Footer'
import CookieConsent from './components/CookieConsent'
import BackgroundGlow from './components/BackgroundGlow'
import VideoBackground from './components/VideoBackground'
import { HOME_TITLE, LEGACY_HASH_ROUTES, LEGAL_LINKS, NAV_LINKS } from './nav'

// Rutas fuera de Home: se cargan bajo demanda para no engordar el bundle
// inicial con código que la primera pintura no necesita. Contact no va aquí:
// vive en Home (ver más abajo), así que ya viaja en el bundle inicial.
const Approach = lazy(() => import('./components/Approach'))
const ExpressServices = lazy(() => import('./components/ExpressServices'))
const Testimonials = lazy(() => import('./components/Testimonials'))
const Blackline = lazy(() => import('./components/Blackline'))

// Documentos legales: mismo patrón de carga diferida que las rutas de
// arriba. Nadie llega a /legales/* desde la navegación principal (solo desde
// el Footer o el banner de cookies), así que no hay razón para que compitan
// por bundle inicial con Home.
const AvisoPrivacidad = lazy(() => import('./components/legal/AvisoPrivacidad'))
const TerminosCondiciones = lazy(() => import('./components/legal/TerminosCondiciones'))
const DatosCumplimiento = lazy(() => import('./components/legal/DatosCumplimiento'))
const MarcaPropiedadIntelectual = lazy(() => import('./components/legal/MarcaPropiedadIntelectual'))

// Panel interno de envíos del formulario de contacto. No es una sección del
// sitio (no va en NAV_LINKS/Footer), así que tampoco tiene por qué competir
// por el bundle inicial.
const Recap = lazy(() => import('./components/Recap'))

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

/** El <title> lo fija la ruta activa. Busca en NAV_LINKS y LEGAL_LINKS: son
 *  dos listas separadas (una es el producto, la otra son avisos), pero
 *  ambas necesitan su propio <title>. */
function useDocumentTitle() {
  const { pathname } = useLocation()

  useEffect(() => {
    document.title =
      [...NAV_LINKS, ...LEGAL_LINKS].find((l) => l.to === pathname)?.title ?? HOME_TITLE
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
  useLegacyHashRedirect()
  useScrollToTopOnNavigate()
  useDocumentTitle()

  /**
   * `/inicio2` es la portada de siempre con el fondo de video original en
   * vez de `BackgroundGlow` (ver VideoBackground.tsx) — para comparar una
   * versión contra la otra sin tocar la ruta por defecto. No lleva enlace
   * propio en Navbar/Footer, solo la URL directa.
   */
  const { pathname } = useLocation()
  const useVideoBackground = pathname === '/inicio2'

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
      {/* Fondo animado global (o el video original en /inicio2, ver arriba) */}
      {useVideoBackground ? <VideoBackground /> : <BackgroundGlow />}

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
                  <Route path="/inicio2" element={<Home />} />
                  <Route path="/enfoque" element={<Approach />} />
                  <Route path="/servicios" element={<ExpressServices />} />
                  <Route path="/blackline" element={<Blackline />} />
                  <Route path="/casos" element={<Testimonials />} />
                  <Route path="/legales/aviso-privacidad" element={<AvisoPrivacidad />} />
                  <Route path="/legales/terminos-condiciones" element={<TerminosCondiciones />} />
                  <Route path="/legales/datos-cumplimiento" element={<DatosCumplimiento />} />
                  <Route
                    path="/legales/marca-propiedad-intelectual"
                    element={<MarcaPropiedadIntelectual />}
                  />
                  <Route path="/recap" element={<Recap />} />
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
