module.exports = function(bh) {
    bh.match('widget__adds-controls', function(ctx) {
        ctx.content([
            {elem: 'adds-pane'},
            {elem: 'adds-remove', content: 'DEL'},
            {elem: 'adds-settings', content: 'SET'},
            {elem: 'adds-resize'}
        ]);
    });
};
