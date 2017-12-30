const {resolve} = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    devtool: false,
    output: {
        filename: 'canvas-strike.min.js',
        path: resolve(__dirname, './dist'),
        publicPath: ''
    },
});