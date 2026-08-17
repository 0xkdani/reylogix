import type { ComponentType, SVGProps } from 'react'
import { m } from 'motion/react'
import { IconTile, SectionHeader } from './primitives'
import { IconAnalysis, IconInternational, IconPrecision } from './ServiceIcons'

const METHODS = ['Lean', 'Six Sigma', 'Mejora continua']

/** Los dos párrafos de "La lógica detrás de la ejecución", textuales. */
const PARAGRAPHS = [
  'Aplicamos metodologías reconocidas como Lean, Six Sigma y principios de mejora continua, adaptadas a la realidad operativa de cada cliente. Nuestro enfoque combina análisis profundo, ejecución precisa y visión internacional para optimizar cadenas de suministro, reducir fricción y acelerar el rendimiento operativo.',
  'Trabajamos con empresas que operan en entornos complejos, donde cada minuto, cada documento y cada decisión impacta en costos, cumplimiento y reputación. Desde auditorías de costos hasta rediseños operativos, Reylogix interviene con lógica, método y claridad.',
]

type Pillar = {
  icon: ComponentType<SVGProps<SVGSVGElement>>
  name: string
  body: string
}

/**
 * Los tres pilares no son una aportación editorial: el primer párrafo dice
 * literalmente que el enfoque "combina análisis profundo, ejecución precisa y
 * visión internacional". Este bloque solo los saca de dentro del párrafo, donde
 * pasaban desapercibidos, y les da jerarquía propia.
 *
 * Cada `body` recombina frases de esos mismos dos párrafos —auditorías de
 * costos, la realidad operativa de cada cliente, rediseños operativos, cada
 * minuto y cada documento, cadenas de suministro, fricción, rendimiento— sin
 * introducir ninguna afirmación que la página fuente no haga ya. Es deliberado:
 * son promesas de servicio y no se inventan.
 */
const PILLARS: Pillar[] = [
  {
    icon: IconAnalysis,
    name: 'Análisis profundo',
    body: 'Auditorías de costos y lectura de la realidad operativa de cada cliente, no de un modelo genérico.',
  },
  {
    icon: IconPrecision,
    name: 'Ejecución precisa',
    body: 'Rediseños operativos en entornos donde cada minuto y cada documento impacta en costos y cumplimiento.',
  },
  {
    icon: IconInternational,
    name: 'Visión internacional',
    body: 'Cadenas de suministro optimizadas de punta a punta: menos fricción y más rendimiento operativo.',
  },
]

/**
 * La ruta /enfoque no tiene más contenido que este módulo, así que se compone
 * como una página y no como una franja: cabecera y narrativa en dos columnas
 * arriba, y los pilares como remate a todo el ancho.
 *
 * Antes era una sola tarjeta con el collage de la fuente encima y los dos
 * párrafos debajo. En móvil eso daba una pantalla entera de clipart seguida de
 * un muro de texto sin un solo punto de entrada, y en escritorio dejaba media
 * retícula vacía junto a una columna altísima.
 */
export default function Approach() {
  return (
    <section id="enfoque" aria-labelledby="enfoque-titulo" className="shell py-20 md:py-28">
      <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-start">
        {/* Texto suelto sobre el video: el halo de .text-plate, igual que en el
            hero y en la cabecera de Sectores. */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-plate lg:col-span-5"
        >
          <SectionHeader
            titleId="enfoque-titulo"
            label="Enfoque"
            title="La lógica detrás de la ejecución"
          />

          <div className="mt-8 flex flex-wrap gap-2">
            {METHODS.map((method) => (
              <span
                key={method}
                className="text-xs xl:text-sm text-white/70 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03]"
              >
                {method}
              </span>
            ))}
          </div>
        </m.div>

        {/* El lg:pt-9 alinea la primera línea con el titular y no con el
            eyebrow, que es lo que dejaría el borde superior de la retícula. */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-plate lg:col-span-7 lg:pt-9 flex flex-col gap-5"
        >
          {PARAGRAPHS.map((paragraph, i) => (
            <p key={i} className="text-white/70 text-base xl:text-lg leading-[1.7]">
              {paragraph}
            </p>
          ))}
        </m.div>
      </div>

      {/* Mismo patrón de tarjeta que Sectores: informativa, sin afordances de
          enlace, y el único cambio en hover lo hace IconTile por el `group`. */}
      <div className="mt-14 md:mt-16 grid grid-cols-1 md:grid-cols-3 gap-4 xl:gap-5">
        {PILLARS.map(({ icon, name, body }, i) => (
          <m.div
            key={name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="group liquid-glass rounded-2xl p-6 xl:p-7 flex flex-col"
          >
            <IconTile icon={icon} className="w-12 h-12 xl:w-14 xl:h-14" />

            <h3 className="mt-5 text-base xl:text-lg font-semibold tracking-tight text-white">
              {name}
            </h3>
            <p className="mt-2.5 text-sm xl:text-[15px] text-white/60 leading-[1.65]">{body}</p>
          </m.div>
        ))}
      </div>
    </section>
  )
}
