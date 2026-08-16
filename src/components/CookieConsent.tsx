import { useEffect, useState } from 'react'

const STORAGE_KEY = 'reylogix-cookie-consent'

/**
 * El sitio no pone ninguna cookie de analítica hoy (no hay gtag ni similar),
 * pero el aviso se deja listo desde ya: es la pieza que evita tener que
 * recordar añadirlo el día que sí se sume un script de medición.
 */
export default function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) setVisible(true)
  }, [])

  function choose(value: 'accepted' | 'rejected') {
    localStorage.setItem(STORAGE_KEY, value)
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 px-4 pb-4 md:px-6 md:pb-6">
      <div className="liquid-glass mx-auto max-w-3xl rounded-2xl px-5 py-4 md:px-6 md:py-5 flex flex-col sm:flex-row items-center gap-4">
        <p className="text-sm text-white/70 text-center sm:text-left">
          Usamos cookies para mejorar tu experiencia en el sitio. Puedes aceptarlas o rechazarlas.
        </p>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => choose('rejected')}
            className="rounded-full border border-white/15 bg-transparent text-white/80 text-sm font-medium px-4 py-2 hover:bg-white/[0.06] hover:text-white transition-colors"
          >
            Rechazar
          </button>
          <button
            type="button"
            onClick={() => choose('accepted')}
            className="rounded-full bg-white text-black text-sm font-medium px-4 py-2 hover:bg-white/90 transition-colors"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  )
}
