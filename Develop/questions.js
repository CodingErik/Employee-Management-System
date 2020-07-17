const { validateEntries, validateNumbers, validateEmail } = require('./validate');
const { connection } = require('../index');

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
        validation: validateEntries
    }
];

// new Role questions
// lets you input the name, salary, and department
// of the new role
const addRole = [
    {
        name: "newRoleName",
        type: "input",
        message: "What is the name of the new role?",
        validation: validateEntries
    },
    {
        name: "newSalary",
        type: "input",
        message: "What the salary for this role?",
        validation: validateNumbers
    },
    {
        name: "roleDept",
        type: "input",
        message: "To which department does this role belong to?",
        choices: function () {
            connection.query("SELECT name FROM department", (err, res) => {
                if (err) throw err;
                return res;
            });
        }
    },
];


// question for employee 
const employees = [
    {
        name: "newfirst_name",
        type: "input",
        message: "What is the first name of the new employee?",
        validation: validateEntries
    },
    {
        name: "newlast_name",
        type: "input",
        message: "What is the last name of the new employee?",
        validation: validateEntries
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
    addRole,

}; 