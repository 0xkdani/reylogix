import { ImageStreamHero } from '@/components/ui/image-stream-hero'
import { CTAButton } from './primitives'
import { STREAM } from '../images'

type Program = {
  tier: string
  name: string
  desc: string
  features: string[]
  pro?: boolean
}

/** Atributos citados textualmente en la descripción de Blackline. */
const HIGHLIGHTS = [
  'Liderado personalmente por el fundador',
  'Red activa de contactos estratégicos',
  'Atención personalizada 24/7',
  'Cobertura nacional e internacional',
  'Entregables para tomadores de decisión',
]

/**
 * Las tres últimas oraciones del primer párrafo de la fuente, literales. Van
 * solas sobre el corredor: es la frase con más carga de todo el bloque y la
 * única lo bastante corta para leerse encima de imágenes en movimiento.
 */
/*
 * Las dos negaciones van en lineas separadas y no como un solo parrafo: son dos
 * oraciones cortas, y dejadas al ajuste automatico partian en "No hay
 * intermediarios. No / hay formulas genericas.", con un "No" colgando al final
 * del renglon. `text-wrap: balance` no lo corrige aqui.
 */
const CLAIM_LEAD = ['No hay intermediarios.', 'No hay fórmulas genéricas.']
const CLAIM_MAIN = 'Solo conocimiento aplicado, visión ejecutiva y resultados medibles.'

/**
 * Cierre de la sección, textual de la fuente. Va sobre placa sólida y no sobre
 * el corredor, porque a 22 palabras ya pide lectura seguida.
 */
const CLOSING =
  'Con atención personalizada 24/7, cobertura nacional e internacional, y entregables diseñados para tomadores de decisión, Blackline transforma la operación en ventaja competitiva.'

/*
 * Se retiraron dos párrafos de la fuente (~98 palabras) a petición del cliente:
 * la página abría con 120 palabras en tres bloques, el muro de texto más largo
 * del sitio, y nadie los leía.
 *
 * Lo retirado, para que quede trazable:
 *
 *   1. "Blackline es el programa reservado de Reylogix para empresas que operan
 *      con exigencia, visión internacional y necesidad de control absoluto.
 *      Cada intervención es liderada personalmente por el fundador, junto a un
 *      equipo de alto nivel con experiencia real en logística, comercio
 *      exterior y optimización operativa."
 *   2. "Contamos con una red activa de contactos estratégicos: funcionarios
 *      clave, empresas líderes y aliados institucionales que respaldan cada
 *      proyecto con acceso, agilidad y criterio. Este ecosistema permite que
 *      Blackline opere con ventaja, incluso en entornos complejos o regulados."
 *
 * El recorte pierde desarrollo, no afirmaciones: los HIGHLIGHTS de aquí abajo
 * se extrajeron en su día textualmente de esos mismos párrafos, así que "el
 * fundador lidera" y "hay red de contactos" siguen dichos. Lo único que ya no
 * aparece es a quién va dirigido el programa.
 */

const PROGRAMS: Program[] = [
  {
    tier: 'Programa reservado',
    name: 'Evaluación Estratégica Total',
    desc: 'Para empresas que necesitan una visión completa, profunda y ejecutiva de su operación. Ideal para quienes buscan claridad absoluta antes de escalar.',
    features: [
      'Análisis estratégico de costos',
      'Revisión de documentación',
      'Cumplimiento normativo',
      'Estructura operativa',
      'Enfoque confidencial y criterio institucional',
    ],
  },
  {
    tier: 'Programa reservado',
    name: 'Optimización Dirigida Personalizada',
    desc: 'Pensado para líderes que ya operan con fuerza, pero evolucionan. Ideal para quienes no buscan asesoría, sino evolución con propósito.',
    features: [
      'Refinamiento de procesos',
      'Alineación estratégica',
      'Mejora continua',
      'Atención directa del equipo',
      'Ejecución adaptada a tu ritmo y exigencia',
    ],
    pro: true,
  },
]

function Check() {
  return (
    <span className="c3-check">
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#fff"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <polyline points="20 6 9 17 4 12" />
      </svg>
    </span>
  )
}

export default function Blackline() {
  return (
    <section id="blackline" className="c3-pricing-section">
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
        <filter id="c3-noise-watermark">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.5"
            numOctaves="2"
            stitchTiles="stitch"
          />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.075" />
          </feComponentTransfer>
          <feComposite in2="SourceGraphic" operator="in" result="noise" />
          <feBlend in="SourceGraphic" in2="noise" mode="overlay" />
        </filter>
      </svg>

      <div className="relative z-[3] flex items-center gap-3 text-plate">
        <span className="w-1.5 h-1.5 rounded-full bg-white" />
        <span className="text-xs xl:text-sm uppercase tracking-[0.18em] text-white/60">
          Programa reservado
        </span>
        <span className="w-8 h-px bg-white/25" />
      </div>

      <div className="c3-watermark-container">
        <h2 className="c3-wordmark">
          <span className="sr-only">Blackline: precisión aplicada al más alto nivel</span>
          {/* En minúsculas en el marcado y en versales por CSS: así el lector de
              pantalla no lo deletrea letra a letra. */}
          <span aria-hidden="true">Blackline</span>
        </h2>
        <div className="c3-wordmark-reflection" aria-hidden="true">
          Blackline
        </div>
        <div className="c3-watermark-main" aria-hidden="true">
          <span className="c3-watermark-line-2">Precisión aplicada</span>
        </div>
      </div>

      {/*
        El corredor de imágenes sustituye a la placa de texto que había aquí.

        `cards={9}` no es decorativo: es exactamente el número de imágenes de
        STREAM, y los raíles recorren images[i % length] con i < cards, así que
        cualquier imagen por encima de ese índice sería código muerto.

        `still` es la decisión de diseño de este bloque. En movimiento había que
        taparlo con un velo tan opaco para poder leer el texto que las imágenes
        no se veían: se pagaban 317 KB por un efecto invisible, y encima el
        corredor competía con el vídeo de fondo del sitio, que es lo único que
        deberia moverse aquí. Quieto, el velo puede ser mucho más suave, las
        fotos por fin se ven y la página recupera un solo foco de movimiento.

        `mirror={false}` va de la mano: congelado, ver la misma foto a izquierda
        y derecha a la misma profundidad se lee como un duplicado. Desfasando el
        rail izquierdo, las dos tarjetas grandes son distintas.
      */}
      <ImageStreamHero
        images={STREAM}
        cards={9}
        still
        mirror={false}
        axis={50}
        className="c3-stream"
      >
        {/* El velo es lo que hace legible el texto. Sin él, el contraste vuelve
            a depender del fotograma, que es justo lo que se corrigió aquí. */}
        <div className="c3-stream-veil" aria-hidden="true" />

        <div className="c3-stream-copy">
          <p className="c3-stream-claim">
            {CLAIM_LEAD.map((linea) => (
              <span key={linea}>{linea}</span>
            ))}
            <strong>{CLAIM_MAIN}</strong>
          </p>

          <ul className="c3-highlights">
            {HIGHLIGHTS.map((h) => (
              <li key={h}>
                <Check />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </div>
      </ImageStreamHero>

      <p className="c3-closing">{CLOSING}</p>

      <div className="c3-grid c3-grid--duo">
        {PROGRAMS.map((p) => (
          <div key={p.name} className={`c3-card${p.pro ? ' c3-card-pro' : ''}`}>
            <div className="c3-tier-small">{p.tier}</div>
            <div className="c3-tier-large">{p.name}</div>
            <p className="c3-desc">{p.desc}</p>
            <ul className="c3-list">
              {p.features.map((f) => (
                <li key={f}>
                  <Check />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <div className="c3-cta">
              <CTAButton label="Solicitar acceso a Blackline" />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
