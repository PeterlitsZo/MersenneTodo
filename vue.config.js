const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')

module.exports = {
  configureWebpack: {
    plugins: [
      new MonacoWebpackPlugin({
        languages: ['markdown']
      })
    ]
  },
  transpileDependencies: [
    /\bvue-awesome\b/
  ],
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true
    }
  }
}
