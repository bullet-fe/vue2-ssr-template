
/**
 * client entry
 */
import { createApp } from './app'

const { app } = createApp()

// 挂载到`id="app"` 第二个参数强制激活
app.$mount('#app',true)