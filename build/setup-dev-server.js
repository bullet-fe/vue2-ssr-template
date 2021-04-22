const fs = require("fs");
const path = require("path");
const chokidar = require("chokidar");
const webpack = require("webpack");
const resolve = (filePath => path.resolve(__dirname, filePath));
module.exports = (server, callback) => {
  let pending;
  const onReady = new Promise((p) => (pending = p));
  // HMR 更新renderer
  let serverBundle, template, clientManifest;
  // 更新方法，多次调用
  const update = () => {
    // 三者同时存在后，更新
    if (serverBundle && template && clientManifest) {
      onReady();
      callback(serverBundle, template, clientManifest);
    }
  };
  // 监视serverBundle
  const serverConfig = require("./webpack.server");
  const serverCompiler = webpack(serverConfig);
  serverCompiler.watch({}, (err, status) => {
    // webpack本身错误
    if (err) throw err;
    // 构建结果的错误
    if (status.hasErrors()) return;
    // 更新serverBundle
    serverBundle = JSON.parse(
      fs.readFileSync(resolve("../dist/vue-ssr-server-bundle.json"), "utf-8")
    );
    console.log(serverBundle)
    update();
  });

    // 监视template
    const templatePath = resolve("../index.template.html");
    template = fs.readFileSync(templatePath, "utf-8");
    update();
    // watch文件修改
    chokidar.watch(templatePath).on("change", (e) => {
      template = fs.readFileSync(templatePath, "utf-8");
      update();
    });
  console.log(template);
  return onReady;
};
