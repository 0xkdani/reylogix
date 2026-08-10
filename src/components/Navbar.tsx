import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { Menu, X } from 'lucide-react'
import { CTAButton, LogoMark } from './primitives'
import { BRAND } from '../site'
import { NAV_LINKS } from '../nav'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()

  // El fondo de la barra solo aparece al separarse del hero: sobre el titular
  // una banda opaca permanente le quitaría fuerza a la entrada. En las rutas de
  // sección no hay hero que proteger, así que va sólida desde el principio.
  const solid = scrolled || open || pathname !== '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Cambiar de ruta cierra el panel: si no, queda abierto sobre la sección nueva.
  useEffect(() => setOpen(false), [pathname])

  // Escape cierra el panel y el scroll del documento se congela mientras está
  // abierto, que en móvil es lo que evita el desplazamiento fantasma detrás.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <div className="sticky top-0 z-50">
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 -z-10 border-b bg-ink/85 backdrop-blur-md transition-opacity duration-300 ${
          solid ? 'border-white/10 opacity-100' : 'border-transparent opacity-0'
        }`}
      />

      <div className="shell">
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex items-center justify-between py-5 xl:py-6"
        >
          <Link to="/" className="flex items-center gap-3">
            <LogoMark className="w-8 h-8 xl:w-9 xl:h-9" />
            <span className="text-base xl:text-lg font-semibold tracking-tight">{BRAND}</span>
          </Link>

          <div className="hidden md:flex gap-8 xl:gap-10">
            {NAV_LINKS.map((link, i) => (
              <motion.div
                key={link.to}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.05, ease: 'easeOut' }}
              >
                {/* NavLink pone aria-current="page" solo: la ruta activa se
                    anuncia, no solo se ve. */}
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    `text-sm xl:text-[15px] font-medium transition-colors ${
                      isActive ? 'text-white' : 'text-white/70 hover:text-white'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </motion.div>
            ))}
          </div>

          <div className="hidden md:block">
            <CTAButton label="Empieza a operar sin límites" />
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="menu-movil"
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            className="md:hidden w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
          >
            {open ? (
              <X className="w-4 h-4 text-white" aria-hidden="true" />
            ) : (
              <Menu className="w-4 h-4 text-white" aria-hidden="true" />
            )}
          </button>
        </motion.nav>
      </div>

      <AnimatePresence>
        {open ? (
          <>
            {/* Toque fuera para cerrar. El control accesible es el botón X y la
                tecla Escape; esta capa es solo comodidad de puntero. */}
            <div
              aria-hidden="true"
              onClick={() => setOpen(false)}
              className="md:hidden fixed inset-0 -z-10 bg-ink/60"
            />
            <motion.div
              id="menu-movil"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              /* Opaco, no traslúcido: con el panel a 95% el titular del hero se
                 transparentaba entre los enlaces. */
              className="md:hidden absolute left-0 right-0 top-full border-b border-white/10 bg-ink"
            >
              <div className="shell py-4">
                <nav className="flex flex-col">
                  {NAV_LINKS.map((link) => (
                    <NavLink
                      key={link.to}
                      to={link.to}
                      className={({ isActive }) =>
                        `py-3.5 text-[15px] font-medium border-b border-white/[0.07] transition-colors ${
                          isActive ? 'text-white' : 'text-white/80 hover:text-white'
                        }`
                      }
                    >
                      {link.label}
                    </NavLink>
                  ))}
                </nav>
                <div className="mt-5 mb-1">
                  <CTAButton label="Empieza a operar sin límites" full />
                </div>
              </div>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
