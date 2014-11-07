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
                    cb.call(_this, _cfg);
                    return API;
                },
                settings: function(cb) {
                    var _widget = _this.findBlockOutside('widget'),
                        _settings = _widget.findElemInstance('settings');

                    _this._settings = _settings;
                    _this._baseWidget = _widget;

                    cb.call(_this, _settings.API());

                    _settings.buildControls();

                    _widget
                        .findElem('show-settings')
                        .on('click', _this._onShowSettings.bind(_this, _widget));

                    _widget
                        .findBlockInside(_widget.findElem('set-save'), 'button')
                        .on('click', _this._onShowContent.bind(_this, _widget));

                    return API;
                },
                onSaveSettings: function(cb) {
                    _this._onSaveSettingsCb = cb;
                    return API;
                },
                onShowSettings: function(cb) {
                    _this._onShowSettingsCb = cb;
                    return API;
                }
            };

        return API;
    },

    _resizeSettingsWindow: function() {
        var sets = this._settings,
            props = sets.getProps(),
            front = this._baseWidget.findElem('front'),
            offset = (props.width - front.width()) / 2;

        this._settings.setSize(props.width, props.height);
        this._settings.setLeft(offset * -1);
    },

    _onShowSettings: function(widget) {
        this._resizeSettingsWindow();

        widget.toggleMod(widget.findElem('faces'), 'side', 'back');
        this._onShowSettingsCb && this._onShowSettingsCb();
    },

    _onShowContent: function(widget) {
        widget.toggleMod(widget.findElem('faces'), 'side', 'back');
        this._onSaveSettingsCb && this._onSaveSettingsCb(this._settings.getStates());
    }

}));

});
