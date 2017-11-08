const http = require('http');
const interval = 300000;
let awaker;

function invoker(callback) {
    callback = callback || function () {};

    if (awaker === void(0)) {
        awaker = setInterval(function () {
            http.get('http://lexa-bot.herokuapp.com/', function (res) {
                callback(res)
            })
        }, interval);
    }

    return awaker;
}

module.exports = invoker;