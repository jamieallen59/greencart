const webpack = require("webpack")
const config = require("../webpack.config")

delete config.chromeExtensionBoilerplate

webpack(
  config,
  error => { if (error) throw error }
)