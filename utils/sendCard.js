const builder = require('botbuilder');

function sendCard(address, card, bot, session) {
    let msg = new builder.Message(session).address(address);
        console.log(card);
        msg.addAttachment(
            new builder.VideoCard(session)
                .autostart(true)
                .autoloop(true)
                .media([{url:'https:' + card.videoUrl}])
                .text(card.text)
        );
        msg.text(card.text);
        bot.send(msg);
}

module.exports = sendCard;