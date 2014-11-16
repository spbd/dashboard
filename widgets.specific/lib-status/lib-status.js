modules.define(
    'lib-status',
    ['i-bem__dom', 'jquery', 'widget', 'server', 'bh'],
    function(provide, BEMDOM, $, Widget, server, bh) {

provide(BEMDOM.decl({block: this.name, baseBlock: Widget}, {

    onSetMod: {
        js: {
            inited: function() {
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
                    .init();

                    server.on('widgets/lib-status/change', function(e, data) {
                        this._branches = data[this._selectedLib];
                        this._drawBranches();
                    }.bind(this));
            }
        }
    },

    _updateSelect: function(select) {
        setTimeout(function() {
            var opts = ['Library1', 'Library2'].map(function(lib) {
                return {val: lib, text: lib};
            });

            opts[0].checked = true;
            select.update(opts);

            this._selectedLib = opts[0].text;
            // this.server.emit('lib', opts[0].text);
        }.bind(this), 1000);
    },

    _onSelectChange: function(lib, elem) {
        this._selectedLib = lib;
        // this.server.emit('lib', lib);

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
