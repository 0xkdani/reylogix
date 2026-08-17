/**
 * Imágenes originales de sites.google.com/view/reylogix.
 *
 * NO son fotografías: son gráficos de línea blanca sobre fondo negro. Los de
 * servicios traen el título rasterizado dentro de la propia imagen, por eso se
 * recortan al icono (ver ExpressServices) y el título va como texto real.
 *
 * `local`  -> archivo en public/img (lo genera scripts/fetch-images.ps1)
 * `remote` -> URL de Google Sites, respaldo mientras el archivo local no exista.
 *
 * Los tokens `sitesv/...` caducan. Reejecutar hasta completar:
 *   powershell -ExecutionPolicy Bypass -File scripts\fetch-images.ps1
 */

export type SiteImageSrc = { local: string; remote: string }

const img = (n: string, remote: string): SiteImageSrc => ({
  local: `/img/${n}.jpg`,
  remote,
})

/**
 * Para los que la UI carga de verdad. El .jpg/.png sigue en public/img —es lo
 * que escriben fetch-images.ps1 y knockout-bg.ps1, y es la copia de origen—,
 * pero al navegador se le sirve el WebP: los cinco retratos y el collage pasan
 * de 460 KB a 210 KB juntos, un 55% menos, sin diferencia visible.
 *
 * El collage va en WebP sin pérdida porque es un gráfico de línea con
 * transparencia: ahí lossless sale más pequeño (92 KB) que con pérdida (94 KB).
 *
 * Para regenerarlos tras un fetch nuevo, ver scripts/to-webp.py.
 */
const imgWebp = (n: string, remote: string): SiteImageSrc => ({
  local: `/img/${n}.webp`,
  remote,
})

/** Fuerza JPEG y ancho fijo; sin -rj los GIF originales pesan decenas de MB. */
const RJ = '=w1600-rj'

export const IMAGES = {
  /**
   * [14] Collage de iconos de operación de la página fuente.
   *
   * Ya NO lo usa la UI, por el mismo motivo que los iconos de Servicios: son
   * clipart de estilos dispares rasterizados en un solo archivo, sin el trazo
   * de la marca y sin poder separarse para acompañar a cada idea. Enfoque los
   * sustituyó por IconAnalysis / IconPrecision / IconInternational, que además
   * dan un punto de entrada a cada uno de los tres pilares del texto. Se
   * conserva la entrada como referencia de la fuente y porque
   * scripts/fetch-images.ps1 sigue descargando el original.
   *
   * Local apunta al recorte con transparencia, no al JPEG de la fuente: el
   * original trae fondo negro opaco y dentro de la tarjeta .liquid-glass tapaba
   * el video de fondo. La cadena es JPEG -> PNG recortado -> WebP:
   *   powershell -ExecutionPolicy Bypass -File scripts\knockout-bg.ps1 enfoque-collage
   *   python scripts\to-webp.py
   * El respaldo remoto sigue siendo el JPEG con fondo, que es lo que hay.
   */
  enfoqueCollage: imgWebp(
    'enfoque-collage',
    'https://lh3.googleusercontent.com/sitesv/AG8ngQVwNP0rAYNVbO4iA35y1jkRqZ5tZmdc54X2O4BovhXNrlc6na2jhKiHpSZfV381n_ME23MuBu6RVZTwbnA-S4ZhCXWmi6U-aHQf2OwzYle1lVcOqKEgcqdA6f-PJ-ju85BKM2Kc09xun5IS4ZTzi6rTMpuv9nOCKFSOVqrh_t9nhu8m28v_Br9_ubFk' + RJ,
  ),

  /**
   * [08]-[11] Iconos de los cuatro Servicios Express, en orden de la página.
   * Ya NO los usa la UI: las tarjetas dibujan iconos SVG propios (ver
   * components/ServiceIcons.tsx) porque estos traen el título rasterizado y
   * había que recortarlos con zoom, lo que los dejaba borrosos. Se conservan
   * como referencia de la fuente y porque scripts/fetch-images.ps1 los descarga.
   */
  servicioCostos: img(
    'servicio-costos',
    'https://lh3.googleusercontent.com/sitesv/AG8ngQU-0UpHYfheqivZbfgMWi7t4ZU8FKgYomfRIMbb04JdMJ16N0iiVVaNAuVgAiXz5uktjnbZWSwMPVEJ_cVehJupp6XrDixl5V_K6aH0G13nRpvHhm6sgoMutFya7RFjzR8BrZ9xXczqMuvXsPw_vzmw_uu44J9Uh52SX-He7DzdGMlERywgnclGydRWDPg' + RJ,
  ),
  servicioAduanal: img(
    'servicio-aduanal',
    'https://lh3.googleusercontent.com/sitesv/AG8ngQXizNxWvshUNgsd-TmGPXly45yJmeS-j1I9w9OddNxtnJKA2JlFzvQlGHxll-28_0YgfVLXitMxjsK2vGL-Wk6akfb6p01WtvHsUelHPQF4Co-NtnpIHnzHuzH2LoY2DxhxKBsciaMv3rxe4TkZ2xYn5h7-HhHIMrErY5E5A2N0qgwoenSc6kBXto3vp_E' + RJ,
  ),
  servicioDiagnostico: img(
    'servicio-diagnostico',
    'https://lh3.googleusercontent.com/sitesv/AG8ngQWiAyzP8ipP4tqAVHOoF_eBeyyKwEpFvhMEQciwxCZwc156pik4EbfNgYwIbxHrvjDriJfaqKMDxJW-vHwsuVkvDQA4rfotMvVtU3B08je62UdP2kJ0HajufbpfodjcwuBt6kSJeeHSJCT1QfEN7PVq9u5M_b4V_8SBKVWSWFriP5xw2WnNsmqOzqhW' + RJ,
  ),
  servicioProcesos: img(
    'servicio-procesos',
    'https://lh3.googleusercontent.com/sitesv/AG8ngQX3Fw0BmN52nQC0_4PTagoX62D9Ewz-LlP-xM96-A8duYbPrL28rnr0JorO9NmuHAMbWNkn8XtrGBN7zOQHzwG_EViP6aiqyTPwkPl9c4ZOsjhH9lDcFYJRUeq6tvJrnxWBdG1azYNiYEAz4trDsfRGCDfNHYR4yvz4sgLbH0j3nmmLibAQ4oiIb-QL-DE' + RJ,
  ),

  /**
   * [16] Logotipo BLACKLINE con reflejo. Ya NO lo usa la UI: se dibuja como
   * texto (.c3-wordmark) porque el JPEG traía un fondo negro opaco que recortaba
   * el video de fondo. Se conserva como referencia de la fuente.
   */
  blacklineWordmark: img(
    'blackline-wordmark',
    'https://lh3.googleusercontent.com/sitesv/AG8ngQVWMKiYgmmQYUGJf-ukLhYsnzqXPAdr-q-kuIlqrAyqGWF-9J1qOs-QJ0mCyioTcdM4u-uNVAn0LKXYJ4Aj7yCcRsKXqeqGlK2j21eUi2bbqBoab5ILR2ec7b7_g_MOmm1fSpRiE8rae0uhbJN7He3fTSMGzt8StWVR5FLthD8AgxppdlQw1_Hhgu' + RJ,
  ),

  /**
   * [25],[27],[28],[29] Retratos de "Casos de éxito".
   *
   * Las claves describen LA FOTO, no a quién se le asigna. El 15-ago-2026 el
   * cliente reasignó los retratos en cascada (ver QUOTES en Testimonials.tsx);
   * de paso quedó arreglado que el de Jhonatan fuera de una mujer y el de
   * Valentina de un hombre. Nombrarlas por persona volvería a quedar desfasado
   * en cuanto haya otro cambio.
   *
   * Los NOMBRES DE ARCHIVO sí siguen siendo caso-<persona>.jpg: son los que
   * escribe scripts/fetch-images.ps1 desde los índices 25/27/28/29 de la
   * fuente, así que renombrarlos aquí duraría hasta el siguiente fetch.
   */
  retratoTrajeAzul: imgWebp(
    'caso-rodrigo',
    'https://lh3.googleusercontent.com/sitesv/AG8ngQVXlGf8icu0rlgr8wwbZCFyb5R1coO8iLEoLije9broEu5t6LFwXrYJSI5rFbU4Xgf5wawXXCpzS1Qngv2ViasAlOWawgfQerHaeTgKQx_1mEAcRN7x4sympWc8tQItgz18GPlsGT7KVnEWRmocoIG5VtRRdmPr9UNG3yFE8V7rcNEn5UqaEMctlmLCvE-JUZ7esJY9tWBFewHzzs_b2CjG4ViCfnP1zT1IpbyBDa0' + RJ,
  ),
  retratoTrajeOscuro: imgWebp(
    'caso-julian',
    'https://lh3.googleusercontent.com/sitesv/AG8ngQUDjONPGSEHB_kEZryFoSHixmSgz-01jQ3u5hg3kMTLtp5jPxFLHc15CNDPgIHrVkE_QVWRVpWgH2dxmm1UXm8uny2nsoZ6qH_H9lYvP9ZBpU68yV8texXYLSEYk3N4nOXUhTYnBo9XjwuTjmr8N7OAC7_lCl2TvRzamnVWAakxYPjg2zsQ3tgSlIghqPmjpSN4PnjKTJZ5A-czJV8ZBuf99FXkHv4W_Z6puCpxGLw' + RJ,
  ),
  retratoBlazerNegro: imgWebp(
    'caso-jhonatan',
    'https://lh3.googleusercontent.com/sitesv/AG8ngQUwZ8pFxYY1bf9uCcSegqX6fI7IAVEcKEJ8XVW2RoXL991juo2u9pvGFbsonzOnZl9QlhMXRveOvJoAzLn_aC5_YH8lt7bLFhujerWYnwEnsieiA02IzJ-UqVj5c8wEZm6J03dlPa4rGAw_VWAsUTW0XsfJ4IidlSjNbud1Q6NDerhst7RYKlyYJIovbmlZG7aKmmCYOjnZPMCMC4DbWV4ZfcVzkuWUgIKWJg' + RJ,
  ),
  retratoTrajeVerde: imgWebp(
    'caso-valentina',
    'https://lh3.googleusercontent.com/sitesv/AG8ngQVfahdLf_U9_FHkbUwKmLF0Yyr9EIoRD0bH_BDdSone6y6ON60qJb9ez9RVmHV4fxJkcn9ZXl3RFInKugbdXk30ab_6PWQBDBxKJJIbERzOCvLMHT4iTvDX_qp9pTzWAyZDZMJbXVPD7uPpIXJKMJ8TD-wleCsI2H2R_Rfskp_qyOJTjeUtU-SoZXHLDViyRxUSIEnbRF-xxxXj-Occ_ili7obNKPvaJuEbXj3p-QM' + RJ,
  ),

  /**
   * El quinto retrato no viene de Google Sites: lo entregó el cliente
   * (Pictures/Reylogix/Rodrigo-Espinoza.png, 1024 px, 583 KB). Reescalado a
   * 880 px y guardado como los otros cuatro: el JPEG de origen en el repo y el
   * WebP de 16 KB para el navegador. El PNG original eran 36 veces más para un
   * avatar de 48 px.
   *
   * `remote` va vacío a propósito: no hay copia en la fuente que pueda servir
   * de respaldo, y fetch-images.ps1 no lo toca.
   */
  retratoTrajeBlanco: { local: '/img/retrato-traje-blanco.webp', remote: '' },
} satisfies Record<string, SiteImageSrc>

/* ------------------------------------------------------------------ */
/* Corredor de Blackline                                               */
/* ------------------------------------------------------------------ */

/**
 * Las nueve imágenes del corredor 3D de /blackline (ui/image-stream-hero).
 *
 * Son NUEVE y no diez ni doce por una razón del componente, no estética: los
 * dos raíles recorren `images[i % images.length]` con `i < cards`, así que con
 * `cards={9}` una décima no llegaría a pintarse nunca. En la demo original del
 * componente, 3 de sus 12 imágenes son código muerto por esto mismo.
 *
 * El orden alterna logística y dato financiero a propósito: el corredor pinta
 * índices consecutivos a profundidades consecutivas, así que alternando se ve
 * la mezcla en todo momento en vez de por tandas.
 *
 * No usan SiteImageSrc: el componente recibe `src` como cadena y no tiene el
 * respaldo `onError` de SiteImage. Si falta el archivo, la tarjeta queda negra
 * y el corredor sigue funcionando.
 *
 * Procedencia — todas de Unsplash con licencia gratuita, verificadas una a una
 * porque la búsqueda mezcla libres con Unsplash+ de pago (de cada tres
 * candidatas, aproximadamente una era premium). La licencia no exige
 * atribución; se anota igual, como se hizo con las de Google Sites.
 * Las descarga scripts/fetch-stream-images.ps1 ya recortadas a retrato.
 *
 *   01  Thomas Nolte       Gruas de contenedores, Bremerhaven
 *   02  Maxim Hopman       Grafico de velas
 *   03  Stock Birken       Buque de carga, Hamburgo
 *   04  Max Petrunin       Lineas y puntos azules sobre negro
 *   05  Tsuyoshi Kozu      Avion sobre puerto industrial
 *   06  Ivan Baton         Distrito de edificios de noche
 *   07  Albert Stoynov     Puerto de Vancouver
 *   08  Phil Desforges     Distrito frente al agua, Montreal
 *   09  Razvan Mirel       Portacontenedores Margrethe Maersk, Aarhus
 *
 * El `alt` va vacío a propósito: el corredor entero es `aria-hidden` porque es
 * decorativo, así que describir cada foto solo añadiría ruido para quien navega
 * con lector de pantalla. El texto real de la sección va aparte, encima.
 */
export const STREAM = Array.from({ length: 9 }, (_, i) => ({
  src: `/img/stream-${String(i + 1).padStart(2, '0')}.webp`,
}))
