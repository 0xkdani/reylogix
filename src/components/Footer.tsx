import { Link, NavLink } from 'react-router-dom'
import { LogoMark } from './primitives'
import { BRAND, TAGLINE } from '../site'
import { LEGAL_LINKS, NAV_LINKS } from '../nav'

export default function Footer() {
  return (
    <footer className="shell py-12 border-t border-white/10">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
        <div>
          <Link to="/" className="flex items-center gap-3">
            <LogoMark className="w-7 h-7" />
            <span className="text-base font-semibold tracking-tight">{BRAND}</span>
          </Link>
          <p className="mt-3 text-sm text-white/50">{TAGLINE}</p>
        </div>

        <nav aria-label="Secciones" className="flex flex-wrap gap-x-8 gap-y-3">
          {NAV_LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `text-sm transition-colors ${isActive ? 'text-white' : 'text-white/60 hover:text-white'}`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Los documentos legales van aparte de las secciones del producto:
          son avisos, no destinos de navegación primaria (ver LEGAL_LINKS en
          nav.ts). */}
      <div className="mt-10 pt-8 border-t border-white/10">
        <h2 className="text-xs font-medium uppercase tracking-[0.18em] text-white/40">
          Términos y Políticas
        </h2>
        <nav aria-label="Términos y Políticas" className="mt-4 flex flex-wrap gap-x-8 gap-y-3">
          {LEGAL_LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `text-sm transition-colors ${isActive ? 'text-white' : 'text-white/50 hover:text-white'}`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="mt-8 pt-6 border-t border-white/10 text-xs text-white/35">
        © {new Date().getFullYear()} {BRAND}. Todos los derechos reservados.
      </div>
    </footer>
  )
}
