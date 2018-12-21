var http= require('http')
var express=require('express')
var app= express();
var mysql=require('mysql')
var bodyparser=require('body-parser')
var path= require('path')



var connection= mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'dummy_db'
});

connection.connect(function(err){
    if(err){
        throw err;
    }
    console.log("You are now connected");
});

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
    extended: true
}));

var server= app.listen(3000, '127.0.0.1', function(){
    var host= server.address().address
    var port= server.address().port
    console.log("App listening at %s , %s", host, port)
})

module.exports.app=app;
module.exports.connection=connection;