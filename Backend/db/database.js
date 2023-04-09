const { Client } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const connectionString = process.env.POSTGRES_CONNECTION_STRING;

const client = new Client({
  connectionString: connectionString,
  ssl: {
    rejectUnauthorized: false
  }
});

  client.connect((err) => {
    if (err) {
      console.error('some error occured', err.message);
    } else {
      console.log('Databse connected successfully');
    }
  });

  module.exports = client;