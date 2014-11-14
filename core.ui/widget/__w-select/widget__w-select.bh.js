module.exports = function(bh) {
    bh.match('widget__w-select', function(ctx, json) {
        if(json.label) {
            ctx.content([
                {elem: 'w-select', mods: {label: true}, content: json.label},
                ctx.content()
            ], true);
        }
    });
};
