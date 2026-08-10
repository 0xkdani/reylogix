import { motion } from 'motion/react'

/**
 * Sectores derivados de los perfiles citados en "Casos de éxito".
 * La página fuente no publica logotipos ni nombres de empresas cliente.
 */
const SECTORS = [
  'Manufactura alimentaria',
  'Comercio exterior',
  'Tecnología',
  'Cosméticos',
  'Automotriz',
]

export default function Sectors() {
  return (
    <section className="shell py-16 md:py-20">
      {/* Texto suelto sobre el video: mismo halo que en el hero y en la cabecera
          de Servicios. */}
      <div className="text-plate">
        <p className="text-center text-xs xl:text-sm uppercase tracking-widest text-white/50">
          Sectores en los que intervenimos
        </p>

        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {SECTORS.map((name, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: i * 0.05, ease: 'easeOut' }}
              className="flex items-center justify-center text-center"
            >
              <span className="text-sm xl:text-lg font-semibold tracking-tight text-white/65 hover:text-white transition-colors">
                {name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
