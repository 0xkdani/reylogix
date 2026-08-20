/**
 * Datos de marca y contenido compartido.
 * Fuente: https://sites.google.com/view/reylogix
 */

export const BRAND = 'Reylogix'
export const TAGLINE = 'Ejecución precisa. Resultados reales.'

/**
 * Único enlace de contacto que existe en el sitio original (Google Forms).
 * TODO: la página fuente no publica teléfono, correo ni dirección.
 * Cuando los tengas, agrégalos aquí y en el Footer.
 */
export const FORM_URL = 'https://forms.gle/bgrJGNKErHYqGE9E9'

/* ------------------------------------------------------------------ */
/* Prellenado por servicio                                             */
/* ------------------------------------------------------------------ */

/**
 * Los cuatro Servicios Express comparten un solo formulario, así que hoy no hay
 * forma de saber cuál generó el lead. Estas dos constantes lo resuelven sin
 * tocar más código: mientras estén vacías, todo cae al formulario tal cual.
 *
 * Para activarlo:
 *  1. Abre el formulario y copia su URL larga (no el forms.gle):
 *     https://docs.google.com/forms/d/e/<ID>/viewform   -> FORM_PREFILL_BASE
 *     El prellenado por querystring no sobrevive al acortador forms.gle.
 *  2. En el formulario: ⋮ -> "Obtener enlace prellenado", elige el servicio,
 *     copia el enlace y saca de él el `entry.<numero>` -> FORM_SERVICE_ENTRY
 */
export const FORM_PREFILL_BASE = ''
export const FORM_SERVICE_ENTRY = ''

/** URL del formulario con el servicio ya seleccionado, si está configurado. */
export function formUrlFor(service?: string): string {
  if (!service || !FORM_PREFILL_BASE || !FORM_SERVICE_ENTRY) return FORM_URL
  const url = new URL(FORM_PREFILL_BASE)
  url.searchParams.set('usp', 'pp_url')
  url.searchParams.set(FORM_SERVICE_ENTRY, service)
  return url.toString()
}

/* ------------------------------------------------------------------ */
/* Formulario propio (Home)                                            */
/* ------------------------------------------------------------------ */

/**
 * Nombre del parámetro con el que un enlace le dice al formulario de Home qué
 * frente eligió quien hizo clic: "/?servicio=Blackline#contacto" llega con el
 * <select> "Servicio de interés" ya resuelto (lo lee Contact.tsx).
 *
 * Hoy no lo produce ningún botón del sitio —el que lo usaba, "Solicitar acceso
 * a Blackline", se retiró—, pero sigue en pie para enlaces de campaña o de
 * correo. El valor tiene que coincidir con su opción en SERVICE_OPTIONS
 * (Contact.tsx); si no, el <select> lo ignora y se queda en el placeholder.
 */
export const CONTACT_SERVICE_PARAM = 'servicio'
