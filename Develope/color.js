const chalkPipe = require('chalk-pipe');

let blue = chalkPipe('blue.bold'); 
let red = chalkPipe('red.bold'); 
let purple = chalkPipe('purple.bold');
let green = chalkPipe('green.bold');


module.exports = {
    blue,
    red,
    purple,
    green
}; 