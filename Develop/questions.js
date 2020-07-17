const { validateEntries, validateNumbers, validateEmail } = require('./validate');

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
const adddepartments =   [
        {
            name: "newDepartmentName",
            type: "input",
            message: "What is the name of the new department?",
            validation: validateEntries
        }
    ];
const roles =   [
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
const employees =   [
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
    // addQuestion1,

}; 