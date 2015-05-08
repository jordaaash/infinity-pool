'use strict';

var path    = require('path');
var webpack = require('webpack');

var root   = path.resolve(__dirname, '..');
var config = {
    verbose: true,
    colors:  true,
    debug:   true,
    entry:   {
        'infinity-pool': path.join(root, 'index.js')
    },
    output:  {
        path:          path.join(root, 'dist'),
        filename:      '[name].js',
        library:       'InfinityPool',
        libraryTarget: 'umd'
    },
    plugins: [
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
        extensions: ['', '.js']
    },
    target:  'web'
};

module.exports = config;
