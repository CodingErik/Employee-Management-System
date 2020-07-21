const mysql = require("mysql");
const util = require('util'); 

// dotenv 
require('dotenv').config();

// create the connection information for the sql database
const connection = mysql.createConnection({
    host: 'localhost',

    // Your port
    port: 3306,

    // Your username
    user: 'root',

    // Your password
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});



// connection.query = util.promisify(connection.query); 

module.exports = connection; 