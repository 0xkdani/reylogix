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

/** Para los que se recortan con scripts/knockout-bg.ps1 y quedan en PNG. */
const imgPng = (n: string, remote: string): SiteImageSrc => ({
  local: `/img/${n}.png`,
  remote,
})

/** Fuerza JPEG y ancho fijo; sin -rj los GIF originales pesan decenas de MB. */
const RJ = '=w1600-rj'

export const IMAGES = {
  /**
   * [14] Collage de iconos de operación. Sin texto: sirve como visual grande.
   * Local apunta al PNG recortado, no al JPEG: el original trae fondo negro
   * opaco y dentro de la tarjeta .liquid-glass tapaba el video de fondo.
   *   powershell -ExecutionPolicy Bypass -File scripts\knockout-bg.ps1 enfoque-collage
   * El respaldo remoto sigue siendo el JPEG con fondo, que es lo que hay.
   */
  enfoqueCollage: imgPng(
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
   * [25],[27],[28],[29] Retratos de Casos de éxito.
   * Luis Cantú no tiene retrato propio en la fuente: cae al monograma.
   */
  casoRodrigo: img(
    'caso-rodrigo',
    'https://lh3.googleusercontent.com/sitesv/AG8ngQVXlGf8icu0rlgr8wwbZCFyb5R1coO8iLEoLije9broEu5t6LFwXrYJSI5rFbU4Xgf5wawXXCpzS1Qngv2ViasAlOWawgfQerHaeTgKQx_1mEAcRN7x4sympWc8tQItgz18GPlsGT7KVnEWRmocoIG5VtRRdmPr9UNG3yFE8V7rcNEn5UqaEMctlmLCvE-JUZ7esJY9tWBFewHzzs_b2CjG4ViCfnP1zT1IpbyBDa0' + RJ,
  ),
  casoJulian: img(
    'caso-julian',
    'https://lh3.googleusercontent.com/sitesv/AG8ngQUDjONPGSEHB_kEZryFoSHixmSgz-01jQ3u5hg3kMTLtp5jPxFLHc15CNDPgIHrVkE_QVWRVpWgH2dxmm1UXm8uny2nsoZ6qH_H9lYvP9ZBpU68yV8texXYLSEYk3N4nOXUhTYnBo9XjwuTjmr8N7OAC7_lCl2TvRzamnVWAakxYPjg2zsQ3tgSlIghqPmjpSN4PnjKTJZ5A-czJV8ZBuf99FXkHv4W_Z6puCpxGLw' + RJ,
  ),
  casoJhonatan: img(
    'caso-jhonatan',
    'https://lh3.googleusercontent.com/sitesv/AG8ngQUwZ8pFxYY1bf9uCcSegqX6fI7IAVEcKEJ8XVW2RoXL991juo2u9pvGFbsonzOnZl9QlhMXRveOvJoAzLn_aC5_YH8lt7bLFhujerWYnwEnsieiA02IzJ-UqVj5c8wEZm6J03dlPa4rGAw_VWAsUTW0XsfJ4IidlSjNbud1Q6NDerhst7RYKlyYJIovbmlZG7aKmmCYOjnZPMCMC4DbWV4ZfcVzkuWUgIKWJg' + RJ,
  ),
  casoValentina: img(
    'caso-valentina',
    'https://lh3.googleusercontent.com/sitesv/AG8ngQVfahdLf_U9_FHkbUwKmLF0Yyr9EIoRD0bH_BDdSone6y6ON60qJb9ez9RVmHV4fxJkcn9ZXl3RFInKugbdXk30ab_6PWQBDBxKJJIbERzOCvLMHT4iTvDX_qp9pTzWAyZDZMJbXVPD7uPpIXJKMJ8TD-wleCsI2H2R_Rfskp_qyOJTjeUtU-SoZXHLDViyRxUSIEnbRF-xxxXj-Occ_ili7obNKPvaJuEbXj3p-QM' + RJ,
  ),
} satisfies Record<string, SiteImageSrc>
