import type { ReactNode } from 'react'

/**
 * Envoltorio compartido por los documentos legales (src/components/legal/*).
 * El contenido de cada documento es HTML semántico plano (h2/h3/p/table/ul,
 * ver AvisoPrivacidad.tsx y hermanos) sin clases de utilidad sueltas: `prose`
 * (plugin @tailwindcss/typography, ver tailwind.config.js) es el único
 * responsable de tipografía, espaciado y color del cuerpo. Añadir un
 * documento nuevo es un archivo más en esta carpeta + una ruta en App.tsx,
 * no tocar este layout.
 */
export default function LegalLayout({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="shell py-20 md:py-28 min-h-screen">
      <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-center text-plate">
        {title}
      </h1>

      <div className="liquid-glass mt-12 mx-auto max-w-4xl rounded-3xl p-8 md:p-16">
        <div
          className="prose prose-invert max-w-none
            prose-headings:text-white prose-headings:font-semibold prose-headings:tracking-tight
            prose-p:text-white/70 prose-li:text-white/70 prose-strong:text-white
            prose-a:text-brand prose-a:no-underline hover:prose-a:underline
            prose-hr:border-white/10
            prose-thead:border-white/15 prose-th:text-white
            prose-td:text-white/70 prose-tr:border-white/10"
        >
          {children}
        </div>
      </div>
    </section>
  )
}
