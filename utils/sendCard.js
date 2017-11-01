const builder = require('botbuilder');

function sendCard(address, card, bot, session) {
    let msg = new builder.Message(session).address(address);
        console.log(card);
        msg.addAttachment(
            new builder.VideoCard(session)
                .autostart(true)
                .media([{url:'https:' + card.image}])
                .text(card.text)
        );
        msg.text('');
        bot.send(msg);
}

module.exports = sendCard;