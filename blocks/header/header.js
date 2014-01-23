modules.define('header', ['i-bem__dom'], function(provide, BEMDOM) {

provide(BEMDOM.decl('header', {

    onSetMod : {
        'js' : {
            'inited' : function() {
                console.log('On set mod js inited')
            }
        }
    }

}));

});
