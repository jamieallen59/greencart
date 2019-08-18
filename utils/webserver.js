
const webpack = require("webpack")
const WebpackDevServer = require("webpack-dev-server")

const config = require("../webpack.config")
const env = require("./env")
const path = require("path")

// TODO: can probably remove all of this
const options = (config.chromeExtensionBoilerplate || {})
const excludeEntriesToHotReload = (options.notHotReload || [])

console.log('options', options)
console.log('excludeEntriesToHotReload', excludeEntriesToHotReload)

for (const entryName in config.entry) {
  if (excludeEntriesToHotReload.indexOf(entryName) === -1) {
    config.entry[entryName] =
      [
        ("webpack-dev-server/client?http://localhost:" + env.PORT),
        "webpack/hot/dev-server"
      ].concat(config.entry[entryName])
  }
}

config.plugins = [
  new webpack.HotModuleReplacementPlugin()
].concat(config.plugins || [])

delete config.chromeExtensionBoilerplate

const compiler = webpack(config)

const server = new WebpackDevServer(compiler, {
  hot: true,
  contentBase: path.join(__dirname, "../build"),
  headers: { "Access-Control-Allow-Origin": "*" },
  disableHostCheck: true
})

server.listen(env.PORT)