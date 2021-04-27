/**
 * public entry
 */
import Vue from "vue";
import App from "./App.vue";
import { createRouter } from "./router";
import './assets/css/reset.css';
export function createApp() {
  const router = createRouter()
  const app = new Vue({
    router,
    render: (h) => h(App),
  });
  // 返回 app
  return { app, router };
}
