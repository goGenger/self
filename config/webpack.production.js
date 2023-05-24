const { join, resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "production",
  output: {
    path: join(__dirname, "../dist"),
    publicPath: "/",
    filename: "scripts/[name].[contenthash:5].bundule.js",
    assetModuleFilename: "images/[name].[contenthash:5][ext]",
  },
  // 优化配置
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin({
        parallel: true,
      }),
    ],
  },
  devtool: "source-map",
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "宝子的生产环境",
      filename: "index.html",
      template: resolve(__dirname, "../src/index-dev.html"),
    }),
  ],
};
