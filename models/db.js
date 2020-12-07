const mysql = require('mysql');
const config = require('../config/config');


const connection = mysql.createConnection({
    host: config.DB_HOST,
    user: config.DB_USER,  
    password : config.DB_PASSWORD,  
    database : config.DB_NAME  
  });
  
connection.connect(function(err) {
    if (!err)
    {
        console.log('Database is connected');
    }
    else
    {
        console.log('You are now connected with mysql database...');
    }
  });

  module.exports = connection;