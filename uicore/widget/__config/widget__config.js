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
                scalable: false
            }
        };
    },

    getProps: function() {
        return this._config.props;
    },

    API: function() {
        var _this = this,
            API = {
                setProps: function(props) {
                    objects.extend(_this._config.props, props);
                    return API;
                }
            };

        return API;
    }

}));

});
