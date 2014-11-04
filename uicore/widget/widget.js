modules.define(
    'widget',
    ['i-bem__dom', 'jquery', 'widget__config', 'bh'],
    function(provide, BEMDOM, $, Config, bh) {

provide(BEMDOM.decl(this.name, {

    widgetAPI: function widgetAPI() {
        var _this = this,
            _cfg,
            API = {
                configure: function(cb) {
                    _cfg = new Config();
                    cb(_cfg);
                    return API;
                },
                settings: function(cb) {
                    var _settings = _this
                        .findBlockOutside('widget')
                        .findElemInstance('settings');

                    cb(_settings.API());
                    _settings.buildControls();
                }
            };

        return API;
    }

    // _createSettings: function() {
    //     // this._settings = this
    //         // .findBlockOutside('widget')
    //         // .findElemInstances('settings');

    //     console.log(this);
    //     // this.settings && this.settings(this._settings);
    //     // this._settings.buildControls();
    // }

}));

});
