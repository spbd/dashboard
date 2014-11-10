modules.define(
    'board',
    ['i-bem__dom', 'widgets-list', 'bh'],
    function(provide, BEMDOM, widgetsList, bh) {

provide(BEMDOM.decl(this.name, {

    onSetMod: {
        js: {
            inited: function() {
                this._tryLoadWidgets();
            }
        }
    },

    _tryLoadWidgets: function() {
        var widgets = this._getWidgetsFromCookie();
        this._createWidgets(widgets);
    },

    _getWidgetsFromCookie: function() {
        var data = localStorage.getItem('widgets');
        return data ? JSON.parse(data) : [];
    },

    _createWidgets: function(widgets) {
        widgets.forEach(function(widget) {
            var instance = BEMDOM.append(this.domElem, bh.apply({
                    block: 'widget',
                    widget: widget.name,
                    js: {id: widget.id}
                })).bem('widget');

            instance
                .findElemInstance('settings')
                .setStates(widget.settings);

            instance.elem('container').css({
                width: widget.size.width,
                height: widget.size.height
            });

            instance.domElem.css({
                left: widget.position.left,
                top: widget.position.top
            });

        }, this);
    }

}, {

    live: function() {


        return false;
    }

}));

});
