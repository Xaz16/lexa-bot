var restify = require('restify');
var builder = require('botbuilder');
var fs = require('fs');
var advices = parseFile();

// Setup Restify Server
var server = restify.createServer({});
server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log('%s listening to %s', server.name, server.url);
});

// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: 'd49dab97-26d5-496d-8f1c-44deed41f46b',
    appPassword: 'ft1KopBYA6ZhP82gSfDQeAb'
});

// Listen for messages from users
server.post('/api/messages', connector.listen());
var addressSaved = {};
var messages = [
    "Я безусловно согласен с подобным утверждением",
    "Возможно это так, но я еще не придумал что возразить по этому поводу",
    "плюс +",
    "минус -",
    "Категорически не согласен с таким положением дел"
];

// Receive messages from the user and respond by echoing each message back (prefixed with 'You said:')
var bot = new builder.UniversalBot(connector, function (session) {
    if (session.message.text.match(/Совет:/g)) {
        session.send(messages[getRandomInRange(4, 0)]);
    } else if (session.message.text.match(/не буянь, бот/g)) {
        console.log(session.message);
        session.send("Хорошо, хозяин");
    }

    addressSaved = session.message.address;
    sendProactiveMessage();
});

function sendProactiveMessage() {
    var msg = new builder.Message().address(addressSaved);
    var position = getRandomInRange(advices.length, 0);
    msg.text(advices[position].text);
    msg.textLocale('ru-RU');
    bot.send(msg);

    advices.splice(position, 1);

    if(advices.length !== 0) {
        setTimeout(sendProactiveMessage, 3.6e+6)
    }

}

function parseFile() {
    return JSON.parse(fs.readFileSync('./data.json', 'utf-8'));
}

function getRandomInRange(max, min) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
}