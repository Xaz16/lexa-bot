const builder = require('botbuilder');

function sendMessage(address, text) {
    let msg = new builder.Message().address(address);
    msg.text(text);
    msg.textLocale('ru-RU');
    bot.send(msg);
}

module.exports = sendMessage;