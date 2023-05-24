const { resolve } = require("path");
const Dotenv = require("dotenv-webpack");
const merge = require("webpack-merge");
const argv = require("yargs-parser")(process.argv.slice(2)); // 获取命令执行中的参数
const _mode = argv.mode || "development";
const _mergeConfig = require(`./config/webpack.${_mode}.js`);
const _modeflag = _mode === "production" ? true : false;
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); //提取css到静态资源通过link引入

const webpackBaseConfig = {
  entry: {
    main: resolve("src/index.tsx"),
  },
  output: {
    path: resolve(process.cwd(), "dist"),
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: {
          loader: "swc-loader",
        },
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg|png|jpg)$/i,
        type: "asset/resource",
      },
      {
        test: /\.css$/i,
        include: [
          resolve(__dirname, "src"),
          resolve(__dirname, "node_modules"),
        ],
        use: [
          MiniCssExtractPlugin.loader,
          { loader: "css-loader", options: { importLoaders: 1 } },
          "postcss-loader",
        ],
      },
      {
        test: /\.(png|jpg|svg)$/,
        type: "asset",
      },
    ],
  },
  optimization: {
    runtimeChunk: {
      name: 'runtime',
    },
    splitChunks: {},
  },
  resolve: {
    alias: {
      "@components": resolve("src/components"),
      "@pages": resolve("src/pages"),
      "@hooks": resolve("src/hooks"),
      "@routes": resolve("src/routes")
    },
    extensions: [".js", ".ts", ".tsx", ".jsx", ".css"],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: _modeflag
        ? "styles/[name].[contenthash:5].css"
        : "styles/[name].css",
      chunkFilename: _modeflag
        ? "styles/[name].[contenthash:5].css"
        : "styles/[name].css",
      ignoreOrder: false,
    }),
    new Dotenv(),
  ],
};

module.exports = merge.default(webpackBaseConfig, _mergeConfig);
