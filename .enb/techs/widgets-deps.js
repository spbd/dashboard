var vfs = require('enb/lib/fs/async-fs'),
    asyncRequire = require('enb/lib/fs/async-require'),
    path = require('path');

module.exports = require('enb/lib/build-flow').create()
    .name('widgets-deps')
    .target('target', '?.deps.js')
    .useSourceFilename('source', '?')
    .builder(function(depsFile) {
        return vfs
            .listDir(path.join(this.node.getRootDir(), 'widgets'))
            .then(function(widgets) {
                return asyncRequire(depsFile)
                    .then(function(depsModule) {
                        widgets.forEach(function(widget) {
                            depsModule.deps.push({block: widget});
                        });
                        return 'exports.deps = ' +
                            JSON.stringify(depsModule, null, 4) +
                            ';';
                    });
            });
    })
    .createTech();
