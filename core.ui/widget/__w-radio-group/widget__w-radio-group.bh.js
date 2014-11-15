module.exports = function(bh) {
    bh.match('widget__w-radio-group', function(ctx, json) {
        if(json.label) {
            ctx.content([
                {elem: 'w-radio-group', mods: {label: true}, content: json.label},
                ctx.content()
            ], true);
        }
    });
};
