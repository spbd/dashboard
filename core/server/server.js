modules.define(
    'server',
    ['inherit', 'events'],
    function(provide, inherit, events) {
        var emmiter = new events.Emitter(),
            paths = [],
            fixtures,
            rnd = function(max, min) {
                min = min || 0;
                return Math.round(min + Math.random() * (max - min));
            };

        fixtures = {
            // staging-space
            'widgets/staging-space/change': function() {
                var t = 160,
                    av = rnd(160);
                return {total: t, usage: av, available: t - av};
            },

            //pr-stauts
            'widgets/pr-status/libs': function() {
                return ['Library1', 'Library2'];
            },
            'widgets/pr-status/lib/Library1': function() {
                return {
                    users: {all: rnd(100), today: rnd(10)},
                    team: {all: rnd(200), today: rnd(15)}
                };
            },
            'widgets/pr-status/lib/Library2': function() {
                return {
                    users: {all: rnd(100), today: rnd(10)},
                    team: {all: rnd(200), today: rnd(15)}
                };
            },

            // lib-states
            'widgets/lib-status/libs': function() {
                return ['Library1', 'Library2'];
            },

            'widgets/lib-status/change': function() {
                return {
                    'Library1': [
                        {
                            name: 'dev',
                            status: rnd(1) ? 'success' : 'failed',
                            time: '23.10.2014 - 10:21'
                        },
                        {
                            name: 'support/2.x',
                            status: 'success',
                            time: '23.10.2014 - 10:21'
                        }
                    ],
                    'Library2': [
                        {
                            name: 'dev',
                            status: rnd(1) ? 'success' : 'failed',
                            time: '23.10.2014 - 10:21'
                        },
                        {
                            name: 'support/2.x',
                            status: 'success',
                            time: '23.10.2014 - 10:21'
                        },
                        {
                            name: 'release/v3.0.0',
                            status: rnd(1) ? 'success' : 'failed',
                            time: '23.10.2014 - 10:21'
                        },
                        {
                            name: 'release/v3.0.1',
                            status: 'success',
                            time: '23.10.2014 - 10:21'
                        }
                    ]
                };
            },
            // Reviewers
            'widgets/reviewers/change': function() {
                return [
                    {
                        id: 'TASKID-2313',
                        desk: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi' +
                            'eligendi sint, expedita at beatae reprehenderit deserunt fugit totam' +
                            'neque unde.',
                        points: 40,
                        priority: 'critical',
                        reviewer: {
                            name: 'Brendan Eich',
                            avatar: 'http://...'
                        }
                    },
                    {
                        id: 'TASKID-2311',
                        desk: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi' +
                            'eligendi sint, expedita at beatae reprehenderit deserunt fugit totam' +
                            'neque unde.',
                        points: 40,
                        priority: 'normal',
                        reviewer: {
                            name: 'Brendan Eich',
                            avatar: 'http://...'
                        }
                    },
                    {
                        id: 'TASKID-2113',
                        desk: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi' +
                            'eligendi sint, expedita at beatae reprehenderit deserunt fugit totam' +
                            'neque unde.',
                        points: 40,
                        priority: 'critical',
                        reviewer: {
                            name: 'Brendan Eich',
                            avatar: 'http://...'
                        }
                    }
                ];
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
