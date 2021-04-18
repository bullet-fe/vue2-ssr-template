const Vue = require("vue");
const express = require("express");
const fs = require("fs");

const renderer = require("vue-server-renderer").createRenderer({
  // 通过同步读取的方式，使用模版的html内容，必须添加 <!--vue-ssr-outlet-->注释
  template: fs.readFileSync("index.template.html", "utf-8"),
});
const server = express();

server.get("*", (req, res) => {
  const app = new Vue({
    template: `
              <div id="app">
                  <h1>{{msg}}</h1>
              </div>
          `,
    data: {
      msg: "hello vue2-ssr-template !",
    },
  });

  renderer.renderToString(
    app,
    {
      title: "vue2-ssr-template",
      meta: `<meta name="description" content="vue2-ssr-template"/>`,
    },
    (err, html) => {
      if (err) {
        console.log(err);
        return res.status(500).end("Internal Server Error");
      }
      // 设置返回的编码
      res.setHeader("Content-Type", "text/html;charset=utf-8");
      // 通过ssr注释，直接注入到html中
      res.end(html);
    }
  );
});

server.listen(3000, () => {
  console.log("server run 3000 port");
});
