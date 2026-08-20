/**
 * Mapa de navegación, compartido por Navbar y Footer para que no se puedan
 * desincronizar.
 *
 * `title` es el <title> del documento en esa ruta: con rutas reales cada
 * sección es una URL que alguien puede compartir o indexar, así que necesita su
 * propio título en lugar de heredar el de la portada.
 */
export type NavLinkDef = {
  label: string
  to: string
  title: string
}

export const NAV_LINKS: NavLinkDef[] = [
  { label: 'Enfoque', to: '/enfoque', title: 'Enfoque — La lógica detrás de la ejecución' },
  { label: 'Servicios Express', to: '/servicios', title: 'Servicios Express — Intervención puntual' },
  { label: 'Blackline', to: '/blackline', title: 'Blackline — Programa reservado' },
  { label: 'Casos de éxito', to: '/casos', title: 'Casos de éxito — Clientes' },
]

export const HOME_TITLE = 'Reylogix — Ejecución precisa. Resultados reales.'

/**
 * Anclas de la versión anterior de una sola página. Se conservan para que los
 * enlaces ya repartidos (/#servicios) sigan llevando a su sección en lugar de
 * caer en la portada.
 */
export const LEGACY_HASH_ROUTES: Record<string, string> = {
  enfoque: '/enfoque',
  servicios: '/servicios',
  blackline: '/blackline',
  casos: '/casos',
}

/**
 * Documentos legales: van solo en el Footer (y el banner de cookies enlaza
 * el aviso de privacidad), no en NAV_LINKS/Navbar — no son secciones del
 * producto, son avisos. Añadir un documento nuevo es una entrada aquí + un
 * archivo en src/components/legal/ + una ruta lazy en App.tsx.
 */
export const LEGAL_LINKS: NavLinkDef[] = [
  {
    label: 'Aviso de privacidad',
    to: '/legales/aviso-privacidad',
    title: 'Aviso de Privacidad',
  },
  {
    label: 'Términos y condiciones',
    to: '/legales/terminos-condiciones',
    title: 'Términos y Condiciones',
  },
  {
    label: 'Datos y cumplimiento',
    to: '/legales/datos-cumplimiento',
    title: 'Datos y Cumplimiento',
  },
  {
    label: 'Marca y propiedad intelectual',
    to: '/legales/marca-propiedad-intelectual',
    title: 'Marca y Propiedad Intelectual',
  },
]
