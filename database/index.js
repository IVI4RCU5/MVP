var mysql = require('mysql')

var database = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'mvp',
  database: 'mvp'
})

var postMessage = function(callback) {
  database.query(INSERT INTO )
}