import { m } from 'motion/react'
import { Globe } from 'lucide-react'
import { LogoMark } from './primitives'
import { BRAND } from '../site'

/** Metodologías citadas textualmente en la página fuente. */
const METHODS = ['Lean', 'Six Sigma', 'Mejora continua', 'Comercio exterior', 'Cadena de suministro']

export default function MethodStrip() {
  return (
    <m.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.9, ease: 'easeOut' }}
      className="w-full h-10 bg-black/40 backdrop-blur-md border-t border-b border-white/10"
    >
      <div className="shell h-full flex items-center justify-between text-xs xl:text-[13px]">
        <div className="flex items-center gap-4">
          <LogoMark className="w-3.5 h-3.5" />
          <span className="font-bold text-white">{BRAND}</span>
          <div className="flex items-center gap-4">
            {METHODS.map((item, i) => (
              <span
                key={item}
                className={`text-white/60 ${i > 3 ? 'hidden md:inline' : i > 2 ? 'hidden sm:inline' : ''}`}
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 text-white/60">
          <Globe className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Blackline · Cobertura nacional e internacional</span>
          <span className="sm:hidden">Nacional e internacional</span>
        </div>
      </div>
    </m.div>
  )
}
