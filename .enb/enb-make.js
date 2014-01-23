var levels = require('enb-bem-techs/techs/levels'),
    levelsToBemdecl = require('enb-bem-techs/techs/levels-to-bemdecl'),
    files = require('enb-bem-techs/techs/files'),
    provide = require('enb/techs/file-provider'),
    bemdecl = require('enb-bem-techs/techs/bemjson-to-bemdecl'),
    deps = require('enb-bem-techs/techs/deps'),
    css = require('enb/techs/css');
    js = require('enb-diverse-js/techs/browser-js'),
    ym = require('enb-modules/techs/prepend-modules'),
    borschik = require('enb-borschik/techs/borschik'),
    bhServerInclude = require('enb-bh/techs/bh-server-include'),
    html = require('enb-bh/techs/html-from-bemjson');

module.exports = function(config) {
    config.node('build/index');

    config.nodeMask(/build\/.*/, function(nodeConfig) {
        nodeConfig.addTechs([
            [provide, {target : '?.bemjson.js'}],
            [levels, {levels: getLevels(config)}],
            [files],
            [deps],
            [bemdecl],
            [css],
            [js, { target : '?.source.js' }],
            [ym, {
                source : '?.source.js',
                target : '?.ym.js'
            }],
            [bhServerInclude, {jsAttrName : 'data-bem', jsAttrScheme : 'json'}],
            [html]
        ]);

        nodeConfig.mode('development', function(nodeConfig) {
            nodeConfig.addTechs([
                [
                    require('enb/techs/file-copy'),
                    {sourceTarget: '?.ym.js', destTarget: '?.browser.js'}
                ],
                [
                    require('enb/techs/file-copy'),
                    {sourceTarget: '?.css', destTarget: '_?.css'}
                ]
            ]);
        });

        nodeConfig.addTargets([
            '?.browser.js', '?.css', '?.bh.js', '?.html'
        ]);

    });

};

function getLevels(config) {
    return [
        'libs/bem-core/common.blocks',
        'blocks',
    ].map(function(level) {
        return config.resolvePath(level);
    });
}
