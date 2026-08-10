import type { SVGProps } from 'react'

/**
 * Iconos de Servicios Express, dibujados a mano en el lenguaje de la marca:
 * línea blanca, trazo uniforme, sin relleno.
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
