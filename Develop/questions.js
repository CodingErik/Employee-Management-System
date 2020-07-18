const { validateEntries, validateNumbers, validateEmail } = require('./validate');
const connection = require('../index');
const inquirer = require('inquirer');


// DONE
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













module.exports =
{
    initialQuestion,
    // addDepartment,
    // addRole,
    // addEmployee
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