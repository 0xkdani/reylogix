import type { ComponentType, SVGProps } from 'react'
import { m } from 'motion/react'
import { IconTile, SectionHeader } from './primitives'
import { IconAutomotive, IconCosmetics, IconFood, IconTech, IconTrade } from './ServiceIcons'

type Sector = {
  icon: ComponentType<SVGProps<SVGSVGElement>>
  name: string
  /** Dónde está la fricción en ese sector, no lo que Reylogix promete resolver. */
  body: string
  /**
   * Señales de respaldo del sector: años operando en él, número de proyectos,
   * certificaciones. TODO: la página fuente no publica ninguna, así que el campo
   * queda vacío y la tarjeta no renderiza nada, para no afirmar experiencia que
   * no está documentada. Ej.: meta: ['Desde 2019', '4 proyectos']
   */
  meta?: string[]
}

/**
 * Sectores derivados de los perfiles citados en "Casos de éxito".
 * La página fuente no publica logotipos ni nombres de empresas cliente.
 */
const SECTORS: Sector[] = [
  {
    icon: IconFood,
    name: 'Manufactura alimentaria',
    body: 'Cadena de frío, caducidad y trazabilidad por lote, con la documentación sanitaria al día en cada movimiento.',
  },
  {
    icon: IconTrade,
    name: 'Comercio exterior',
    body: 'Clasificación arancelaria, pedimentos y tiempos de despacho: donde un dato mal capturado detiene la mercancía.',
  },
  {
    icon: IconTech,
    name: 'Tecnología',
    body: 'Componentes de alto valor y ciclos de vida cortos: inventario ajustado, lead times largos y transporte sensible al daño.',
  },
  {
    icon: IconCosmetics,
    name: 'Cosméticos',
    body: 'Regulación sanitaria, etiquetado y rotación por presentación, con una distribución repartida entre retail y canal directo.',
  },
  {
    icon: IconAutomotive,
    name: 'Automotriz',
    body: 'Abasto secuenciado y ventanas de entrega estrechas: la falla de un proveedor se convierte en paro de línea.',
  },
]

/**
 * Cinco tarjetas no caben en una retícula regular sin dejar un hueco al final,
 * así que la de 6 columnas se reparte 3 + 2: las tres primeras a dos columnas y
 * las dos últimas a tres. En `sm` solo el último elemento ocupa el ancho
 * completo, que es donde queda impar.
 *
 * Las clases van literales y no interpoladas porque el JIT de Tailwind escanea
 * el archivo como texto: un `lg:col-span-${n}` no generaría nada.
 */
function spanFor(i: number) {
  if (i < 3) return 'lg:col-span-2'
  if (i === 3) return 'lg:col-span-3'
  return 'sm:col-span-2 lg:col-span-3'
}

export default function Sectors() {
  return (
    <section id="sectores" aria-labelledby="sectores-titulo" className="shell py-16 md:py-24">
      {/* Texto suelto sobre el video: mismo halo que en el hero y en la cabecera
          de Servicios. */}
      <m.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="text-plate"
      >
        <SectionHeader
          titleId="sectores-titulo"
          label="Sectores"
          title="Sectores en los que intervenimos"
          intro="Operaciones donde el margen se decide en el detalle: un lote sin trazabilidad, un pedimento mal clasificado o una ventana de entrega perdida cuestan más que cualquier tarifa."
          align="center"
        />
      </m.div>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 xl:gap-5">
        {SECTORS.map(({ icon, name, body, meta }, i) => (
          /*
           * Tarjeta informativa, no enlace: `liquid-glass` a secas y sin
           * desplazamiento en hover. Darle los afordances de algo clicable que no
           * lleva a ningún sitio es justo el defecto que se corrigió en Servicios
           * Express. El único cambio al pasar el cursor lo hace IconTile, que
           * responde al `group` de la tarjeta.
           */
          <m.div
            key={name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className={`group liquid-glass rounded-2xl p-6 xl:p-7 flex flex-col ${spanFor(i)}`}
          >
            <IconTile icon={icon} className="w-12 h-12 xl:w-14 xl:h-14" />

            <h3 className="mt-5 text-base xl:text-lg font-semibold tracking-tight text-white">
              {name}
            </h3>
            <p className="mt-2.5 text-sm xl:text-[15px] text-white/60 leading-[1.65]">{body}</p>

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
          </m.div>
        ))}
      </div>
    </section>
  )
}
