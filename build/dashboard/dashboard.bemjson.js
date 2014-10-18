({
    block: 'page',
    title: 'Dashboard',
    favicon: '/favicon.ico',
    head: [
        { elem: 'css', url: 'dashboard.css', ie: false },
        { elem: 'js', url: 'dashboard.browser+bh.js' },
        { elem: 'meta', attrs: { name: 'description', content: '' }},
        { elem: 'meta', attrs: { name: 'keywords', content: '' }}
    ],
    content: {
        block: 'ui-container',
        content: {block: 'navigator'}
    }
});
