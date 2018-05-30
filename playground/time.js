var moment = require('moment');

var date = moment();
console.log(date.format('MMM Do YYYY HH:mm:ss a'));
console.log(date.format('h:mm a'));

var someTime = moment().valueOf();
console.log(someTime);
