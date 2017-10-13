var restify = require('restify');
var builder = require('botbuilder');
const roi = require('roi');

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

var messages = [
    "Я безусловно согласен с подобным утверждением",
    "Возможно это так, но я еще не придумал что возразить по этому поводу",
    "плюс +",
    "минус -",
    "Категорически не согласен с таким положением дел"
];

// Receive messages from the user and respond by echoing each message back (prefixed with 'You said:')
var bot = new builder.UniversalBot(connector, function (session) {
    var max = 4,
        min = 0,
        choice = Math.floor(Math.random() * (max - min + 1)) + min;
    if (session.message.text.match(/Совет:/g)) {
        session.send(messages[choice]);
    } else if (session.message.text.match(/не буянь, бот/g)) {
        console.log(session.message);
        session.send("Хорошо, хозяин");
    }

});