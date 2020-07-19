const { validateEntries, validateNumbers, validateEmail } = require('./validate');
const connection = require('../connection/sqlConnection');
const inquirer = require('inquirer');



// QUESTIONS 
// ************************************************************
// ************************************************************

// intial question with scrolling choices 
// [DONE!!!]
const initialQuestion =
    [
        {
            name: "choice",
            type: "list",
            message: "What would you like to do?",
            choices:
                [
                    "Add departments",
                    "Add roles",
                    "Add employees",
                    "View departments",
                    "View roles",
                    "View employees",
                    "Update employee roles",
                    "EXIT",
                ]
        }
    ];

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
                    connection.query("Select name FROM department", (err, res) => {
                        if (err) reject();
                        const arr = res.map(r => r.name); 
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
const udpateRoleQuestion = [
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
];

// ************************************************************
// ************************************************************

// export *  as from '../index';

module.exports = 
{
    initialQuestion,
    addDepartment,
    addRole,
    addEmployee,
    udpateRoleQuestion,
};
