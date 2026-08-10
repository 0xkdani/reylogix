import { CTAButton } from './primitives'

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

const INTRO = [
  'Blackline es el programa reservado de Reylogix para empresas que operan con exigencia, visión internacional y necesidad de control absoluto. Cada intervención es liderada personalmente por el fundador, junto a un equipo de alto nivel con experiencia real en logística, comercio exterior y optimización operativa. No hay intermediarios. No hay fórmulas genéricas. Solo conocimiento aplicado, visión ejecutiva y resultados medibles.',
  'Contamos con una red activa de contactos estratégicos: funcionarios clave, empresas líderes y aliados institucionales que respaldan cada proyecto con acceso, agilidad y criterio. Este ecosistema permite que Blackline opere con ventaja, incluso en entornos complejos o regulados.',
  'Con atención personalizada 24/7, cobertura nacional e internacional, y entregables diseñados para tomadores de decisión, Blackline transforma la operación en ventaja competitiva.',
]

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

      <div className="c3-intro">
        {INTRO.map((p, i) => (
          <p key={i}>{p}</p>
        ))}

        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {HIGHLIGHTS.map((h) => (
            <span
              key={h}
              className="text-xs xl:text-sm text-white/70 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03]"
            >
              {h}
            </span>
          ))}
        </div>
      </div>

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
