// validateEntries
// this function validates entries for the user inputs
// and returns the value if it is valid 
// ***************************************
const validateEntries = value => (value === '')? 'this is not a valid input': true; 

const validateNumbers =  value => (/^[0-9]/).test(value)? true : 'this is not a valid input';

const validateEmail = value => (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) ? true : 'this is not a valid email adress';

// const validateEmployee = value => ((/^[yY|nN]$/).test(value))?  true: 'this is not a valid input';

module.exports = {validateEntries,validateNumbers, validateEmail}; 