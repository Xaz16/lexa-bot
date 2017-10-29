const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/xaz';

function getAdvice() {
    return new Promise(function (resolve, reject) {
        pg.connect(connectionString, (err, client, done) => {
            if (err) {
                done();
                reject();
                console.log(err.message);
                return new Error(err.message);
            }

            const query = client.query('SELECT text FROM advices ORDER BY RANDOM() LIMIT 1');

            query.on('row', (row) => {
                resolve(row);
            });

            query.on('end', () => {
                done();
            });
        });
    });

}


module.exports = getAdvice;
