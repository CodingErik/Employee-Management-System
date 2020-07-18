const { validateEntries, validateNumbers, validateEmail } = require('./validate');
const connection = require('../index');
const inquirer = require('inquirer');
















module.exports =
{
    // initialQuestion,
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