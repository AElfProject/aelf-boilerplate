/**
 * @file webpack.config.js
 * @author hzz780
 */

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        index: './index.js'
    },
    mode: 'development',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bingo.bundle.js'
    },
    devtool: 'source-map',
    resolve: {
        alias: {
            'aelf-sdk$': 'aelf-sdk/dist/aelf.umd.js'
        }
    },
    module: {
        rules: [{
            test: /\.js?$/,
            exclude: /node_modules/,
            use: ['babel-loader']
        }]
    },
    devServer: {
        disableHostCheck: true,
        contentBase: path.resolve(__dirname),
        // host: '0.0.0.0',
        host: '127.0.0.1',
        port: 9527,
        compress: true,
        hot: true,
        inline: true,
        historyApiFallback: true,
        open: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './template.html'),
            filename: 'index.html',
            chunks: ['index']
        })
    ]
};
