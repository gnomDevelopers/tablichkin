import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    define: {
      'process.env.API_URL': JSON.stringify(env.FRONTEND_API_URL),
      'process.env.SHOW_LOGS': JSON.stringify(env.SHOW_LOGS)
    },
    plugins: [
      react({
        babel: {
          plugins: [['babel-plugin-react-compiler']],
        },
      }),
      tailwindcss(),
    ],
  }
})
