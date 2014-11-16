module.exports = function(bh) {

    bh.match('pr-stats', function(ctx, json) {
        var stubContent = [
            {
                elem: 'header',
                content: 'Pull Requests'
            },
            {
                elem: 'lib-name',
                content: 'Please, choose lib'
            },
            {
                elem: 'info',
                content: {
                    elem: 'info-wait',
                    content: 'Loading...'
                }
            }
        ];

        ctx.content(json.content || stubContent);
    });

};
