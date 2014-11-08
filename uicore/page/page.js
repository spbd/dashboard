modules.define('page', ['i-bem__dom', 'jquery'], function(provide, BEMDOM, $) {

provide(BEMDOM.decl(this.name, {

    _step: 10,

    onSetMod: {
        js: {
            inited: function() {
                this.bindToWin('mousemove', function(e) {
                    if(this._target) {
                        var x = e.pageX - this._offsetX,
                            y = e.pageY - this._offsetY;

                        x % this._step === 0 && this._target.css({left: x});
                        y % this._step === 0 && this._target.css({top: y});
                    }
                });

                this.bindToWin('mousedown', function(e) {
                    if(e.target.className === 'widget__adds-pane') {
                        this._target = $(e.target).closest('.widget');

                        this._offsetX = e.pageX - this._target.offset().left;
                        this._offsetY = e.pageY - this._target.offset().top;

                        this._prev.css({'z-index': '98'});
                        this._target.css({'z-index': '99'});
                    }
                });

                this.bindToWin('mouseup', function(e) {
                    this._prev = this._target;
                    this._target = null;
                });
            }
        }
    }

}));

});
