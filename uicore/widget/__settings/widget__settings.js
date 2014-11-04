modules.define(
    'widget__creator',
    ['inherit', 'objects', 'i-bem__dom', 'bh'],
    function(provide, inherit, objects, BEMDOM, bh) {

var TYPE = {
        INPUT: 'INPUT',
        BUTTON: 'BUTTON',
        SELECT: 'SELECT'
    },
    OPTIONS = {};

OPTIONS[TYPE.INPUT] = {
    placeholder: null,
    label: null,
    handler: null
};

OPTIONS[TYPE.BUTTON] = {
    text: 'button',
    handler: null
};


provide(BEMDOM.decl({

    onSetMod: {
        js: {
            inited: function() {
                this._config = {
                    // Default porperties
                    props: {
                        width: 200,
                        height: 250
                    },
                    controls: []
                };
            }
        }
    },

    _pushControl: function(props, type) {
        this._checkOptions(props, type);
        this._config.controls.push({
            control: type,
            props: props
        });
    },

    _checkOptions: function(opts, type) {
        var allowedProps = Object.keys(OPTIONS[type]);

        Object
            .keys(opts)
            .forEach(function(prop) {
                if(allowedProps[prop] !== undefined) {
                    throw new Error(
                        'Not allowed to use porperty - "' + prop + '" for ' + type
                    );
                }
            });
    },

    buildControls: function() {
        console.log(this._config);
        BEMDOM.append(this.domElem, bh.apply([
            {
                block : 'button',
                text : 'Medium',
                mods : { theme : 'islands', size : 'm' }
            }
        ]));
    },

    API: function() {
        var _this = this,
            API = {
                setProps: function(props) {
                    objects.extend(_this._config.props, props);
                    return API;
                },

                input: function(props) {
                    _this._pushControl(props, TYPE.INPUT);
                    return API;
                },

                button: function(props) {
                    _this._pushControl(props, TYPE.BUTTON);
                    return API;
                }
            };

        return API;
    }

}));

});
