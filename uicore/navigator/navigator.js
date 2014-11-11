modules.define(
    'navigator',
    ['i-bem__dom','jquery', 'bh'],
    function(provide, BEMDOM, $, bh, debounce) {

BEMDOM.decl(this.name, {

    onSetMod: {
        'js': {
            'inited': function() {
                this.bindToWin('mousemove', this._winMove);
                this._timer = null;
                this._isSwitcherShow = false;
                this._popupOpened = false;
                this.setMod(this.elem('switcher'), 'hidden', 'yes');

                this.elem('switcher').on('mouseenter', function() {
                    this._mouseMove = true;
                    clearTimeout(this._timer);
                }.bind(this));

                this.elem('switcher').on('mouseout', function() {
                    this._mouseMove = false;
                }.bind(this));
            }
        }
    },

    _winMove: function() {
        if(this._popupOpened || this._mouseMove) return;

        if(!this._isSwitcherShow) {
            this._showSwitcher();
            this._isSwitcherShow = true;
        }

        this._timer && clearTimeout(this._timer);
        this._timer = setTimeout(function() {
            this._hideSwitcher();
            this._isSwitcherShow = false;
        }.bind(this), 3000);
    },

    _hideSwitcher: function() {
        this.toggleMod(this.elem('switcher'), 'hidden', 'yes', 'no');
    },

    _showSwitcher: function() {
        this.toggleMod(this.elem('switcher'), 'hidden', 'yes', 'no');
    },

    onElemSetMod: {
        'popup': {
            'opened': {
                'yes': function() {
                    clearTimeout(this._timer);
                    this._popupOpened = true;
                },
                'no': function() {
                    this._popupOpened = false;
                }
            }
        }
    },

    _createPopup: function() {
        if(!this._popup) {
            var left = this.elem('switcher').offset().left + (this.elem('switcher').width() / 2) + 3;
            this._popup = BEMDOM.append(
                BEMDOM.scope,
                bh.apply({
                    block: 'navigator',
                    elem: 'popup'
                })
            );
            this._popup.css({
                left: left - (this._popup.width() / 2),
                // top: this.elem('switcher').offset().top + (this.elem('switcher').height() / 2) + 30
            });
        }
        return this._popup;
    },

    _toggle: function() {
        this.toggleMod(this._createPopup(), 'opened', 'yes', 'no');
    }

}, {
    live: function() {
        this.liveBindTo('switcher', 'click', this.prototype._toggle);
        return false;
    }
});

provide(BEMDOM);

});
