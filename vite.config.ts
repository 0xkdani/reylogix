import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    /*
     * El alias que shadcn da por hecho. Tiene que existir en los DOS sitios:
     * aquí para que Vite lo resuelva al empaquetar, y en tsconfig.json
     * ("paths") para que TypeScript no marque el módulo como inexistente.
     *
     * Se usa la forma relativa a la raíz del proyecto en lugar de
     * path.resolve(__dirname, ...) para no depender de @types/node: el tsconfig
     * limita "types" a vite/client, así que importar node:url no compilaría.
     */
    alias: {
      '@': '/src',
    },
  },
})
