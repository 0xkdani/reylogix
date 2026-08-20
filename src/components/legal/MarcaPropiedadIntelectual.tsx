import LegalLayout from './LegalLayout'
import { BRAND } from '../../site'

export default function MarcaPropiedadIntelectual() {
  return (
    <LegalLayout title="Marca y Propiedad Intelectual">
      <p>
        Este documento describe la titularidad de los elementos de marca y propiedad intelectual
        presentes en este sitio y los usos que están y no están permitidos.
      </p>

      <h2>A. Elementos protegidos</h2>
      <p>Son propiedad de {BRAND}, o se usan bajo licencia, los siguientes elementos:</p>
      <ul>
        <li>El nombre comercial <strong>{BRAND}</strong> y su logotipo (el monograma "R").</li>
        <li>Los textos, descripciones de servicios y casos de éxito publicados en el sitio.</li>
        <li>El diseño visual, la paleta de color y la disposición gráfica del sitio.</li>
        <li>El código fuente propio del sitio, salvo las librerías de terceros señaladas en la sección C.</li>
      </ul>

      <h2>B. Usos no autorizados</h2>
      <p>Sin autorización previa y por escrito de {BRAND}, no está permitido:</p>
      <ul>
        <li>Reproducir, copiar o distribuir el logotipo o el nombre comercial de {BRAND}.</li>
        <li>Usar el nombre o la imagen de {BRAND} para dar a entender un patrocinio, aval o asociación que no existe.</li>
        <li>Modificar, descompilar o reutilizar el código fuente propio del sitio con fines distintos a los de navegación normal en un navegador web.</li>
        <li>Extraer de forma automatizada (scraping) los contenidos del sitio con fines comerciales.</li>
      </ul>

      <h2>C. Software y librerías de terceros</h2>
      <p>
        Este sitio está construido con software de código abierto (entre otros, React, Vite,
        Tailwind CSS y sus respectivas dependencias), cada uno bajo los términos de su propia
        licencia. El uso de estas herramientas no implica ninguna afiliación de sus autores u
        organizaciones con {BRAND}.
      </p>

      <h2>D. Marcas de terceros</h2>
      <p>
        Las marcas de terceros que puedan mencionarse en este sitio o en su aviso de cookies
        (por ejemplo, Google, Google Analytics, Google Ads o Meta/Facebook) son propiedad de sus
        respectivos titulares. Su mención es únicamente informativa, no implica relación comercial
        alguna con {BRAND} salvo que se indique expresamente.
      </p>

      <h2>E. Reporte de infracciones</h2>
      <p>
        Si consideras que un contenido de este sitio infringe un derecho de propiedad intelectual
        del que eres titular, escríbenos a <strong>[CORREO DE CONTACTO]</strong> con el detalle del
        contenido y de tu derecho, para que podamos revisarlo.
      </p>

      <h2>F. Vigencia</h2>
      <p>
        Este documento puede actualizarse en cualquier momento. Los cambios se publican en esta
        misma página junto con la fecha de última actualización.
      </p>

      <hr />

      <p>
        <em>Fecha de última actualización: [MES AÑO].</em>
      </p>
    </LegalLayout>
  )
}
