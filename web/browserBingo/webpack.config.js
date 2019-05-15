/**
 * @file webpack.config.js
 * @author hzz780
 */

const path = require('path');

module.exports = {
    entry: './index.js',
    mode: 'development',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bingo.bundle.js'
    }
};
