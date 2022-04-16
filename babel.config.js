module.exports = {
  presets: [
    // 配置规则
    "@babel/preset-env",
    // 支持vue中的jsx语法
    "@vue/babel-preset-jsx"
  ],
  // 转换async/await所需插件
  plugins: ["@babel/plugin-transform-runtime"]
}