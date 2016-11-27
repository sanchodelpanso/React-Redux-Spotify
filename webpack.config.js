var webpack  = require('webpack');
var path = require('path');
var precss = require('precss');
var autoprefixer = require('autoprefixer');

module.exports = {
    debug: true,
    devtool: 'source-map',
    noInfo: false,
    entry: [
        './src/index'
    ],
    target: 'web',
    output: {
        path: __dirname + '/dist',
        publicPath: '/',
        filename: 'main.js'
    },
    devServer: {
        contentBase: './src',
        stats: 'errors-only',
        historyApiFallback: true
    },
    plugins: [
        new webpack.NoErrorsPlugin()
    ],
    module: {
        loaders: [
            {
                test: /\.scss$/,
                loader: 'style!css!postcss!sass'
            },
            {
                test: /\.(png|jpg|)$/,
                loader: 'file?name=dist/[path]/[name].[ext]'
            },
            {
                test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=application/font-woff&name=dist/fonts/[name].[ext]'
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=application/octet-stream&name=dist/fonts/[name].[ext]'
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file?name=fonts/[name].[ext]'
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=image/svg+xml&name=dist/fonts/[name].[ext]'
            },
            {
                test: /\.js$/,
                loader: 'babel',
                include: path.join(__dirname, 'src')
            }
        ]
    },
    resolve: {
        extensions: ["", ".js"],
        alias: {
            APP:        path.resolve(__dirname, 'src/app'),
            MODELS:     path.resolve(__dirname, 'src/app/models'),
            SERVICES:   path.resolve(__dirname, 'src/app/services'),
            COMPONENTS: path.resolve(__dirname, 'src/app/components'),
            ACTIONS:    path.resolve(__dirname, 'src/app/actions'),
            REDUCERS:   path.resolve(__dirname, 'src/app/reducers')
        }
    },
    postcss: function () {
        return [precss, autoprefixer];
    }
};