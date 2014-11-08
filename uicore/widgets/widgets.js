modules.define(
    'widgets',
    ['i-bem__dom', 'widgets-list', 'bh'],
    function(provide, BEMDOM, widgetsList, bh) {

provide(BEMDOM.decl(this.name, {

    onSetMod: {
        js: {
            inited: function() {
                widgetsList.forEach(function(widget) {
                    this._addWidget(widget);
                }, this);
            }
        }
    },

    _addWidget: function(widgetName) {
        BEMDOM
            .append(this.domElem, bh.apply({
                block: 'widgets',
                elem: 'item',
                name: widgetName
            }));
    },

    _createWidgetInstance: function(event) {
        var widgetName = this.elemParams(event.currentTarget).widget,
            board = this.findBlockInside(BEMDOM.scope, 'board').domElem;

        BEMDOM.append(board, bh.apply({block: 'widget', widget: widgetName}));
    }

}, {

    live: function() {
        this.liveBindTo('item', 'click', this.prototype._createWidgetInstance);

        return false;
    }

}));

});
