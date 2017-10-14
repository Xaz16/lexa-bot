const restify = require('restify');
const builder = require('botbuilder');
const fs = require('fs');
const cron = require('node-cron');
let advices = parseFile('./data.json');
let quotes = parseFile('./quotes_uniq.json');
let crontask;

let server = restify.createServer({});
server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log('%s listening to %s', server.name, server.url);
});

let connector = new builder.ChatConnector({
    appId: 'd49dab97-26d5-496d-8f1c-44deed41f46b',
    appPassword: 'ft1KopBYA6ZhP82gSfDQeAb'
});

server.post('/api/messages', connector.listen());
let addressSaved = {};
let messages = [
    "Я безусловно согласен с подобным утверждением",
    "Возможно это так, но я еще не придумал что возразить по этому поводу",
    "плюс +",
    "минус -",
    "Категорически не согласен с таким положением дел"
];

let bot = new builder.UniversalBot(connector, function (session) {
    addressSaved = session.message.address;
    console.log(addressSaved);

    if(addressSaved.user.name === 'Aleksey Chipiga' && session.message.text.match(/совет/g)) {
        sendProactiveMessage(null, 'advice');
    } else if(addressSaved.user.name === 'Aleksey Chipiga' && session.message.text.match(/цитату|шутейку/g)) {
        sendProactiveMessage(null, 'quote');
    } else if(session.message.text.match(/проясни ситуацию/g)) {
        sendMessage(addressSaved, '@Skyper тебе здесь не рады');
    }

    if(!crontask) {
        crontask = cron.schedule('0 8-17 * * 1-5', sendProactiveMessage, false);
        crontask.start();
        sendMessage(addressSaved, 'Crontask has started. Config is: “At minute 0 past every hour from 8 through 17 on every day-of-week from Monday through Friday.”');
    }
});

function sendProactiveMessage(address, optionalChoice) {
    address = address || addressSaved;
    let positionAdvice = getRandomInRange(advices.length, 0);
    let positionQuotes = getRandomInRange(quotes.length, 0);

    advices.splice(positionAdvice, 1);
    quotes.splice(positionQuotes, 1);
    let adviceMessage = `<a href="${advices[positionAdvice].href}">Совет: №${advices[positionAdvice].id}</a> <br/> <br/>${advices[positionAdvice].text} <br/><br/>Осталось советов: ${advices.length}`,
        quoteMessage = `Цитата: №${positionQuotes} <br/><br/> ${quotes[positionQuotes]} <br/><br/> Осталось цитат: ${quotes.length}`;


    if(optionalChoice && optionalChoice === 'advice') {
        sendMessage(address, adviceMessage);
    } else if (optionalChoice && optionalChoice === 'quote') {
        sendMessage(address, quoteMessage);
    } else {
        sendMessage(address, adviceMessage);
        sendMessage(address, quoteMessage);
    }


    setTimeout(function () {
        sendMessage(addressSaved, messages[getRandomInRange(4, 0)]);
    }, 1000);

}


function sendMessage(address, text) {
    let msg = new builder.Message().address(address);
    msg.text(text);
    msg.textLocale('ru-RU');
    bot.send(msg);
}

function parseFile(path) {
    return JSON.parse(fs.readFileSync(path, 'utf-8'));
}

function getRandomInRange(max, min) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

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