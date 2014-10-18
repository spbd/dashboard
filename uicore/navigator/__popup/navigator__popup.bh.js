module.exports = function(bh) {
    bh.match('navigator__popup', function(ctx) {
        ctx
            .content([
                {elem: 'tail'},
                {elem: 'container'}
            ])
            .mod('opened', 'no');
    });
};
