module.exports = function(bh) {
    bh.match('staging-space__space', function(ctx) {
        ctx.content([
            {
                elem: 'value',
                content: 'in megabytes'
            },
            
            {
                elem: 'percents',
                content: 'in percents'
            }
        ]);
    });

};
