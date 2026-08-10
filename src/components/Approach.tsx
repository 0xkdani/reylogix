import { motion } from 'motion/react'
import { Features } from '@/components/ui/features-8'
import { SectionHeader, SiteImage } from './primitives'
import { IMAGES } from '../images'

const METHODS = ['Lean', 'Six Sigma', 'Mejora continua']

/** Los tres párrafos de "La lógica detrás de la ejecución", textuales. */
const PARAGRAPHS = [
  'Aplicamos metodologías reconocidas como Lean, Six Sigma y principios de mejora continua, adaptadas a la realidad operativa de cada cliente. Nuestro enfoque combina análisis profundo, ejecución precisa y visión internacional para optimizar cadenas de suministro, reducir fricción y acelerar el rendimiento operativo.',
  'Trabajamos con empresas que operan en entornos complejos, donde cada minuto, cada documento y cada decisión impacta en costos, cumplimiento y reputación. Desde auditorías de costos hasta rediseños operativos, Reylogix interviene con lógica, método y claridad.',
]

export default function Approach() {
  return (
    <section id="enfoque" className="shell py-20 md:py-28">
      <div className="grid md:grid-cols-2 gap-10 md:gap-16 xl:gap-24 items-start">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-plate"
        >
          <SectionHeader label="Enfoque" title="La lógica detrás de la ejecución" />

          <div className="mt-8 flex flex-wrap gap-2">
            {METHODS.map((m) => (
              <span
                key={m}
                className="text-xs xl:text-sm text-white/70 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03]"
              >
                {m}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="liquid-glass rounded-2xl overflow-hidden"
        >
          <div className="relative overflow-hidden flex items-center justify-center px-6 pt-8 pb-2">
            {/* Dimensiones intrínsecas del archivo: sin ellas la caja crece al
                cargar y empuja hacia abajo todo lo que sigue, incluido el
                destino del ancla #servicios. */}
            <SiteImage
              src={IMAGES.enfoqueCollage}
              alt="Operación, comercio exterior y cadena de suministro"
              width={1024}
              height={1024}
              className="w-full max-w-[300px] xl:max-w-[360px] h-auto"
            />
          </div>

          <div className="flex flex-col gap-5 p-6 xl:p-9 pt-5 xl:pt-7">
            {PARAGRAPHS.map((p, i) => (
              <p key={i} className="text-white/70 text-sm xl:text-base leading-[1.7]">
                {p}
              </p>
            ))}
          </div>
        </motion.div>
      </div>

      {/*
        El componente trae `py-16 md:py-32`, que aquí sumaría al padding de la
        sección. Hay que sobrescribir el padding EN LAS DOS variantes: pasar solo
        `pt-*`/`pb-*` deja vivo el `md:py-32`, y en escritorio eso abría 256px de
        aire entre los dos bloques (128 abajo del primero + 128 arriba del segundo).
      */}
      <Features className="px-0 pt-12 pb-0 md:pt-16 md:pb-0" />
    </section>
  )
}
