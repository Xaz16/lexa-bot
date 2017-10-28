const http = require('http');
const interval = 300000;
let awaker;

function invoker() {

    if (awaker === void(0)) {
        awaker = setInterval(function () {
            http.get('https://lexa-bot.herokuapp.com/');
            console.log('from interval %s', new Date());
        }, interval);

        http.get('https://lexa-bot.herokuapp.com/');
        console.log(new Date());
    }


}

module.exports = invoker;