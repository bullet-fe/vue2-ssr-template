/**
 * webpack基础配置文件
 */

const path = require("path");
// 优化日志输出
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const VueLoaderPlugin = require('vue-loader/lib/plugin');
// 拼接路径
const resolve = (file) => path.resolve(__dirname, file);
// 区分环境
const isProd = process.env.NODE_ENV === "production";
module.exports = {
  mode: isProd ? "production" : "development",
  output: {
    path: resolve("../dist/"),
    publicPath: "/dist/",
    filename: "[name].[chunkhash].js",
  },
  resolve: {
    alias: {
      // 路径别名，@ 指向 src 
      '@': resolve('../src/')
    },
    // 可以省略的扩展名
    // 当省略扩展名的时候，按照从前往后的顺序依次解析 
    extensions: ['.js', '.vue', '.json']
  },
  devtool: isProd ? "source-map" : "cheap-module-eval-source-map",
  module: {
    rules: [
      // 处理图片资源
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
            },
          },
        ],
      },
      // 处理字体资源
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ["file-loader"],
      },
      // 处理 .vue 资源
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      // 处理 CSS 资源
      // 它会应用到普通的 `.css` 文件
      // 以及 `.vue` 文件中的 `<style>` 块
      {
        test: /\.css$/,
        use: ["vue-style-loader", "css-loader"],
      },
      // 处理less
      {
        test: /\.less$/,
        use: ["vue-style-loader", "css-loader", "less-loader"],
      },
    ],
  },
  plugins: [new VueLoaderPlugin(), new FriendlyErrorsWebpackPlugin()],
};
