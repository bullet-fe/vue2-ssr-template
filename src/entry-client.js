
/**
 * client entry
 */
import { createApp } from './app'

const { app, router, store } = createApp()

// 用服务端的数据替换到客户端
if(window.__INITIAL_STATE__){
  store.replaceState(window.__INITIAL_STATE__)
}
router.onReady(() => {
  // 挂载到`id="app"` 第二个参数强制激活
  app.$mount('#app',true)
})