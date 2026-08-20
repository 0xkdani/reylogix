/**
 * Sustituye al <video> de fondo (una cinta 3D renderizada). Mismo lenguaje
 * visual —una cinta de luz azul en diagonal sobre negro— pero vectorial:
 * gradiente + blur en vez de un archivo que decodificar.
 *
 * Dos razones para el cambio, no solo una:
 *
 * 1. El video era un degradado azul liso sobre negro, el peor caso posible
 *    para H.264 (macrobloqueo/banding visibles a simple vista: lo que se
 *    reportó como "mala calidad"). Un gradiente CSS/SVG no se comprime con
 *    pérdida, así que el problema desaparece en vez de paliarse subiendo el
 *    CRF.
 * 2. `useReducedMotion` hacía que el <video> no se montara en absoluto para
 *    quien pide movimiento reducido (accesibilidad correcta, pero el fondo se
 *    quedaba negro liso). Aquí no hace falta esa lógica: la regla global de
 *    prefers-reduced-motion (ver src/index.css) ya fuerza animation-duration
 *    a 0.01ms para todo el sitio, así que este fondo SIEMPRE se ve — bajo esa
 *    preferencia simplemente se queda fijo en vez de animado, que es
 *    justo lo que la preferencia pide.
 *
 * De regalo: cero peso de red (el video más liviano de los dos pesaba ~200 KB
 * en móvil y ~3 MB en escritorio) y nitidez idéntica en cualquier densidad de
 * píxeles, sin variante aparte para pantallas pequeñas.
 */
export default function BackgroundGlow() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
      <svg
        className="bg-ribbon-svg absolute inset-0 w-full h-full"
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Mismos siete stops que .gradientStyle (primitives.tsx): la marca
              no usa cian, así que el barrido va de --steel a --flash y vuelta,
              nunca a un azul saturado. */}
          <linearGradient id="bg-ribbon-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6E8A9C" />
            <stop offset="14%" stopColor="#8FA9B8" />
            <stop offset="30%" stopColor="#B8CBD6" />
            <stop offset="50%" stopColor="#E8F0F4" />
            <stop offset="70%" stopColor="#B8CBD6" />
            <stop offset="86%" stopColor="#8FA9B8" />
            <stop offset="100%" stopColor="#6E8A9C" />
          </linearGradient>
          <filter id="bg-ribbon-blur-wide" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="48" />
          </filter>
          <filter id="bg-ribbon-blur-core" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="16" />
          </filter>
        </defs>

        {/* Misma curva en S del clip original. Dos trazos sobre el mismo
            path: uno ancho y muy desenfocado (el halo) y uno delgado y menos
            desenfocado encima (el núcleo brillante), igual que el clip traía
            un centro casi blanco dentro del degradado azul. */}
        <g className="bg-ribbon-drift">
          <path
            d="M -250 970 C 220 760, 460 640, 660 480 C 850 330, 740 250, 970 90 C 1140 -35, 1360 -110, 1850 -140"
            fill="none"
            stroke="url(#bg-ribbon-gradient)"
            strokeWidth="230"
            strokeLinecap="round"
            filter="url(#bg-ribbon-blur-wide)"
            opacity="0.5"
          />
          <path
            d="M -250 970 C 220 760, 460 640, 660 480 C 850 330, 740 250, 970 90 C 1140 -35, 1360 -110, 1850 -140"
            fill="none"
            stroke="url(#bg-ribbon-gradient)"
            strokeWidth="64"
            strokeLinecap="round"
            filter="url(#bg-ribbon-blur-core)"
            opacity="0.85"
          />
        </g>
      </svg>
    </div>
  )
}
