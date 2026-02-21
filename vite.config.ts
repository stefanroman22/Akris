import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GOOGLE_CALENDAR_ID': JSON.stringify(env.GOOGLE_CALENDAR_ID),
        'process.env.GOOGLE_API_KEY': JSON.stringify(env.GOOGLE_API_KEY),
        'process.env.EMAIL_SERVICE_ID': JSON.stringify(env.EMAIL_SERVICE_ID),
        'process.env.EMAIL_TEMPLATE_ID': JSON.stringify(env.EMAIL_TEMPLATE_ID),
        'process.env.EMAIL_API_KEY': JSON.stringify(env.EMAIL_API_KEY),

      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
