const builder = require('botbuilder');

function sendCard(address, card, bot, session) {
    let msg = new builder.Message(session).address(address);
        console.log(card);
        msg.addAttachment(
            new builder.AnimationCard(session)
                .autostart(true)
                .media(['https:' + card.image])
                .text(card.text)
        );
        msg.text('1');
        bot.send(msg);
}

module.exports = sendCard;