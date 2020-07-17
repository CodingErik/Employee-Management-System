const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require('console.table');
const { blue, red, purple, green } = require('./Develop/color.js');

// questions
const q = require('./Develop/questions');

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
// populates our ascii art as intro
// then calls our start function 
function start() {
    connection.connect(function (err) {
        if (err) throw err;
    });
    // greeting the user 
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
    |                                                                  |
    * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  *  
    `);
    // run the start function after the connection is made to prompt the user
    main();
}

// function start prompts and re-routes accordingly 
async function main() {

    let a = await inquirer.prompt(q.initialQuestion);

    let choice = await sendToNextPrompt(a.choice);




}


function sendToNextPrompt(addViewUpdate) {
    switch (addViewUpdate) {
        case "Add departments": return questionAdd('departments');
        case "Add roles": return questionAdd('roles');
        case "Add employees": return questionAdd('employees');
        case "View departments": return questionView('departments');
        case "View roles": return questionView('roles');
        case "View employees'": return questionView('employees');
        case "Update employee roles": return questionupdate();
        case "EXIT": return EXIT();
        default: return;
    }
}


// bye 
function EXIT() {
    connection.end();
    console.log(`
    
    
    888                      
    888                      
    888                      
    88888b. 888  888 .d88b.  
    888 "88b888  888d8P  Y8b 
    888  888888  88888888888 
    888 d88PY88b 888Y8b.     
    88888P"  "Y88888 "Y8888  
                 888         
            Y8b d88P         
             "Y88P"     

    `);
    return; 
}

// This function will run if the user chooses to add something 
// for departments roles or employees
// then will be rerouted 
async function questionAdd(choice) {

    // depeding on the choic
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











start(); 