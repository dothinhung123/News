const mysql  = require('mysql');
const connection  = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'11111',
    database:'iws'
})
module.exports = connection;