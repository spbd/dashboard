modules.define(
    'widget__creator',
    ['inherit', 'objects', 'i-bem__dom', 'bh'],
    function(provide, inherit, objects, BEMDOM, bh) {

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
            props: objects.extend(this.__self.getPropsByType(type), props)
        });
    },

    _getControlData: function(control) {
        var type = this.__self.TYPE;
        switch(control.type) {
            case type.INPUT: return {
                block: 'widget',
                elem: 'w-input',
                label: control.props.label,
                content: {
                    block: 'input',
                    mods: {theme: 'islands', size: 's'},
                    placeholder: control.props.placeholder
                }
            };
            case type.CHECKBOX: return {
                    block: 'widget',
                    elem: 'w-checkbox',
                    content: {
                        block: 'checkbox',
                        text: control.props.text,
                        mods: {theme: 'islands', size: 'm', checked: control.props.checked}
                    }
            };
            case type.SELECT: return {
                    block: 'widget',
                    elem: 'w-select',
                    label: control.props.label,
                    content: {
                        block: 'select',
                        mods: {mode: 'radio', theme: 'islands', size: 's', width: 'available'},
                        options: control.props.options ||
                            [{val: '0', text: 'Loading', checked: true}]
                    }
            };
            case type.RADIO_GROUP: return {
                    block: 'widget',
                    elem: 'w-radio-group',
                    label: control.props.label,
                    content: {
                        block: 'radio-group',
                        mods: {theme: 'islands', size: 'm', type: 'line'},
                        options: control.props.options
                    }
            };
        }
    },

    _checkOptions: function(opts, type) {
        var allowedProps = Object.keys(this.__self.getPropsByType(type));

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

    setPos: function(pos) {
        this.domElem.css({
            left: pos.left,
            top: pos.top
        });
    },

    setSize: function(width, height) {
        this.domElem
            .width(width)
            .height(height);
    },

    buildControls: function() {
        var container = this.findElem('set-controls'),
            type = this.__self.TYPE;

        this._config
            .controls
            .forEach(function(control) {
                var data = this._getControlData(control),
                    ctx = BEMDOM.append(container, bh.apply(data)),
                    instance = this.findBlockInside(ctx, control.type);

                this._controls.push({
                    type: control.type,
                    instance: instance
                });

                if(!control.props.handler) {
                    return;
                    // WTF?
                }

                switch(control.type) {
                    case type.INPUT:
                        instance.domElem.on('change', function() {
                            control.props.handler(instance.getVal(), instance);
                        });
                        break;
                    case type.CHECKBOX:
                        instance.findElem('control').on('change', function() {
                            var checked = !Boolean(instance.getMod('checked'));
                            control.props.handler(checked, instance);
                        });
                        break;
                    case type.SELECT:
                        control.props
                            ._update
                            .call(this, instance, this._getControlData(control));

                        instance.on('change', function() {
                            control.props.handler(instance.getVal(), instance);
                        });
                        break;
                    case type.RADIO_GROUP:
                        instance.on('change', function() {
                            control.props.handler(instance.getVal(), instance);
                        });
                        break;
                }
            }, this);
    },

    getStates: function() {
        var type = this.__self.TYPE;
        return this._controls.map(function(control) {
            switch(control.type) {
                case type.INPUT: return control.instance.getVal();
                case type.CHECKBOX: return Boolean(control.instance.getMod('checked'));
                case type.SELECT: return control.instance.getVal();
                case type.RADIO_GROUP: return control.instance.getVal();
            }
        });
    },

    setStates: function(settings) {
        var type = this.__self.TYPE;
        this._controls.forEach(function(control) {
            switch(control.type) {
                case type.INPUT: return control.instance.setVal(settings.shift().value);
                case type.CHECKBOX: return control.instance.setMod('checked', settings.shift().value);
                case type.SELECT: return control.instance.setVal(settings.shift().value);
                case type.RADIO_GROUP: return control.instance.setVal(settings.shift().value);
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

    API: function() {
        var _this = this,
            type = this.__self.TYPE,
            API = {
                setProps: function(props) {
                    objects.extend(_this._config.props, props);
                    return API;
                },

                input: function(props) {
                    _this._pushControl(props, type.INPUT);
                    return API;
                },

                checkbox: function(props) {
                    _this._pushControl(props, type.CHECKBOX);
                    return API;
                },

                select: function(props) {
                    _this._pushControl(props, type.SELECT);
                    return API;
                },

                radioGroup: function(props) {
                    _this._pushControl(props, type.RADIO_GROUP);
                    return API;
                }
            };

        return API;
    },

    destruct: function() {
        this._controls.forEach(function(control) {
            BEMDOM.destruct(control.instance.domElem);
        });
    }

}, {

    TYPE: {
        INPUT: 'input',
        CHECKBOX: 'checkbox',
        SELECT: 'select',
        RADIO_GROUP: 'radio-group'
    },

    // default properties of the object
    getPropsByType: function(type) {
        switch(type) {
            case this.TYPE.INPUT: {
                return  {
                    placeholder: null,
                    label: null,
                    handler: null
                };
            }
            case this.TYPE.CHECKBOX: {
                return {
                    text: 'button',
                    checked: false,
                    handler: null
                };
            }
            case this.TYPE.SELECT: {
                var obj = {
                    options: null,
                    handler: null,
                    update: null,
                    _update: function(select, data) {
                        if(!obj.update) {
                            return false;
                        }
                        var selData = data.content,
                            _this = this;

                        obj.update({
                            update: function(options) {
                                selData.options = options;
                                var instance = BEMDOM.replace(
                                        select.findBlockInside('select').domElem,
                                        bh.apply(selData)
                                    ),
                                    sel = _this.findBlockInside(instance, 'select');
                                    sel.on('change', function() {
                                        obj.handler(sel.getVal(), sel);
                                    });
                            }
                        });
                    }
                };
                return obj;
            }
            case this.TYPE.RADIO_GROUP: {
                return {
                    options: null,
                    handler: null
                };
            }
        }
    }

}));

});
