module.exports = function(bh) {
    bh.match('widget__container', function(ctx, json) {
        ctx.content({
            elem: 'faces',
            content: [
                {
                    elem: 'front',
                    content: [
                        {elem: 'adds-controls'},
                        {block: ctx.tParam('widgetName'), js: true}
                    ]
                },
                {elem: 'settings'}
            ]
        });
    });
};
