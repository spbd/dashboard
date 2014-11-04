var asyncRequire = require('enb/lib/fs/async-require'),
    path = require('path');

module.exports = require('enb/lib/build-flow').create()
    .name('widgets-ym')
    .target('target', '?.widgets-ym.js')
    .useSourceFilename('widgets-list', '?.widgets-list.js')
    .builder(function(widgetsFile) {
        return asyncRequire(widgetsFile)
            .then(function(widgets) {
                widgets = widgets.map(function(w) {return w.widget;});
                return [
                    "modules.define('widgets-list', function(provide) {",
                    "   provide(" + JSON.stringify(widgets) + ");",
                    "});"
                ].join('\n');
            });
    })
    .createTech();
