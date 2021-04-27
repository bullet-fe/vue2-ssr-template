
/**
 * server entry
 */
import { createApp } from './app'


 export default async context => {
    const { app, router } = createApp()
    // 设置服务器端 router 的位置
    router.push(context.url)
    // 等待完成后，然后app实例（await会自动包装），并使用bind绑定this
    await new Promise(router.onReady.bind(router))
    return app

}