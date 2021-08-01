const validator = require('validator');

console.log(validator.isEmail('a@gmail.com'))
console.log(validator.isMobilePhone('1234567','id-ID'))
console.log(validator.isNumeric('1234567'))

