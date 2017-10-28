const http = require('http');
const port = process.env.port || process.env.PORT || 3978;
const interval = 1.74e+6;
let awaker;

function invoker() {

    if (awaker === void(0)) {
        awaker = setInterval(function () {
            http.get('https://lexa-bot.herokuapp.com/');
            console.info(new Date());
        }, interval);
    }


}

module.exports = invoker;