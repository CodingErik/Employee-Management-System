const { validateEntries, validateNumbers, validateEmail } = require('./validate');
const connection = require('../connection/sqlConnection');
const inquirer = require('inquirer');
const { promisify } = require('util');
const { connect } = require('../connection/sqlConnection');
const { promises } = require('fs');

// FOR PROMISIFY 
const util = require('util');

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
                    connection.query("SELECT title FROM role", (err, res) => {
                        if (err) reject();
                        let arr = [];
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
        name: "employee",
        type: "list",
        message: "choose an employee to update role?",
        choices: async function yes() {
            try {
                // promisify our connection.query function 
                connection.query = util.promisify(connection.query);
                // wait for our data to come back from the database 
                let data = await connection.query("Select CONCAT(id,' ',first_name,' ',last_name) AS name FROM employee")
                // testing our output 
                // console.log(data.map(r => r.name)); 
                // return the data to our choices 
                return data.map(r => r.name);

                // catch any errors and console.log them here along with this message  
            } catch (error) {
                console.log(error, 'this is our error in the catch of the udpate');
            }
        }
    },
    {
        name: "role",
        type: "list",
        message: "please choose new role",
        choices: async function () {
            // connection.query is originaly a callback based http request 
            // so in order to clean it up we use this 
            connection.query = util.promisify(connection.query);

            // wait for the data to come back 
            let data = await connection.query("Select CONCAT(id,' ',title) AS title FROM role");
            
            // console.log(data); 
            return data.map( r => r.title);
        }
    }
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
