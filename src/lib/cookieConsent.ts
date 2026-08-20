import { deleteCookie, getCookie, listCookieNames, setCookie } from './cookies'

export type OptionalCookieCategory = 'preferences' | 'analytics' | 'marketing'

export type CookiePreferences = {
  necessary: true
  preferences: boolean
  analytics: boolean
  marketing: boolean
}

/** El sitio hoy no pone ninguna de estas por sí mismo (no hay gtag ni Pixel
 *  todavía, ver CLAUDE.md): la cookie y el evento se dejan listos desde ya
 *  para el día que se sumen, y applyPreferences ya sabe limpiarlas. */
const ANALYTICS_COOKIES = ['_ga', '_gid']
const ANALYTICS_PREFIX = '_ga_'
const MARKETING_COOKIES = ['_gcl_au', '_fbp', '_fbc']

const CONSENT_COOKIE_NAME = 'reylogix-cookie-consent'
const CONSENT_COOKIE_DAYS = 365

/** Único evento al que puede suscribirse un script de tracking futuro para
 *  reaccionar al consentimiento sin acoplarse a este componente. */
export const CONSENT_EVENT = 'cookie-consent-updated'

/**
 * Apaga (borra) las cookies de las categorías que el usuario no autorizó.
 * Se llama tanto al leer un consentimiento ya guardado (por si cambiaron las
 * preferencias en otra pestaña) como justo después de guardar uno nuevo.
 */
export function applyPreferences(prefs: CookiePreferences) {
  if (!prefs.analytics) {
    ANALYTICS_COOKIES.forEach(deleteCookie)
    listCookieNames()
      .filter((name) => name.startsWith(ANALYTICS_PREFIX))
      .forEach(deleteCookie)
  }

  if (!prefs.marketing) {
    MARKETING_COOKIES.forEach(deleteCookie)
  }

  document.dispatchEvent(new CustomEvent<CookiePreferences>(CONSENT_EVENT, { detail: prefs }))
}

/** Valida que el JSON guardado tenga la forma esperada antes de confiar en él. */
function isCookiePreferences(value: unknown): value is Omit<CookiePreferences, 'necessary'> {
  return (
    typeof value === 'object' &&
    value !== null &&
    typeof (value as Record<string, unknown>).preferences === 'boolean' &&
    typeof (value as Record<string, unknown>).analytics === 'boolean' &&
    typeof (value as Record<string, unknown>).marketing === 'boolean'
  )
}

/** `null` si no hay cookie o si su contenido no es el JSON esperado — en
 *  ambos casos el banner debe volver a preguntar. */
export function readConsent(): CookiePreferences | null {
  const raw = getCookie(CONSENT_COOKIE_NAME)
  if (!raw) return null

  try {
    const parsed = JSON.parse(raw)
    if (!isCookiePreferences(parsed)) return null
    return { necessary: true, ...parsed }
  } catch {
    return null
  }
}

/** Guarda la cookie de consentimiento y aplica sus efectos de inmediato. */
export function saveConsent(choice: Omit<CookiePreferences, 'necessary'>): CookiePreferences {
  const prefs: CookiePreferences = { necessary: true, ...choice }
  setCookie(CONSENT_COOKIE_NAME, JSON.stringify(prefs), CONSENT_COOKIE_DAYS)
  applyPreferences(prefs)
  return prefs
}
