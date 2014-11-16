modules.define(
    'staging-space',
    ['i-bem__dom', 'jquery', 'widget'],
    function(provide, BEMDOM, $, Widget) {

provide(BEMDOM.decl({block: this.name, baseBlock: Widget}, {

    onSetMod: {
        js: {
            inited: function() {
                var _this = this;

                _this._metric = {
                    label: 'GB',  // Default value...
                    divider: 1024, // divide our megabytes on this coefficient
                    minDisplayVal: 15, // minimum percents of val, that will be displayed
                    minDisplayPercents: 25,
                    rankToDisplay: 1 // megabytes will not display any numbers after ',' in floats
                };
                
                // data values 
                // they update every 'data receieved' event
                _this._values = {
                    used: {
                        val: 60000, // always in megabytes
                        percents: 60 // alwayes in percents
                    },
                    available: {
                        val: 40000,
                        percents: 40
                    }
                };

                _this._oldValues = {
                    used: {
                        val: 60000, 
                        percents: 60
                    },
                    available: {
                        val: 40000, 
                        percents: 40
                    }
                };

                _this.animationTime = 2000; // default animation time in milliseconds
                _this._tickTime = 30;
                _this._animating = false; // true/false if animation is in process
                
                _this._valElements = {}; // we will cache here elements, that display values
                _this._percentsElements = {}; // we will cache here elements, that display percents
                _this._spaceElements = {};
                _this._containerElement = false;
                _this._titleElement = false;

                _this._elementsCached = false;

                _this
                    .widgetAPI()
                    .configure(function(widget, settings) {
                        widget.setProps({width: 300, height: 350});

                        settings
                            .setProps({width: 150, height: 150})
                            
                            .radioGroup({
                                options:[
                                    {val: 'mb', text: 'MB'},
                                    {val: 'gb', text: 'GB', checked: true}
                                ], 
                                label: 'Metric', 
                                handler: _this._onMetricChange.bind(_this)
                            });
                    })
                    .onLoadWidget(function() {
                        _this.server.on('update', _this._onDataReceived.bind(_this));
                    })
                    .onResize(_this._resizeElements.bind(_this))
                    .init();

                    // _this.addServerListener('widgets/staging-space/change', _this._onDataReceived.bind(_this));

                    // VERY VERY VERY DIRTY STAFF...
                    setTimeout(function(){
                        _this._resizeElements({width: _this.domElem.width(), height: _this.domElem.height()});
                    }, 1);
            }
        }
    },

    _resizeElements: function(props){

        // console.log('_resizeElements', props);

        if(!this._elementsCached) {this._cacheElements();}

        var valFontSize = props.width > props.height ? props.width / 8 : props.height / 8,
            valWidth = props.width * 0.9,
            percentsHeight = (props.width / 10),
            percentsFontSize = percentsHeight * 0.8,
            titleLineHeight = (props.height * 0.15),
            titleFontSize = titleLineHeight * 0.6;

        // console.log(props.width, valWidth, percentsHeight)

        this._titleElement.css({
            'font-size': titleFontSize + 'px',
            'line-height': titleLineHeight + 'px'
        });

        this._valElements.used.css({
            'font-size': valFontSize + 'px',
            'width': valWidth + 'px'
        });

        this._valElements.available.css({
            'font-size': valFontSize + 'px',
            'width': valWidth + 'px'
        });

        this._percentsElements.used.css({
            'font-size': percentsFontSize + 'px',
            'height': percentsHeight + 'px',
            'margin-top': '-' + percentsHeight + 'px',
            'line-height': percentsHeight + 'px'
        });

        this._percentsElements.available.css({
            'font-size': percentsFontSize + 'px',
            'height': percentsHeight + 'px',
            'margin-top': '-' + percentsHeight + 'px',
            'line-height': percentsHeight + 'px'
        });
    },

    _cacheElements: function() {

        this._spaceElements['used'] = this._spaceElements['used'] || 
                                      this.findElem('space', 'type', 'used');
        this._valElements['used'] = this._valElements['used'] || 
                                    this.findElem( this._spaceElements['used'], 'value' );
        this._percentsElements['used'] = this._percentsElements['used'] || 
                                         this.findElem( this._spaceElements['used'], 'percents' );

        this._spaceElements['available'] = this._spaceElements['available'] || 
                                           this.findElem('space', 'type', 'available');
        this._valElements['available'] = this._valElements['available'] || 
                                         this.findElem( this._spaceElements['available'], 'value' );
        this._percentsElements['available'] = this._percentsElements['available'] || 
                                              this.findElem( this._spaceElements['available'], 'percents' );
    
        this._titleElement = this._titleElement || this.findElem('title');
        this._containerElement = this._containerElement || this.findElem('container');

        this._elementsCached = true;
    },

    // listener, that triggers every time, when data from the server received
    _onDataReceived: function(data) {

        // console.log('data received!', data); 

        this._values.used.val = parseInt(data.used, 10);
        this._values.available.val = parseInt(data.total, 10) - this._values.used.val;

        this._values.used.percents = Math.round( (this._values.used.val / data.total) * 100 );
        this._values.available.percents =  100 - this._values.used.percents;

        this._displayData();
    },

    _onMetricChange: function(metric) {

        this._metric.divider = (metric === 'mb') ? 1 : 1024;
        this._metric.label = (metric === 'mb') ? 'MB' : 'GB';
        this._metric.rankToDisplay = (metric === 'mb') ? 0 : 1;

        // redisplay changes!
        if(!this._animating) {
            this._displayData();
        }

    },

    _displayData: function(){

        var _this = this,

            ticksAmount = Math.round(this.animationTime / this._tickTime), // how many ticks

            // every tick we will increment/decrement our values on these values
            usedValStep = (this._values.used.val - this._oldValues.used.val) / ticksAmount,
            usedPercentsStep = (this._values.used.percents - this._oldValues.used.percents) / ticksAmount,
            availableValStep = (this._values.available.val - this._oldValues.available.val) / ticksAmount,
            avPercentsStep = (this._values.available.percents - this._oldValues.available.percents) / ticksAmount;

            // console.log('steps:', usedValStep, usedPercentsStep, availableValStep, avPercentsStep)

        if(!_this._animating) {
            var animation = setInterval(function(){

                _this._animating = true;

                _this._updateElement('used', {
                    value: (_this._oldValues.used.val += usedValStep) / _this._metric.divider,
                    percents: _this._oldValues.used.percents += usedPercentsStep
                });

                _this._updateElement('available', {
                    value: (_this._oldValues.available.val += availableValStep) / _this._metric.divider,
                    percents: _this._oldValues.available.percents += avPercentsStep
                });

                // animation end...
                if(--ticksAmount === 0) {
                    _this._animating = false;
                    clearInterval(animation);
                    _this._oldValues = $.extend(true, {}, _this._values); // copying object...
                    // console.log(_this._values.used.val, _this._values.available.val)
                }

            }, this._tickTime);
        }
    },

    _updateElement: function(type, data) {

        var value = Number(data.value).toFixed(this._metric.rankToDisplay),
            percents = Number(data.percents).toFixed(0);

        if(!this._elementsCached){ this._cacheElements(); }

        var valText = this._oldValues[type].percents > this._metric.minDisplayVal ? 
                      value + ' ' + this._metric.label : '',
            percentsText = this._oldValues[type].percents > this._metric.minDisplayPercents ? percents + ' %' : '';

        this._valElements[type].text(valText);
        this._spaceElements[type].height(percents + '%');
        this._percentsElements[type].text(percentsText);
        this._percentsElements[type].width(this._spaceElements[type].height());
    }

}));

});
