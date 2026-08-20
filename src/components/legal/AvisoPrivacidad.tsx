import LegalLayout from './LegalLayout'
import { BRAND } from '../../site'

/**
 * OJO antes de publicar: todo lo que va entre [corchetes] es un dato legal
 * real que no existe hoy en el repo (razón social, domicilio fiscal, RFC,
 * contacto para derechos ARCO — ver site.ts, que ni siquiera tiene teléfono o
 * correo). Sustituir por la información real de la empresa antes de que este
 * documento sea el aviso de privacidad vigente del sitio.
 *
 * El sitio hoy no tiene Google Analytics, Google Ads ni Meta Pixel
 * conectados (ver CookieConsent.tsx / cookieConsent.ts): la sección de medios
 * remotos describe las categorías de cookies que el sitio ya sabe manejar,
 * sin afirmar que esos servicios de terceros estén activos todavía.
 */
export default function AvisoPrivacidad() {
  return (
    <LegalLayout title="Aviso de Privacidad">
      <p>
        El presente Aviso de Privacidad regula el tratamiento de los datos personales que{' '}
        {BRAND} recaba a través de este sitio web, de conformidad con la Ley Federal de
        Protección de Datos Personales en Posesión de los Particulares (LFPDPPP) y su Reglamento.
      </p>

      <h2>A. Identidad y domicilio del Responsable</h2>
      <p>
        <strong>[RAZÓN SOCIAL]</strong> (nombre comercial <strong>{BRAND}</strong>), con domicilio
        en <strong>[DOMICILIO FISCAL COMPLETO]</strong> y RFC <strong>[RFC]</strong>, es responsable
        del tratamiento de tus datos personales conforme a este aviso.
      </p>

      <h2>B. Datos personales que recabamos</h2>
      <p>
        Recabamos directamente de ti, a través del formulario de contacto de este sitio, los
        siguientes datos:
      </p>
      <ul>
        <li>Nombre.</li>
        <li>Correo electrónico.</li>
        <li>Empresa (opcional).</li>
        <li>Servicio de interés.</li>
        <li>El mensaje que decidas escribirnos.</li>
      </ul>
      <p>No solicitamos ni recabamos ningún dato a través de medios distintos a ese formulario.</p>

      <h2>C. Datos personales sensibles</h2>
      <p>
        No recabamos datos personales sensibles (origen étnico o racial, estado de salud,
        información genética, creencias religiosas, filosóficas o morales, afiliación sindical,
        opiniones políticas, preferencia sexual, entre otros). Te pedimos no incluir este tipo de
        información en el campo de mensaje del formulario de contacto.
      </p>

      <h2>D. Finalidades del tratamiento</h2>
      <p>
        <strong>Finalidades primarias</strong> (necesarias para atender tu solicitud):
      </p>
      <ul>
        <li>Responder a tu solicitud de contacto o cotización de servicios.</li>
        <li>Identificar el servicio o frente de interés que señalaste en el formulario.</li>
        <li>Dar seguimiento comercial a tu solicitud.</li>
      </ul>
      <p>
        <strong>Finalidades adicionales</strong> (no necesarias, pero que nos permiten brindarte
        una mejor atención; puedes negarte a ellas sin que esto afecte la atención de tu
        solicitud):
      </p>
      <ul>
        <li>Enviarte información sobre servicios de {BRAND} que puedan ser de tu interés.</li>
        <li>Elaborar estadísticas internas sobre el uso del sitio y del formulario de contacto.</li>
      </ul>
      <p>
        Si no deseas que tus datos se usen para las finalidades adicionales, puedes manifestarlo
        al correo señalado en la sección F, o bien no proporcionar más datos que los
        estrictamente necesarios para las finalidades primarias.
      </p>

      <h2>E. Transferencias de datos</h2>
      <p>
        No transferimos tus datos personales a terceros distintos de nuestros proveedores de
        servicios (por ejemplo, de correo electrónico o mensajería, o de hospedaje del sitio),
        quienes los tratan únicamente conforme a nuestras instrucciones y para las finalidades
        aquí descritas. No vendemos ni compartimos tus datos con fines distintos a los señalados
        en este aviso, salvo que exista una obligación legal que nos requiera hacerlo.
      </p>

      <table>
        <thead>
          <tr>
            <th>Destinatario</th>
            <th>Finalidad de la transferencia</th>
            <th>¿Requiere tu consentimiento?</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Proveedores de correo/mensajería que usemos para atender tu solicitud</td>
            <td>Recibir y responder tu mensaje</td>
            <td>No (necesaria para la relación)</td>
          </tr>
          <tr>
            <td>Autoridades competentes</td>
            <td>Cumplimiento de una obligación legal</td>
            <td>No (exigida por ley)</td>
          </tr>
        </tbody>
      </table>

      <h2>F. Derechos ARCO y procedimiento</h2>
      <p>
        Tienes derecho a Acceder a tus datos personales, Rectificarlos si son inexactos,
        Cancelarlos cuando consideres que no se requieren para alguna de las finalidades
        señaladas, u Oponerte al uso de los mismos para fines específicos (derechos ARCO).
      </p>
      <p>Para ejercer cualquiera de estos derechos, envía tu solicitud a:</p>
      <p>
        <strong>[CORREO DE CONTACTO PARA DERECHOS ARCO]</strong>
      </p>
      <p>Tu solicitud debe incluir, al menos:</p>
      <ul>
        <li>Tu nombre completo y un medio para comunicarte la respuesta.</li>
        <li>Los documentos que acrediten tu identidad (o, en su caso, la de tu representante).</li>
        <li>La descripción clara y precisa de los datos sobre los que buscas ejercer el derecho.</li>
        <li>Cualquier otro elemento que facilite la localización de tus datos.</li>
      </ul>
      <p>
        Te confirmaremos la procedencia de tu solicitud en un plazo máximo de <strong>20 días
        hábiles</strong> contados desde su recepción, y de resultar procedente, se hará efectiva
        dentro de los <strong>15 días hábiles</strong> siguientes a la fecha en que se comunique la
        respuesta.
      </p>

      <h2>G. Revocación del consentimiento</h2>
      <p>
        Puedes revocar el consentimiento que, en su caso, nos hayas otorgado para el tratamiento
        de tus datos personales, escribiendo al correo señalado en la sección F. Considera que en
        algunos casos esto puede implicar que no podamos continuar dando seguimiento a tu
        solicitud.
      </p>

      <h2>H. Limitación de uso y divulgación</h2>
      <p>
        Si deseas limitar el uso o divulgación de tus datos personales, puedes inscribirte al
        Registro Público para Evitar Publicidad (REPEP) de la PROFECO, o bien solicitarlo
        directamente al correo señalado en la sección F.
      </p>

      <h2>I. Uso de medios remotos o electrónicos (cookies)</h2>
      <p>
        Este sitio utiliza cookies propias y, en su caso, de terceros. Al ingresar por primera
        vez, un banner te permite aceptarlas todas, rechazar las opcionales o personalizar tu
        elección por categoría. Tu elección se guarda en una cookie propia
        (<code>reylogix-cookie-consent</code>) por 365 días, y puedes cambiarla en cualquier
        momento borrando esa cookie del navegador.
      </p>
      <p>Las categorías que maneja el banner son:</p>
      <ul>
        <li>
          <strong>Esenciales y técnicas</strong> — siempre activas. Necesarias para la navegación
          segura, la protección de formularios (CSRF) y para recordar tu propia preferencia de
          cookies.
        </li>
        <li>
          <strong>Preferencias y funcionales</strong> — opcional. Recuerdan idioma, tema y región.
        </li>
        <li>
          <strong>Medición y analíticas</strong> — opcional. Categoría reservada para
          herramientas de medición de uso del sitio (por ejemplo, Google Analytics). A la fecha de
          este aviso, el sitio no tiene ninguna herramienta de este tipo activa.
        </li>
        <li>
          <strong>Publicidad y marketing</strong> — opcional. Categoría reservada para
          herramientas de publicidad (por ejemplo, Google Ads o Meta/Facebook Pixel). A la fecha
          de este aviso, el sitio no tiene ninguna herramienta de este tipo activa.
        </li>
      </ul>
      <p>
        Si en el futuro activamos alguna herramienta de medición o publicidad, esta sección se
        actualizará para reflejarlo, y esas cookies solo se colocarán si aceptaste la categoría
        correspondiente.
      </p>

      <h2>J. Modificaciones al aviso</h2>
      <p>
        Podemos modificar este Aviso de Privacidad en cualquier momento. Cualquier cambio será
        publicado en esta misma página, indicando la fecha de la última actualización al final del
        documento.
      </p>

      <hr />

      <h2>K. Consentimiento</h2>
      <p>
        Al proporcionar tus datos personales a través del formulario de contacto de este sitio,
        manifiestas que:
      </p>
      <ul>
        <li>☐ He leído y acepto el tratamiento de mis datos conforme a este Aviso de Privacidad.</li>
        <li>
          ☐ No acepto que mis datos se usen para las finalidades adicionales descritas en la
          sección D (puedo continuar sin proporcionarlas).
        </li>
      </ul>

      <p>
        <em>Fecha de última actualización: [MES AÑO].</em>
      </p>
    </LegalLayout>
  )
}
