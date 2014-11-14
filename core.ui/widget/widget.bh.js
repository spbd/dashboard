module.exports = function(bh) {
    bh.match('widget', function(ctx, json) {
        ctx
            .tParam('widgetName', json.widgetName)
            .content({block: 'widget', elem: 'container'})
            .mods({attached: 'no'})
            .js(true);
    });
};
