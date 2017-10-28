const fs = require('fs');
const sendMessage = require('sendMessage');

function getAddresses(session) {
    let addresses = JSON.parse(fs.readFileSync('./addresses.json', 'utf-8'));
    let isRepeatedAddress = false;
    addresses.forEach(function (elem) {
        if (elem.conversation.id === addressSaved.conversation.id) {
            isRepeatedAddress = true;
        }
    });
    if (!isRepeatedAddress) {
        addresses.push(session.message.address);
        fs.writeFile('addresses.json', JSON.stringify(addresses));
        sendMessage(session.message.address, 'Спасибо за информацию, ' + session.message.address.user.name)
    }
}

module.exports = sendMessage;