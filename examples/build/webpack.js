'use strict';

var path    = require('path');
var webpack = require('webpack');

var root = path.resolve(__dirname, '..');
var lib  = path.resolve(root, '..', 'src');
var dist = path.join(root, 'dist');

var config = function (example) {
    var src = path.join(root, 'src', example);

    return {
        verbose: true,
        colors:  true,
        debug:   true,
        entry:   {
            index: [
                'webpack-dev-server/client?http://localhost:8080',
                'webpack/hot/only-dev-server',
                path.join(src, 'index.js')
            ]
        },
        module:  {
            loaders: [
                {
                    test:    /\.jsx?$/,
                    loaders: ['react-hot-loader', 'babel-loader?stage=1&optional=runtime'],
                    include: [src, lib]
                }
            ]
        },
        output:  {
            filename:      '[name].js',
            library:       'InfinityPool',
            libraryTarget: 'umd',
            path:          path.join(dist, example),
            publicPath:    '/'
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin,
            new webpack.NoErrorsPlugin,
            new webpack.optimize.OccurenceOrderPlugin,
            new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 }),
            new webpack.optimize.DedupePlugin,
            new webpack.SourceMapDevToolPlugin(
                '[file].map', null,
                "[absolute-resource-path]", "[absolute-resource-path]"
            )
        ],
        resolve: {
            extensions: ['', '.js', '.jsx']
        },
        target:  'web'
    };
};

module.exports = ['basic'].map(config);
