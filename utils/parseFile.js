const fs = require('fs');

function parseFile(path) {
    return JSON.parse(fs.readFileSync(path, 'utf-8'));
}

module.exports = parseFile;