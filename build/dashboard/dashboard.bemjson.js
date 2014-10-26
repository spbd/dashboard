({
    block: 'page',
    title: 'Dashboard',
    favicon: '/favicon.ico',
    head: [
        { elem: 'css', url: 'dashboard.css', ie: false },
        { elem: 'js', url: 'dashboard.browser+bh+widgets.js' },
        { elem: 'meta', attrs: { name: 'description', content: '' }},
        { elem: 'meta', attrs: { name: 'keywords', content: '' }}
    ],
    content: {
        block: 'board',
        content: {block: 'navigator'}
    }
});
