modules.define(
    'navigator',
    ['i-bem__dom','jquery', 'bh'],
    function(provide, BEMDOM, $, bh) {

BEMDOM.decl(this.name, {

    onSetMod: {
        'js': {
            'inited': function() {

            }
        }
    },

    onElemSetMod: {
        'popup': {
            'opened': {
                'true': function() {
                    // this.open();
                },
                '': function() {
                    // this.close();
                }
            }
        }
    },

    _createPopup: function() {
        if(!this._popup) {
            var left = this.elem('switcher').offset().left + (this.elem('switcher').width() / 2) + 3;
            this._popup = BEMDOM.append(
                this.domElem,
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
    }
});

provide(BEMDOM);

});
