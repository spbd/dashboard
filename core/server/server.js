modules.define(
    'server',
    ['inherit', 'socket'],
    function(provide, inherit, socket) {

provide(inherit({

    __constructor: function(id, name) {
        this._id = id;
        socket.instance.emit('new-instance', {id: id, type: name});
        socket.instance.on('widgets/staging-space/update');
    },

    emit: function(path, data) {
        socket.instance.emit(path + '_' + this._id, data);
    },

    on: function(path, cb) {
        socket.instance.on(path + '_' + this._id, cb);
    },

    get: function(path, fn) {
        socket.instance.emit('get-' + path + '_' + this._id);
        socket.instance.on(path + '_' + this._id, fn);
    }

}));

});
