import * as React from "react";
import { cn } from "@/lib/utils";

/* ── the corridor ────────────────────────────────────────────────
 * Two rails of cards ride from far behind the screen toward the
 * viewer. Perspective alone does the work that looks like two
 * animations: as a card's z grows it gets bigger *and* its screen x
 * sweeps outward from the vanishing point, because the projection
 * scales position and size by the same factor.
 *
 * Three things shape it, and each one fixes a specific artefact:
 *
 * 1. Depth is authored as *apparent size*, geometrically — each card
 *    is a constant ratio bigger than the one behind it, all the way
 *    out. Spacing a straight z-range evenly instead makes the near
 *    cards tear apart from each other as the projection blows up.
 * 2. The rails open hard in the first stretch and then hold
 *    (`fan` > 1). That opening cancels the — still slow — growth back
 *    there, so the ribbon leaves the centre as a flat band, bends
 *    once, and only then runs out on the diagonal. Parallel rails
 *    project to a straight cone with no bend at all.
 * 3. Neither end of the loop is ever on screen. A card dies with its
 *    inner edge past 50cqw, clear of the container's edge. And it is
 *    born *across* the axis — `railBirth` is negative, so the newest
 *    card starts on the far side and sweeps back through the centre.
 *    That plugs the throat: the axis stays covered at every instant,
 *    and a newborn lands behind cards that already cover it, so it
 *    needs no fade in. Birthing on its own side instead leaves a hole
 *    at dead centre that blinks open once every cycle.
 *
 * Every length is in `cqw` — a percentage of the container's width —
 * so the whole corridor keeps its proportions at any size. The
 * defaults were fitted numerically against a reference recording's
 * card-height and edge-position profile, not eyeballed.
 *
 * NOTA REYLOGIX: el original traia "use client" en la primera linea.
 * Se quito al integrarlo: es un marcador de React Server Components de
 * Next, aqui components.json declara rsc:false y Rollup avisa de
 * "Module level directives cause errors when bundled" al empaquetar.
 * ─────────────────────────────────────────────────────────────── */

/**
 * Geometry of the corridor. Every length is `cqw`, a percentage of the
 * container's width, so the shape is resolution-independent.
 *
 * These interact: the ribbon only stays solid while consecutive cards
 * overlap, which needs `exitHeight / birthHeight` spread over enough
 * `cards`. Raising `exitHeight`, dropping `cards`, or pulling `railExit`
 * in all push toward a visible tear near the frame edge.
 */
export type CorridorPath = {
  /** Strength of the projection. Lower is a wider-angle, more dramatic rush. @default 30 */
  perspective?: number;
  /** Card width in world units. @default 18 */
  cardWidth?: number;
  /** Card height in world units. @default 25 */
  cardHeight?: number;
  /** Corner radius applied to each card. @default 0.4 */
  cardRadius?: number;
  /** On-screen card height at the waist, where a card is born. @default 2.6 */
  birthHeight?: number;
  /** On-screen card height as a card leaves the frame. @default 46 */
  exitHeight?: number;
  /**
   * Lateral offset at birth. Negative starts the card across the axis so the
   * centre never opens up — see note 3 above. @default -11
   */
  railBirth?: number;
  /** Lateral offset once the rails have finished opening. @default 44 */
  railExit?: number;
  /** How front-loaded the opening is. >1 opens early then holds. @default 3.3 */
  fan?: number;
  /** Y-rotation at birth, degrees. @default 6 */
  turnBirth?: number;
  /** Y-rotation at exit, degrees. @default 28 */
  turnExit?: number;
  /** Keyframe stops used to trace the curve. Raise only if motion looks faceted. @default 24 */
  stops?: number;
};

const PATH: Required<CorridorPath> = {
  perspective: 30,
  cardWidth: 18,
  cardHeight: 25,
  cardRadius: 0.4,
  birthHeight: 2.6,
  exitHeight: 46,
  railBirth: -11,
  railExit: 44,
  fan: 3.3,
  turnBirth: 6,
  turnExit: 28,
  stops: 24,
};

/**
 * Position of a card at point `u` of the run (0 = born, 1 = leaving).
 *
 * MODIFICACION REYLOGIX: esto estaba en linea dentro de `keyframes`. Se saco a
 * funcion propia para que los keyframes y la posicion estatica que usa
 * `prefers-reduced-motion` (ver abajo) no puedan divergir nunca.
 */
function transformAt(dir: 1 | -1, u: number, p: Required<CorridorPath>) {
  // Geometric in apparent size, so consecutive cards keep a constant size
  // ratio and the ribbon stays solid at both ends.
  const scale =
    (p.birthHeight / p.cardHeight) * Math.pow(p.exitHeight / p.birthHeight, u);
  const z = p.perspective * (1 - 1 / scale);
  const rail =
    p.railExit - (p.railExit - p.railBirth) * Math.pow(1 - u, p.fan);
  const turn = p.turnBirth + (p.turnExit - p.turnBirth) * u;
  return `translate3d(${(dir * rail).toFixed(2)}cqw,0,${z.toFixed(
    2,
  )}cqw) rotateY(${(-dir * turn).toFixed(2)}deg)`;
}

/** Sample the path once so the CSS keyframes trace the real curve. */
function keyframes(dir: 1 | -1, name: string, p: Required<CorridorPath>) {
  const steps: string[] = [];
  for (let s = 0; s <= p.stops; s++) {
    const u = s / p.stops;
    steps.push(`${(u * 100).toFixed(2)}%{transform:${transformAt(dir, u, p)}}`);
  }
  return `@keyframes ${name}{${steps.join("")}}`;
}

export type StreamImage = {
  src: string;
  /** Only used if you drop the decorative treatment; the corridor is aria-hidden. */
  alt?: string;
};

export type ImageStreamHeroProps = {
  /**
   * Images cycled onto the rails. Both rails run the same sequence, so the
   * corridor reads as one mirrored stream. Fewer than `cards` simply repeat.
   */
  images: StreamImage[];
  /**
   * Cards on each rail at once. More cards means a denser corridor, not a
   * faster one — spacing is derived from this and `speed`. Drop it far below
   * the default and consecutive cards grow too fast to stay overlapped near
   * the exit, which tears a gap in the ribbon.
   * @default 9
   */
  cards?: number;
  /**
   * Seconds for one card to travel the whole corridor.
   * @default 18
   */
  speed?: number;
  /**
   * Vertical placement of the corridor's axis, as a percentage of height.
   * @default 55
   */
  axis?: number;
  /**
   * MODIFICACION REYLOGIX. Congela el corredor: las tarjetas se colocan en su
   * sitio del recorrido y ahi se quedan.
   *
   * No es "la animacion pausada". No se emiten keyframes ni se declara
   * animation, asi que no hay nada que componer fotograma a fotograma y el
   * bloque deja de competir con el video de fondo del sitio. Reaprovecha la
   * misma posicion estatica que ya usaba prefers-reduced-motion.
   *
   * @default false
   */
  still?: boolean;
  /**
   * MODIFICACION REYLOGIX. Con `true` —el comportamiento original— los dos
   * railes recorren la misma secuencia y el corredor se lee como un flujo
   * espejado. Con `false` el rail izquierdo arranca media vuelta desfasado.
   *
   * Importa sobre todo con `still`: quieto, ver la misma foto a izquierda y
   * derecha a la misma profundidad se lee como un duplicado, no como simetria.
   *
   * @default true
   */
  mirror?: boolean;
  /** Override any part of the corridor geometry. Merged over the defaults. */
  path?: CorridorPath;
  /** Content rendered above the corridor. */
  children?: React.ReactNode;
  className?: string;
};

export function ImageStreamHero({
  images,
  cards = 9,
  speed = 18,
  axis = 55,
  still = false,
  mirror = true,
  path,
  children,
  className,
  ...props
}: React.ComponentProps<"div"> & ImageStreamHeroProps) {
  const id = React.useId().replace(/[^a-zA-Z0-9]/g, "");
  const right = `ish-r-${id}`;
  const left = `ish-l-${id}`;
  const card = `ish-c-${id}`;

  const p = React.useMemo(() => ({ ...PATH, ...path }), [path]);

  const css = React.useMemo(() => {
    /*
     * MODIFICACION REYLOGIX: con `still` no se emite nada de CSS. Los keyframes
     * son 25 paradas por rail y no se usarian, y la regla de movimiento
     * reducido no tiene sentido cuando ya no hay animacion que apagar.
     */
    if (still) return "";

    /*
     * MODIFICACION REYLOGIX. El original hacia aqui
     * `animation-play-state:paused`, con este razonamiento: "pausar en vez de
     * desactivar mantiene el corredor entero, porque cada tarjeta ya esta caida
     * a media trayectoria por su delay negativo, asi que congela como un
     * fotograma acabado en vez de colapsar sobre el eje".
     *
     * No se cumple. Medido en Chrome: si la animacion arranca pausada, el delay
     * negativo no llega a aplicarse, asi que todas las tarjetas se quedan en
     * u=0 —el punto de nacimiento, diminuto y en el centro— y el corredor
     * colapsa exactamente como el comentario decia evitar. Quien navegaba con
     * movimiento reducido veia un recuadro vacio.
     *
     * Se desactiva la animacion en vez de pausarla, y la posicion la da el
     * `transform` en linea de cada tarjeta (ver mas abajo), que es el mismo
     * punto del recorrido que le tocaria por su delay. `!important` porque la
     * animacion se declara en el atributo style y si no ganaria ella.
     */
    return (
      `${keyframes(1, right, p)}${keyframes(-1, left, p)}` +
      `@media(prefers-reduced-motion:reduce){.${card}{animation:none !important}}`
    );
  }, [right, left, card, p, still]);

  return (
    <div
      className={cn("relative overflow-hidden", className)}
      {...props}
      style={{ containerType: "inline-size", ...props.style }}
    >
      <style>{css}</style>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          perspective: `${p.perspective}cqw`,
          perspectiveOrigin: `50% ${axis}%`,
        }}
      >
        <div
          className="absolute inset-0"
          style={{ transformStyle: "preserve-3d" }}
        >
          {[right, left].map((name, rail) =>
            Array.from({ length: cards }, (_, i) => {
              const total = Math.max(images.length, 1);
              const dir: 1 | -1 = rail === 0 ? 1 : -1;
              /*
               * Both rails walk the same sequence, so the left side mirrors
               * the right at every depth.
               *
               * MODIFICACION REYLOGIX: con `mirror={false}` el rail izquierdo
               * arranca media vuelta desfasado, para que las dos tarjetas
               * grandes que se ven a la vez no sean la misma foto.
               */
              const shift = mirror || rail === 0 ? 0 : Math.floor(total / 2);
              const img = images[(i + shift) % total];
              return (
                <div
                  key={`${name}-${i}`}
                  className={cn(card, "absolute overflow-hidden")}
                  style={{
                    left: "50%",
                    top: `${axis}%`,
                    width: `${p.cardWidth}cqw`,
                    height: `${p.cardHeight}cqw`,
                    marginLeft: `${-p.cardWidth / 2}cqw`,
                    marginTop: `${-p.cardHeight / 2}cqw`,
                    borderRadius: `${p.cardRadius}cqw`,
                    /*
                     * MODIFICACION REYLOGIX: posicion estatica en el mismo
                     * punto del recorrido que le da su delay. Solo se ve con
                     * prefers-reduced-motion, donde la animacion se apaga; con
                     * la animacion corriendo esta linea es inerte, porque en la
                     * cascada las animaciones ganan al atributo style.
                     */
                    transform: transformAt(dir, i / cards, p),
                    ...(still
                      ? null
                      : {
                          animation: `${name} ${speed}s linear infinite`,
                          // Negative delay drops each card mid-flight, so the
                          // corridor is already full on the first frame.
                          animationDelay: `${-(i * speed) / cards}s`,
                        }),
                    backfaceVisibility: "hidden",
                  }}
                >
                  {img ? (
                    <img
                      src={img.src}
                      alt={img.alt ?? ""}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover"
                      draggable={false}
                    />
                  ) : null}
                </div>
              );
            }),
          )}
        </div>
      </div>

      {children}
    </div>
  );
}

export default ImageStreamHero;
