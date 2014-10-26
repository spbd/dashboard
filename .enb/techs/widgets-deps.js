var asyncRequire = require('enb/lib/fs/async-require'),
    path = require('path');

module.exports = require('enb/lib/build-flow').create()
    .name('widgets-deps')
    .target('target', '?.deps.js')
    .useSourceFilename('source', '?')
    .useSourceFilename('widgets-list', '?.widgets-list.js')
    .builder(function(depsFile, widgetsFile) {
        return asyncRequire(depsFile)
            .then(function(depsModule) {
                return asyncRequire(widgetsFile)
                    .then(function(widgets) {
                        widgets.forEach(function(widget) {
                            depsModule.deps.push({block: widget});
                        });
                        return 'exports.deps = ' +
                            JSON.stringify(depsModule.deps, null, 4) +
                            ';';
                    });
            });
    })
    .createTech();
