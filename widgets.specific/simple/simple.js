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
                            .radioGroup({options:[
                                {val: 1, text: 'first'},
                                {val: 2, text: 'first'},
                                {val: 3, text: 'second', checked: true},
                                {val: 4, text: 'third'},
                                {val: 5, text: 'second'}

                            ], handler: this._onInputChange, label: 'Super Checkbox'})
                            .input({placeholder: 'hint', label: 'Text area', handler: this._onInputChange})
                            .checkbox({text: 'Use normal load', checked: true, handler: this._onInputChange})
                            .select({update: this._updateSelect, handler: this._onInputChange, label: 'Trolololo'});
                    })
                    .onSaveSettings(function(controls) {
                        console.log('Settings save', controls);
                    })
                    .onShowSettings(function() {
                        console.log('Settings show');
                    })
                    .onLoadWidget(function() {
                        console.log('Widget load');
                        console.log(arguments);
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

    _updateSelect: function(select) {
        setTimeout(function() {
            select.update([
                {val: '1', text: 't1'},
                {val: '2', text: 't2', checked: true},
                {val: '3', text: 't3'}
            ]);
        }, 3000);
    },

    _onInputChange: function(text, elem) {
        console.log(arguments);
    }

    // this.container.add(/* elem */)
    // this.container.remove(/* elem */)

}));

});
