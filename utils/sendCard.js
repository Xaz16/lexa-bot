const builder = require('botbuilder');

function sendCard(address, card, bot, session) {
    let msg = new builder.Message(session).address(address);
        msg.addAttachment(
            new builder.VideoCard(session)
                .autostart(true)
                .autoloop(true)
                .media([{url:card.videourl}])
                .subtitle(card.text)
        );
        bot.send(msg);
}

module.exports = sendCard;