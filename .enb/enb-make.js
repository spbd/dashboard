var levels = require('enb-bem-techs/techs/levels'),
    levelsToBemdecl = require('enb-bem-techs/techs/levels-to-bemdecl'),
    files = require('enb-bem-techs/techs/files'),
    provide = require('enb/techs/file-provider'),
    bemdecl = require('enb-bem-techs/techs/bemjson-to-bemdecl'),
    deps = require('enb-bem-techs/techs/deps'),
    css = require('enb-stylus/techs/css-stylus'),
    js = require('enb-diverse-js/techs/browser-js'),
    ym = require('enb-modules/techs/prepend-modules'),
    borschik = require('enb-borschik/techs/borschik'),
    bhServerInclude = require('enb-bh/techs/bh-server-include'),
    bhYm = require('enb-bh/techs/bh-client-module'),
    html = require('enb-bh/techs/html-from-bemjson'),
    mergeFiles = require('enb/techs/file-merge'),
    depsMerge = require('enb/techs/deps-merge'),
    widgetsList = require('./techs/widgets-list');
    widgetsDeps = require('./techs/widgets-deps');
    widgetsYm = require('./techs/widgets-ym');

module.exports = function(config) {
    var node = 'build/dashboard';

    config.node(node, function(nodeConfig) {
        nodeConfig.addTechs([
            [provide, {target : '?.bemjson.js'}],
            [levels, {levels: getLevels(config)}],
            [files],
            [deps, {target: '?.project.deps.js'}],
            [widgetsDeps, {source: '?.project.deps.js'}],
            [widgetsList],
            [widgetsYm],
            [bemdecl],
            [css],
            [js, { target : '?.source.js' }],
            [ym, {
                source : '?.source.js',
                target : '?.ym.js'
            }],
            [bhServerInclude, {jsAttrName: 'data-bem', jsAttrScheme: 'json'}],
            [bhYm, {target : '?.client.bh.js', jsAttrName: 'data-bem', jsAttrScheme: 'json'}],
            [mergeFiles, {
                target : '?.browser+bh+widgets.js',
                sources : ['?.ym.js', '?.client.bh.js', '?.widgets-ym.js']
            }],
            [html]
        ]);

        nodeConfig.mode('development', function(nodeConfig) {
            nodeConfig.addTechs([
                [
                    require('enb/techs/file-copy'),
                    {sourceTarget: '?.browser+bh+widgets.js', destTarget: '_?.js'}
                ],
                [
                    require('enb/techs/file-copy'),
                    {sourceTarget: '?.css', destTarget: '_?.css'}
                ]
            ]);
        });

        nodeConfig.addTargets(['_?.js', '_?.css', '?.html']);
    });

};

function getLevels(config) {
    return [
        'libs/bem-core/common.blocks',
        'libs/bem-core/desktop.blocks',
        'uicore',
        'widgets',
    ].map(function(level) {
        return config.resolvePath(level);
    });
}