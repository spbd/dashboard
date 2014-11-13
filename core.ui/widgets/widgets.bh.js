module.exports = function(bh) {
    bh.match('widgets', function(ctx) {
        ctx.js(true);
    });
};
