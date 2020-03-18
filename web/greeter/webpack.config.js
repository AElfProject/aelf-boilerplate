const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const DIST = path.resolve(__dirname, './dist');

module.exports = {
    entry: {
        index: './index.js'
    },
    mode: 'development',
    output: {
        path: DIST,
        filename: 'greeter.bundle.js'
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
        contentBase: DIST,
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
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, './index.css'),
                to: path.resolve(DIST, './index.css')
            },
        ]),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './template.html'),
            filename: 'index.html',
            chunks: ['index']
        })
    ]
};
