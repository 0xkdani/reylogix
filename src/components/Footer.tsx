import { Link, NavLink } from 'react-router-dom'
import { LogoMark } from './primitives'
import { BRAND, TAGLINE } from '../site'
import { NAV_LINKS } from '../nav'

export default function Footer() {
  return (
    <footer className="shell py-12 border-t border-white/10">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
        <div>
          <Link to="/" className="flex items-center gap-3">
            <LogoMark className="w-7 h-7" />
            <span className="text-base font-semibold tracking-tight">{BRAND}</span>
          </Link>
          <p className="mt-3 text-sm text-white/50">{TAGLINE}</p>
        </div>

        <nav className="flex flex-wrap gap-x-8 gap-y-3">
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

      <div className="mt-10 pt-6 border-t border-white/10 text-xs text-white/35">
        © {new Date().getFullYear()} {BRAND}. Todos los derechos reservados.
      </div>
    </footer>
  )
}
