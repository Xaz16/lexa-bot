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
        msg.text(`<a href="https://developerslife.ru/${card.id}">Ссылка</a>`);
        bot.send(msg);
}

module.exports = sendCard;