'use strict';

var getScrollTop = require('./get_scroll_top');

var getOffset = function () {
    var scrollTop = getScrollTop();
    var clientTop = document.documentElement.clientTop;
    var offset;

    if (clientTop == null) {
        clientTop = document.body.clientTop;
    }
    if (clientTop == null) {
        clientTop = 0;
    }

    offset = scrollTop - clientTop;

    return offset;
};

module.exports = getOffset;
