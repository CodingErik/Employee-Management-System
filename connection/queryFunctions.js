const inquirer = require('inquirer');
const connection = require('./sqlConnection');
const i = require('../index.js'); 
const { main } = require('../index.js');




    // // This function will run if the user chooses to view something 
    // // for departments roles or employees
    // // then will be rerouted 
    // // [DONE!!!]
    // function View(table) {
    //     let statement;
    //     if (table === 'department' || table === 'role') {
    //         statement = `SELECT * FROM ${table}`;
    //     } else {
    //         statement = `SELECT A.id,
    //     CONCAT(A.first_name,' ',A.last_name) AS 'Employee',
    //     CONCAT(B.first_name,' ',B.last_name) AS 'Manager',
    //     title AS Role,
    //     d.name AS Department
    //     FROM employee AS A
    //     LEFT JOIN employee AS B on A.manager_id = B.id
    //     LEFT JOIN role ON role.id = A.role_id
    //     LEFT JOIN department AS d ON role.id = d.id;`;
    //     }

    //     connection.query(statement, (err, res) => {
    //         if (err) throw err;
    //         console.table(res);
    //         main(); 
    //     })
    // }







// module.exports = {View}; 