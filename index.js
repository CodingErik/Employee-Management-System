const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require('console.table');
const { blue, red, purple, green } = require('./Develop/color.js');

// questions
const q = require('./Develop/questions');
const { validateEntries, validateNumbers } = require("./Develop/validate.js");

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
        case "Add departments": Add(addDepartment); break;
        case "Add roles": Add(addRole); break;
        case "Add employees": Add(addEmployee); break;

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
        })
        .catch((err) => {
            if (err) throw err;
        })
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
// DONE!!!!
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
            .prompt(udpateRoleQues)
            .then(function (answer) {
                // connection.query("UPDATE role SET ? WHERE ?",
                //     [
                //         {
                //             role: answer.title
                //         },
                //         {
                //             id: answer.id
                //         }
                //     ],
                //     function (err, results) {

                //         results.find()
                //         console.log(results);
                //         console.log(answer);
                //         connection.end();
                //     });
                console.log(answer);
            })
            .catch(err => {
                console.log(`the promise is not resolving that why we get that error ${err.message}`)
            });
    });
};


// question for adding department
// gets the name for the new Department 
// [DONE!!!]
const addDepartment = [
    {
        name: "newDepartmentName",
        type: "input",
        message: "What is the name of the new department?",
        validate: validateEntries
    }
];

// new Role questions 
// lets you input the name, salary, and department
// [DONE!!!]
const addRole = [
    {
        name: "newRoleName",
        type: "input",
        message: "What is the name of the new role?",
        validate: validateEntries
    },
    {
        name: "newSalary",
        type: "input",
        message: "What the salary for this role?",
        validate: validateNumbers
    },
    {
        name: "roleDept",
        type: "list",
        message: "To which department does this role belong to?",
        choices: async function returnME() {
            function tow() {
                return new Promise((resolve, reject) => {
                    let arr = [];
                    connection.query("Select name FROM department", (err, res) => {
                        if (err) reject();
                        for (let i = 0; i < res.length; i++) {
                            // pushing to the array here 
                            arr.push(res[i].name);
                        }
                        resolve(arr);
                    });
                })
            }
            let con = await tow();
            return con;
        }
    },
];

// question for employee
// gets the name, last name, role, and manager 
// [DONE!!!]
const addEmployee = [
    {
        name: "newfirst_name",
        type: "input",
        message: "What is the first name of the new employee?",
        validate: validateEntries
    },
    {
        name: "newlast_name",
        type: "input",
        message: "What is the last name of the new employee?",
        validate: validateEntries
    },
    {
        name: "roleDept",
        type: "list",
        message: "What is the new employees title?",
        choices: async function () {
            function tow() {
                return new Promise((resolve, reject) => {
                    let arr = [];
                    connection.query("SELECT title FROM role", (err, res) => {
                        if (err) reject();
                        for (let i = 0; i < res.length; i++) {
                            // pushing to the array here 
                            arr.push(res[i].title);
                        }
                        resolve(arr);
                    });
                })
            }
            let con = await tow();
            return con;
        }
    },
    {
        name: "manager_id",
        type: "list",
        message: "Who is the employee's manager?",
        choices: async function () {
            function tow() {
                return new Promise((resolve, reject) => {
                    let arr = ['exit'];
                    connection.query("SELECT CONCAT(first_name,' ', last_name) AS manager FROM employee WHERE manager_id is null", (err, res) => {
                        if (err) reject();
                        for (let i = 0; i < res.length; i++) {
                            // pushing to the array here 
                            arr.push(res[i].manager);
                        }
                        resolve(arr);
                    });
                })
            }
            let con = await tow();
            return con;
        }
    }
];

// update Employee role questions
// [DONE!!!]
const udpateRoleQues = [
    {
        name: "role",
        type: "list",
        message: "Choose the role that you want to update?",
        choices: async function () {
            function tow() {
                return new Promise((resolve, reject) => {
                    let arr = [];
                    connection.query("Select title FROM role", (err, res) => {
                        if (err) reject();
                        for (let i = 0; i < res.length; i++) {
                            // pushing to the array here 
                            arr.push(res[i].title);
                        }
                        resolve(arr);
                    });
                })
            }
            let con = await tow();
            return con;
        }
    },
    {
        name: "name",
        type: "input",
        message: "What is the new name of the role, if no change type in the same name?",
        validate: validateEntries
    },
    {
        name: "salary",
        type: "input",
        message: "What is the new salary for the role?",
        validate: validateNumbers
    },
    {
        name: "roleDept",
        type: "list",
        message: "To which department does this role belong to?",
        choices: async function returnME() {
            function tow() {
                return new Promise((resolve, reject) => {
                    let arr = [];
                    connection.query("Select name FROM department", (err, res) => {
                        if (err) reject();
                        for (let i = 0; i < res.length; i++) {
                            // pushing to the array here 
                            arr.push(res[i].name);
                        }
                        resolve(arr);
                    });
                })
            }
            let con = await tow();
            return con;
        }
    },
]


start();


module.exports = connection;

