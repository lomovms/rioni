const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.config')

const PUBLIC_PATH = process.env.PUBLIC_PATH || '/local/templates/rioni/'
const PUBLIC_BASE = PUBLIC_PATH.replace(/\/?$/, '/')
const ASSET_BASE = `${PUBLIC_BASE}assets/`
const shouldRewriteAssets = /^(https?:)?\/\//.test(PUBLIC_BASE) || PUBLIC_BASE.startsWith('/')

class AbsoluteAssetsPlugin {
  apply(compiler) {
    compiler.hooks.emit.tap('AbsoluteAssetsPlugin', compilation => {
      Object.keys(compilation.assets).forEach(filename => {
        if (!/\.(html|css|js)$/.test(filename)) return

        const source = compilation.assets[filename].source().toString()
        const updated = source
          .replace(/\.\.\/assets\//g, ASSET_BASE)
          .replace(/\.\/assets\//g, ASSET_BASE)

        compilation.assets[filename] = {
          source: () => updated,
          size: () => Buffer.byteLength(updated)
        }
      })
    })
  }
}

class RelativeCssAssetsPlugin {
  apply(compiler) {
    compiler.hooks.emit.tap('RelativeCssAssetsPlugin', compilation => {
      Object.keys(compilation.assets).forEach(filename => {
        if (!/\.css$/.test(filename)) return

        const source = compilation.assets[filename].source().toString()
        const updated = source
          .replace(/\.\.\/assets\/images\//g, '../images/')
          .replace(/\.\.\/assets\/fonts\//g, '../fonts/')

        compilation.assets[filename] = {
          source: () => updated,
          size: () => Buffer.byteLength(updated)
        }
      })
    })
  }
}

const buildWebpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  output: {
    publicPath: PUBLIC_BASE
  },
  plugins: shouldRewriteAssets ? [
    new AbsoluteAssetsPlugin()
  ] : [
    new RelativeCssAssetsPlugin()
  ]
})

module.exports = new Promise((resolve, reject) => {
  resolve(buildWebpackConfig)
} )
