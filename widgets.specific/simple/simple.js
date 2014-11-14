modules.define(
    'simple',
    ['i-bem__dom', 'jquery', 'widget', 'server'],
    function(provide, BEMDOM, $, Widget, server) {

provide(BEMDOM.decl({block: this.name, baseBlock: Widget}, {

    onSetMod: {
        js: {
            inited: function() {
                this
                    .widgetAPI()
                    .configure(function(widget, settings) {
                        widget.setProps({width: 400, height: 160});

                        // win min / win max

                        settings
                            .setProps({width: 200, height: 260})
                            .input({placeholder: 'hint', label: 'Text area', handler: this._onInputChange})
                            .checkbox({text: 'Use normal', handler: this._onInputChange})
                            .checkbox({text: 'normal', handler: this._onInputChange})
                            .input({placeholder: 'hint', label: 'Text area', handler: this._onInputChange})
                            .input({placeholder: 'hint', label: 'Text area', handler: this._onInputChange})
                            .checkbox({text: 'Use normal load', checked: true, handler: this._onInputChange})
                            .select({options: [
                                {val: '1', text: 't1'},
                                {val: '2', text: 't2', checked: true},
                                {val: '3', text: 't3'}
                            ], handler: this._onInputChange, label: 'Trolololo'});
                    })
                    .onSaveSettings(function(controls) {
                        console.log('Settings save', controls);
                    })
                    .onShowSettings(function() {
                        console.log('Settings show');
                    })
                    .init();

                    // board.notify('Simple: bad connection');
                    //
                    server.on(
                        'widgets/staging-space/change',
                        function(e, data) {

                        console.log(data);

                    });
            }
        }
    },

    _onInputChange: function(text, elem) {
        console.log(arguments);
    }

    // this.container.add(/* elem */)
    // this.container.remove(/* elem */)

}));

});
