import { createApp } from 'vue';
import Antd from 'ant-design-vue';
import App from './App.vue';
import 'ant-design-vue/dist/reset.css';
import router from './router/index.js';
import axios from 'axios';
import {createPinia} from 'pinia'

axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:8000';
const pinia = createPinia()
const app = createApp(App);
app.use(router)
app.use(pinia)
app.use(Antd).mount('#app');