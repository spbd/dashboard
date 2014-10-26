var vfs = require('enb/lib/fs/async-fs'),
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
    .builder(function(depsFile) {
        return vfs
            .listDir(this._widgetsDir)
            .then(function(widgets) {
                return 'module.exports = ' + JSON.stringify(widgets, null, 4) + ';';
            });
    })
    .createTech();
