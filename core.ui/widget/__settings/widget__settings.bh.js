module.exports = function(bh) {
    bh.match('widget__settings', function(ctx) {
        ctx.content([
            {elem: 'set-title', content: 'Settings'},
            {elem: 'set-controls'},
            {
                elem: 'set-save',
                content: {
                    block: 'button',
                    text: 'save',
                    mods: {theme: 'islands', size: 's'}
                }
            }
        ]);
    });
};
