// 开发环境

const webpack = require('webpack')
const { merge } = require('webpack-merge')
const ESLintPlugin = require('eslint-webpack-plugin')
const base = require('./webpack.base')

module.exports = merge(base, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map', // 能具体定位到源码位置和源码展示
  devServer: {
    open: false,
    hot: true,
  },
  plugins: [
    // 定义全局变量
    new webpack.DefinePlugin({
      process: {
        env: {
          NODE_DEV: JSON.stringify('development'),
          // 这里可以定义你的环境变量
          // VUE_APP_URL: JSON.stringify('https://xxx.com')
        },
      },
    }),
    // 热更新
    new webpack.HotModuleReplacementPlugin(),
    // eslint
    new ESLintPlugin({
      // 运行的时候自动帮你修复错误
      fix: true,
    }),
  ],
})