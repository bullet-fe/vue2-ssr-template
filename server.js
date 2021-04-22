const Vue = require("vue");
const express = require("express");
const fs = require("fs");
const { createBundleRenderer } = require("vue-server-renderer");
const setupDevServer = require("./build/setup-dev-server");
// 判断环境
const ipProduction = process.env.NODE_ENV === "production";

const server = express();

// 配置dist静态资源服务
server.use("/dist", express.static("./dist"));

let renderer = null;
let onReady = null;
if (ipProduction) {
  const serverBundle = require("./dist/vue-ssr-server-bundle.json");
  const clientManifest = require("./dist/vue-ssr-client-manifest.json");
  // 通过同步读取的方式，使用模版的html内容，必须添加 <!--vue-ssr-outlet-->注释
  const template = fs.readFileSync("index.template.html", "utf-8");
  // 通过createBundleRenderer实现服务端和客户端的桥梁
  renderer = createBundleRenderer(serverBundle, {
    template,
    clientManifest,
  });
} else {
  // 启用HMR
  onReady = setupDevServer(server, (serverBundle, template, clientManifest) => {
    renderer = createBundleRenderer(serverBundle, {
      template,
      clientManifest,
    });
  });
}

const render = (req, res) => {
  renderer.renderToString(
    {
      title: "vue2-ssr-template",
      meta: `<meta name="description" content="vue2-ssr-template"/>`,
    },
    (err, html) => {
      if (err) {
        console.log("err", err);
        return res.status(500).end("Internal Server Error");
      }
      // 设置返回的编码
      res.setHeader("Content-Type", "text/html;charset=utf-8");
      // 通过ssr注释，直接注入到html中
      res.end(html);
    }
  );
};

const  devRender = async (req, res) => {
  // 构建完成后，进行生成
  await onReady
  render();
};
server.get("*", ipProduction ? render : devRender);

server.listen(3000, () => {
  console.log("server run 3000 port");
});
