import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Helper estándar de shadcn. `clsx` resuelve condicionales y arrays;
 * `twMerge` descarta las clases de Tailwind que entren en conflicto dejando
 * ganar a la última, que es lo que permite sobreescribir estilos de un
 * componente pasándole `className` desde fuera.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
