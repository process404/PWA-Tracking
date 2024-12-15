import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), VitePWA({
    registerType: 'autoUpdate',
    manifest:{
      name: 'Travel Track',
      short_name: 'TravelTrack',
      description: 'An app to track your travels',
      theme_color: '#ffffff',
      background_color: '#ffffff',
      display: 'standalone',
      scope: '/',
      start_url: '/',
      icons:[
        {
          src: '/icons/logo.png',
          sizes: '96x96',
          type: 'image/png',
          purpose: 'any maskable',
        }
      ]
    },
  })],
  server:{
    port: 8080
  }
})
