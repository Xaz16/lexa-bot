const http = require('http');
const interval = 300000;
let awaker;

function invoker(callback) {

    if (awaker === void(0)) {
        awaker = setInterval(function () {
            console.log('from interval %s', new Date());
            http.get('http://lexa-bot.herokuapp.com/', function (res) {
                callback(res)
            })
        }, interval);
    }

    return awaker;
}

module.exports = invoker;