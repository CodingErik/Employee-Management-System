const { validateEntries, validateNumbers, validateEmail } = require('./validate');
const connection = require('../connection/sqlConnection');
const inquirer = require('inquirer');


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




module.exports = 
{
    initialQuestion,
    addDepartment
};
