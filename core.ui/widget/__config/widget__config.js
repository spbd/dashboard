modules.define(
    'widget__config',
    ['objects', 'inherit'],
    function(provide, objects, inherit) {

provide(inherit({

    __constructor: function() {
        this._config = {
            // Default porperties
            props: {
                width: 200,
                height: 200,
                scalable: true,
                fontResize: false
            }
        };
    },

    getProps: function() {
        return this._config.props;
    },

    getProp: function(prop) {
        return this._config.props[prop];
    },

    API: function() {
        var _this = this,
            API = {
                setProps: function(props) {
                    objects.extend(_this._config.props, props);
                    console.log(props);
                    return API;
                }
            };

        return API;
    }

}));

});
