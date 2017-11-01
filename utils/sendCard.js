const builder = require('botbuilder');

function sendCard(address, card, bot, session) {
    let msg = new builder.Message(session).address(address);
        msg.addAttachment(
            new builder.AnimationCard(session)
                .autostart(true)
                .media([{url:'https:' + card.image}])
                .text(card.text)
        );
        msg.text(card.text);
        bot.send(msg);
}

module.exports = sendCard;