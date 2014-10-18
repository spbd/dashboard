module.exports = function(bh) {

    bh.match('navigator__tail', function(ctx) {
        return {
            elem: 'tail-wrap',
            content:  ctx.json()
        };
    });

};
