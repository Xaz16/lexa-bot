const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/xaz';

function getCard(noUpdate = false) {
    return new Promise(function (resolve, reject) {
        let data;
        pg.connect(connectionString, (err, client, done) => {
            if (err) {
                done();
                reject();
                console.log(err.message);
                return new Error(err.message);
            }

            if(noUpdate) {
                const randomQuery = client.query('SELECT * FROM devLife ORDER BY RANDOM() LIMIT 1');

                randomQuery.on('row', (row) => {
                    resolve(row);
                });

                randomQuery.on('end', () => {
                    done()
                });
            } else {
                // const query = client.query('SELECT * FROM devLife ORDER BY repeats ASC, rating DESC LIMIT 1');
                const query = client.query('SELECT * FROM devLife ORDER BY repeats ASC, RANDOM() LIMIT 1');

                query.on('row', (row) => {
                    data = row;
                    resolve(row);
                });

                query.on('end', () => {
                    let updateQuery = {
                        name: 'fetch-user',
                        text: 'UPDATE devLife SET repeats=$1  WHERE id=$2',
                        values: [+data.repeats + 1, data.id]
                    };

                    client.query(updateQuery, (err, res) => {
                        if(!err) {
                            console.log(res);
                            done();
                        }
                    })
                });
            }


        });
    });

}


module.exports = getCard;
