import { useMemo, useState } from 'react'
import { Lock, LogOut } from 'lucide-react'

/**
 * Panel interno para revisar los envíos del formulario de contacto (Home).
 * Es SOLO el front, a propósito, en construcción incremental:
 *
 * - El login no valida contra nada real todavía: cualquier correo/contraseña
 *   no vacíos "entran". El plan es Supabase Auth (ya está la cuenta creada y
 *   `@supabase/supabase-js` como dependencia), pero conectarlo de verdad
 *   necesita `VITE_SUPABASE_URL`/`VITE_SUPABASE_ANON_KEY` en un `.env` que
 *   todavía no existe en el repo (ver .gitignore: "no hay ninguna hoy").
 * - La tabla lee de MOCK_SUBMISSIONS, no del formulario real: Contact.tsx no
 *   persiste nada todavía (ver su propio comentario). Cuando haya Supabase +
 *   Resend conectados del lado del formulario, esta pantalla cambia a leer de
 *   la tabla real en vez de este arreglo.
 *
 * Ninguna de las dos cosas se disfraza de terminada: son el andamiaje del
 * front para poder revisar el diseño mientras se conecta lo demás.
 */

type Submission = {
  fecha: Date
  nombre: string
  correo: string
  empresa: string
  servicio: string
  mensaje: string
}

/** Mismos valores que SERVICE_OPTIONS en Contact.tsx — si cambian ahí, cambian aquí. */
const SERVICIOS = [
  'Auditoría de Costos Logísticos',
  'Revisión de Documentación Aduanal',
  'Diagnóstico Operativo Rápido',
  'Rediseño de Procesos',
  'Blackline',
  'Otro',
]

function haceDias(dias: number): Date {
  const d = new Date()
  d.setDate(d.getDate() - dias)
  return d
}

/**
 * Datos de ejemplo, no envíos reales — por eso los nombres/correos son
 * obviamente ficticios. La dispersión de fechas (0 a 40 días atrás) es a
 * propósito, para que los tres filtros de fecha tengan algo distinto que
 * mostrar cada uno.
 */
const MOCK_SUBMISSIONS: Submission[] = [
  {
    fecha: haceDias(0),
    nombre: 'Ejemplo — Ana Torres',
    correo: 'ana.torres@ejemplo.com',
    empresa: 'Distribuidora Ejemplo',
    servicio: 'Auditoría de Costos Logísticos',
    mensaje: 'Nos interesa una auditoría para nuestra cadena de frío.',
  },
  {
    fecha: haceDias(1),
    nombre: 'Ejemplo — Luis Ramírez',
    correo: 'luis.ramirez@ejemplo.com',
    empresa: 'Comercializadora Ejemplo',
    servicio: 'Blackline',
    mensaje: 'Quisiera más información sobre el programa reservado.',
  },
  {
    fecha: haceDias(3),
    nombre: 'Ejemplo — Sofía Delgado',
    correo: 'sofia.delgado@ejemplo.com',
    empresa: '',
    servicio: 'Diagnóstico Operativo Rápido',
    mensaje: 'Necesitamos un diagnóstico exprés antes de fin de mes.',
  },
  {
    fecha: haceDias(6),
    nombre: 'Ejemplo — Marco Villanueva',
    correo: 'marco.villanueva@ejemplo.com',
    empresa: 'Grupo Ejemplo',
    servicio: 'Revisión de Documentación Aduanal',
    mensaje: 'Tenemos pedimentos detenidos y queremos revisión urgente.',
  },
  {
    fecha: haceDias(10),
    nombre: 'Ejemplo — Renata Ibarra',
    correo: 'renata.ibarra@ejemplo.com',
    empresa: 'Manufactura Ejemplo',
    servicio: 'Rediseño de Procesos',
    mensaje: 'Buscamos rediseñar nuestro proceso de picking.',
  },
  {
    fecha: haceDias(18),
    nombre: 'Ejemplo — Diego Cordero',
    correo: 'diego.cordero@ejemplo.com',
    empresa: 'Importadora Ejemplo',
    servicio: 'Otro',
    mensaje: 'No encontramos un servicio que encaje, ¿podemos platicar?',
  },
  {
    fecha: haceDias(25),
    nombre: 'Ejemplo — Paula Nuñez',
    correo: 'paula.nunez@ejemplo.com',
    empresa: 'Logística Ejemplo',
    servicio: 'Auditoría de Costos Logísticos',
    mensaje: 'Queremos comparar costos entre dos rutas de distribución.',
  },
  {
    fecha: haceDias(40),
    nombre: 'Ejemplo — Iván Salcedo',
    correo: 'ivan.salcedo@ejemplo.com',
    empresa: 'Automotriz Ejemplo',
    servicio: 'Blackline',
    mensaje: 'Nos recomendaron Blackline para nuestro proveedor secuenciado.',
  },
]

type DateFilter = 'hoy' | 'semana' | 'mes' | 'todos'

const DATE_FILTERS: Array<{ key: DateFilter; label: string }> = [
  { key: 'hoy', label: 'Hoy' },
  { key: 'semana', label: 'Últimos 7 días' },
  { key: 'mes', label: 'Este mes' },
  { key: 'todos', label: 'Todos' },
]

function pasaFiltroFecha(fecha: Date, filtro: DateFilter): boolean {
  const ahora = new Date()
  if (filtro === 'todos') return true
  if (filtro === 'hoy') return fecha.toDateString() === ahora.toDateString()
  if (filtro === 'semana') {
    const haceUnaSemana = haceDias(7)
    return fecha >= haceUnaSemana
  }
  // 'mes': mismo mes y año de calendario, no "últimos 30 días".
  return fecha.getMonth() === ahora.getMonth() && fecha.getFullYear() === ahora.getFullYear()
}

const FIELD_CLASS =
  'w-full rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none transition-colors duration-300 focus:border-white/30 focus:bg-white/[0.1]'

function LoginView({ onLogin }: { onLogin: () => void }) {
  return (
    <div className="liquid-glass w-full max-w-sm rounded-3xl px-7 py-9">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/[0.08] text-brand">
          <Lock className="h-5 w-5" aria-hidden="true" />
        </span>
        <div>
          <h1 className="text-lg font-semibold text-white">Recap</h1>
          <p className="text-xs text-white/50">Acceso interno</p>
        </div>
      </div>

      <form
        className="mt-6 flex flex-col gap-4"
        onSubmit={(e) => {
          e.preventDefault()
          onLogin()
        }}
      >
        <div>
          <label htmlFor="recap-correo" className="block text-sm text-white/60 mb-2">
            Correo
          </label>
          <input
            id="recap-correo"
            name="correo"
            type="email"
            required
            autoComplete="email"
            placeholder="tucorreo@reylogix.com"
            className={FIELD_CLASS}
          />
        </div>

        <div>
          <label htmlFor="recap-password" className="block text-sm text-white/60 mb-2">
            Contraseña
          </label>
          <input
            id="recap-password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
            placeholder="••••••••"
            className={FIELD_CLASS}
          />
        </div>

        <button
          type="submit"
          className="mt-2 inline-flex items-center justify-center rounded-full bg-white text-black text-sm font-medium px-5 py-3 transition-colors hover:bg-white/90"
        >
          Iniciar sesión
        </button>

        <p className="text-center text-xs text-white/35">
          Login de vista previa: cualquier correo y contraseña entran. Falta conectar Supabase Auth.
        </p>
      </form>
    </div>
  )
}

function FiltersBar({
  dateFilter,
  onDateFilter,
  servicioFilter,
  onServicioFilter,
}: {
  dateFilter: DateFilter
  onDateFilter: (f: DateFilter) => void
  servicioFilter: string
  onServicioFilter: (s: string) => void
}) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center gap-3 lg:gap-6">
      <div className="flex flex-wrap gap-2">
        {DATE_FILTERS.map((f) => (
          <button
            key={f.key}
            type="button"
            onClick={() => onDateFilter(f.key)}
            aria-pressed={dateFilter === f.key}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
              dateFilter === f.key
                ? 'border-transparent bg-white text-black'
                : 'border-white/15 bg-transparent text-white/70 hover:bg-white/[0.06] hover:text-white'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <select
        value={servicioFilter}
        onChange={(e) => onServicioFilter(e.target.value)}
        className={`${FIELD_CLASS} lg:ml-auto lg:w-64`}
        aria-label="Filtrar por servicio de interés"
      >
        <option value="todos" className="bg-ink text-white">
          Todos los servicios
        </option>
        {SERVICIOS.map((s) => (
          <option key={s} value={s} className="bg-ink text-white">
            {s}
          </option>
        ))}
      </select>
    </div>
  )
}

function SubmissionsTable({ rows }: { rows: Submission[] }) {
  if (rows.length === 0) {
    return (
      <div className="liquid-glass mt-6 rounded-3xl px-6 py-16 text-center text-sm text-white/50">
        Ningún envío coincide con estos filtros.
      </div>
    )
  }

  return (
    <div className="liquid-glass mt-6 rounded-3xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[980px] text-left text-sm">
          <thead>
            <tr className="border-b border-white/10 text-xs uppercase tracking-wide text-white/40">
              <th className="px-5 py-4 font-medium">Fecha</th>
              <th className="px-5 py-4 font-medium">Nombre</th>
              <th className="px-5 py-4 font-medium">Correo</th>
              <th className="px-5 py-4 font-medium">Empresa</th>
              <th className="px-5 py-4 font-medium">Servicio</th>
              <th className="px-5 py-4 font-medium">Mensaje</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="border-b border-white/[0.06] last:border-b-0">
                <td className="px-5 py-4 text-white/60 whitespace-nowrap">
                  {r.fecha.toLocaleDateString('es-MX', { day: '2-digit', month: 'short' })}
                </td>
                <td className="px-5 py-4 text-white whitespace-nowrap">{r.nombre}</td>
                <td className="px-5 py-4 text-white/70 whitespace-nowrap">{r.correo}</td>
                <td className="px-5 py-4 text-white/70 whitespace-nowrap">{r.empresa || '—'}</td>
                <td className="px-5 py-4 text-white/70 whitespace-nowrap">{r.servicio}</td>
                <td className="px-5 py-4 text-white/50 max-w-xs truncate" title={r.mensaje}>
                  {r.mensaje}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [dateFilter, setDateFilter] = useState<DateFilter>('todos')
  const [servicioFilter, setServicioFilter] = useState('todos')

  const rows = useMemo(
    () =>
      MOCK_SUBMISSIONS.filter(
        (s) =>
          pasaFiltroFecha(s.fecha, dateFilter) &&
          (servicioFilter === 'todos' || s.servicio === servicioFilter),
      ).sort((a, b) => b.fecha.getTime() - a.fecha.getTime()),
    [dateFilter, servicioFilter],
  )

  return (
    <div className="w-full max-w-5xl">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-white">Recap</h1>
          <p className="mt-1 text-sm text-white/50">
            Envíos del formulario de contacto — datos de ejemplo, aún sin conectar.
          </p>
        </div>
        <button
          type="button"
          onClick={onLogout}
          className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2.5 text-sm text-white/70 transition-colors hover:bg-white/[0.06] hover:text-white"
        >
          <LogOut className="h-4 w-4" aria-hidden="true" />
          Cerrar sesión
        </button>
      </div>

      <div className="mt-8">
        <FiltersBar
          dateFilter={dateFilter}
          onDateFilter={setDateFilter}
          servicioFilter={servicioFilter}
          onServicioFilter={setServicioFilter}
        />
      </div>

      <SubmissionsTable rows={rows} />
    </div>
  )
}

export default function Recap() {
  const [loggedIn, setLoggedIn] = useState(false)

  return (
    <section className="shell py-20 md:py-28 min-h-screen flex items-start justify-center">
      {loggedIn ? (
        <Dashboard onLogout={() => setLoggedIn(false)} />
      ) : (
        <LoginView onLogin={() => setLoggedIn(true)} />
      )}
    </section>
  )
}
