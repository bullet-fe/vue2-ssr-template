# vue2-ssr-template

<p align="center">
  <a href="https://github.com/gzg1023/vue2-ssr-template">
    <img src="https://img.shields.io/badge/vue-ssr-blue.svg" >
  </a>
  <a href="https://github.com/gzg1023/vue2-ssr-template">
    <img src="https://img.shields.io/badge/license-MIT-green.svg" >
  </a>
  <a href="https://github.com/gzg1023/vue2-ssr-template">
    <img src="https://img.shields.io/badge/webpack-build-blue.svg" >
  </a>
   <a href="https://github.com/gzg1023/vue2-ssr-template">
    <img src="https://img.shields.io/badge/express-node-green.svg" >
  </a>
</p>

手工搭建vue-ssr项目，基于``webpack4.x``和``vue2.6.12``搭建，node服务使用``express``,开发环境使用``webpack-dev-middleware``和``webpack-hot-middleware``进行热更新支持。

如果需要使用webpack5以上的版本，先确保[webpack5 和vue2 ssr的bug](https://github.com/vuejs/vue/issues/11718)。这个官方的issue得到了解决

<div align="center">   
<img  width = "100" height = "100" alt="webpack" align = "center" src="https://webpack.docschina.org/icon_512x512.png">

webpack4

<img width = "100" height = "100"  src="https://cn.vuejs.org/images/logo.png">

vue2.6.12

<img width = "250" height = "100"  src="https://cdn.nlark.com/yuque/0/2021/png/276171/1618808297527-45830ab2-baff-46cc-87dc-9d26d3350078.png">

express

</div>


```javascript
// 项目主入口
vue2-ssr-template/server.js

// 客户端入口文件
vue2-ssr-template/src/entry-client.js

// 服务端入口文件
vue2-ssr-template/src/entry-server.js
```

## 使用 

### 开发模式

```bash 
  yarn 

  yarn dev
```

### 生产模式


```bash 
  yarn build

  yarn start
```

## 技术点
- vue 2.6.12
- vue-router 3.5.1
- vuex 3.6.2
- vue-server-renderer 2.6.12
- webpack 4.44.2 
- express
- axios
- less