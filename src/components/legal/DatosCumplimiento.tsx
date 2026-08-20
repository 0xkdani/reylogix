import LegalLayout from './LegalLayout'
import { BRAND } from '../../site'

/**
 * OJO antes de publicar: sección D (encargados del tratamiento) asume
 * hospedaje tipo Vercel; ajustar si cambia el proveedor. El resto de datos
 * legales de la empresa (razón social, domicilio, RFC) vive centralizado en
 * AvisoPrivacidad.tsx — este documento no los repite, los referencia.
 */
export default function DatosCumplimiento() {
  return (
    <LegalLayout title="Datos y Cumplimiento">
      <p>
        Este documento complementa el <a href="/legales/aviso-privacidad">Aviso de Privacidad</a>{' '}
        con el detalle operativo de cómo {BRAND} protege los datos personales que recaba a través
        de este sitio y bajo qué marco normativo opera.
      </p>

      <h2>A. Marco normativo</h2>
      <p>
        El tratamiento de datos personales descrito aquí se rige por la Ley Federal de Protección
        de Datos Personales en Posesión de los Particulares (LFPDPPP), su Reglamento y los
        lineamientos aplicables emitidos por la autoridad competente en materia de protección de
        datos.
      </p>

      <h2>B. Medidas de seguridad</h2>
      <p>
        Aplicamos medidas de seguridad administrativas, técnicas y físicas razonables y
        proporcionales al volumen y sensibilidad de los datos que tratamos (recuerda: no
        recabamos datos sensibles, ver Aviso de Privacidad, sección C), entre ellas:
      </p>
      <ul>
        <li>Cifrado en tránsito (HTTPS) para toda comunicación entre tu navegador y el sitio.</li>
        <li>Acceso restringido a los sistemas donde se reciben los mensajes del formulario de contacto.</li>
        <li>Revisión periódica de las dependencias y herramientas usadas para operar el sitio.</li>
      </ul>

      <h2>C. Plazo de conservación</h2>
      <p>
        Conservamos los datos recabados a través del formulario de contacto únicamente durante el
        tiempo necesario para atender tu solicitud y, en su caso, dar seguimiento comercial a
        ella, salvo que exista una obligación legal o contractual que requiera un plazo mayor.
      </p>

      <h2>D. Encargados del tratamiento</h2>
      <p>
        Usamos proveedores externos para operar el sitio (por ejemplo, hospedaje/CDN) y, en el
        futuro, para enviar y recibir el correo generado por el formulario de contacto. Estos
        proveedores actúan como <strong>encargados del tratamiento</strong>: procesan datos
        únicamente conforme a nuestras instrucciones, para las finalidades descritas en el Aviso
        de Privacidad, y no los usan para fines propios.
      </p>
      <p>
        Estos proveedores pueden operar infraestructura fuera de tu país de residencia. Cuando eso
        implique una transferencia internacional de datos, se realiza únicamente hacia
        proveedores que ofrecen garantías de protección de datos comparables a las exigidas por la
        LFPDPPP.
      </p>

      <h2>E. Vulneraciones de seguridad</h2>
      <p>
        En caso de una vulneración de seguridad que afecte de forma significativa los derechos
        patrimoniales o morales de los titulares de datos personales, lo notificaremos sin demora
        a los titulares afectados y a las autoridades competentes, conforme a lo previsto en la
        LFPDPPP y su Reglamento.
      </p>

      <h2>F. Cookies y consentimiento</h2>
      <p>
        El detalle de las categorías de cookies, cómo se guarda tu elección y cómo cambiarla vive
        en la sección de medios remotos del{' '}
        <a href="/legales/aviso-privacidad">Aviso de Privacidad</a>. Este sitio no coloca cookies
        de medición o publicidad sin tu consentimiento explícito.
      </p>

      <h2>G. Contacto</h2>
      <p>
        Preguntas sobre cumplimiento o seguridad de datos: <strong>[CORREO DE CONTACTO]</strong>.
      </p>

      <hr />

      <p>
        <em>Fecha de última actualización: [MES AÑO].</em>
      </p>
    </LegalLayout>
  )
}
