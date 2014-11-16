module.exports = function(bh) {

    bh.match('reviewers', function(ctx) {
        ctx.content([
            {
                elem: 'header',
                content: 'Reviewers in current sprint'
            },
            {
                elem: 'listContainer',
                content: {elem: 'list'}
            }
        ]);
    });

};
