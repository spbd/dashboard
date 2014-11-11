module.exports = function(bh) {
    bh.match('widgets__item', function(ctx, json) {
        ctx
            .mix({
                block: json.name,
                elem: 'manifest_preview'
            })
            .js({widget: json.name});
    });
};
