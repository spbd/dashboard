modules.define(
    'lib-status',
    ['i-bem__dom', 'jquery', 'widget', 'server', 'bh'],
    function(provide, BEMDOM, $, Widget, server, bh) {

provide(BEMDOM.decl({block: this.name, baseBlock: Widget}, {

    onSetMod: {
        js: {
            inited: function() {
                var _this = this;
                this
                    .widgetAPI()
                    .configure(function(widget, settings) {
                        widget.setProps({width: 300, height: 350});

                        settings
                            .setProps({width: 200, height: 100})
                            .select({
                                update: this._updateSelect.bind(this),
                                handler: this._onSelectChange.bind(this),
                                label: 'Select library'
                            });
                    })
                    .onLoadWidget(function() {
                        console.log('server,', _this.server);
                        _this.server.on('update', function(data) {
                            _this._branches = data;
                            _this._drawBranches();
                        });
                    })
                    .init();
            }
        }
    },

    _updateSelect: function(select) {
        this.server.get('libs', function(data) {
            var libs = data.map(function(lib) {
                    return {val: lib, text: lib};
                });

                libs[0].checked = true;
                select.update(libs);

                this._selectedLib = libs[0].text;
                this.server.emit('init', {lib: this._selectedLib});
        }.bind(this));
    },

    _onSelectChange: function(lib, elem) {
        this._selectedLib = lib;
        this.server.emit('init', {lib: this._selectedLib});

        BEMDOM.update(this.elem('container'), bh.apply({
            block: 'lib-status',
            elem: 'load',
            content: 'Loading...'
        }));
    },

    _drawBranches: function() {
        if(!this._branches) {
            return;
        }
        var status = 'success',
            data = this._branches.map(function(branch) {
                if(branch.status === 'failed') {
                    status = 'failed';
                }
                return {
                    block: 'lib-status',
                    elem: 'branch',
                    branch: branch
                };
            });

        this.findElem('lib').text(this._selectedLib);
        BEMDOM.destruct(this.findElem('load'));
        BEMDOM.update(this.elem('container'), bh.apply(data));
        this.setMod('status', status);
    }

}));

});
