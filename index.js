// const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require('console.table');
const { blue, red, purple, green } = require('./Develop/color.js');
const connection = require('./config/sqlConnection');
const QueryKey = require('./config/queryFunctions');
const util = require('util');


// questions
const q = require('./Develop/questions');

// connect to the mysql server and sql database
// populates our ascii art as intro
// then calls our start function 
// goes to main 
function start() {
    connection.connect(function (err) {
        if (err) throw err;
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
        // Test();
    });
}

// function start prompts and re-routes accordingly 
async function main() {

    // ask the intial questions
    let a = await inquirer.prompt(q.initialQuestion);

    //decide the next prompt and return it
    sendToNextPrompt(a.choice);

    // // ask the new prompt
    // let add = await inquirer.prompt(questions);

    // // this is the object with the answers to the specific prompt 
    // console.log(add);
};

// ROUTES
// and call the correct function 
function sendToNextPrompt(addViewUpdate) {
    // depending on the case the function will recieve a different question prompt
    switch (addViewUpdate) {

        // DONE *************************
        case "Add departments": Add(q.addDepartment); break;
        case "Add roles": Add(q.addRole); break;
        case "Add employees": Add(q.addEmployee); break;

        // DONE *************************
        case "View departments": View('department'); break;
        case "View roles": View('role'); break;
        case "View employees": View('employee'); break;

        // DONE *************************
        case "Update employee roles": update(); break;
        case "EXIT": return EXIT();
        default: return;
    }
}


// ******************************
// Tell the user bye
// end the connection
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
// ******************************
function Add(questions) {
    // testing function 
    // console.log('inside the add function');
    inquirer.prompt(questions)
        .then((r) => {
            // let item = response.item;
            // let category1 = response.category;
            // let price = response.price;
            // testing
            // console.log(r);
            let value;
            let query;
            let msg; 

            // add department
            if (r.newDepartmentName) {
                value = [r.newDepartmentName];
                query = "INSERT INTO department (name) VALUES (?);";
                msg = `The new department has been added!!!;`; 
            // add role
            } else if (r.newRoleName) {
                value =
                {
                    title: r.newRoleName,
                    salary: r.newSalary,
                    department_id: r.roleDept.charAt(0) // call this in to match id 
                };
                // console.log(value);
                query = "INSERT INTO role set ?;";
                msg = `The new role has been added!!!;`; 

            // add employee
            } else if (r.newfirst_name) {
                value = {
                    first_name: r.newfirst_name,
                    last_name: r.newlast_name,
                    role_id: r.roleDept.charAt(0),  // call this in to match id 
                    manager_id: r.manager_id.charAt(0) // call this in to match id 
                };
                // console.log(value);
                query = "INSERT INTO employee set ?;";
                msg = `The new employee has been added!!!;`; 
            }

            // if a department id is added we need to match that id to the deparment 

            connection.query(query, value, (err) => {
                if (err) throw err;
                console.log(msg);
                console.log(`returning to the main menu........:)`);
                setTimeout(() => main(), 2000);
                // main();
            });

        })
        .catch((err) => {
            if (err) throw err;
        })
}

// This function will run if the user chooses to update something 
// for departments roles or employees
// then will be rerouted
function update() {
    // console.log(`inside update function`)
    connection.query("SELECT CONCAT(first_name, ' ', last_name) as employee, title as Roles FROM employee as A LEFT JOIN role as D on A.role_id = D.id;"
        , function (err, results) {
            if (err) throw err;

            // display table for user to see the employees
            console.table(results);
            // this is an array with objects
            // console.log(results);
            inquirer
                .prompt(q.udpateRoleQuestion)
                .then(function (answer) {

                    /// choose employee 
                    let employee = answer.employee.charAt(0);
                    // choose new role 
                    let newRole = answer.role.charAt(0);

                    // testing output
                    // console.log(employee, 'this is the emoployee')    
                    // console.log(newRole, 'this is the newRole')

                    async function updateRoleId() {

                        connection.query = util.promisify(connection.query);

                        let data = await connection.query("UPDATE employee SET ? WHERE ?", [{ role_id: newRole }, { id: employee }]);

                        console.log('Role Updated!!!!');
                        console.log(`returning to the main menu........:)`);
                        main();
                    }

                    updateRoleId();

                })
                .catch(err => {
                    console.log(`the promise is not resolving that why we get that error ${err.message}`)
                });
        });
};

// This function will run if the user chooses to view something 
// for departments roles or employees
// then will be rerouted 
// [DONE!!!]
function View(table) {
    let statement;
    if (table === 'department') {
        statement = `SELECT id, name as Deparment FROM ${table}`;
    } else if (table === 'role') {
        statement = `SELECT id, title as Roles, salary, department_id FROM ${table}`;
    }
    else {
        statement = `SELECT A.id,
        CONCAT(A.first_name,' ',A.last_name) AS 'Employee',
        CONCAT(B.first_name,' ',B.last_name) AS 'Manager',
        title AS Role,
        d.name AS Department
        FROM employee AS A
        LEFT JOIN employee AS B on A.manager_id = B.id
        LEFT JOIN role ON role.id = A.role_id
        LEFT JOIN department AS d ON role.id = d.id;`;
    }

    connection.query(statement, (err, res) => {
        if (err) throw err;
        console.table(res);
        main();
    })
}

// ************************************************************
// ************************************************************


start();


module.exports = { main };

