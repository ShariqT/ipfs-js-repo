const webpack = require('webpack')
const NodePolyfilPlugin = require('node-polyfill-webpack-plugin')

module.exports = {
    configureWebpack: {
        plugins: [
            new NodePolyfilPlugin(),
            new webpack.ProvidePlugin({
                Buffer: ['buffer', 'Buffer'],
                process: 'process/browser'
            })
        ]
    },
    chainWebpack: config => config.resolve.symlinks(false)
}