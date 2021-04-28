
/**
 * server entry
 */
import { createApp } from './app'


 export default async context => {
    const { app, router, store } = createApp()
    // 设置meta标签
    const meta = app.$meta()
    // 设置服务器端 router 的位置
    router.push(context.url)
    // 绑定meta
    context.meta = meta
    // 等待完成后，然后app实例（await会自动包装），并使用bind绑定this
    await new Promise(router.onReady.bind(router))

    // 同步数据到客户端
    context.rendered = () => {
        // 通过context的status，然后把数据注入到window.__INITIAL_STATE__对象上
        context.state = store.state 
    }
    return app

}