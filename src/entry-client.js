
/**
 * client entry
 */
import { createApp } from './app'

const { app, router } = createApp()

router.onReady(() => {
  // 挂载到`id="app"` 第二个参数强制激活
  app.$mount('#app',true)
})