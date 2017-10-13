var restify = require('restify');
var builder = require('botbuilder');
var fs = require('fs');
var advices = parseFile('./data.json');
var quotes = parseFile('./quotes_uniq.json');

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
    addressSaved = session.message.address;

    // getAddresses();
    sendProactiveMessage();
});

function sendProactiveMessage(address) {
    address = address || addressSaved;
    var msg = new builder.Message().address(addressSaved);
    var positionAdvice = getRandomInRange(advices.length, 0);
    var positionQuotes = getRandomInRange(quotes.length, 0);

    advices.splice(positionAdvice, 1);
    msg.text('<a href="' + advices[positionAdvice].href +'">' + 'Совет: №' + advices[positionAdvice].id + '</a> <br/> <br/>' + advices[positionAdvice].text + "\n <br/> <br/>Осталось советов: " + advices.length);
    msg.textLocale('ru-RU');
    bot.send(msg);

    setTimeout(function () {
        quotes.splice(positionQuotes, 1);
        msg.text('Цитата: №' + positionQuotes + '<br><br>' + quotes[positionQuotes] + 'Осталось цитат: ' + quotes.length)
        msg.textLocale('ru-RU');
        bot.send(msg);
    }, 1000);

    setTimeout(function () {
        msg.text(messages[getRandomInRange(4, 0)]);
        msg.textLocale('ru-RU');
        bot.send(msg);
    }, 2000);



    if(advices.length !== 0 || quotes.length !== 0) {
        setTimeout(sendProactiveMessage, 3.6e+6)
    }

}


function sendMessage(address, text) {
    var msg = new builder.Message().address(address);
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

function getAddresses() {
    var addresses = JSON.parse(fs.readFileSync('./addresses.json', 'utf-8'));
    var isRepeatedAddress = false;
    addresses.forEach(function (elem) {
        if(elem.conversation.id === addressSaved.conversation.id) {
            isRepeatedAddress = true;
        }
    });
    if(!isRepeatedAddress) {
        addresses.push(session.message.address);
        fs.writeFile('addresses.json', JSON.stringify(addresses));
        sendMessage(session.message.address, 'Спасибо за информацию, ' + session.message.address.user.name)
    }
}