/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],

  /*
   * Estrategia por clase, y el <html> lleva `class="dark"` fijo en index.html.
   *
   * Por defecto Tailwind resuelve `dark:` con prefers-color-scheme, así que los
   * componentes de shadcn que traen variantes `dark:` (features-8 tiene una
   * docena) solo se verían bien si el sistema del visitante está en oscuro.
   * Este sitio es oscuro siempre, así que la variante tiene que estar activa
   * siempre y no depender del ajuste del usuario.
   */
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Paleta Reylogix: acromática con sesgo acero, derivada de los propios
        // assets de la marca (wordmark y gráficos: línea blanca sobre negro).
        ink: '#0A0C0F',
        graphite: '#1E2B36',
        steel: '#6E8A9C',
        pewter: '#B8CBD6',
        flash: '#E8F0F4',
        // Rol de acento de la plantilla, reasignado al acero.
        brand: '#6E8A9C',

        /*
         * Tokens semánticos de shadcn. Van en ESTE mismo objeto: una segunda
         * clave `colors` dentro de `extend` no se fusiona, sustituye, y se
         * llevaría por delante la paleta de arriba.
         *
         * Los componentes de shadcn no nombran colores, nombran roles
         * (background / foreground / muted) y los resuelven contra variables
         * CSS. Se mapean a la paleta oscura de Reylogix en src/index.css, así
         * que un componente traído de fuera se ve del sitio sin tocar su código.
         */
        border: 'hsl(var(--border))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },

        /*
         * features-8 usa `text-primary-600` / `text-primary-500` y
         * `text-primary/15`. La paleta por defecto de shadcn solo trae
         * `primary` y `primary-foreground`, así que sin estas tres claves esos
         * trazos SVG se quedarían sin color. Se mapean al acero de la marca.
         */
        primary: {
          DEFAULT: '#6E8A9C',
          500: '#8FA9B8',
          600: '#6E8A9C',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },

      /*
       * `text-md` NO existe en Tailwind: la escala va sm -> base -> lg. El
       * componente importado la usa tres veces (descripción, nombre del autor y
       * el sm:text-md de la cita), así que sin esto son clases muertas y esos
       * textos heredan el tamaño en silencio. Se define como alias de `base`,
       * que es lo que el componente da por hecho.
       */
      fontSize: {
        md: ['1rem', { lineHeight: '1.5rem' }],
      },

      /*
       * `border-t` sin color usaría currentColor, que sobre este fondo sale
       * blanco puro. Todos los bordes que ya existían en el sitio declaran su
       * color, así que cambiar solo el valor por defecto no toca nada previo.
       */
      borderColor: {
        DEFAULT: 'hsl(var(--border))',
      },

      maxWidth: {
        container: '1280px',
      },

      animation: {
        marquee: 'marquee var(--duration) linear infinite',
      },

      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(calc(-100% - var(--gap)))' },
        },
      },
    },
  },
  plugins: [],
}
