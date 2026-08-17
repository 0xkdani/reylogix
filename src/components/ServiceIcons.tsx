import type { SVGProps } from 'react'

/**
 * Iconos de Servicios Express y de Sectores, dibujados a mano en el lenguaje de
 * la marca: línea blanca, trazo uniforme, sin relleno.
 *
 * Sustituyen a los JPEG de la página fuente, que traían el título rasterizado
 * bajo el icono y había que recortar con un zoom del 175% (ver el antiguo
 * GraphicTile): eso los dejaba blandos, con artefactos y sobre una placa negra
 * que no encajaba con la superficie translúcida de la tarjeta.
 *
 * Heredan color y tamaño del contenedor vía `currentColor`.
 */

function Icon({ children, ...rest }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...rest}
    >
      {children}
    </svg>
  )
}

/** Auditoría de Costos Logísticos: el gasto bajo lupa. */
export function IconCosts(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <rect x="1.9" y="4.2" width="14.2" height="9" rx="1.7" />
      <circle cx="9" cy="8.7" r="2.1" />
      <path d="M4.6 8.7h.01M13.4 8.7h.01" />
      <circle cx="16.2" cy="16.2" r="4.3" />
      <path d="m19.4 19.4 2.7 2.7" />
    </Icon>
  )
}

/** Revisión de Documentación Aduanal: expediente verificado. */
export function IconDocs(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <path d="M13.4 2.8H7.3A1.7 1.7 0 0 0 5.6 4.5v15a1.7 1.7 0 0 0 1.7 1.7h9.4a1.7 1.7 0 0 0 1.7-1.7V7.6z" />
      <path d="M13.4 2.8v4.8h5" />
      <path d="M8.7 11.6h6.6M8.7 14.6h4.4" />
      <path d="m8.7 18 1.7 1.7 3.6-3.7" />
    </Icon>
  )
}

/** Diagnóstico Operativo Rápido: lectura instantánea de la operación. */
export function IconDiagnostic(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <path d="M3.2 17.6a8.8 8.8 0 1 1 17.6 0" />
      <path d="M3.2 20.6h17.6" />
      <circle cx="12" cy="17.6" r="1.35" />
      <path d="M12.95 16.65 16.6 12.4" />
      <path d="m5.8 11.4 1.05 1.05M12 8.9v1.4M18.2 11.4l-1.05 1.05" />
    </Icon>
  )
}

/** Rediseño de Procesos: el flujo se reconfigura. */
export function IconProcess(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <rect x="2.2" y="3.4" width="7.2" height="5.6" rx="1.6" />
      <rect x="14.6" y="3.4" width="7.2" height="5.6" rx="1.6" />
      <path d="M9.4 6.2h5.2" />
      <path d="m12.6 4.7 2 1.5-2 1.5" />
      <path d="M18.2 9v4.3a2.4 2.4 0 0 1-2.4 2.4H8.2a2.4 2.4 0 0 0-2.4 2.4v1.8" />
      <path d="m4.3 18.1 1.5 2 1.5-2" />
    </Icon>
  )
}

/* ------------------------------------------------------------------ */
/* Sectores                                                            */
/* ------------------------------------------------------------------ */

/**
 * Cada sector se dibuja por su unidad de manejo —lo que efectivamente viaja por
 * la cadena— y no por un símbolo de industria: es lo que comparten con los
 * iconos de servicio, que también representan el objeto de la intervención.
 */

/** Manufactura alimentaria: producto envasado y etiquetado. */
export function IconFood(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <ellipse cx="12" cy="5.4" rx="6.2" ry="2.4" />
      <path d="M5.8 5.4v13.2c0 1.3 2.8 2.4 6.2 2.4s6.2-1.1 6.2-2.4V5.4" />
      <path d="M5.8 10.4h12.4M5.8 15.4h12.4" />
    </Icon>
  )
}

/** Comercio exterior: la operación cruza fronteras. */
export function IconTrade(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="9.2" />
      <path d="M12 2.8c2.7 2.6 4.1 5.7 4.1 9.2s-1.4 6.6-4.1 9.2c-2.7-2.6-4.1-5.7-4.1-9.2S9.3 5.4 12 2.8" />
      <path d="M3.2 9.2h17.6M3.2 14.8h17.6" />
    </Icon>
  )
}

/** Tecnología: componente de alto valor. */
export function IconTech(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <rect x="7.6" y="7.6" width="8.8" height="8.8" rx="1.6" />
      <rect x="10.6" y="10.6" width="2.8" height="2.8" rx="0.7" />
      <path d="M9.6 3.4v4.2M14.4 3.4v4.2M9.6 16.4v4.2M14.4 16.4v4.2" />
      <path d="M3.4 9.6h4.2M3.4 14.4h4.2M16.4 9.6h4.2M16.4 14.4h4.2" />
    </Icon>
  )
}

/** Cosméticos: envase regulado, con su etiqueta. */
export function IconCosmetics(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <rect x="9.6" y="2.4" width="4.8" height="2.8" rx="0.9" />
      <path d="M10.6 5.2v1.6M13.4 5.2v1.6" />
      <rect x="7.6" y="6.8" width="8.8" height="14.4" rx="2.6" />
      <path d="M7.6 12.2h8.8" />
    </Icon>
  )
}

/** Automotriz: la unidad que no puede parar la línea. */
export function IconAutomotive(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <path d="m3.4 12.4 2-4.6a2.6 2.6 0 0 1 2.4-1.6h8.4a2.6 2.6 0 0 1 2.4 1.6l2 4.6" />
      <path d="M2.4 12.4h19.2v4.2a1.4 1.4 0 0 1-1.4 1.4H3.8a1.4 1.4 0 0 1-1.4-1.4z" />
      <circle cx="7.2" cy="18" r="1.9" />
      <circle cx="16.8" cy="18" r="1.9" />
      <path d="M5.2 15h1.6M17.2 15h1.6" />
    </Icon>
  )
}

/* ------------------------------------------------------------------ */
/* Enfoque                                                             */
/* ------------------------------------------------------------------ */

/**
 * Los tres pilares que el propio texto de Enfoque enumera. Sustituyen al
 * collage de clipart que traia la pagina fuente: iconos de estilos distintos
 * rasterizados en un solo JPEG, que ni compartian grosor de trazo con el resto
 * del sitio ni se podian separar para acompanar a cada idea.
 *
 * Ninguno reutiliza un glifo ya usado. En particular el de vision internacional
 * NO es el globo de IconTrade: ese ya significa "comercio exterior" en
 * Sectores, y repetirlo con otro significado en otra pagina confunde.
 */

/**
 * Análisis profundo: las capas de la operación, apiladas.
 *
 * La lupa seria el glifo obvio, pero en este sitio ya esta tomada: es la de
 * IconCosts, que significa "Auditoria de Costos Logisticos". Dos lupas con
 * significados distintos se leen como el mismo icono repetido, asi que la
 * profundidad se dice por estratos.
 */
export function IconAnalysis(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <path d="m12 2.6 9.2 5.1-9.2 5.1-9.2-5.1z" />
      <path d="m2.8 12.4 9.2 5.1 9.2-5.1" />
      <path d="m2.8 16.8 9.2 5.1 9.2-5.1" />
    </Icon>
  )
}

/** Ejecución precisa: la retícula que da en el centro. */
export function IconPrecision(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="7.2" />
      <circle cx="12" cy="12" r="2.7" />
      <path d="M12 1.9v3.4M12 18.7v3.4M1.9 12h3.4M18.7 12h3.4" />
    </Icon>
  )
}

/**
 * Visión internacional: el planeta con una órbita alrededor, el alcance que
 * rodea la operación.
 *
 * La orbita inclinada es lo que lo separa de IconTrade: aquel es un globo con
 * meridiano y paralelos, y a 24 px la diferencia entre "esfera reticulada" y
 * "esfera con anillo" se sostiene. Probadas y descartadas dos variantes que a
 * ese tamano se caian: el mapa con ruta (los nodos desaparecian) y el
 * hemisferio con arco (se leia como un puente).
 */
export function IconInternational(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="6.4" />
      <ellipse cx="12" cy="12" rx="10.6" ry="4.3" transform="rotate(-28 12 12)" />
    </Icon>
  )
}
