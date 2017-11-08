require('newrelic');
const restify = require('restify');
const builder = require('botbuilder');
const fs = require('fs');
const cron = require('node-cron');
const parseFile = require('./utils/parseFile');
const invoker = require('./utils/invoker.js');
const sendMessage = require('./utils/sendMessage');
const sendCard = require('./utils/sendCard');
const getAdvice = require('./models/getAdvice');
const getJoke = require('./models/getJoke');
const getCard = require('./models/getCard');

let cronTask;
let addressSaved = {};
let globalSession = {};

let server = restify.createServer({});
server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log('%s listening to %s', server.name, server.url);
});

let connector = new builder.ChatConnector({
    appId: 'd49dab97-26d5-496d-8f1c-44deed41f46b',
    appPassword: 'ft1KopBYA6ZhP82gSfDQeAb'
});

server.post('/api/messages', connector.listen());

let bot = new builder.UniversalBot(connector, function (session) {
    globalSession = session;
    addressSaved = session.message.address;

    if (session.message.text.match(/совет/g)) {
        sendProactiveMessage(null, 'advice');
    } else if (session.message.text.match(/бороду/g)) {
        sendProactiveMessage(null, 'quote');
    } else if (session.message.text.match(/всё/g)) {
        sendProactiveMessage();
    } else if (session.message.text.match(/карта/g)) {
        sendProactiveMessage(null, 'card');
    }

    if (!cronTask) {
        cronTask = cron.schedule('0 5-15 * * 1-5', sendProactiveMessage, false);
        cronTask.start();
        invoker();
    }
});

function sendProactiveMessage(address, optionalChoice) {
    address = address || addressSaved;

    switch (optionalChoice) {
        case 'advice':
            getAdvice().then(function (res) {
                sendMessage(address, 'Совет: ' + res.text, bot);
            });
            break;
        case 'quote':
            getJoke().then(function (res) {
                sendMessage(address, 'Борода: ' + res.text, bot);
            });
            break;
        case 'card':
            getCard(true).then(function (res) {
                sendCard(address, res, bot, globalSession);
            });
            break;
        default:
            Promise.all([getJoke(), getAdvice(), getCard()]).then((values) => {
                let message = `Борода: ${values[0].text} <br/>Совет: ${values[1].text}<br/><a href="https://developerslife.ru/${values[2].id}">Ссылка devLife</a>`;
                sendMessage(address, message, bot);
                sendCard(address, values[2], bot, globalSession)
            });
            break;
    }
}






