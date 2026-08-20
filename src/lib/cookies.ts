/**
 * Helpers de cookies de primera parte, sin dependencias. `Secure` exige
 * HTTPS: en `npm run dev` (http://localhost) Chrome/Edge tratan `localhost`
 * como origen seguro y la aceptan igual, pero en un preview servido por IP o
 * en otro navegador podría no persistir — es el trade-off de cumplir el
 * atributo que pide producción sin duplicar lógica por entorno.
 */

export function setCookie(name: string, value: string, days: number) {
  const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString()
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax; Secure`
}

export function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp(`(?:^|; )${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}=([^;]*)`))
  return match ? decodeURIComponent(match[1]) : null
}

export function deleteCookie(name: string) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Lax; Secure`
}

/** Nombres de todas las cookies legibles desde JS (las httpOnly no aplican aquí). */
export function listCookieNames(): string[] {
  return document.cookie
    .split('; ')
    .filter(Boolean)
    .map((pair) => pair.split('=')[0])
}
