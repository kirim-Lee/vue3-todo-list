import { createApp } from 'vue';
import './style.css';
import App from './App.vue';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.esm';

const app = createApp(App);
const today = new Date(
  new Date().setMinutes(new Date().getHours() - new Date().getTimezoneOffset())
)
  .toISOString()
  .split('T')[0];

app.provide('today', today);
app.mount('#app');
