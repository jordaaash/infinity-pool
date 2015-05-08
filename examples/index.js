'use strict';

var DevServer = require('webpack-dev-server');
var webpack   = require('webpack');
var open      = require('open');
var path      = require('path');
var config    = require('./build/webpack');

var host   = 'localhost';
var port   = 8080;
var server = new DevServer(webpack(config), {
    contentBase: path.join(__dirname, 'dist'),
    host:        host,
    hot:         true,
    inline:      true,
    port:        port,
    progress:    true,
    publicPath:  '/',
    stats:       { colors: true }
});

server.listen(port, function () {
    console.log('Webpack server listening on ' + host + ' at ' + port);
    open('http://' + host + ':' + port);
});

module.exports = server;
