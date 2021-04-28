/**
 * public entry
 */
import Vue from "vue";
import App from "./App.vue";
import { createRouter } from "./router";
import { createStore } from './store'
import './assets/css/reset.css';
import VueMeta from 'vue-meta'

Vue.use(VueMeta)

export function createApp() {
  const router = createRouter()
  const store = createStore()
  const app = new Vue({
    router,
    store,
    render: (h) => h(App),
  });
  // 返回 app
  return { app, router, store };
}
