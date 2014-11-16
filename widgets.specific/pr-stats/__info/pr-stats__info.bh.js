module.exports = function(bh) {
    bh.match('pr-stats__info', function(ctx, json) {
        ctx.content(json.libsInfo && Object.keys(json.libsInfo).map(function(infoSection) {
            return {
                elem: 'info-line',
                mods: {section: infoSection},
                content: [
                    {
                        elem: 'info-name',
                        content: infoSection
                    },
                    {
                        elem: 'info-values',
                        content: [
                            {
                                elem: 'info-value',
                                mods: {type: 'total'},
                                content: json.libsInfo[infoSection].all
                            },
                            {
                                elem: 'info-value',
                                mods: {type: 'today'},
                                content: json.libsInfo[infoSection].today
                            }
                        ]
                    }
                ]
            };
        }));
    });
};
