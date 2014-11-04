module.exports = function(bh) {

    bh.match('widget__w-input', function(ctx, json) {
        if(json.label) {
            ctx.content([
                {elem: 'w-input', mods: {label: true}, content: json.label},
                ctx.content(),
            ], true);
        }
    });

};
