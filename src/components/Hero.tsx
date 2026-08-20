import type { CSSProperties } from 'react'
import { CTAButton, gradientStyle } from './primitives'

/**
 * Las tres entradas usan la utilidad CSS `reveal-up`, no `m.*`.
 *
 * El hero es lo primero que se pinta y su titular es el elemento LCP, asi que
 * no puede depender del chunk de features de motion (ver LazyMotion en
 * App.tsx): mientras ese chunk viaja, un `initial: { opacity: 0 }` deja el
 * titular invisible. Los valores de duracion, retardo y distancia son los
 * mismos que tenia cada elemento en JS.
 */
export default function Hero() {
  return (
    <section className="shell pt-16 md:pt-24 xl:pt-28 pb-20 xl:pb-24 text-center flex flex-col items-center">
      {/* Duración/retraso reducidos a propósito: es el elemento LCP y con la
          animación original (delay 0.3s + 0.8s) tardaba ~1.1s en pintarse por
          completo, penalizando el score de Lighthouse. */}
      <h1
        style={{ '--reveal-duration': '0.3s', '--reveal-from': '10px' } as CSSProperties}
        className="reveal-up text-5xl md:text-7xl xl:text-8xl font-semibold tracking-tight leading-[0.9]"
      >
        {/* El halo va en la línea sólida. La del gradiente no puede llevarlo: con
            el relleno transparente el text-shadow se vería a través del glifo y
            taparía el propio gradiente, así que ahí el aislamiento lo hace un
            drop-shadow en el filtro (ver gradientStyle). */}
        <span className="block text-white text-plate">Ejecución precisa.</span>
        <span className="block animate-shiny" style={gradientStyle}>
          Resultados reales.
        </span>
      </h1>

      <p
        style={{ '--reveal-delay': '0.5s' } as CSSProperties}
        className="reveal-up mt-8 text-white/75 max-w-xl xl:max-w-2xl text-base xl:text-lg leading-[1.6] text-plate"
      >
        En Reylogix, transformamos operaciones en ventajas competitivas. No ofrecemos consultoría
        genérica. Diseñamos soluciones logísticas estratégicas que entregan resultados medibles,
        sostenibles y alineados con objetivos de negocio.
      </p>

      <div
        style={{ '--reveal-delay': '0.7s' } as CSSProperties}
        className="reveal-up mt-10 flex flex-col sm:flex-row items-center gap-3"
      >
        <CTAButton label="Empieza a operar sin límites" href="#contacto" external={false} />
      </div>
    </section>
  )
}
