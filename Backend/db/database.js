const {Client} = require('pg');

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'hostel_iiitv',
    password: 'amal',
    port: 5432,
  });

  client.connect((err) => {
    if (err) {
      console.error('some error occured', err.message);
    } else {
      console.log('Databse connected successfully');
    }
  });
  module.exports = client;