({
    block: 'page',
    title: 'Dashboard',
    favicon: '/favicon.ico',
    js: true,
    head: [
        { elem: 'css', url: '_dashboard.css', ie: false },
        { elem: 'js', url: '_dashboard.js' },
        { elem: 'meta', attrs: { name: 'description', content: '' }},
        { elem: 'meta', attrs: { name: 'keywords', content: '' }}
    ],
    content: {
        block: 'board',
        js: true,
        content: {block: 'navigator'}
    }
});
