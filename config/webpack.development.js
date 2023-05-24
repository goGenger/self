const { join, resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const notifier = require('node-notifier');

const port = 8082;
module.exports = {
  mode: 'development',
  output: {
    assetModuleFilename: 'images/[name][ext]',
    filename: 'scripts/[name].bundle.js',
  },
  devServer: {
    port,
    historyApiFallback: true,
    static: {
      directory: join(__dirname, '../dist'),
    },
    hot: true,
    open: true,
  },
  devtool: 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
      title: '宝子的开发环境',
      filename: 'index.html',
      template: resolve(__dirname, '../src/index-dev.html'),
    }),
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: ['You application is running here http://localhost:' + port],
        notes: ['💊 构建信息请及时关注窗口右上角'],
      },
      onErrors: function (severity, errors) {
        if (severity !== 'error') {
          return;
        }
        const error = errors[0];
        console.log(error);
        notifier.notify({
          title: '👒 Webpack Build Error',
          message: severity + ': ' + error.name,
          subtitle: error.file || '',
          //   icon: join(__dirname, "icon.png"),
        });
      },
      clearConsole: true,
    }),
  ],
};
