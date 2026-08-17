import type { ComponentType, SVGProps } from 'react'
import { m } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { GhostButton, IconTile, SectionHeader } from './primitives'
import { IconCosts, IconDiagnostic, IconDocs, IconProcess } from './ServiceIcons'
import { formUrlFor } from '../site'

type Service = {
  icon: ComponentType<SVGProps<SVGSVGElement>>
  title: string
  body: string
  /**
   * Duración y entregable: es lo que hace decidible un servicio "Express", que
   * por definición se vende por alcance acotado y no por programa completo.
   * TODO: la página fuente no los publica. En cuanto tengas los reales,
   * rellénalos aquí y la tarjeta los renderiza sola. Mientras estén vacíos no
   * se muestra nada, para no inventar compromisos.
   * Ej.: meta: ['5 días hábiles', 'Informe ejecutivo + sesión de hallazgos']
   */
  meta?: string[]
}

/** Los cuatro Servicios Express, con las descripciones textuales de la fuente. */
const SERVICES: Service[] = [
  {
    icon: IconCosts,
    title: 'Auditoría de Costos Logísticos',
    body: 'Evaluamos con precisión tus gastos logísticos y operativos para identificar ineficiencias, sobrecostos y oportunidades de ahorro. Incluye análisis de proveedores, rutas, tiempos, tarifas, y estructura de costos.',
  },
  {
    icon: IconDocs,
    title: 'Revisión de Documentación Aduanal',
    body: 'Verificamos la documentación clave de tus operaciones de comercio exterior para asegurar cumplimiento aduanal, evitar sanciones y agilizar procesos. Incluye revisión de pedimentos, facturas, certificados, y requisitos específicos según país y tipo de mercancía.',
  },
  {
    icon: IconDiagnostic,
    title: 'Diagnóstico Operativo Rápido',
    body: 'Analizamos tu operación logística de forma rápida y precisa para detectar fricción, sobrecostos y oportunidades de mejora. Evaluamos rutas, tiempos, proveedores, tarifas y cumplimiento normativo.',
  },
  {
    icon: IconProcess,
    title: 'Rediseño de Procesos',
    body: 'Reestructuramos tus procesos logísticos para que funcionen con precisión, velocidad y control. Intervenimos las áreas críticas de tu operación para eliminar fricción, reducir errores y mejorar el rendimiento general.',
  },
]

export default function ExpressServices() {
  return (
    <section id="servicios" aria-labelledby="servicios-titulo" className="shell py-20 md:py-28">
      <m.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="text-plate"
      >
        <SectionHeader
          titleId="servicios-titulo"
          label="Intervención puntual"
          title="Servicios Express"
          intro="Cuatro intervenciones acotadas para resolver un frente concreto de tu operación, sin comprometer a un programa completo."
        />
      </m.div>

      <div className="mt-12 grid sm:grid-cols-2 gap-5 xl:gap-6">
        {SERVICES.map(({ icon, title, body, meta }, i) => (
          /*
           * La tarjeta entera es el enlace. Antes tenía todos los afordances de
           * ser clicable (borde, radio, número, icono) y no llevaba a ningún
           * sitio: la única salida era un CTA genérico al pie de la retícula, así
           * que no se podía pedir *este* servicio.
           */
          <m.a
            key={title}
            href={formUrlFor(title)}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -6 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="group liquid-glass liquid-glass--link rounded-2xl p-6 xl:p-8 flex flex-col"
          >
            <div className="flex items-start justify-between gap-4">
              <IconTile icon={icon} />
              {/* Decorativo: indexa las tarjetas, no describe una secuencia. */}
              <span aria-hidden="true" className="text-[11px] xl:text-xs text-white/45 tabular-nums">
                0{i + 1}
              </span>
            </div>

            <h3 className="mt-5 text-lg xl:text-xl font-semibold tracking-tight text-white">
              {title}
            </h3>
            <p className="mt-3 text-sm xl:text-[15px] text-white/70 leading-[1.65]">{body}</p>

            {meta?.length ? (
              <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5">
                {meta.map((m) => (
                  <li
                    key={m}
                    className="text-xs xl:text-[13px] text-white/55 before:mr-2 before:content-['·'] first:before:content-none first:before:mr-0"
                  >
                    {m}
                  </li>
                ))}
              </ul>
            ) : null}

            <span className="mt-auto pt-6 flex items-center gap-1.5 text-sm font-medium text-white/70 transition-colors group-hover:text-white">
              Solicitar este servicio
              <ArrowUpRight
                className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
              <span className="sr-only">(abre el formulario en una pestaña nueva)</span>
            </span>
          </m.a>
        ))}
      </div>

      {/* Alineado al eje del encabezado, no centrado: es la salida secundaria
          para quien no sabe cuál de los cuatro necesita. */}
      <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-4">
        <p className="text-sm xl:text-[15px] text-white/60 text-plate">
          ¿No estás seguro de cuál necesitas?
        </p>
        <GhostButton label="Solicita tu servicio express" />
      </div>
    </section>
  )
}
