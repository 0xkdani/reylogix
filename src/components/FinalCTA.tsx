import { motion } from 'motion/react'
import { CTAButton, GhostButton } from './primitives'

export default function FinalCTA() {
  return (
    <section className="shell py-20 md:py-32">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="liquid-glass relative overflow-hidden rounded-3xl px-8 py-16 md:py-24 text-center"
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(600px circle at 50% 0%, rgba(255,255,255,0.15), transparent 70%)',
            opacity: 0.3,
          }}
        />

        <div className="relative">
          <h2 className="text-4xl md:text-6xl xl:text-7xl font-semibold tracking-tight leading-[1.02]">
            La operación no se improvisa.
            <br />
            Se domina.
          </h2>

          <p className="mt-6 text-white/60 max-w-2xl mx-auto text-sm xl:text-base leading-[1.7]">
            Cada empresa que confía en nosotros accede a precisión, criterio y respaldo real. Si tu
            visión exige resultados medibles, decisiones con propósito y evolución sin fricción,
            estás en el lugar correcto.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
            <CTAButton label="Empieza a operar sin límites" href="/#contacto" external={false} />
            <GhostButton label="Solicitar acceso a Blackline" />
          </div>
        </div>
      </motion.div>
    </section>
  )
}
