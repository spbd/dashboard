module.exports = function(bh) {

    bh.match('staging-space', function(ctx) {
        
        ctx.content([
            {
                elem: 'title',
                content: 'Staging space'
            },
            {
                elem: 'container',
                content: [
                    {
                        elem: 'space',
                        mods: {type: 'available'}
                    },
                    {
                        elem: 'space',
                        mods: {type: 'used'}
                    }
                ]
            }
        ]);
    
    });
};
