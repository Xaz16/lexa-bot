const restify = require('restify');
const builder = require('botbuilder');
const fs = require('fs');
const cron = require('node-cron');
const parseFile = require('./utils/parseFile');
const invoker = require('./utils/invoker.js');
const sendMessage = require('./utils/sendMessage');
const getRandomInRange = require('./utils/getRandomInRange');


let advices = parseFile('./data.json');
let quotes = parseFile('./quotes_uniq.json');
let cronTask;
let addressSaved = {};


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
    addressSaved = session.message.address;

    if (addressSaved.user.name === 'Aleksey Chipiga' && session.message.text.match(/совет/g)) {
        sendProactiveMessage(null, 'advice');
    } else if (addressSaved.user.name === 'Aleksey Chipiga' && session.message.text.match(/цитату|шутейку/g)) {
        sendProactiveMessage(null, 'quote');
    }

    if (!cronTask) {
        cronTask = cron.schedule('0 * * * *', sendProactiveMessage, false);
        cronTask.start();
        console.log('cron has been started');
        invoker();
    }
});

function sendProactiveMessage(address, optionalChoice) {
    address = address || addressSaved;

    let positionAdvice = getRandomInRange(advices.length, 0);
    let positionQuotes = getRandomInRange(quotes.length, 0);

    advices.splice(positionAdvice, 1);
    quotes.splice(positionQuotes, 1);

    let adviceMessage = `Совет: ${advices[positionAdvice].text}`,
        quoteMessage = `Борода: ${quotes[positionQuotes]}`;

    switch (optionalChoice) {
        case 'advice':
            sendMessage(address, adviceMessage, bot);
            break;
        case 'quote':
            sendMessage(address, quoteMessage, bot);
            break;
        default:
            sendMessage(address, adviceMessage, bot);
            sendMessage(address, quoteMessage, bot);
            break;
    }

}






