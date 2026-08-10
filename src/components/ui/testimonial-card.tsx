import { cn } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export interface TestimonialAuthor {
  name: string
  handle: string
  avatar: string
}

export interface TestimonialCardProps {
  author: TestimonialAuthor
  text: string
  href?: string
  className?: string
}

export function TestimonialCard({ author, text, href, className }: TestimonialCardProps) {
  const Card = href ? 'a' : 'div'

  /*
   * Añadido sobre el componente original: iniciales de respaldo. Uno de los
   * perfiles de Casos de éxito no tiene retrato en la fuente, y sin fallback
   * Radix deja el hueco del avatar vacío.
   */
  const initials = author.name
    .split(' ')
    .slice(0, 2)
    .map((word) => word[0])
    .join('')

  return (
    <Card
      {...(href ? { href } : {})}
      className={cn(
        'flex flex-col rounded-lg border-t',
        'bg-gradient-to-b from-muted/50 to-muted/10',
        'p-4 text-start sm:p-6',
        'hover:from-muted/60 hover:to-muted/20',
        'max-w-[320px] sm:max-w-[320px]',
        'transition-colors duration-300',
        className,
      )}
    >
      <div className="flex items-center gap-3">
        <Avatar className="h-12 w-12">
          <AvatarImage src={author.avatar} alt={author.name} />
          <AvatarFallback className="text-sm font-semibold text-foreground">
            {initials}
          </AvatarFallback>
        </Avatar>
        {/* Escala tipográfica del sitio, no la del snippet: mismos tamaños,
            interlineado y saltos de breakpoint que las tarjetas de Servicios y
            Blackline, para que el bloque no cante al lado de ellas. */}
        <div className="flex flex-col items-start">
          <h3 className="text-sm font-semibold leading-none xl:text-base">{author.name}</h3>
          <p className="mt-1 text-xs text-muted-foreground xl:text-sm">{author.handle}</p>
        </div>
      </div>
      <p className="mt-4 text-sm leading-[1.65] text-muted-foreground xl:text-[15px]">{text}</p>
    </Card>
  )
}
