const mysql = require('mysql');
var pool;

if (process.env.JAWSDB_url) {
    console.log('connected')
    pool = mysql.createPool(process.env.JASWDB_url)
} else {
    pool = mysql.createPool({
        host: '127.0.0.1',
        user: 'root',
        password: 'root',
        port: 3306,
        database: 'MovieFind'
    })
}


global.db = pool;