module.exports = function(bh) {

    bh.match('lib-status', function(ctx, json) {
        ctx.content([
            {
                elem: 'title',
                content: 'Library status'
            },
            {
                elem: 'content',
                content: [
                    {
                        elem: 'lib',
                        content: ''
                    },
                    {
                        elem: 'container',
                        tag: 'table',
                        content: {elem: 'load', content: 'Loading...'}
                    }
                ]
            }
        ]);
    });

};
