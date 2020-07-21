// const inquirer = require('inquirer');
const connection = require('./connection/sqlConnection');
const util = require('util');


// connection.query(`SELECT name FROM department`, function (
//     err,
//     res
// ) {
//     if (err) throw err;
//     console.log('inside the inqire');
//     for (let i = 0; i < res.length; i++) {
//         departmentChocies.push(res[i]);
//     }
//     resolve("resolved");
// });

// inquirer.prompt(
//     [
//         {
//             type: "list",
//             message: "pick one?",
//             name: 'dept',
//             choices:function() {

//             }
//         }
//     ]
// ).then((r) => {
//     console.log(r)
// })

// async function tow() {
//     let arr = []; 

//     let one  = await connection.query("Select name FROM department", (err, res) => {
//         if (err) throw err;
//         // console.log(res);
//         console.log(1,arr);
//         for (let i = 0; i < res.length; i++) {
//             arr.push(res[i].name);
//         }
//         console.log(2,arr);

//     });
//     console.log(3,arr);
//     return one;

// }

// this is our function 
// async function returnME() {
//   function tow() {
//       return new Promise((resolve, reject) => {
//           connection.query("Select CONCAT(id,' ',first_name,' ',last_name) AS name FROM employee", (err, res) => {
//               if (err) reject();
//               // to test what is being returned 
//               // console.log('this is being returned by mysql',res); 
//               const arr = res.map(r => r.name);
//               resolve(arr);
//           });
//       })
//   }

//   let con = await tow();
//   return con;
// }


// CODED SOLUTION 
async function yes() {
  
  connection.query = util.promisify(connection.query);

  let data = await connection.query("UPDATE employee SET ? WHERE ?", [{ role_id: 3 }, { id: 1 }])

  // const arr = data.map(r => r.name);

  // console.log(data.map(r => r.name)); 

  console.log(`updated role! 1 to 3  ${data}`); 
}

yes(); 



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



// {
//   name: "name",
//   type: "input",
//   message: "What is the new name of the role, if no change type in the same name?",
//   validate: validateEntries
// },
// {
//   name: "salary",
//   type: "input",
//   message: "What is the new salary for the role?",
//   validate: validateNumbers
// },
// {
//   name: "roleDept",
//   type: "list",
//   message: "To which department does this role belong to?",
//   choices: async function returnME() {
//       function tow() {
//           return new Promise((resolve, reject) => {
//               let arr = [];
//               connection.query("Select name FROM department", (err, res) => {
//                   if (err) reject();
//                   for (let i = 0; i < res.length; i++) {
//                       // pushing to the array here 
//                       arr.push(res[i].name);
//                   }
//                   resolve(arr);
//               });
//           })
//       }
//       let con = await tow();
//       return con;
//   }
// },