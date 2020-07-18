const mysql = require("mysql");
const util = require('util'); 

// create the connection information for the sql database
const connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "Erikmysql",
    database: "employeeDB"
});



// connection.query = util.promisify(connection.query); 

module.exports = connection; 