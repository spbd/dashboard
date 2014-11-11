modules.define(
    'server',
    ['inherit', 'events'],
    function(provide, inherit, events) {
        var emmiter = new events.Emitter(),
            paths = [],
            fixtures;

        fixtures = {
            'widgets/free-space': function() {
                return {free: Math.round(Math.random() * 1000)};
            }
        };

        startEmmiting();

        function on(path, fn) {
            paths.push(path);
            return emmiter.on(path, fn);
        }

        function startEmmiting() {
            setInterval(function() {
                paths.forEach(function(path) {
                    var fn = fixtures[path],
                        fx = fn && fn();
                    emmiter.emit(path, fx || 'none');
                });
            }, 5000);
        }

provide({
    on: on
});

});
