import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import tsconfigPaths from "vite-tsconfig-paths"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), tsconfigPaths()],
  server: {
    port: 8001,
    proxy: {
      "/auth": {
        target: "http://localhost:8000"
      },
      "/products": {
        target: "http://localhost:8000",
      },
    },
  },
})
