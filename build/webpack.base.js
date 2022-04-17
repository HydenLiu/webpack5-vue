// 公共配置

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const chalk = require('chalk')

module.exports = {
  // 入口文件 main.js
  entry: {
    main: './src/main.js',
  },
  // 输出
  output: {
    // 输出到 dist文件夹
    // 记得改路径
    path: path.resolve(__dirname, '../dist'),
    // js文件下
    filename: 'js/chunk-[contenthash].js',
    // 每次打包前自动清除旧的dist
    clean: true,
  },
  resolve: {
    // 路径别名
    alias: {
      '@': path.resolve('./src'),
      assets: '~/assets',
    },
    // 引入文件时省略后缀
    extensions: ['.js', '.ts', '.less', '.vue'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      // 选择模板 public/index.html
      template: './public/index.html',
      // 打包后的名字
      filename: 'index.html',
      // js文件插入 body里
      inject: 'body',
    }),
    new MiniCssExtractPlugin({
      // 将css代码输出到dist/styles文件夹下
      filename: 'styles/chunk-[contenthash].css',
      ignoreOrder: true,
    }),
    new VueLoaderPlugin(),
    // 进度条
    new ProgressBarPlugin({
      format: ` build [:bar] ${chalk.green.bold(':percent')} (:elapsed seconds)`,
    }),
  ],
  module: {
    rules: [
      {
        // 匹配文件后缀的规则
        test: /\.(css|s[cs]ss)$/,
        use: [
          // loader执行顺序是从右到左
          MiniCssExtractPlugin.loader,
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions:
                {
                  plugins: ['autoprefixer'],
                },
            },
          },
          'sass-loader',
          // {
          //   loader: 'sass-resources-loader',
          //   options: {
          //     resources: [
          //       // 放置全局引入的公共scss文件
          //     ],
          //   },
          // },
        ],
      },
      {
        // 匹配文件后缀的规则
        test: /\.(png|jpe?g|gif|svg|webp)$/,
        type: 'asset',
        parser: {
          // 转base64的条件
          dataUrlCondition: {
            maxSize: 25 * 1024, // 25kb
          },
        },
        generator: {
          // 打包到 dist/image 文件下
          filename: 'images/[contenthash][ext][query]',
        },
      },
      {
        test: /\.js$/,
        // 使用include来指定编译文件夹
        include: path.resolve(__dirname, '../src'),
        // 排除node_modules中的js
        exclude: /node_modules/,
        use: [
          'cache-loader', // 缓存资源，提高二次构建的速度
          'thread-loader', // 多进程打包，可以大大提高构建的速度
          'babel-loader',
        ],
      },
      {
        test: /\.vue$/,
        use: 'vue-loader',
      },
    ],
  },

}