modules.define(
    'widget',
    ['i-bem__dom', 'jquery', 'widget__config', 'bh', 'cookie'],
    function(provide, BEMDOM, $, Config, bh, cookie) {

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
                    _this._baseWidget = _this.findBlockOutside('widget');
                    _this._settings = _this._baseWidget.findElemInstance('settings');

                    _this._initBaseWidget();

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
        // TODO: Move all events to live section

        this._id = this._baseWidget.params.id || (Math.random() * 0x10000000000).toString(36);
        this._mooving = {};

        this._baseWidget
            .findElem('adds-settings')
            .on('click', this._onShowSettings.bind(this));

        this._baseWidget
            .findElem('adds-remove')
            .on('click', this._onRemove.bind(this));

        this._baseWidget
            .findBlockInside(this._baseWidget.findElem('set-save'), 'button')
            .on('click', this._onShowContent.bind(this));

        this._baseWidget.findElem('adds-pane').on('mousedown', this._paneDown.bind(this));
        this._baseWidget.findElem('adds-resize').on('mousedown', this._resizeDown.bind(this));

        this.bindToWin('mouseup', this._winUp.bind(this));

        if(!this._baseWidget.params.id) {

            this.bindToWin('mousemove', this._initWinMove);
            this._baseWidget
                .findElem('adds-controls')
                .one('click', this._initWinClick.bind(this));
        }

        setTimeout(function() {
            this._recalculateFontsSize();
        }.bind(this), 25);
    },

    _resizeDown: function(e) {
        var mv = this._mooving,
            target = this._baseWidget.domElem,
            x = (target.offset().left + target.width()) - e.pageX,
            y = (target.offset().top + target.height()) - e.pageY;

        mv.offsetX = target.offset().left - x;
        mv.offsetY = target.offset().top - y;

        mv.right = this._baseWidget.elem('container').width();
        mv.bottom = this._baseWidget.elem('container').height();

        target.css({'z-index': '99'});

        this.bindToWin('mousemove', this._resizeWinMove);
        this._scanTextNodes();
    },

    _scanTextNodes: function() {
        this._textNodes = this.domElem
            .find('*')
            .toArray()
            .reduce(function(nodes, curr) {
                if(curr.textContent) {
                    nodes.push({
                        node: curr,
                        fontSize: parseInt($(curr).css('font-size'), 10)
                    });
                }
                return nodes;
            }, []);
    },

    _paneDown: function(e) {
        var target = this._baseWidget.domElem,
            mv = this._mooving;

        mv.offsetX = e.pageX - target.offset().left;
        mv.offsetY = e.pageY - target.offset().top;

        target.css({'z-index': '99'});

        this.bindToWin('mousemove', this._paneWinMove);
    },

    _winUp: function() {
        this.unbindFromWin('mousemove', this._paneWinMove);
        this.unbindFromWin('mousemove', this._resizeWinMove);

        this._saveToStorage();
    },

    _resizeWinMove: function(e) {
        var target = this._baseWidget,
            mv = this._mooving,
            w = e.pageX - mv.offsetX,
            h = e.pageY - mv.offsetY;

        if(w < 70 || h < 50) return;

        target.elem('container').css({width: w, height: h});

        this._resizeFonts();
    },

    _resizeFonts: function() {
        // Use throttling
        var w = this._baseWidget.elem('container').width(),
            h = this._baseWidget.elem('container').height(),
            mv = this._mooving,
            min = Math.min(mv.right, mv.bottom),
            size;

        w < h &&  (size = (w - min) / 5);
        h < w && (size = (h - min) / 5);

        this._textNodes.forEach(function(obj) {
            var newSize = obj.fontSize + size;
            // if(newSize < 10) return;

            obj.node.style.fontSize = newSize + 'px';
        });
    },

    _recalculateFontsSize: function() {
        this._scanTextNodes();

        var w = this._baseWidget.elem('container').width(),
            h = this._baseWidget.elem('container').height(),
            sizes = this._settings.getProps(),
            min = Math.min(sizes.width, sizes.height),
            size;

        w < h &&  (size = (w - min) / 5);
        h < w && (size = (h - min) / 5);

        this._textNodes.forEach(function(obj) {
            obj.node.style.fontSize = (obj.fontSize + size) + 'px';
        });
    },

    _paneWinMove: function(e) {
        var mv = this._mooving,
            x = e.pageX - mv.offsetX,
            y = e.pageY - mv.offsetY;

        this._baseWidget.domElem.css({left: x});
        this._baseWidget.domElem.css({top: y});
    },

    _initWinMove: function(e) {
        if(this._baseWidget.getMod('attached') === 'no') {
            var dom = this._baseWidget.domElem;

            dom.css({
                left: e.pageX - (dom.width() / 2),
                top: e.pageY - (dom.height() / 2)
            });
        }
    },

    _initWinClick: function() {
        this._baseWidget.domElem.css({
            'z-index': 98,
            cursor: 'default'
        });
        this._baseWidget.delMod('attached');
        this.unbindFromWin('mousemove', this._initWinMove);

        this._saveToStorage();
    },

    _resizeSettingsWindow: function() {
        var sets = this._settings,
            props = sets.getProps(),
            front = this._baseWidget.findElem('front'),
            offsetX = (props.width - front.width()) / 2,
            offsetY = (props.height - front.height()) / 2;

        this._settings.setSize(props.width, props.height);

        this._settings.setPos({
            left: offsetX * -1,
            top: offsetY * -1
        });
    },

    _onShowSettings: function(widget) {
        this._resizeSettingsWindow();
        this._baseWidget.findElem('front').fadeOut(600);
        this._baseWidget.toggleMod(this._baseWidget.findElem('faces'), 'side', 'back');
        this._onShowSettingsCb && this._onShowSettingsCb();
    },

    _onShowContent: function(widget) {
        this._baseWidget.findElem('front').fadeIn(600);
        this._baseWidget.toggleMod(this._baseWidget.findElem('faces'), 'side', 'back');
        this._onSaveSettingsCb && this._onSaveSettingsCb(this._settings.getStates());
        this._saveToStorage();
    },

    _onRemove: function() {
        this._baseWidget
            .domElem
            .animate({opacity: 0}, 500, function() {
                this._settings.destruct();
                BEMDOM.destruct(this._baseWidget.domElem);
            }.bind(this));

        this._removeFromStorage();
    },

    _saveToStorage: function() {
        var baseDom = this._baseWidget.elem('container'),
            settings = this._settings.getControls(),
            position = baseDom.offset(),
            size = {width: baseDom.width(), height: baseDom.height()},
            object = {
                id: this._id,
                name: this.__self._blockName,
                settings: settings,
                position: position,
                size: size
            };

        var data = localStorage.getItem('widgets'),
            widgets = data ? JSON.parse(data) : [],
            widget = widgets.some(function(w) {
                    if(w.id === this._id) {
                        w.settings = object.settings,
                        w.position = object.position,
                        w.size = object.size;
                        return true;
                    }
                }, this);

        !widget && widgets.push(object);
        localStorage.setItem('widgets', JSON.stringify(widgets));
    },

    _removeFromStorage: function() {
        var widgets = JSON
            .parse(localStorage.getItem('widgets'))
            .filter(function(widget) {
                return widget.id !== this._id;
            }, this);

        localStorage.setItem('widgets', JSON.stringify(widgets) || '');
    }

}));

});
