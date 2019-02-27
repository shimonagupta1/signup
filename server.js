var express = require('express');
var app = express();
var path = require('path');
var port = 5000||process.env.port;
var sql = require('./db');
var bodyParser = require('body-parser');

console.log(__dirname);

app.use('/', express.static(path.join(__dirname,'public_static')));

app.use(bodyParser.urlencoded({ extended: true }));


app.use(bodyParser.json());

app.listen(port,function(){
    console.log('server is running at '+port);
});

app.get('/todos/all',function(req,res){
    var query = "SELECT * FROM todos";
    sql.todolist(query,function(data){
        res.send(data);
    })


});

app.post('/todos/insert',function(req,res){
    console.log(req.body.todo);
    var obj = {t: req.body.todo};
    console.log(obj.t);
    var query = 'INSERT into todos (task,done) VALUES ("'+req.body.todo+'",'+req.body.iid+')';
    sql.todolist(query,function(data){
        var query = "SELECT * FROM todos";
        sql.todolist(query,function(data){
            res.send(data);
        })


    });

});

app.post('/todos/update',function(req,res){
    console.log(req.body.iid,req.body.id);
    var query = "UPDATE todos SET done = "+req.body.iid+" where id = " +req.body.id ;
    sql.todolist(query,function(data){
        res.send(data);
    })

});

app.post('/todos/delete',function(req,res){
    var query = "DELETE FROM todos where id="+req.body.id;
    sql.todolist(query,function(data){
        res.send(data);
    })
});

