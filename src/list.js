'use strict';

var React           = require('react');
var PureRenderMixin = require('react/lib/ReactComponentWithPureRenderMixin');
var invariant       = require('react/lib/invariant');
var PropTypes       = React.PropTypes;

var List = React.createClass({
    mixins:               [PureRenderMixin],
    propTypes:            {
        itemComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
        itemHeight:    PropTypes.oneOfType([PropTypes.number, PropTypes.func]).isRequired,
        items:         PropTypes.array.isRequired,
        listComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
        renderItem:    PropTypes.func,
        renderList:    PropTypes.func
    },
    getDefaultProps:      function () {
        return {
            itemComponent: 'li',
            listComponent: 'ol'
        };
    },
    render:               function () {
        var items = this.renderItems(this.props.items);
        return this.renderList(items);
    },
    getItemHeight:        function (item) {
        var itemHeight = this.props.itemHeight;
        if (typeof itemHeight === 'function') {
            itemHeight = itemHeight(item);
            invariant(typeof itemHeight === 'number', '%s must be a %s', 'itemHeight', 'number');
        }
        return itemHeight;
    },
    renderItems:          function (items) {
        var renderItem = this.props.renderItem;
        if (renderItem == null) {
            renderItem = this.renderItem;
        }
        return items.map(renderItem, this);
    },
    renderItem:           function (item, key) {
        return React.createElement(this.props.itemComponent, { key: key }, item);
    },
    renderList:           function (items) {
        if (this.props.renderList == null) {
            return React.createElement(this.props.listComponent, items);
        }
        else {
            return this.props.renderList.call(this, items);
        }
    },
    componentDidMount:    function () {
        window.addEventListener('scroll', this.handleScroll, false);
        window.addEventListener('resize', this.handleResize, false);
    },
    componentWillUnmount: function () {
        window.removeEventListener('resize', this.handleResize, false);
        window.removeEventListener('scroll', this.handleScroll, false);
    },
    handleScroll:         function (event) {
    },
    handleResize:         function (event) {
    }
});

module.exports = List;
