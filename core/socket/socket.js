modules.define('socket', ['jquery'], function(provide, $) {

    var serverUrl = 'http://37.9.65.16:80';

    $.getScript(serverUrl + '/socket.io/socket.io.js')
        .then(function() {
            var io = window.io,
                socket = io(serverUrl);

            delete window.io;
            provide({
                instance: socket,
                url: serverUrl
            });
        });
});
