var asyncRequire = require('enb/lib/fs/async-require'),
    path = require('path');

module.exports = require('enb/lib/build-flow').create()
    .name('widgets-manifest')
    .target('target', '?.manifest.css')
    .useSourceFilename('widgets-list', '?.widgets-list.js')
    .builder(function(widgetsFile) {
        return asyncRequire(widgetsFile)
            .then(function(widgets) {
                return widgets
                    .filter(function(w) {
                        return w.image !== 'none';
                    })
                    .map(function(widget) {
                        return [
                            "." + widget.widget + '__manifest_preview',
                            "{",
                            "   background-image: url(../../widgets/" +
                                widget.widget + "/" +
                                widget.image +");",
                            "   background-position: center;",
                            "   background-size: 150%;",
                            "}",
                            ""
                        ].join('\n');
                    }).join('\n');
            });
    })
    .createTech();
