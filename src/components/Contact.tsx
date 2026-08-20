import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { m } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { SectionHeader } from './primitives'
import { CONTACT_SERVICE_PARAM } from '../site'

/**
 * Mismos cuatro Servicios Express de ExpressServices.tsx, más Blackline y un
 * "Otro" de escape. Se repiten aquí en vez de importarse porque son solo
 * etiquetas de un <select>, no la Service completa (icono, cuerpo, meta).
 */
const SERVICE_OPTIONS = [
  'Auditoría de Costos Logísticos',
  'Revisión de Documentación Aduanal',
  'Diagnóstico Operativo Rápido',
  'Rediseño de Procesos',
  'Blackline',
  'Otro',
]

/** Placa compartida por todos los campos: mismo tratamiento que IconTile. */
const FIELD_CLASS =
  'w-full rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm xl:text-base text-white placeholder:text-white/35 outline-none transition-colors duration-300 focus:border-white/30 focus:bg-white/[0.1]'

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string
  htmlFor: string
  children: React.ReactNode
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="block text-sm text-white/60 mb-2">
        {label}
      </label>
      {children}
    </div>
  )
}

/**
 * Solo diseño por ahora: onSubmit no manda nada a ningún lado todavía. La
 * conexión (Resend + endpoint) se resuelve aparte, una vez validado el
 * formulario visualmente.
 */
export default function Contact() {
  const [sent, setSent] = useState(false)
  const [servicio, setServicio] = useState('')

  /*
   * Un enlace que ya dice a qué frente apunta llega con ?servicio=... y deja el
   * <select> resuelto, para no pedir de nuevo algo que el clic ya dijo. Hoy no
   * lo produce ningún botón del sitio (ver CONTACT_SERVICE_PARAM en site.ts);
   * sirve para enlaces de campaña o de correo.
   *
   * Va en un efecto y no en el valor inicial del useState porque este bloque
   * vive en la portada y no se remonta al navegar dentro de ella: un valor
   * inicial no se volvería a leer si el parámetro cambia sin desmontar Contact.
   * Se ignora un valor que no sea una de las opciones para no dejar el <select>
   * en un estado que no puede pintar.
   */
  const [params] = useSearchParams()
  const pedido = params.get(CONTACT_SERVICE_PARAM)

  useEffect(() => {
    if (pedido && SERVICE_OPTIONS.includes(pedido)) setServicio(pedido)
  }, [pedido])

  return (
    <section id="contacto" aria-labelledby="contacto-titulo" className="shell py-20 md:py-28">
      <SectionHeader
        titleId="contacto-titulo"
        label="Contacto"
        title="Hablemos de tu operación."
        intro="Cuéntanos qué necesitas y en qué frente. Respondemos en menos de 24 horas hábiles."
        align="center"
      />

      <m.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="liquid-glass relative mt-14 mx-auto max-w-2xl rounded-3xl px-6 py-10 md:px-12 md:py-14"
      >
        {sent ? (
          <div className="text-center py-10">
            <h3 className="text-2xl font-semibold">Mensaje enviado.</h3>
            <p className="mt-3 text-white/60">
              Gracias por escribirnos. Te contactaremos en menos de 24 horas hábiles.
            </p>
          </div>
        ) : (
          <form
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
            onSubmit={(e) => {
              e.preventDefault()
              setSent(true)
            }}
          >
            <Field label="Nombre" htmlFor="nombre">
              <input
                id="nombre"
                name="nombre"
                type="text"
                required
                autoComplete="name"
                placeholder="Tu nombre"
                className={FIELD_CLASS}
              />
            </Field>

            <Field label="Correo" htmlFor="correo">
              <input
                id="correo"
                name="correo"
                type="email"
                required
                autoComplete="email"
                placeholder="tucorreo@empresa.com"
                className={FIELD_CLASS}
              />
            </Field>

            <Field label="Empresa" htmlFor="empresa">
              <input
                id="empresa"
                name="empresa"
                type="text"
                autoComplete="organization"
                placeholder="Nombre de tu empresa"
                className={FIELD_CLASS}
              />
            </Field>

            <Field label="Servicio de interés" htmlFor="servicio">
              <select
                id="servicio"
                name="servicio"
                value={servicio}
                onChange={(e) => setServicio(e.target.value)}
                className={FIELD_CLASS}
              >
                <option value="" disabled>
                  Elige una opción
                </option>
                {SERVICE_OPTIONS.map((s) => (
                  <option key={s} value={s} className="bg-ink text-white">
                    {s}
                  </option>
                ))}
              </select>
            </Field>

            <div className="md:col-span-2">
              <Field label="Mensaje" htmlFor="mensaje">
                <textarea
                  id="mensaje"
                  name="mensaje"
                  required
                  rows={5}
                  placeholder="Cuéntanos brevemente qué necesitas."
                  className={`${FIELD_CLASS} resize-none`}
                />
              </Field>
            </div>

            <div className="md:col-span-2 flex justify-center mt-2">
              <button
                type="submit"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-white text-black font-medium text-sm xl:text-base px-7 py-3.5 transition-all hover:bg-white/90 active:scale-[0.98]"
              >
                Enviar mensaje
                <ArrowUpRight
                  className="w-4 h-4 transition-transform group-hover:translate-x-[1px] group-hover:-translate-y-[1px]"
                  aria-hidden="true"
                />
              </button>
            </div>
          </form>
        )}
      </m.div>
    </section>
  )
}
