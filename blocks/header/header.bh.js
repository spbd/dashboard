module.exports = function(bh) {

    bh.match('header', function(ctx, json) {
        ctx.js(true);
    });

};
