import './assets/main.css'
import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Import router
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/js/bootstrap.min.js'; 

createApp(App).use(router).mount('#app');

