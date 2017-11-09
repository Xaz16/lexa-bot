const builder = require('botbuilder');

function sendCard(address, card, bot, session) {
    let msg = new builder.Message(session).address(address);
        msg.addAttachment(
            new builder.AnimationCard(session)
                .media([{url:card.gifurl}])
                .subtitle(card.text)
        );
        bot.send(msg);
}

module.exports = sendCard;