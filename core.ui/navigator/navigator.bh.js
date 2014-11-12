module.exports = function(bh) {
    bh.match('navigator', function(ctx) {
        ctx
            .content({elem: 'switcher'})
            .js(true);
    });
};
