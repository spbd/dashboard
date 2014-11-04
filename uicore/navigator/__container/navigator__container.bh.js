module.exports = function(bh) {
    bh.match('navigator__container', function(ctx) {
        ctx.content({block: 'widgets'});
    });
};
