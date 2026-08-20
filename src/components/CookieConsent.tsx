import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Cookie } from 'lucide-react'
import { applyPreferences, readConsent, saveConsent, type OptionalCookieCategory } from '../lib/cookieConsent'

/**
 * Se monta una sola vez en App.tsx, fuera de <Routes>: no necesita
 * reinicializarse al navegar entre rutas (a diferencia de un sitio multi-página
 * donde cada carga reevaluaría la cookie desde cero) porque React Router no
 * lo desmonta al cambiar de página, solo al recargar la pestaña — momento en
 * el que el efecto de montaje ya vuelve a leer la cookie de todos modos.
 */
type Draft = Record<OptionalCookieCategory, boolean>

const REJECT_ALL: Draft = { preferences: false, analytics: false, marketing: false }
const ACCEPT_ALL: Draft = { preferences: true, analytics: true, marketing: true }

const OPTIONAL_CATEGORIES: Array<{
  key: OptionalCookieCategory
  label: string
  description: string
}> = [
  {
    key: 'preferences',
    label: 'Preferencias y funcionales',
    description: 'Recuerdan idioma, tema y región para no pedírtelos de nuevo en cada visita.',
  },
  {
    key: 'analytics',
    label: 'Medición y analíticas',
    description:
      'Miden cómo se usa el sitio para poder mejorarlo (por ejemplo, Google Analytics: _ga, _gid, _ga_*).',
  },
  {
    key: 'marketing',
    label: 'Publicidad y marketing',
    description:
      'Miden y personalizan anuncios (Google Ads: _gcl_au; Meta/Facebook Pixel: _fbp, _fbc).',
  },
]

const PRIMARY_BUTTON =
  'inline-flex items-center justify-center rounded-full bg-white text-black text-sm font-medium px-5 py-2.5 transition-colors hover:bg-white/90'
const GHOST_BUTTON =
  'inline-flex items-center justify-center rounded-full border border-white/15 bg-transparent text-white/80 text-sm font-medium px-5 py-2.5 transition-colors hover:bg-white/[0.06] hover:text-white'
const LINK_BUTTON = 'text-xs text-white/55 underline underline-offset-2 hover:text-white transition-colors'

/**
 * Switch accesible propio en vez de traer un componente externo: es el único
 * control interactivo que faltaba en las primitivas del sitio y no vale la
 * pena una dependencia nueva por un `role="switch"`.
 */
function CategoryToggle({
  label,
  description,
  checked,
  disabled,
  onChange,
}: {
  label: string
  description: string
  checked: boolean
  disabled?: boolean
  onChange?: (value: boolean) => void
}) {
  /* Toda la fila es el blanco de clic (mejor objetivo táctil que el switch
     solo), pero el <button role="switch"> sigue siendo el único elemento
     focuseable/anunciado: un <div onClick> no es accesible por teclado ni
     lector de pantalla por sí mismo. */
  return (
    <div
      onClick={() => !disabled && onChange?.(!checked)}
      className={`flex items-start justify-between gap-4 py-3.5 border-b border-white/10 last:border-b-0 ${
        disabled ? '' : 'cursor-pointer'
      }`}
    >
      <div className="pr-4">
        <p className="text-sm font-medium text-white">{label}</p>
        <p className="mt-1 text-xs text-white/55 leading-relaxed">{description}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        disabled={disabled}
        onClick={(e) => {
          e.stopPropagation()
          onChange?.(!checked)
        }}
        className={`relative mt-0.5 h-6 w-11 shrink-0 rounded-full transition-colors duration-300 ${
          checked ? 'bg-brand' : 'bg-white/15'
        } ${disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
      >
        <span
          aria-hidden="true"
          className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-transform duration-300 ${
            checked ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  )
}

function MainView({
  onAcceptAll,
  onRejectOptional,
  onCustomize,
}: {
  onAcceptAll: () => void
  onRejectOptional: () => void
  onCustomize: () => void
}) {
  return (
    <div>
      <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8">
        <div className="flex items-start gap-3 lg:flex-1">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/[0.08] text-brand">
            <Cookie className="h-5 w-5" aria-hidden="true" />
          </span>
          <div>
            <h2 className="text-base font-semibold text-white">Preferencias de cookies</h2>
            <p className="mt-1 text-sm text-white/65 leading-relaxed lg:max-w-2xl">
              Usamos cookies propias y de terceros para que el sitio funcione, recordar tus
              preferencias y, si lo permites, medir el uso del sitio.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2.5 shrink-0 lg:pl-4">
          <button type="button" onClick={onRejectOptional} className={GHOST_BUTTON}>
            Rechazar opcionales
          </button>
          <button type="button" onClick={onAcceptAll} className={PRIMARY_BUTTON}>
            Aceptar todas
          </button>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-5 pl-12 lg:pl-[3.25rem]">
        <button type="button" onClick={onCustomize} className={LINK_BUTTON}>
          Personalizar preferencias
        </button>
        <Link to="/legales/aviso-privacidad" className={LINK_BUTTON}>
          Política de privacidad
        </Link>
      </div>
    </div>
  )
}

function CustomizeView({
  draft,
  onToggle,
  onBack,
  onSave,
}: {
  draft: Draft
  onToggle: (key: OptionalCookieCategory, value: boolean) => void
  onBack: () => void
  onSave: () => void
}) {
  return (
    <div>
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-base font-semibold text-white">Personaliza tus preferencias</h2>
          <p className="mt-1 text-xs text-white/55 leading-relaxed">
            Activa o desactiva cada categoría. Las esenciales siempre permanecen activas.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2.5 shrink-0">
          <button type="button" onClick={onBack} className={GHOST_BUTTON}>
            Atrás
          </button>
          <button type="button" onClick={onSave} className={PRIMARY_BUTTON}>
            Guardar selección
          </button>
        </div>
      </div>

      <div className="mt-4 max-h-[40vh] overflow-y-auto pr-1">
        <CategoryToggle
          label="Esenciales y técnicas"
          description="Necesarias para la navegación segura, la protección de formularios (CSRF) y para recordar esta misma preferencia. No se pueden desactivar."
          checked
          disabled
        />
        {OPTIONAL_CATEGORIES.map((cat) => (
          <CategoryToggle
            key={cat.key}
            label={cat.label}
            description={cat.description}
            checked={draft[cat.key]}
            onChange={(value) => onToggle(cat.key, value)}
          />
        ))}
      </div>
    </div>
  )
}

export default function CookieConsent() {
  const [open, setOpen] = useState(false)
  const [entered, setEntered] = useState(false)
  const [view, setView] = useState<'main' | 'customize'>('main')
  const [draft, setDraft] = useState<Draft>(REJECT_ALL)

  /*
   * Si ya hay consentimiento guardado, se re-aplica al cargar (por si el
   * usuario borró a mano alguna cookie de analítica/marketing entre visitas)
   * y el banner no se muestra. Si no hay cookie o su contenido no es válido,
   * se muestra tras 1.2 s: el retraso evita competir con el primer pintado.
   */
  useEffect(() => {
    const existing = readConsent()
    if (existing) {
      applyPreferences(existing)
      return
    }
    const showTimer = setTimeout(() => setOpen(true), 1200)
    return () => clearTimeout(showTimer)
  }, [])

  /* La transición de entrada necesita que el navegador pinte primero el
     estado "oculto" y luego el "visible" en dos frames distintos; montar ya
     con las clases finales no dispara la animación CSS. */
  useEffect(() => {
    if (!open) return
    const raf = requestAnimationFrame(() => setEntered(true))
    return () => cancelAnimationFrame(raf)
  }, [open])

  function commit(choice: Draft) {
    saveConsent(choice)
    setOpen(false)
  }

  if (!open) return null

  return (
    <div
      role="region"
      aria-label="Preferencias de cookies"
      /*
       * Franja a todo lo ancho, pegada abajo. `fixed` sin más coordinación
       * con el layout: no hay nada sticky anclado al fondo (a diferencia del
       * Navbar arriba), así que un overlay fijo aquí no tapa nada permanente,
       * solo se superpone temporalmente al Footer/FinalCTA si el usuario ya
       * hizo scroll hasta abajo — mismo trato que ya tenía la tarjeta
       * flotante original, solo que a todo lo ancho.
       */
      className={`fixed inset-x-0 bottom-0 z-50 transition-all duration-500 ease-out ${
        entered ? 'opacity-100 translate-y-0' : 'translate-y-4 opacity-0 pointer-events-none'
      }`}
    >
      <div className="liquid-glass rounded-t-3xl shadow-2xl shadow-black/50">
        <div className="shell py-5 md:py-6">
          {view === 'main' ? (
            <MainView
              onAcceptAll={() => commit(ACCEPT_ALL)}
              onRejectOptional={() => commit(REJECT_ALL)}
              onCustomize={() => {
                setDraft(REJECT_ALL)
                setView('customize')
              }}
            />
          ) : (
            <CustomizeView
              draft={draft}
              onToggle={(key, value) => setDraft((d) => ({ ...d, [key]: value }))}
              onBack={() => setView('main')}
              onSave={() => commit(draft)}
            />
          )}
        </div>
      </div>
    </div>
  )
}
