const http = require('http');
const interval = 1.74e+6;
let awaker;

function invoker() {

    if (awaker === void(0)) {
        awaker = setInterval(function () {
            http.get('https://lexa-bot.herokuapp.com/');
        }, interval);
        console.log(new Date());
    }


}

module.exports = invoker;