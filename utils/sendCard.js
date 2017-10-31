const builder = require('botbuilder');

function sendCard(address, card, bot) {
    let msg = new builder.Message().address(address);
        console.log(card);
        msg.addAttachment(
            new builder.AnimationCard()
                .autostart(true)
                .media(card.image)
                .text(card.text + ' <br/>Rating:' + card.rating)
        );
        msg.text('');
        bot.send(msg);
}

module.exports = sendCard;