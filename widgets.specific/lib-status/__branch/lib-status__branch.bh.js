module.exports = function(bh) {
    bh.match('lib-status__branch', function(ctx, json) {
        var branch = json.branch;

        ctx
            .content([
                {
                    elem: 'branch-name',
                    tag: 'td',
                    content: branch.name
                },
                {
                    elem: 'branch-status',
                    tag: 'td',
                    mods: {status: branch.status},
                    content: branch.status.toUpperCase()
                }
            ])
            .tag('tr');
    });
};
