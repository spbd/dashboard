module.exports = function(bh) {
    bh.match('staging-space__space', function(ctx) {
        ctx.content([
            {
                elem: 'value',
                content: 'No data received yet...'
            },
            
            {
                elem: 'percents',
                content: ''
            }
        ]);
    });

};
