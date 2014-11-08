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
                    _this._initBaseWidget();
                    _this._settings = _this._baseWidget.findElemInstance('settings');

                    console.log(_this._settings);

                    cb.call(_this, _this._settings.API());
                    _this._settings.buildControls();

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

    _initBaseWidget: function() {

        // move all event-handling to live section

        this._baseWidget = this.findBlockOutside('widget');

        this._baseWidget
            .findElem('adds-settings')
            .on('click', this._onShowSettings.bind(this));

        this._baseWidget
            .findElem('adds-remove')
            .on('click', this._onRemove.bind(this));

        this._baseWidget
            .findBlockInside(this._baseWidget.findElem('set-save'), 'button')
            .on('click', this._onShowContent.bind(this));

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

        // hide front controls
        this._baseWidget.findElem('front').fadeOut(600);

        this._baseWidget.toggleMod(this._baseWidget.findElem('faces'), 'side', 'back');
        this._onShowSettingsCb && this._onShowSettingsCb();
    },

    _onShowContent: function(widget) {

        // shown front controls

        this._baseWidget.findElem('front').fadeIn(600);

        this._baseWidget.toggleMod(this._baseWidget.findElem('faces'), 'side', 'back');
        this._onSaveSettingsCb && this._onSaveSettingsCb(this._settings.getStates());
    },

    _onRemove: function() {
        this._baseWidget
            .domElem
            .animate({opacity: 0}, 500, function() {
                console.log(this._settings._controls);
                this._settings.destruct();
                BEMDOM.destruct(this._baseWidget.domElem);
            }.bind(this));
    }

}));

});
