import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store';
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css';
import axios from 'axios';
import './assets/main.css'

loadFonts()

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

createApp(App)
  .use(router)
  .use(store)
  .use(vuetify)
  .mount('#app')
