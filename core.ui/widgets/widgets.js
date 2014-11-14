modules.define(
    'widgets',
    ['i-bem__dom', 'widgets-list', 'bh'],
    function(provide, BEMDOM, widgetsList, bh) {

provide(BEMDOM.decl(this.name, {

    onSetMod: {
        js: {
            inited: function() {
                this._board = this.findBlockInside(BEMDOM.scope, 'board');
                widgetsList.forEach(this._addWidget.bind(this));
            }
        }
    },

    _addWidget: function(widgetName) {
        BEMDOM.append(this.domElem, bh.apply({
            block: 'widgets',
            elem: 'item',
            name: widgetName
        }));
    },

    _createWidgetInstance: function(event) {
        var widgetName = this.elemParams(event.currentTarget).widget,
            instance = BEMDOM.append(
                this._board.domElem,
                bh.apply({block: 'widget', widgetName: widgetName})
            ),
            width = instance.width(),
            height = instance.height();

        instance
            .css({
                left: event.pageX - width / 2,
                top: event.pageY - height / 2,
                'z-index': 101,
                cursor: 'move',
                opacity: 0
            })
            .animate({opacity: 1});
    }

}, {

    live: function() {
        this.liveBindTo('item', 'click', this.prototype._createWidgetInstance);
        return false;
    }

}));

});
