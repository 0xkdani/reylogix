import type { ComponentType, CSSProperties, SVGProps } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { FORM_URL } from '../site'
import type { SiteImageSrc } from '../images'

/* ------------------------------------------------------------------ */
/* SiteImage — intenta el archivo local y cae al original de Google    */
/* ------------------------------------------------------------------ */

/**
 * `width`/`height` son las dimensiones intrínsecas del archivo, no un tamaño de
 * render: reservan la caja antes de que la imagen cargue. Sin ellas el layout
 * salta al terminar la descarga y desplaza todo lo que va debajo, incluido el
 * destino de los enlaces de ancla.
 */
export function SiteImage({
  src,
  alt,
  className,
  width,
  height,
}: {
  src: SiteImageSrc
  alt: string
  className?: string
  width?: number
  height?: number
}) {
  return (
    <img
      src={src.local}
      alt={alt}
      loading="lazy"
      decoding="async"
      width={width}
      height={height}
      className={className}
      onError={(e) => {
        const el = e.currentTarget
        if (el.dataset.fallback === 'done') return
        el.dataset.fallback = 'done'
        el.src = src.remote
      }}
    />
  )
}

/* ------------------------------------------------------------------ */
/* IconTile — placa para los iconos de línea                           */
/* ------------------------------------------------------------------ */

/**
 * Reemplaza al antiguo GraphicTile, que recortaba con zoom los JPEG de la
 * fuente para esconder su título rasterizado. Ahora el icono es SVG propio
 * (ver ServiceIcons), así que la placa solo tiene que enmarcarlo.
 *
 * Los estados `group-hover` responden a la tarjeta contenedora, no al tile.
 */
export function IconTile({
  icon: Glyph,
  className = 'w-14 h-14 xl:w-16 xl:h-16',
}: {
  icon: ComponentType<SVGProps<SVGSVGElement>>
  className?: string
}) {
  return (
    <div
      className={`${className} shrink-0 rounded-xl border border-white/10 bg-white/[0.06] text-white/85 flex items-center justify-center transition-colors duration-500 group-hover:border-white/25 group-hover:bg-white/[0.1] group-hover:text-white`}
    >
      <Glyph className="w-7 h-7 xl:w-8 xl:h-8" />
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Avatar — retrato con monograma de respaldo                          */
/* ------------------------------------------------------------------ */

export function Avatar({
  src,
  name,
  className = 'w-11 h-11 xl:w-12 xl:h-12',
}: {
  src?: SiteImageSrc
  name: string
  className?: string
}) {
  const initials = name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')

  return (
    <div
      className={`${className} relative rounded-full overflow-hidden shrink-0 bg-gradient-to-br from-[#B8CBD6]/35 to-[#1E2B36] flex items-center justify-center`}
    >
      <span className="text-sm font-semibold text-white">{initials}</span>
      {src ? (
        <img
          src={src.local}
          alt={name}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => {
            const el = e.currentTarget
            if (el.dataset.fallback !== 'done') {
              el.dataset.fallback = 'done'
              el.src = src.remote
              return
            }
            // Sin local ni remoto: se descubre el monograma.
            el.style.display = 'none'
          }}
        />
      ) : null}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* LogoMark                                                            */
/* ------------------------------------------------------------------ */

/**
 * Monograma R de la marca, trazado desde el original de 1024 px
 * (Pictures/Reylogix/relogix.png).
 *
 * Se traza en vez de incrustar el PNG por dos razones: el archivo trae fondo
 * negro opaco, que sobre el video de fondo dibujaria un recuadro —el mismo
 * defecto que ya se corrigio en el wordmark de Blackline—, y pesa 1 MB para
 * acabar renderizado a 32 px.
 *
 * Dos detalles de la letra que el path respeta y conviene no "arreglar":
 * la contraforma NO es un agujero cerrado, baja por un canal vertical hasta el
 * pie, asi que el cuerpo va de un solo trazo y no hace falta fill-rule; y la
 * segunda subruta es el triangulo que la diagonal deja suelto sobre la pierna.
 *
 * Los tiradores de las dos curvas del hombro salen de un ajuste por minimos
 * cuadrados contra el pixel del original (error medio 0.6 y 0.8 px sobre 424 de
 * ancho). Rasterizado y comparado contra el PNG da 99.2 % de IoU.
 */
export function LogoMark({ className = 'w-8 h-8' }: { className?: string }) {
  return (
    <svg viewBox="0 0 424 459" fill="currentColor" className={className} aria-hidden="true">
      <path
        d="M0 0 L302 0
           C358.7 0 412.5 51.1 412.5 126.5
           C412.5 179.6 396 213.5 341 257.5
           L423.5 374.7 L423.5 459 L371.4 459 L176.3 183 L277.5 183
           A39.5 39.5 0 0 0 277.5 104
           L107 104 L107 459 L0 459 Z
           M172 290 L290.5 459 L172 459 Z"
      />
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/* Botones                                                             */
/* ------------------------------------------------------------------ */

type ButtonProps = {
  label: string
  href?: string
  full?: boolean
  /**
   * false para destinos internos (p. ej. "/#contacto"): navegan con el router,
   * en la misma pestaña y sin el aviso de cambio de contexto. Por defecto es
   * true porque el uso histórico de estos botones es el Google Forms externo.
   */
  external?: boolean
}

/**
 * Los CTA externos (Google Forms) salen en pestaña nueva. El aviso va en
 * `sr-only` porque un cambio de contexto sin anunciar desorienta a quien navega
 * con lector de pantalla, y el icono no lo comunica.
 */
function NewTabHint() {
  return <span className="sr-only"> (abre el formulario en una pestaña nueva)</span>
}

function ButtonIcon() {
  return (
    <ChevronRight
      className="w-4 h-4 transition-transform group-hover:translate-x-[1px]"
      aria-hidden="true"
    />
  )
}

export function CTAButton({ label, href = FORM_URL, full = false, external = true }: ButtonProps) {
  const className = `group inline-flex items-center justify-center gap-2 rounded-full bg-white text-black font-medium text-sm xl:text-base px-6 py-3 xl:px-7 xl:py-3.5 transition-all hover:bg-white/90 active:scale-[0.98] ${
    full ? 'w-full' : ''
  }`

  if (!external) {
    return (
      <Link to={href} className={className}>
        <span>{label}</span>
        <ButtonIcon />
      </Link>
    )
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      <span>
        {label}
        <NewTabHint />
      </span>
      <ButtonIcon />
    </a>
  )
}

export function GhostButton({ label, href = FORM_URL, full = false, external = true }: ButtonProps) {
  /* El fondo tenue no es decoración: sin él la estela clara del video pasa
     por encima de la etiqueta y la parte en dos. */
  const className = `group inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-ink/50 backdrop-blur-sm text-white text-sm xl:text-base font-medium px-6 py-3 xl:px-7 xl:py-3.5 hover:bg-ink/70 hover:border-white/30 transition-all ${
    full ? 'w-full' : ''
  }`

  if (!external) {
    return (
      <Link to={href} className={className}>
        <span>{label}</span>
        <ButtonIcon />
      </Link>
    )
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      <span>
        {label}
        <NewTabHint />
      </span>
      <ButtonIcon />
    </a>
  )
}

/* ------------------------------------------------------------------ */
/* SectionHeader                                                       */
/* ------------------------------------------------------------------ */

/**
 * Sin numeración: Enfoque / Servicios / Blackline / Casos son categorías, no
 * pasos de un proceso. Un marcador 01-04 sugeriría una secuencia inexistente.
 */
export function SectionHeader({
  label,
  title,
  intro,
  align = 'left',
  titleId,
}: {
  label: string
  title: string
  intro?: string
  align?: 'left' | 'center'
  /** Para que la <section> pueda referenciarlo con aria-labelledby. */
  titleId?: string
}) {
  const centered = align === 'center'
  return (
    <div className={centered ? 'max-w-3xl mx-auto text-center' : 'max-w-3xl'}>
      <div className={`flex items-center gap-3 ${centered ? 'justify-center' : ''}`}>
        <span className="w-1.5 h-1.5 rounded-full bg-white" />
        <span className="text-xs xl:text-sm uppercase tracking-[0.18em] text-white/60">{label}</span>
        <span className="w-8 h-px bg-white/25" />
      </div>

      <h2
        id={titleId}
        className="mt-5 text-3xl md:text-5xl xl:text-6xl font-semibold tracking-tight leading-[1.02]"
      >
        {title}
      </h2>

      {intro ? (
        <p
          className={`mt-5 text-white/60 text-base xl:text-lg leading-[1.65] ${centered ? 'mx-auto' : ''}`}
        >
          {intro}
        </p>
      ) : null}
    </div>
  )
}

/* SectionDivider se retiró al pasar a rutas: ya no hay secciones que separar
   dentro de una misma página. */

/* ------------------------------------------------------------------ */
/* Shiny gradient text style                                           */
/* ------------------------------------------------------------------ */

/**
 * El gradiente original arrancaba y cerraba en #0A0C0F, que es exactamente
 * --ink: pintaba parte del titular del mismo color que el fondo, así que con la
 * animación buena parte del ciclo dejaba "Resultados reales." a 1:1 de
 * contraste. Ahora el punto más oscuro es --steel (#6E8A9C ≈ 5.4:1 sobre ink):
 * se conserva el barrido de brillo, pero nunca se pierde el texto.
 */
export const gradientStyle: CSSProperties = {
  backgroundImage:
    'linear-gradient(to right, #6E8A9C 0%, #8FA9B8 14%, #B8CBD6 30%, #E8F0F4 50%, #B8CBD6 70%, #8FA9B8 86%, #6E8A9C 100%)',
  backgroundSize: '200% auto',
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  color: 'transparent',
  WebkitTextFillColor: 'transparent',
  // El drop-shadow separa el titular del video sin atravesar el relleno
  // transparente, que es lo que impide usar text-shadow aquí.
  filter: 'url(#c3-noise) drop-shadow(0 2px 12px rgba(10, 12, 15, 0.9))',
}
