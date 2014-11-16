modules.define(
    'reviewers',
    ['i-bem__dom', 'jquery', 'widget', 'server', 'bh'],
    function(provide, BEMDOM, $, Widget, server, BH) {

var ITEM_WIDTH = 200;

provide(BEMDOM.decl({block: this.name, baseBlock: Widget}, {

    onSetMod: {
        js: {
            inited: function() {
                var _this = this;
                this
                    .widgetAPI()
                    .configure(function(widget, settings) {
                        widget.setProps({width: 640, height: 200});

                        settings
                            .setProps({width: 200, height: 100})
                            .checkbox({text: 'Hide user', handler: _this._onCheckboxChange.bind(_this)});
                    })
                    .onLoadWidget(function(controls) {
                        console.log('server,', _this.server);
                        _this.server.on('update', function(data) {
                            console.log('controls: ', controls);
                            _this._drawContent(controls[0], data);
                        });
                    }).init();
            }
        }
    },

    _onCheckboxChange: function(checked, elem) {
        this._drawContent(checked, this._data);
    },

    _drawContent: function(checked, data) {
        BEMDOM.replace(
            this.elem('header'),
            BH.apply({
                block: 'reviewers',
                elem: 'header',
                content: [
                    'Reviewers in current sprint (sprint ',
                    data.sprint.number,
                    ') — Tasks ',
                    data.sprint.closedTasks,
                    '/',
                    data.sprint.openedTasks
                ]
            })
        );

        // tasks list
        var listItems = data.tasks.map(function(task) {
            console.log('user: ', task.reviewer.name);
            return BH.apply({
                block: 'reviewers',
                elem: 'item',
                elemMods: {priority: task.priority},
                content: [
                    {
                        elem: 'itemHeader',
                        content: task.id + ' (' +  task.points + ')'
                    },
                    {
                        elem: 'user',
                        content: [
                            {
                                elem: 'userName',
                                content: task.reviewer.name
                            },
                            {
                                block: 'image',
                                url: task.reviewer.avatar,
                                title: task.reviewer.name,
                                height: 100
                            }
                        ]
                    },
                    {
                        elem: 'description',
                        content: task.desk
                    }
                ].filter(function(el) {
                    if(['user', 'points'].indexOf(el.elem) > -1 && checked) {
                        return false;
                    }
                    return true;
                })
            });
        });

        BEMDOM.replace(
            this.findElem('list'),
            BH.apply({
                block: 'reviewers',
                elem: 'list',
                content: listItems
            })
        );

        var itemsNumber = this.findElem('item').length,
            containerWidth = itemsNumber * (ITEM_WIDTH + 1),
            viewportWidth = this.findElem('listContainer').width(),
            delta = Math.abs(containerWidth - viewportWidth);

        console.log('viewport: ', viewportWidth, ', container: ', containerWidth);

        if(containerWidth > viewportWidth) {
            this.setMod('scroll');

            // var createdStyleTag = document.createElement('style');
            var animStyles = '.reviewers_scroll .reviewers__list {' +
                '  -webkit-animation: slideright ' + 2 * itemsNumber + 's linear 0s infinite alternate;' +
                '  animation: slideright ' + 2 * itemsNumber + 's linear 1s infinite alternate;' +
                '}' +
                '@-webkit-keyframes slideright {' +
                '  from {' +
                '    -webkit-transform: translateX(0);' +
                '    transform: translateX(0);' +
                '  }' +
                '  to {' +
                '    -webkit-transform: translateX(-' + delta + 'px);' +
                '    transform: translateX(-' + delta + 'px);' +
                '  }' +
                '}' +
                '@keyframes slideright {' +
                '  from {' +
                '    -webkit-transform: translateX(0);' +
                '    transform: translateX(0);' +
                '  }' +
                '  to {' +
                '    -webkit-transform: translateX(-' + delta + 'px);' +
                '    transform: translateX(-' + delta + 'px);' +
                '  }' +
                '}';

            var encodedUrl = window.btoa(animStyles);

            var link = document.createElement('link');
            document.getElementsByTagName('head')[0].appendChild(link);
            link.setAttribute('type', 'text/css');
            link.setAttribute('rel', 'stylesheet');
            link.setAttribute('href', 'data:text/css;base64,' +  encodedUrl);
        }

        this.findElem('list').css('width', containerWidth);
    }

    // this.container.add(/* elem */)
    // this.container.remove(/* elem */)

}));

});
