import App from './App.vue';
import { createSSRApp } from 'vue';
import 'virtual:uno.css';
import '@/styles/index.scss';

export function createApp() {
  const app = createSSRApp(App);
  return {
    app,
  };
}
