module.exports = function(bh) {

    bh.match('widget', function(ctx, json) {

        ctx.content([
            {
                block: 'widget',
                elem: 'container',
                content: {
                    elem: 'faces',
                    content: [
                        {
                            elem: 'front',
                            content: {
                                block: json.widget,
                                js: true
                            }
                        },
                        {
                            elem: 'settings',
                            js: true,
                            content: json.widget + ' SETT'
                        }
                    ]
                }
            }
        ])
        .js(true);

    });

};
