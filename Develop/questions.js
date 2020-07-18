const { validateEntries, validateNumbers, validateEmail } = require('./validate');
const connection = require('../index');
const inquirer = require('inquirer');


// DONE
// intial question with scrolling choices 
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
const addDepartment = [
    {
        name: "newDepartmentName",
        type: "input",
        message: "What is the name of the new department?",
        validate: validateEntries
    }
];





// question for employee
// gets the name, last name, role, and manager 
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
        type: "input",
        message: "What is the new employees title?",
        choices: function () {
            connection.query("SELECT title FROM role", (err, res) => {
                if (err) throw err;
                return res;
            });
        }
    },
    {
        name: "roleDept",
        type: "input",
        message: "Who is the employee's manager?",
        choices: function () {
            connection.query("SELECT CONCAT(first_name,' ', last_name) AS manager FROM employee WHERE manager_id is null", (err, res) => {
                if (err) throw err;
                return res;
            });
        }
    }
];





module.exports =
{
    initialQuestion,
    addDepartment,
    // addRole,
    addEmployee
};


// choices: async function () {
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