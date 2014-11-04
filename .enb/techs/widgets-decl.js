var asyncRequire = require('enb/lib/fs/async-require'),
    path = require('path');

module.exports = require('enb/lib/build-flow').create()
    .name('widgets-decl')
    .target('target', '?.bemdecl.js')
    .useSourceFilename('source', '?')
    .useSourceFilename('widgets-list', '?.widgets-list.js')
    .builder(function(declFile, widgetsFile) {
        return asyncRequire(declFile)
            .then(function(declModule) {
                return asyncRequire(widgetsFile)
                    .then(function(widgets) {
                        widgets.forEach(function(widget) {
                            declModule.blocks.push({name: widget.widget});
                        });
                        return 'exports.blocks = ' +
                            JSON.stringify(declModule.blocks, null, 4) +
                            ';';
                    });
            });
    })
    .createTech();
