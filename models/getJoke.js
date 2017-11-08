const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/xaz';

function getJoke() {
    return new Promise(function (resolve, reject) {
        pg.connect(connectionString, (err, client, done) => {
            if (err) {
                done();
                reject(new Error(err.message));
            }

            const query = client.query('SELECT text FROM jokes ORDER BY RANDOM() LIMIT 1');

            query.on('row', (row) => {
                resolve(row);
            });

            query.on('end', () => {
                done();
            });
        });
    });

}


module.exports = getJoke;
