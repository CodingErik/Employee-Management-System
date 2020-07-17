const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require('console.table');
const { blue, red, purple, green } = require('./Develop/color.js');

// questions
const q = require('./Develop/questions');
const { validateEntries } = require("./Develop/validate.js");

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
    let questions = await sendToNextPrompt(a.choice);

    // // ask the new prompt
    // let add = await inquirer.prompt(questions);

    // // this is the object with the answers to the specific prompt 
    // console.log(add);
};


function sendToNextPrompt(addViewUpdate) {
    // depending on the case the function will recieve a different question prompt
    switch (addViewUpdate) {
        case "Add departments":  Add(q.addDepartment); break; 
        case "Add roles":  Add(q.addRole); break; 
        case "Add employees":  Add(q.addEmployee); break; 

        // DONE *************************
        case "View departments": View('department'); break;
        case "View roles": View('role'); break;
        case "View employees": View('employee'); break;

        case "Update employee roles": update(); break;
        case "EXIT": return EXIT();
        default: return;
    }
}


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
function Add(questions) {
    console.log('inside the add function'); 
    inquirer.prompt(questions)
        .then((response) => {
            // let item = response.item;
            // let category1 = response.category;
            // let price = response.price;
            return console.log(response);
        });
        // .then((response) => {
        //     // 
        //     // con.query("insert into auctions set ? ",
        //     //     {
        //     //         item_name: item,
        //     //         category: category1,
        //     //         starting_bid: price
        //     //     },
        //     //     (err) => {
        //     //         if (err) throw err;
        //     //         console.log(`item posted!!!`);
        //     //         // readAll();
        //     //     });
        //     console.log({ item, category1, price }); 
        // });
    // main();
}

// This function will run if the user chooses to view something 
// for departments roles or employees
// then will be rerouted 
function View(table) {
    let statement;
    if (table === 'department' || table === 'role') {
        statement = `SELECT * FROM ${table}`;
    } else {
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

// This function will run if the user chooses to update something 
// for departments roles or employees
// then will be rerouted
function update() {
    // console.log(`inside update function`)
    connection.query("SELECT * FROM role", function (err, results) {
        if (err) throw err;

        // display table for user to see the employees
        console.table(results);
        // this is an array with objects
        // console.log(results);
        inquirer
            .prompt(
                {
                    name: "title",
                    type: "list",
                    message: "Choose the role that you want to update?",
                    choices: function () {
                        let dept = [];
                        results.forEach(e => dept.push(e.title));
                        return dept;
                    },
                },
                {
                    name: "id",
                    type: "list",
                    message: "Choose the role that you want to update?",
                    choices: function () {
                        let dept = [];
                        results.forEach(e => dept.push(e.title));
                        return dept;
                    },
                },

            )
            .then(function (answer) {
                connection.query("UPDATE role SET ? WHERE ?",
                    [
                        {
                            role: answer.title
                        },
                        {
                            id: answer.id
                        }
                    ],
                    function (err, results) {

                        results.find()
                        console.log(results);
                        console.log(answer);
                        connection.end();
                    });
            })
            .catch(err => {
                console.log(`the promise is not resolving that why we get that error ${err.message}`)
            });
    });
};













start();


module.exports = connection;



// // Function to view all employees
// function viewAllEmployees() {
// 	connection.query(
// 		`SELECT employee.id, employee.first_name, employee.last_name, role.title,
// 		department.name AS department,role.salary,CONCAT(a.first_name, " ", a.last_name) AS manager
// 		FROM employee
// 		LEFT JOIN role ON employee.role_id = role.id
// 		LEFT JOIN department ON role.id = department.id
// 		LEFT JOIN employee a ON a.id = employee.manager_id;`,
// 		function (err, res, field) {
// 			if (err) throw err;
// 			console.table(res);
// 			inquirer.prompt(introQuestion).then(answerChoices);
// 		}
// 	);
// }

// // Function to view all departments
// function viewAllDepartments() {
// 	connection.query("SELECT * FROM department;", function (err, res, field) {
// 		if (err) throw err;
// 		console.table(res);
// 		inquirer.prompt(introQuestion).then(answerChoices);
// 	});
// }

// // Function to view all roles
// function viewAllRoles() {
// 	connection.query("SELECT * FROM role;", function (err, res, field) {
// 		if (err) throw err;
// 		console.table(res);
// 		inquirer.prompt(introQuestion).then(answerChoices);
// 	});
// }





// connection.query("SELECT id, first_name, last_name FROM employee", function (err, results) {
//     if (err) throw err;

//     // display table for user to see the employees
//     console.table(results);
//     // this is an array with objects
//     // console.log(results);
//     inquirer
//         .prompt({
//             name: "id",
//             type: "input",
//             message: "Enter the id number of the employee which role is changing?",
//             validate: validateEntries
//         })
//         .then(function (answer) {
//             connection.query("UPDATE employee SET ? WHERE ?",
//             [
//                 {
//                     role: answer.first_name
//                 }, 
//                 {
//                     id: answer.id
//                 }
//             ],
//             function (err, results) {

//                 results.find()
//                 console.log(results);
//                 console.log(answer);
//                 connection.end();
//             });
//         });
// });




// async function () {
//     var employeeRole = [];
//     var promiseWrapper = function () {
//         return new Promise((resolve) => {
//             connection.query(`SELECT role.title FROM role`, function (
//                 err,
//                 res,
//                 field
//             ) {
//                 if (err) throw err;
//                 for (var i = 0; i < res.length; i++) {
//                     employeeRole.push(`${res[i].title}`);
//                 }
//                 resolve("resolved");
//             });
//         });
//     };
//     await promiseWrapper();
//     return employeeRole;
// },