import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import './index.css'
import './global.css'
import router from './router'
import { openDB } from './services/db.js'

openDB().then(() => {
    console.log('Database opened successfully');
  }).catch((error) => {
    console.error('Error opening database:', error);
  });


createApp(App).use(router).mount('#app')
