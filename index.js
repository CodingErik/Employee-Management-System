const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require('console.table');
const { validateEntries, validateNumbers, validateEmail } = require('./Develop/lib/validate');

console.log(cTable.getTable); 

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

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    console.log(`
* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  * 
|                                                                  |
|    .--.                                                          |
|    |__| .-------.                                                |
|    |=.| |.-----.|                                                |
|    |--| || EMS ||                                                |
|    |  | |'-----'|___________________________________________     |
|    |__|~')_____(' Welcome to The Employee Management System      |
|                                                                  |
|         ~ made with care by -Erik De Luna-                       |
* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  *  
`)
    start();
});

// function which prompts the user for what action they should take
function start() {

    inquirer
        .prompt({
            name: "choice",
            type: "list",
            message: "What would you like to do?",
            choices: ["Add departments, roles, employees", "View departments, roles, employees", "Update employee roles"]
        })
        .then(function (answer) {
            //  switch(answer.choice)
            let key = answer.choice;

            switch (key) {
                case "Add departments, roles, employees": return Add();
                case "View departments, roles, employees": return View();
                case "Update employee roles": return update();
                default: return;
            }
        });
}

// This function will run if the user chooses to add something 
// for departments roles or employees
// then will be rerouted 
function Add() {
    inquirer
        .prompt({
            name: "choice",
            type: "list",
            message: "What would you like to do?",
            choices: ['Add departments', 'Add roles', 'Add employees']
        })
        .then(function (answer) {
            //  switch(answer.choice)
            let key = answer.choice;

            switch (key) {
                case "Add departments": return console.log(`departements`);
                case "Add roles": return console.log(`roles`);
                case "Add employees": return console.log(`employees`);
                default: return connection.end();;
            }
        });
}

// This function will run if the user chooses to view something 
// for departments roles or employees
// then will be rerouted 
function View() {
    inquirer
        .prompt({
            name: "choice",
            type: "list",
            message: "What would you like to do?",
            choices: ['View departments', 'View roles', 'View employees']
        })
        .then(function (answer) {
            //  switch(answer.choice)
            let key = answer.choice;

            switch (key) {
                case "View departments": return console.log(`View departements`);
                case "View roles": return console.log(`View roles`);
                case "View employees": return console.log(`View employees`);
                default: return connection.end();;
            }
        });
}

// This function will run if the user chooses to update something 
// for departments roles or employees
// then will be rerouted
function update() {
    console.log(`inside update function`)
    connection.query("SELECT * FROM employee", function (err, results) {
        if (err) throw err;
        inquirer
            .prompt({
                name: "choice",
                type: "list",
                message: "which employee would you like to update?",
                choices: function () {
                    return results;
                }
            })
            .then(function (answer) {
                connection.query("SELECT * FROM employee", function (err, results) {


                    console.log(answer);
                    connection.end();
                });
            });
    });
};







