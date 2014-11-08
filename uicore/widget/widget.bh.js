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
                                    elem: 'adds-controls',
                                    content: [
                                        {elem: 'adds-pane'},
                                        {
                                            elem: 'adds-remove',
                                            content: 'DEL'
                                        },
                                        {
                                            elem: 'adds-settings',
                                            content: 'SET'
                                        },
                                        {
                                            elem: 'adds-resize',
                                            content: '<->'
                                        }
                                    ]
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
