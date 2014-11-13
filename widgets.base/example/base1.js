modules.define(
    'example',
    ['i-bem__dom', 'jquery', 'widget'],
    function(provide, BEMDOM, $, Widget, server) {

provide(BEMDOM.decl({block: this.name, baseBlock: Widget}, {

    onSetMod: {
        js: {
            inited: function() {
                this
                    .widgetAPI()
                    .configure(function(widget, settings) {
                        widget.setProps({width: 400, height: 160});

                        settings
                            .setProps({width: 200, height: 260})
                            .input({placeholder: 'hint', label: 'Text area', handler: this._onChange})
                            .checkbox({text: 'Example1', handler: this._onChange})
                            .checkbox({text: 'Example2', handler: this._onChange});
                    });

            }
        }
    },

    _onChange: function(text, elem) {
        console.log(arguments);
    }

}));

});
