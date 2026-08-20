# Reylogix

Landing de Reylogix (consultoría logística), migrada desde un sitio de Google
Sites (`sites.google.com/view/reylogix`) a React. React + Vite + TypeScript +
Tailwind, con primitivas de shadcn/ui, `motion` (Framer Motion) y React
Router. Sin backend: los leads van a un formulario propio en Home
(`src/components/Contact.tsx`) que hoy no persiste nada (ver TODO en
`src/site.ts` sobre `FORM_URL`/prellenado).

## Comandos

- `npm run dev` — servidor de desarrollo (Vite).
- `npm run build` — `tsc --noEmit && vite build`. El typecheck es parte del
  build; no hay un script de lint aparte.
- `npm run preview` — sirve el build de `dist/`.
- `npm run perf` / `npm run perf:desktop` — corren `scripts/lighthouse.ps1`
  (PowerShell) contra el build; los reportes caen en `.lighthouse/` (ignorado
  por git y por el watcher de Vite, ver `vite.config.ts`).

## Arquitectura

- `src/App.tsx` es el punto donde vive casi toda la lógica transversal: el
  fondo animado global (`<BackgroundGlow />`), el filtro SVG de ruido
  (`#c3-noise`), las rutas y el `LazyMotion`. Está fuertemente comentado —
  leerlo primero explica el resto del sitio.
- Rutas: `/` (Home: Hero + Sectors + Contact, va en el bundle inicial) y
  `/enfoque`, `/servicios`, `/blackline`, `/casos` como `React.lazy`. Los
  hashes heredados del sitio de una sola página (`/#servicios`) redirigen vía
  `LEGACY_HASH_ROUTES` en `src/nav.ts`.
- `/inicio2`: la misma Home, pero con `<VideoBackground />` en vez de
  `<BackgroundGlow />` (ver `App.tsx`, `useVideoBackground = pathname ===
  '/inicio2'`). Existe para comparar una versión contra la otra sin tocar la
  ruta por defecto; no lleva enlace en Navbar/Footer, solo la URL directa.
- `/recap` (`src/components/Recap.tsx`): panel interno para revisar los
  envíos del formulario de contacto. **Solo el front, a propósito** — el
  login no valida contra nada real (cualquier correo/contraseña entra) y la
  tabla lee de `MOCK_SUBMISSIONS`, no del formulario real. El plan es
  Supabase Auth + una tabla real (la cuenta de Supabase ya existe y
  `@supabase/supabase-js` ya es dependencia), pero conectarlo necesita
  `VITE_SUPABASE_URL`/`VITE_SUPABASE_ANON_KEY` en un `.env` que todavía no
  existe en el repo. No lleva enlace en Navbar/Footer.
- `LazyMotion` + componentes `m.*` (no `motion.*`) para que el bundle solo
  cargue las features de motion que el sitio usa. El H1 del Hero es el
  elemento LCP y **no** usa motion: usa la utilidad CSS `.reveal-up`
  (`src/index.css`) para no esperar a que llegue ese chunk.
- `src/site.ts` centraliza marca y el formulario externo; `src/nav.ts`
  centraliza las rutas (Navbar y Footer leen de ahí para no desincronizarse).
- `src/images.ts`: cada imagen es `{ local, remote }` — `local` es el archivo
  en `public/img` (WebP siempre; el `.jpg`/`.png` que descarga
  `fetch-images.ps1` se queda como copia de origen, no se sirve) y `remote`
  el original de Google Sites como *fallback* (`onError` en
  `<SiteImage>`/`<Avatar>`, ver `src/components/primitives.tsx`). Los tokens
  `sitesv/...` de las URLs remotas caducan; regenerar con
  `scripts/fetch-images.ps1` / `scripts/to-webp.py` si hace falta. Todas las
  entradas de `IMAGES` van en WebP, incluidas las que ya no usa ningún
  componente (servicios, wordmark de Blackline) — se convierten igual para
  que ninguna imagen del repo quede sin optimizar, aunque no viajen al
  navegador hoy.

## Fondo animado (`src/components/BackgroundGlow.tsx`)

Es una cinta de luz azul en diagonal sobre negro, fija a pantalla completa
detrás de todo el sitio (mismo lugar en `App.tsx` donde antes vivía un
`<video>`). Hoy es 100% CSS/SVG: un `<path>` con gradiente (mismos stops que
`gradientStyle` en `primitives.tsx`, sin cian) y blur (`feGaussianBlur`),
animado con un `@keyframes` de `transform` en `src/index.css`
(`.bg-ribbon-drift`).

Antes era un `<video>` (`public/video/hero.mp4` / `hero-sm.mp4`). Se
reemplazó por dos razones:

1. **El clip era un degradado azul liso sobre negro — el peor caso para
   H.264.** Cualquier CRF lo bastante bajo para verse bien pesaba varios MB;
   a un CRF que valiera la pena en tamaño, el macrobloqueo/banding eran
   visibles a simple vista ("mala calidad"). Un gradiente CSS/SVG no se
   comprime con pérdida, así que el problema desaparece en vez de paliarse.
2. **`useReducedMotion` hacía que el `<video>` no se montara en absoluto**
   bajo movimiento reducido (correcto para accesibilidad, pero el fondo se
   quedaba negro liso para esos usuarios). La regla global de
   `prefers-reduced-motion` (`src/index.css`) ya fuerza `animation-duration`
   a `0.01ms` para todo el sitio, así que `BackgroundGlow` no necesita esa
   lógica: bajo esa preferencia simplemente se congela en su primer
   fotograma en vez de desaparecer.

De regalo: cero peso de red (el `<video>` más liviano de los dos pesaba
~200 KB en móvil y ~3 MB en escritorio, con una variante aparte por tamaño de
pantalla) y nitidez idéntica en cualquier densidad de píxeles.

El `<video>` original sigue viviendo en `src/components/VideoBackground.tsx`,
montado solo en `/inicio2` (ver Arquitectura) para poder comparar una versión
contra la otra. La fuente 1080p original (16.5 MB) sigue disponible en
CloudFront si hay que recomprimir desde cero — URL en el historial de git de
`src/App.tsx`, commit anterior a `782a2bb`.

## Cookies y consentimiento (`src/lib/cookieConsent.ts`, `src/components/CookieConsent.tsx`)

Banner de consentimiento con 4 categorías (esenciales/preferencias/analíticas/
marketing), guardado en una sola cookie (`reylogix-cookie-consent`, JSON,
365 días, `path=/; SameSite=Lax; Secure`) — no en `localStorage`, para que un
futuro backend pueda leerla también si hace falta. `src/lib/cookies.ts` trae
los helpers genéricos (`setCookie`/`getCookie`/`deleteCookie`); `cookieConsent.ts`
trae la lógica específica del sitio (`readConsent`, `saveConsent`,
`applyPreferences`).

- `applyPreferences(prefs)` borra `_ga`/`_gid`/`_ga_*` si `analytics` es falso
  y `_gcl_au`/`_fbp`/`_fbc` si `marketing` es falso, y dispara
  `document.dispatchEvent(new CustomEvent('cookie-consent-updated', {detail: prefs}))`
  para que un script de tracking futuro reaccione sin acoplarse a este
  componente. Se llama tanto al guardar una elección como al leer una ya
  guardada al cargar la página.
- El sitio **hoy no tiene Google Analytics, Google Ads ni Meta Pixel
  activos** — las categorías están listas para cuando se sumen, no porque ya
  existan. No afirmes lo contrario en el Aviso de Privacidad sin conectar
  antes el script real (ver esa página para el detalle de qué dice hoy).
- El banner se monta una sola vez en `App.tsx`, fuera de `<Routes>`, así que
  no necesita reinicializarse al navegar entre rutas: React Router no lo
  desmonta al cambiar de página.
- El acento visual usa `bg-brand`/`text-brand` (el acero de la marca, ya
  mapeado en `tailwind.config.js`), no un color nuevo — mantener eso si se
  retoca el componente.

## Anti-spam del formulario de contacto (`src/components/Contact.tsx`)

Honeypot (`company_address`, oculto con `absolute -left-[9999px]` +
`aria-hidden` + `tabIndex={-1}`, nunca `display:none` porque algunos bots ya
lo detectan) + tiempo mínimo de envío (`MIN_HUMAN_SUBMIT_MS`, 3 s desde que el
formulario aparece en pantalla). Sin reCAPTCHA ni fricción para la persona:
las dos señales son invisibles para un humano y casi imposibles de cumplir
para un envío automatizado.

Un envío que dispara cualquiera de las dos señales se descarta en silencio
(misma UI de "enviado" que un envío real, nunca un error) para no darle al
bot una pista de qué evadir. Hoy esto solo decide si `setSent(true)` es lo
único que pasa; el día que haya un backend real, la llamada de red que
persista el lead va **después** de este mismo gate, no antes — no dupliques
la validación en el cliente y el servidor por separado, es la misma pareja de
checks en los dos lados.

## Documentos legales (`src/components/legal/`)

Un componente por documento (`AvisoPrivacidad`, `TerminosCondiciones`,
`DatosCumplimiento`, `MarcaPropiedadIntelectual`), todos envueltos en
`LegalLayout.tsx` y cargados como ruta `React.lazy` bajo `/legales/*` (ver
`LEGAL_LINKS` en `src/nav.ts` y las rutas en `App.tsx`). El contenido de cada
uno es HTML semántico plano (`h2`/`h3`/`p`/`table`/`ul`, sin clases de
utilidad sueltas): la clase `prose prose-invert` de `LegalLayout` (plugin
`@tailwindcss/typography`, único lugar del sitio donde se usa) es quien
decide tipografía y espaciado. Añadir un documento nuevo es un archivo más en
esta carpeta + una entrada en `LEGAL_LINKS` + una ruta lazy, no tocar el
layout.

**Estos documentos tienen datos legales reales pendientes**, marcados en el
propio texto entre corchetes (`[RAZÓN SOCIAL]`, `[DOMICILIO FISCAL COMPLETO]`,
`[RFC]`, `[CORREO DE CONTACTO PARA DERECHOS ARCO]`, `[JURISDICCIÓN / PAÍS]`,
etc. — grep `\[[A-ZÁÉÍÓÚÑ ]\+\]` en `src/components/legal/` los encuentra
todos). No son un placeholder de desarrollo a limpiar después: son
información legal que no existe hoy en el repo (`site.ts` no tiene ni
teléfono ni correo) y que hay que completar con los datos reales de la
empresa antes de que estos documentos sean vinculantes.

## Convenciones

- Comentarios y mensajes de commit en español, centrados en el **por qué**
  (decisión, medición, incidente que lo motivó), no en qué hace el código.
  Este repo se apoya mucho en ese hábito — antes de tocar un bloque con
  comentario largo, léelo: casi siempre documenta un ajuste no obvio
  (contraste sobre el fondo animado, un CLS medido, un orden de reglas en el
  `.gitignore`) que es fácil deshacer por accidente.
- Paleta y tokens en `:root` (`src/index.css`): `--ink`/`--graphite`/
  `--steel`/`--pewter`/`--flash` es la escala acromática con sesgo acero de la
  marca (sin cian). Los tokens semánticos de shadcn (`--background`, `--muted`,
  etc.) están mapeados a esa misma paleta.
- `.text-plate` (halo de `text-shadow`) es el mecanismo para que texto suelto
  sobre el fondo animado mantenga contraste; úsalo en vez de un velo en caja
  para texto que no vive dentro de una tarjeta.
- `.liquid-glass` / `.liquid-glass--link` es la superficie de vidrio esmerilado
  compartida por tarjetas y placas sobre el fondo animado.
- El rendimiento (Lighthouse) es una prioridad explícita del proyecto: fuente
  autoalojada y precargada, code-splitting por ruta, LCP del Hero sin depender
  de JS. Antes de añadir algo que se monte de inmediato en Home o en el H1 del
  Hero, considera si debe ir diferido.
- Sin dependencias nuevas por comodidad: el único añadido fuera del stack
  original es `@tailwindcss/typography`, y solo porque los documentos legales
  necesitaban tipografía consistente sin escribir clases de utilidad a mano en
  cada párrafo. Antes de sumar una librería, revisa si ya hay una primitiva
  del sitio que resuelva lo mismo (ver `.liquid-glass`, `.text-plate`,
  `CategoryToggle` en `CookieConsent.tsx` como switch accesible propio en vez
  de un componente externo).
- No dejes lógica a medias pasando por terminada: si algo depende de una
  pieza que no existe todavía (un backend, un dato legal real, una API key),
  dilo explícito en un comentario junto al código — como ya hacía `site.ts`
  con `FORM_URL`/prellenado, o como quedaron marcados los `[CORCHETES]` de
  los documentos legales — en vez de dejarlo implícito o fingir que ya
  funciona. Valida en los bordes reales del sistema (lo que escribe el
  usuario, lo que puede fallar en un fetch), no de más por escenarios que el
  propio código ya garantiza que no pueden pasar.

## Git

- Rama de trabajo: `dev-jairo`; `main` es la rama para PRs.
- `.gitignore` ya cubre `node_modules`, `dist`, `.lighthouse/`, `.vercel`,
  `.env*` (con excepción de `.env.example`) y artefactos de editor/SO — no
  debería hacer falta tocarlo salvo que aparezca un nuevo tipo de artefacto.
