modules.define(
    'simple',
    ['i-bem__dom', 'jquery', 'widget'],
    function(provide, BEMDOM, $, Widget) {

provide(BEMDOM.decl({block: this.name, baseBlock: Widget}, {

    onSetMod: {
        js: {
            inited: function() {
                this
                    .widgetAPI()
                    .configure(function(config) {
                        config.setProps({glueToGrid: true, multiple: true});
                    })
                    .settings(function(constructor) {
                        constructor
                            .setProps({width: 100, height: 200})
                            .input({placeholder: 'hint', label: 'Text area', handler: this._onInputChange})
                            .button({placeholder: 'hint', label: 'Text area', handler: this._onInputChange})
                            .input({placeholder: 'hint', label: 'Text area', handler: this._onInputChange})
                            .input({placeholder: 'hint', label: 'Text area', handler: this._onInputChange});
                    });
                    // .onSettingsShow(function() {
                    //     console.log('Settings show');
                    // });
            }
        }
    },

    _onInputChange: function(text, elem) {

    },

    // this.container.add(/* elem */)
    // this.container.remove(/* elem */)

}));

});
