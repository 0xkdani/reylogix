import { TestimonialsSection } from '@/components/ui/testimonials-with-marquee'
import { SectionHeader } from './primitives'
import { IMAGES } from '../images'

/** Testimonios textuales de la sección "Casos de éxito". */
const QUOTES = [
  {
    quote:
      'Blackline nos permitió ver lo que nadie más había detectado. No fue una auditoría, fue una intervención quirúrgica. Hoy operamos con más control y una claridad que antes parecía imposible.',
    name: 'Rodrigo Espinoza',
    image: IMAGES.casoRodrigo,
    role: 'CEO',
    company: 'Grupo de Manufactura Alimentaria Internacional',
  },
  {
    quote:
      'He trabajado con muchas consultoras, pero Blackline es otra liga. La forma en que entienden la lógica operativa, los tiempos y la documentación es simplemente superior.',
    name: 'Julian Ortiz',
    image: IMAGES.casoJulian,
    role: 'Ejecutivo Aduanal',
    company: 'Zona Norte',
  },
  {
    quote:
      'Como emprendedor, estás acostumbrado a resolver todo tú mismo. Pero Blackline me mostró lo que significa operar con criterio ejecutivo. No fue solo optimización: fue visión, estructura y acceso a un nivel de soporte que normalmente está reservado para corporativos. Hoy mi empresa crece con orden, con respaldo, y con una lógica que me permite escalar sin perder el control.',
    name: 'Jhonatan Mendoza',
    image: IMAGES.casoJhonatan,
    role: 'Emprendedor',
    company: 'Tecnología',
  },
  {
    quote:
      'Lo que ninguna consultora había logrado, visión operativa sin perder identidad de marca. Refinaron nuestros procesos con criterio, discreción y precisión. Hoy operamos con más control, más agilidad y una estructura que nos permite crecer sin problemas',
    name: 'Valentina Lizbeth',
    image: IMAGES.casoValentina,
    role: 'Emprendedora',
    company: 'Cosméticos para Mujer',
  },
  {
    quote:
      'Mover autos desde China a México implica más que logística: es una danza entre tiempos, regulaciones y precisión documental. Blackline nos dio estructura, visión y acceso institucional. Hoy operamos con menos fricción, más control y una ruta clara para escalar sin errores.',
    name: 'Luis Cantú',
    role: 'Director de Operaciones',
    company: 'Exportación de Autos desde Asia',
  },
]

/**
 * Adaptación de los datos del sitio a la forma que espera el componente.
 *
 * `handle` es la línea secundaria bajo el nombre; en el original es un @usuario
 * de Twitter. Aquí lleva cargo y perfil, que es lo que sí está publicado: no
 * existen cuentas sociales de estos clientes y no se van a inventar.
 *
 * Luis Cantú no tiene retrato en la fuente, así que `avatar` va vacío y el
 * AvatarFallback del componente dibuja sus iniciales.
 */
const TESTIMONIALS = QUOTES.map((q) => ({
  author: {
    name: q.name,
    handle: `${q.role} · ${q.company}`,
    avatar: q.image?.local ?? '',
  },
  text: q.quote,
}))

export default function Testimonials() {
  return (
    /*
     * `text-plate` (el halo del sitio para texto sobre el video) va en este
     * envoltorio y NO en el className del componente: `cn` usa tailwind-merge,
     * que lo tomaría por una clase de color de texto y descartaría el
     * `text-foreground` del propio componente. Heredado desde fuera, se aplica
     * igual y no pisa nada.
     */
    <div id="casos" className="text-plate">
      {/*
        El encabezado lo pone SectionHeader, el mismo primitivo que usan Enfoque,
        Servicios y Blackline. Así la escala, el tracking, el interlineado, el
        eyebrow y la alineación a la izquierda son literalmente los mismos, y no
        dos jerarquías parecidas que se separan en cuanto una cambie. Va dentro de
        `.shell` para compartir también el ancho y los márgenes laterales.
      */}
      <div className="shell pt-20 md:pt-28">
        <SectionHeader
          label="Clientes"
          title="Casos de éxito"
          intro="Cinco intervenciones contadas por quienes las vivieron: dirección general, comercio exterior, operaciones y fundadores."
        />
      </div>

      {/*
        Sin title ni description: el componente omite su propio encabezado y
        aporta solo la marquesina, que sí va a sangre.

        Estas clases van por className porque la intención es que tailwind-merge
        las deje ganar a las del componente: `bg-transparent` descarta su
        `bg-background` para que el video de fondo siga viéndose, y el relleno
        vertical se reparte para cerrar la sección con el ritmo del resto de
        rutas (el sm: hay que pasarlo o quedaría mayor que el md).
      */}
      <TestimonialsSection
        testimonials={TESTIMONIALS}
        /* 40s era el valor del componente original y se arrastraba demasiado.
           Este es el único número que hay que tocar para ajustar la velocidad:
           menos tiempo = más rápido. */
        duration="60s"
        className="bg-transparent pb-20 pt-10 sm:pt-10 md:pb-28"
      />
    </div>
  )
}
