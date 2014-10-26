var vfs = require('enb/lib/fs/async-fs'),
    vow = require('vow'),
    path = require('path');

module.exports = require('enb/lib/build-flow').create()
    .name('widgets-list')
    .target('target', '?.widgets-list.js')
    .needRebuild(function(cache) {
        this._widgetsDir = path.join(this.node.getRootDir(), 'widgets');
        return cache.needRebuildFile('widgets', this._widgetsDir);
    })
    .saveCache(function(cache) {
        cache.cacheFileInfo('widgets', this._widgetsDir);
    })
    .builder(function() {
        var _this = this;
        return vfs
            .listDir(this._widgetsDir)
            .then(function(widgets) {
                var promises = widgets.map(function(widget) {
                        return vfs
                            .listDir(path.join(_this._widgetsDir, widget))
                            .then(function(files) {
                                var image = 'none',
                                    mask = /^.+preview\..+$/;
                                files.some(function(file) {
                                    if(mask.test(file)) {
                                        image = file;
                                        return true;
                                    }
                                });
                                return {
                                    widget: widget,
                                    image: image
                                };
                            });
                    });

                return vow.all(promises);
            })
            .then(function(widgets) {
                return 'module.exports = ' + JSON.stringify(widgets, null, 4) + ';';
            });
    })
    .createTech();
