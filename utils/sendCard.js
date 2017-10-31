const builder = require('botbuilder');
const getCard = require('../models/getCard');

function sendCard(address, card, bot) {
    let msg = new builder.Message().address(address);
        console.log(card);
        msg.attachments([
            new builder.AnimationCard({
                autostart: true,
                image: card.image,
                media: card.image,
                text: card.text + '<br/> Rating: ' + card.rating,

            })
        ]);
        bot.send(msg);
}

module.exports = sendCard;