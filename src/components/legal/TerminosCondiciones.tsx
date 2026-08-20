import LegalLayout from './LegalLayout'
import { BRAND } from '../../site'

/**
 * OJO antes de publicar: la sección G (legislación aplicable) tiene un
 * placeholder de jurisdicción — ver AvisoPrivacidad.tsx para el resto de
 * datos legales de la empresa que también aplican aquí.
 */
export default function TerminosCondiciones() {
  return (
    <LegalLayout title="Términos y Condiciones">
      <p>
        Estos Términos y Condiciones regulan el acceso y uso de este sitio web de {BRAND}. Al
        navegar en el sitio o enviar el formulario de contacto, aceptas estos términos.
      </p>

      <h2>A. Naturaleza del sitio</h2>
      <p>
        Este sitio es un canal informativo y de contacto sobre los servicios de consultoría
        logística de {BRAND} (Enfoque, Servicios Express, Blackline y Casos de éxito). No es una
        tienda en línea: no procesa pagos ni contrataciones dentro del propio sitio. Toda
        contratación de servicios se formaliza por separado, fuera de este sitio, entre {BRAND} y
        el cliente.
      </p>

      <h2>B. Uso permitido</h2>
      <p>Al usar este sitio te comprometes a:</p>
      <ul>
        <li>Proporcionar información veraz en el formulario de contacto.</li>
        <li>No usar el sitio con fines ilícitos o para transmitir contenido dañino (malware, spam, intentos de intrusión).</li>
        <li>No intentar acceder sin autorización a áreas o sistemas del sitio que no estén destinados al público.</li>
      </ul>
      <p>
        El formulario de contacto incluye validaciones automáticas contra envíos automatizados
        (spam/bots). Nos reservamos el derecho de descartar solicitudes que identifiquemos como
        no genuinas.
      </p>

      <h2>C. Propiedad intelectual</h2>
      <p>
        El nombre comercial, el logotipo, los textos, gráficos y el diseño de este sitio son
        propiedad de {BRAND} o se usan bajo licencia. Ver{' '}
        <a href="/legales/marca-propiedad-intelectual">Marca y Propiedad Intelectual</a> para el
        detalle de qué está protegido y qué usos están permitidos.
      </p>

      <h2>D. Exactitud de la información</h2>
      <p>
        Hacemos un esfuerzo razonable para que la información publicada en este sitio sea precisa
        y esté actualizada, pero no garantizamos que esté libre de errores u omisiones. La
        información de este sitio tiene fines informativos y no constituye una oferta vinculante;
        los alcances de cualquier servicio se definen en la propuesta o contrato específico que se
        acuerde directamente contigo.
      </p>

      <h2>E. Enlaces a sitios de terceros</h2>
      <p>
        Este sitio puede incluir enlaces a sitios de terceros (por ejemplo, el aviso de cookies
        referencia servicios como Google Ads o Meta/Facebook, en caso de activarse en el futuro).
        No somos responsables del contenido, políticas de privacidad o prácticas de esos sitios de
        terceros.
      </p>

      <h2>F. Limitación de responsabilidad</h2>
      <p>
        En la medida permitida por la ley aplicable, {BRAND} no será responsable por daños
        indirectos, incidentales o consecuentes derivados del uso o la imposibilidad de uso de
        este sitio, incluyendo interrupciones del servicio por causas fuera de nuestro control
        razonable.
      </p>

      <h2>G. Legislación aplicable y jurisdicción</h2>
      <p>
        Estos Términos y Condiciones se rigen por las leyes aplicables en{' '}
        <strong>[JURISDICCIÓN / PAÍS]</strong>. Para cualquier controversia derivada de su
        interpretación o cumplimiento, las partes se someten a los tribunales competentes de{' '}
        <strong>[CIUDAD / FUERO]</strong>, renunciando a cualquier otro fuero que pudiera
        corresponderles por razón de su domicilio presente o futuro.
      </p>

      <h2>H. Modificaciones</h2>
      <p>
        Podemos actualizar estos Términos y Condiciones en cualquier momento. Los cambios se
        publican en esta misma página junto con la fecha de última actualización.
      </p>

      <h2>I. Contacto</h2>
      <p>
        Dudas sobre estos términos: <strong>[CORREO DE CONTACTO]</strong>.
      </p>

      <hr />

      <p>
        <em>Fecha de última actualización: [MES AÑO].</em>
      </p>
    </LegalLayout>
  )
}
