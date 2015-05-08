'use strict';

var getScrollTop;

if (typeof window === 'undefined') {
    getScrollTop = function () {
        return 0;
    };
}
else {
    getScrollTop = function () {
        var scrollTop = window.pageYOffset;
        if (scrollTop == null) {
            scrollTop = document.documentElement.scrollTop;
        }
        if (scrollTop == null) {
            scrollTop = document.body.scrollTop;
        }
        if (scrollTop == null) {
            scrollTop = 0;
        }
        return scrollTop;
    };
}

module.exports = getScrollTop;
