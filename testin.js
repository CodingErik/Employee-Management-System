// const inquirer = require('inquirer');
const connection = require('./index');


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

async function returnME(){

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

// I want this function to return array with the pushed elements 
// tow().then(res => console.log('result', res));

let con = await tow(); 

return con; 

}; 

// returnME(); 

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

