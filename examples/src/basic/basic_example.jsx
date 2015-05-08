'use strict';

var React              = require('react');
var P                  = React.PropTypes;
var PureRenderMixin    = require('react/lib/ReactComponentWithPureRenderMixin');
var CSSTransitionGroup = require('react/lib/ReactCSSTransitionGroup');
var List               = require('../../../src/list');

var BasicExample = React.createClass({
    mixins:     [PureRenderMixin],
    render:     function () {
        var items = [];
        for (var i = 0; i < 30; i++) {
            items.push(<span key={ i }>Item #{ i + 1 }</span>);
        }
        return (
            <List
                itemHeight={ 224 }
                items={ items }
                renderItem={ this.renderItem }
                renderList={ this.renderList }/>
        );
    },
    renderList: function (items) {
        return (<ol className="infinite-list">{ items }</ol>);
    },
    renderItem: function (item, key) {
        return (
            <li
                className="infinite-list-item"
                key={ key }>{ item }</li>
        );
    }
});

module.exports = BasicExample;
