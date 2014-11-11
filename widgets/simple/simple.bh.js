module.exports = function(bh) {

    bh.match('simple', function(ctx) {
        ctx.content([
            {
                elem: 'one',
                content: 'OneOne'
            },
            {
                elem: 'two',
                content: 'TWO'
            },
            {
                elem: 'three',
                content: 'Thre eee'
            },
            {
                elem: 'fourth'
            }
        ]);
    });

};
