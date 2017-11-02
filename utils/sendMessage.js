const builder = require('botbuilder');

function sendMessage(address, text, bot) {
    console.log(address);
    let msg = new builder.Message().address(address);
    msg.text(text);
    msg.textLocale('ru-RU');
    bot.send(msg);
}

module.exports = sendMessage;