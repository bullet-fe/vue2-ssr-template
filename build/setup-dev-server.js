const fs = require("fs");
const path = require("path");
const chokidar = require("chokidar");
const webpack = require("webpack");
const devMiddleware = require("webpack-dev-middleware");
const hotMiddleware = require("webpack-hot-middleware");
const resolve = (filePath) => path.resolve(__dirname, filePath);


module.exports = (server, callback) => {
  let readingFunc;
  const onReady = new Promise((p) => (readingFunc = p));
  // HMR 更新renderer
  let serverBundle, template, clientManifest;
  // 更新方法，多次调用
  const update = () => {
    // 三者同时存在后，更新
    if (serverBundle && template && clientManifest) {
      readingFunc();
      callback(serverBundle, template, clientManifest);
    }
  };

    // 监视template
    const templatePath = resolve("../index.template.html");
    template = fs.readFileSync(templatePath, "utf-8");
    // watch文件修改
    chokidar.watch(templatePath).on("change", (e) => {
      template = fs.readFileSync(templatePath, "utf-8");
      update();
    });


  // 监视serverBundle
  const serverConfig = require("./webpack.server");
  const serverCompiler = webpack(serverConfig);

  // 配置开发HMR
  let serverDevMiddleware = devMiddleware(serverCompiler, {
    logLevel: "silent", // 关闭默认日志
  });
  // 编译结束的钩子
  serverCompiler.hooks.done.tap("server", () => {
    serverBundle = JSON.parse(
      //  操作内存中的文件
      serverDevMiddleware.fileSystem.readFileSync(resolve("../dist/vue-ssr-server-bundle.json"), "utf-8")
    );
    // console.log(serverBundle);
    update();
  });



  // 监视clientBundle
  const clientConfig = require("./webpack.client");
  // 添加热更新插件
  clientConfig.plugins.push(new webpack.HotModuleReplacementPlugin())
  // 修改默认的入口
  clientConfig.entry.app = [
    "webpack-hot-middleware/client?quiet=true&reload=true",
    clientConfig.entry.app
  ]
  // HMR保持名称一致
  clientConfig.output.filename = '[naem].js'
  const clientCompiler = webpack(clientConfig);

  // 配置开发HMR
  let clientDevMiddleware = devMiddleware(clientCompiler, {
    publicPath: clientConfig.output.publicPath, // 请求前缀路径
    logLevel: "silent", // 关闭默认日志
  });
  // 编译结束的钩子
  clientCompiler.hooks.done.tap("client", () => {
    clientManifest = JSON.parse(
      //  操作内存中的文件
      clientDevMiddleware.fileSystem.readFileSync(resolve("../dist/vue-ssr-client-manifest.json"), "utf-8")
    );
    update();
  });

  // 处理客户端的资源路径
  server.use(clientDevMiddleware)

  // 挂载热更新组件
  server.use(hotMiddleware(clientCompiler,{
    log: false
  }))
  return onReady;
};
