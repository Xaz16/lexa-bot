var querystring = require('querystring');
var http = require('http');
var fs = require('fs');

function PostToReciver(data) {
    var postData = querystring.stringify(data);
    var postOptions = {
        host: '127.0.0.1',
        port: '3000',
        path: '/data',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(postData)
        }
    };

    var post_req = http.request(postOptions, function (res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            console.log('Response: 32 ' + chunk);
        });
    });

    post_req.write(postData);
    post_req.end();

}

module.exports = PostToReciver;