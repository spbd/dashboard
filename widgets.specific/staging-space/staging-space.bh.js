module.exports = function(bh) {

    bh.match('staging-space', function(ctx) {
        
        ctx.content([
            {
                elem: 'space',
                mods: {type: 'available'}
            },
            
            {
                elem: 'space',
                mods: {type: 'used'}
            }
        ]);
    
    });
};
