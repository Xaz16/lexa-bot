const fs = require('fs');

function parseFile(path) {
    let object;
    try {
        object = JSON.parse(fs.readFileSync(path, 'utf-8'));
    } catch(e) {
        object = {};
    }
    return object;
}

module.exports = parseFile;