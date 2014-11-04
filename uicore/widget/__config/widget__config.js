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
                scalable: false,
                glueToGrid: true,
                multiple: true
            }
        };
    },

    setProps: function(props) {
        objects.extend(this._config.props, props);
    }

}));

});
