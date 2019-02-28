var express = require('express');
var app = express();
var path = require('path');
var port = 5000||process.env.port;
var sql = require('./db');
var bodyParser = require('body-parser');

app.use('/', express.static(path.join(__dirname,'public_static')));

app.use(bodyParser.urlencoded({ extended: true }));


app.use(bodyParser.json());

app.listen(port,function(){
    console.log('server is running at '+port);
});

app.post('/insert',function(req,res) {

    var query = 'INSERT into userdata (name,email,password,repassword) VALUES ("' + req.body.name+ '","' + req.body.email+ '",MD5("'+ req.body.pswd+ '"), MD5("' +req.body.repswd+ '"))';
    sql.todolist(query, function (data) {
        res.send(data);
    });
});