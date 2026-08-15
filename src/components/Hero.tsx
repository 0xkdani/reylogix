import { motion } from 'motion/react'
import { CTAButton, GhostButton, gradientStyle } from './primitives'

export default function Hero() {
  return (
    <section className="shell pt-16 md:pt-24 xl:pt-28 pb-20 xl:pb-24 text-center flex flex-col items-center">
      {/* Duración/retraso reducidos a propósito: es el elemento LCP y con la
          animación original (delay 0.3s + 0.8s) tardaba ~1.1s en pintarse por
          completo, penalizando el score de Lighthouse. */}
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="text-5xl md:text-7xl xl:text-8xl font-semibold tracking-tight leading-[0.9]"
      >
        {/* El halo va en la línea sólida. La del gradiente no puede llevarlo: con
            el relleno transparente el text-shadow se vería a través del glifo y
            taparía el propio gradiente, así que ahí el aislamiento lo hace un
            drop-shadow en el filtro (ver gradientStyle). */}
        <span className="block text-white text-plate">Ejecución precisa.</span>
        <span className="block animate-shiny" style={gradientStyle}>
          Resultados reales.
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="mt-8 text-white/75 max-w-xl xl:max-w-2xl text-base xl:text-lg leading-[1.6] text-plate"
      >
        En Reylogix, transformamos operaciones en ventajas competitivas. No ofrecemos consultoría
        genérica. Diseñamos soluciones logísticas estratégicas que entregan resultados medibles,
        sostenibles y alineados con objetivos de negocio.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mt-10 flex flex-col sm:flex-row items-center gap-3"
      >
        <CTAButton label="Empieza a operar sin límites" />
        <GhostButton label="Solicita tu servicio express" />
      </motion.div>
    </section>
  )
}
