var mysql = require('mysql');

var dbconfig = {
    host: 'localhost',
    user: 'newuser',
    password: 'newpassword',
    database: 'newdb'
};

function todolist(query,cb,params) {
    var connection = mysql.createConnection(dbconfig);
    connection.connect();
    connection.query(query,function(err,data){
        if(err) throw err;
        cb(data);
        console.log(data);
        connection.end();
    });

}

module.exports = {
    todolist
}