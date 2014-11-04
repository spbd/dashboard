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
                            content: [
                                {
                                    elem: 'show-settings',
                                    content: 'SHOW',
                                    tag: 'button'
                                },
                                {
                                    block: json.widget,
                                    js: true
                                }
                            ]
                        },
                        {
                            elem: 'settings',
                            js: true,
                            content: [
                                {elem: 'set-title', content: 'Settings'},
                                {elem: 'set-controls'},
                                {
                                    elem: 'set-save',
                                    content: {
                                        block : 'button',
                                        text : 'save',
                                        mods : { theme : 'islands', size : 's' }
                                    }
                                },
                            ]
                        }
                    ]
                }
            }
        ])
        .js(true);

    });

};
