/**
 * public entry
 */
 import Vue from 'vue'
 import App from './App.vue'
 
 export function createApp () {
 
   const app = new Vue({
     render: h => h(App)
   })
   // 返回 app
   return { app }
 }