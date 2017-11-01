const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/xaz';

function getCard() {
    return new Promise(function (resolve, reject) {
        pg.connect(connectionString, (err, client, done) => {
            if (err) {
                done();
                reject();
                console.log(err.message);
                return new Error(err.message);
            }

            const query = client.query('SELECT * FROM devLife ORDER BY RANDOM() LIMIT 1');

            query.on('row', (row) => {
                resolve(row);
            });

            query.on('end', () => {
                done();
            });
        });
    });

}


module.exports = getCard;
