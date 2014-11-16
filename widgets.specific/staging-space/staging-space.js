modules.define(
    'staging-space',
    ['i-bem__dom', 'jquery', 'widget', 'server'],
    function(provide, BEMDOM, $, Widget, server) {

provide(BEMDOM.decl({block: this.name, baseBlock: Widget}, {

    onSetMod: {
        js: {
            inited: function() {
                var _this = this;

                _this
                    .widgetAPI()
                    .configure(function(widget, settings) {
                        widget.setProps({width: 400, height: 160});

                        settings
                            .setProps({width: 200, height: 260})
                            
                            .radioGroup({options:[
                                {val: 'mb', text: 'Megabytes', checked: true},
                                {val: 'gb', text: 'Gigabytes'}
                            ], label: 'Metric'})

                    })
                    .onSaveSettings(function(controls) {
                        console.log('Settings save', controls);
                        _this._onMetricChange.bind(_this);

                    })
                    .onShowSettings(function() {
                        console.log('Settings show');
                    })
                    .onLoadWidget(function() {
                        console.log('Widget load');
                        console.log(arguments);
                    })
                    .onResize(_this._resizeFonts.bind(_this))
                    .init();

                    // board.notify('Simple: bad connection');
                    server.on('widgets/staging-space/change', _this._onDataReceived.bind(_this));
            }
        }
    },

    _resizeFonts: function(){
        
    },

    _metric: {
        label: 'MB',  // Default value...
        multiplier: 1, // Server returns always in megabytes. We should multiply this value on this coefficient..
        minDisplayVal: 5, // minimum percents of val, that will be displayed
        minDisplayPercents: 15,
        rankToDisplay: 0 // megabytes will not display any numbers after ',' in floats

    },
    
    // data values 
    // they update every 'data receieved' event
    _values: {
        used: {
            val: 60000, // always in megabytes
            percents: 60, // alwayes in percents
        },
        available: {
            val: 40000,
            percents: 40, 
        }
    },

    _oldValues: {
        used: {
            val: 60000, 
            percents: 60, 
        },
        available: {
            val: 40000, 
            percents: 40, 
        }
    },

    // _fontSize: {
    //     ofValElements: 20,
    //     ofPercentsElements: 11
    // },

    animationTime: 2000, // default animation time in milliseconds
    _tickTime: 30,
    _animating: false, // true/false if animation is in process
    
    _valueElements: {}, // we will cache here elements, that display values
    _percentsElements: {}, // we will cache here elements, that display percents
    _elements: {},

    // listener, that triggers every time, when data from the server received
    _onDataReceived: function(e, data) {

        this._values.used.val = parseInt(data.used);
        this._values.available.val = parseInt(data.total) - this._values.used.val;

        this._values.used.percents = Math.round( (this._values.used.val / data.total) * 100 );
        this._values.available.percents =  100 - this._values.used.percents;

        console.log('data received:', data.used, data.total-data.used);

        this._displayData();
    },

    _onMetricChange: function(metric, elem) {

        this._metric.multiplier = (metric === 'mb') ? 1 : 1024;
        this._metric.label = (metric === 'mb') ? 'MB' : 'GB';
        this._metric.rankToDisplay = (metric === 'mb') ? 0 : 1;

        // redisplay changes!
        if (!this._animating) {
            this._displayData();
        };

    },

    _displayData: function(){

        console.log('_values are:', this._values.used.val, this._values.available.val, this._values.used.percents, this._values.available.percents)
        console.log('_oldValues are:', this._oldValues.used.val, this._oldValues.available.val, this._oldValues.used.percents, this._oldValues.available.percents)

        var _this = this,
            usedEl = this.findElem('space', 'type', 'used'),
            availableEl = this.findElem('space', 'type', 'available'),

            usedValEl = this.findElem(usedEl, 'value'),
            availableValEl = this.findElem(availableEl, 'value'),
            
            usedPercentsEl = this.findElem(usedEl, 'percents'),
            availablePercentsEl = this.findElem(availableEl, 'percents')

            ticksAmount = Math.round(this.animationTime / this._tickTime), // how many ticks

            // every tick we will increment/decrement our values on these values
            usedValStep = (this._values.used.val - this._oldValues.used.val) / ticksAmount,
            usedPercentsStep = (this._values.used.percents - this._oldValues.used.percents) / ticksAmount,
            availableValStep = (this._values.available.val - this._oldValues.available.val) / ticksAmount,
            availablePercentsStep = (this._values.available.percents - this._oldValues.available.percents) / ticksAmount;

            console.log('steps:', usedValStep, usedPercentsStep, availableValStep, availablePercentsStep)

        if (!_this._animating) {
            var animation = setInterval(function(){

                _this._animating = true;

                _this._updateElement('used', {
                    value: (_this._oldValues.used.val += usedValStep) / _this._metric.multiplier,
                    percents: _this._oldValues.used.percents += usedPercentsStep
                });

                _this._updateElement('available', {
                    value: (_this._oldValues.available.val += availableValStep) / _this._metric.multiplier,
                    percents: _this._oldValues.available.percents += availablePercentsStep
                });

                // animation end...
                if (--ticksAmount === 0) {
                    _this._animating = false;
                    clearInterval(animation);
                    _this._oldValues = $.extend(true, {}, _this._values); // copying object...
                    // console.log(_this._values.used.val, _this._values.available.val)
                }

            }, this._tickTime)
        }
    },

    _updateElement: function(type, data) {

        var value = Number(data.value).toFixed(this._metric.rankToDisplay),
            percents = Number(data.percents).toFixed(2);

        this._elements[type] = this._elements[type] || this.elem('space', 'type', type);
        this._valueElements[type] = this._valueElements[type] || this.findElem( this._elements[type], 'value' );
        this._percentsElements[type] = this._percentsElements[type] || this.findElem( this._elements[type], 'percents' );

        var valText = this._oldValues[type].percents > this._metric.minDisplayVal ? (value + ' ' + this._metric.label) : '',
            percentsText = this._oldValues[type].percents > this._metric.minDisplayPercents ? percents + ' %' : '';

        this._valueElements[type].text(valText);
        this._elements[type].height(percents + '%');
        this._percentsElements[type].text(percentsText);

        
        // styling percents el...
        
        this._percentsElements[type].css({
            'width': this._elements[type].height(),

            // can we do this on window resize ??
            'height': '40px',
            'margin-top': '-40px',
            'line-height': '40px'
        })
    }


}));

});
