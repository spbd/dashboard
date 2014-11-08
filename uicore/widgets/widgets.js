modules.define(
    'widgets',
    ['i-bem__dom', 'widgets-list', 'bh'],
    function(provide, BEMDOM, widgetsList, bh) {

provide(BEMDOM.decl(this.name, {

    onSetMod: {
        js: {
            inited: function() {
                this._board = this.findBlockInside(BEMDOM.scope, 'board');

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
            pos = this._getFreePos();

        var instance = BEMDOM
                .append(this._board.domElem, bh.apply({block: 'widget', widget: widgetName})),
            width = instance.width(),
            height = instance.height();

        instance.css({
            left: event.pageX - width / 2,
            top: event.pageY - height / 2,
            'z-index': 101,
            cursor: 'move',
            opacity: 0
        });

        instance.animate({opacity: 1});
    },

    _getFreePos: function() {
        var widgets = this._board
            .findBlocksInside('widget')
            .forEach(function(widget) {
                console.log(widget.domElem.offset());
            });

    }

}, {

    live: function() {
        this.liveBindTo('item', 'click', this.prototype._createWidgetInstance);

        return false;
    }

}));

});
