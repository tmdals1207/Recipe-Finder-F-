import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'
import path from 'path';


// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000, // 포트를 3000으로 설정
  },
  proxy: {
    '/api': {
      target: 'http://localhost:8080', // 백엔드 서버 주소
      changeOrigin: true, // CORS 문제를 해결하기 위해 필요
      secure: false, // HTTPS가 아닌 경우 false로 설정
      rewrite: (path) => path.replace(/^\/api/, ''), // API 경로 리라이트
    },
  },
  plugins: [
    
    vue(),
    // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
    vuetify({
      autoImport: true,
    }),
  ],
  define: { 'process.env': {} },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  /* remove the need to specify .vue files https://vitejs.dev/config/#resolve-extensions
  resolve: {
    extensions: [
      '.js',
      '.json',
      '.jsx',
      '.mjs',
      '.ts',
      '.tsx',
      '.vue',
    ]
  },
  */
})
