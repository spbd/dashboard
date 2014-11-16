modules.define(
    'pr-stats',
    ['i-bem__dom', 'jquery', 'widget', 'bh'],
    function(provide, BEMDOM, $, Widget, bh) {

        provide(BEMDOM.decl({block: this.name, baseBlock: Widget}, {

            pathToLibs: 'widgets/pr-status/change',
            pathLibsList: 'widgets/pr-status/libs',

            currLibName: 'Library1',
            currUserName: 'alex',

            prevLibName: false,
            prevUserName: false,

            onSetMod: {
                js: {
                    inited: function() {
                        var _this = this;

                        this
                            .widgetAPI()
                            .configure(function(widget, settings) {
                                widget.setProps({width: 350, height: 300});

                                settings
                                    .setProps({width: 350, height: 150})
                 /*                   .input({
                                        placeholder: 'user nickname',
                                        label: 'commiter name',
                                        handler: this.setUserName,
                                        // TODO: реализовать
                                        disabled: true
                                    })*/
                                    .select({
                                        update: this._updateSelect.bind(this),
                                        handler: this.setLibName.bind(this),
                                        label: 'Choose lib'
                                    });
                            })
                            .onLoadWidget(function() {
                                _this.server.on('update', function(data) {
                                   _this.showLibsData.call(_this, data);
                                });
                            })
                            .init();

                        this.setLibName(this.currLibName);

                        this.subscribeOnData();
                    }
                }
            },

            _updateSelect: function(select) {
                select.update([
                    {val: 'Library1', text: 'The name of Library1'},
                    {val: 'Library2', text: 'The name of Library2'}
                ]);
            },

            /**
             * Установить название библиотеки
             *
             * @param {String} val
             */
            setLibName: function(val) {
                this.currLibName = val;
                this.elem('lib-name').text(this.currLibName);
                this.subscribeOnData();
            },

            /**
             * Установить имя пользователя для подсчета PR's
             *
             * @param {String} val
             */
            setUserName: function(val) {
                this.currUserName = val;

                // get PR's by userName
                // :TODO:
            },

            /**
             * Показать данные
             *
             * @param {Object} data
             */
            showLibsData: function(data) {

                console.log('showLibsData data:', data);

                BEMDOM.replace(
                    this.findElem('info'),
                    (bh.apply({
                        block: 'pr-stats',
                        elem: 'info',
                        libsInfo: data
                })));
            },

            /**
             * Подписка на данные
             */
            subscribeOnData: function() {
            }

        }));

    });
