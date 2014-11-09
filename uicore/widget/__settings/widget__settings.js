modules.define(
    'widget__creator',
    ['inherit', 'objects', 'i-bem__dom', 'bh'],
    function(provide, inherit, objects, BEMDOM, bh) {

var TYPE = {
        INPUT: 'input',
        CHECKBOX: 'checkbox',
        SELECT: 'select'
    },
    OPTIONS = {};

OPTIONS[TYPE.INPUT] = {
    placeholder: null,
    label: null,
    handler: null
};

OPTIONS[TYPE.CHECKBOX] = {
    text: 'button',
    checked : false,
    handler: null
};

OPTIONS[TYPE.SELECT] = {
    options: null,
    handler: null
};


provide(BEMDOM.decl({

    onSetMod: {
        js: {
            inited: function() {
                this._controls = [];

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
            type: type,
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

    getProps: function() {
        return this._config.props;
    },

    setLeft: function(left) {
        this.domElem.css({left: left});
    },

    setSize: function(width, height) {
        this.domElem
            .width(width)
            .height(height);
    },

    buildControls: function() {
        var container = this.findElem('set-controls');

        this._config
            .controls
            .forEach(function(control) {
                var ctx = BEMDOM.append(container, bh.apply(this._getControlData(control))),
                    instance = this.findBlockInside(ctx, control.type);

                this._controls.push({
                    type: control.type,
                    instance: instance
                });

                if(!control.props.handler) {
                    return;
                }

                switch(control.type) {
                    case TYPE.INPUT:
                        instance.domElem.on('change', function() {
                            control.props.handler(instance.getVal(), instance);
                        });
                        break;
                    case TYPE.CHECKBOX:
                        instance.findElem('control').on('change', function() {
                            var checked = !Boolean(instance.getMod('checked'));
                            control.props.handler(checked, instance);
                        });
                        break;
                    case TYPE.SELECT:
                        instance.on('change', function() {
                            control.props.handler(instance.getVal(), instance);
                        });
                        break;
                }
            }, this);
    },

    getStates: function() {
        return this._controls.map(function(control) {
            switch(control.type) {
                case TYPE.INPUT: return control.instance.getVal();
                case TYPE.CHECKBOX: return Boolean(control.instance.getMod('checked'));
                case TYPE.SELECT: return control.instance.getVal();
            }
        });
    },

    setStates: function(settings) {
        this._controls.forEach(function(control) {
            switch(control.type) {
                case TYPE.INPUT: return control.instance.setVal(settings.shift().value);
                case TYPE.CHECKBOX: return control.instance.setMod('checked', settings.shift().value);
                case TYPE.SELECT: return control.instance.setVal(settings.shift().value);
            }
        });
    },

    getControls: function() {
        var states = this.getStates();

        return this._controls.map(function(control) {
            return {
                type: control.type,
                value: states.shift()
            };
        });
    },

    _getControlData: function(control) {
        switch(control.type) {
            case TYPE.INPUT: return {
                block: 'widget',
                elem: 'w-input',
                label: control.props.label,
                content: {
                    block : 'input',
                    mods : { theme : 'islands', size: 's'},
                    placeholder : control.props.placeholder
                }
            };
            case TYPE.CHECKBOX: return {
                    block: 'widget',
                    elem: 'w-checkbox',
                    content: {
                        block : 'checkbox',
                        text : control.props.text,
                        mods : { theme : 'islands', size : 'm', checked : control.props.checked}
                    }
            };
            case TYPE.SELECT: return {
                    block: 'widget',
                    elem: 'w-select',
                    label: control.props.label,
                    content: {
                        block : 'select',
                        mods : { mode : 'radio', theme : 'islands', size : 's', width : 'available'},
                        options : control.props.options
                    }
            };
        }
    },

    destruct: function() {
        this._controls.forEach(function(control) {
            BEMDOM.destruct(control.instance.domElem);
        });
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

                checkbox: function(props) {
                    _this._pushControl(props, TYPE.CHECKBOX);
                    return API;
                },

                select: function(props) {
                    _this._pushControl(props, TYPE.SELECT);
                    return API;
                }
            };

        return API;
    }

}));

});
