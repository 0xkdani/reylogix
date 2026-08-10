import type * as React from 'react'
import { cn } from '@/lib/utils'
import { TestimonialCard, type TestimonialAuthor } from '@/components/ui/testimonial-card'

interface TestimonialsSectionProps {
  /**
   * Opcionales, a diferencia del componente original.
   *
   * Si se omiten, el encabezado propio no se monta y la sección queda solo con
   * la marquesina. Es lo que permite poner delante el SectionHeader del sitio
   * —con su eyebrow, su escala tipográfica y su alineación— en lugar de
   * mantener dos jerarquías de titular distintas en la misma página.
   */
  title?: string
  description?: string
  testimonials: Array<{
    author: TestimonialAuthor
    text: string
    href?: string
  }>
  /**
   * Duración de una vuelta completa. Menos tiempo = más rápido.
   *
   * Va como prop y se aplica por `style` porque Tailwind no puede generar un
   * valor arbitrario a partir de una variable: la clase `[--duration:40s]` del
   * original queda fija en el componente y no se puede ajustar desde fuera.
   */
  duration?: string
  className?: string
}

export function TestimonialsSection({
  title,
  description,
  testimonials,
  duration = '40s',
  className,
}: TestimonialsSectionProps) {
  const hasHeader = Boolean(title || description)

  return (
    <section
      className={cn('bg-background text-foreground', 'py-12 sm:py-24 md:py-32 px-0', className)}
    >
      <div className="mx-auto flex max-w-container flex-col items-center gap-4 text-center sm:gap-16">
        {hasHeader ? (
          <div className="flex flex-col items-center gap-4 px-4 sm:gap-8">
            <h2 className="max-w-[720px] text-3xl font-semibold leading-tight sm:text-5xl sm:leading-tight">
              {title}
            </h2>
            <p className="text-md max-w-[600px] font-medium text-muted-foreground sm:text-xl">
              {description}
            </p>
          </div>
        ) : null}

        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
          <div
            className="group flex overflow-hidden p-2 [--gap:1rem] [gap:var(--gap)] flex-row"
            style={{ '--duration': duration } as React.CSSProperties}
          >
            {/*
             * La tira va DOS veces, y esa es la única diferencia respecto al
             * snippet original.
             *
             * El keyframe desplaza cada tira `-100% - var(--gap)`, es decir su
             * propio ancho completo. Con una sola tira, al final del ciclo ha
             * salido entera del contenedor y deja el hueco vacío antes del salto
             * de vuelta. Con la segunda, cuando la primera acaba de salir la
             * segunda ocupa exactamente su posición inicial, así que el bucle no
             * tiene costura. Es el patrón con el que está pensado el keyframe.
             */}
            {[...Array(2)].map((_, stripIndex) => (
              <div
                key={stripIndex}
                aria-hidden={stripIndex > 0}
                className="flex shrink-0 justify-around [gap:var(--gap)] animate-marquee flex-row group-hover:[animation-play-state:paused]"
              >
                {[...Array(4)].map((_, setIndex) =>
                  testimonials.map((testimonial, i) => (
                    <TestimonialCard key={`${setIndex}-${i}`} {...testimonial} />
                  )),
                )}
              </div>
            ))}
          </div>

          <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-1/3 bg-gradient-to-r from-background sm:block" />
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/3 bg-gradient-to-l from-background sm:block" />
        </div>
      </div>
    </section>
  )
}
