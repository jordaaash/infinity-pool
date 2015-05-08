'use strict';

var React = require('react');

var render = function (Component) {
    document.addEventListener('DOMContentLoaded', function (event) {
        var element = React.createElement(Component);
        var body    = document.getElementById('body');
        React.render(element, body);
    });
};

module.exports = render;
