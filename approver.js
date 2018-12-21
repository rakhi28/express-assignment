//Has API 1-6 without UI implementation. 
//Working on Chrome App- POSTMAN 
//Developed by: Sahana BG and Rakhi Agrawal

var route=require("./util")
var app= route.app;
var connection=route.connection;
var jwt = require('jsonwebtoken');
var config = require('./config');
var dateformat=require('dateformat')


//API-1
app.post('/approver', function (req, res) {
    
    var postData  = req.body;
    var flag1=true;
    var flag2=false;
    var count=0;
    var result;

    for(var i=0;i<postData.length;i++){
         var user={
                    "name": postData[count].name
                }
                var token=jwt.sign(user,config.secret)
            var tk=token.substring(token.length-8,token.length);
                  var json = JSON.stringify({
                    
                    "name": postData[count].name,
                    "accessToken": tk
                })
             count++; 
            postData[i].accessToken=tk; 
            res.write(json);
            var stat = JSON.stringify({
                "Status":{
                    "code": 200,
                    "message": "successfully registered"}
                })
            var query=connection.query('INSERT INTO approver SET ?',postData[i], function (error, results, fields) {
            if (error) 
            {
                flag2=false;
                res.statusCode=406;
               res.end("Approver: "+(postData[count].name)+" record exists")
               // throw error;
                }
               // count++; 
            if(flag1==false&& flag2==true && count==postData.length){
                res.statusCode=201;
                res.end(stat);
            }
            }); 
            flag1=false;
            flag2=true;
            }
});

//API-2
app.post('/service', function (req, res) {
    var postData  = req.body;
    var flag1=true;
    var flag2=false;
    var count=0;

    for(var i=0;i<postData.length;i++){
         var user={
                    "name": postData[count].name
                }
                var token=jwt.sign(user,config.secret)
            var tk=token.substring(token.length-8,token.length);
                  var json = JSON.stringify({
                    
                    "name": postData[count].name,
                    "serviceId": tk
                })
                  
            postData[i].serviceId=tk; 
            res.write(json)
            count++; 
            var stat = JSON.stringify({
                "Status":{
                    "code": 200,
                    "message": "successfully registered"}
                })
               postData[i].approvals=JSON.stringify(
                  postData[i].approvals
               )               
            var query=connection.query('INSERT INTO service SET ?',postData[i], function (error, results, fields) {
            if (error) 
            {
                flag2=false;
                res.statusCode=406;
               res.end("Service: "+(postData[count].name)+" record exists")
               // throw error;
                }  
            if(flag1==false&& flag2==true && count==postData.length){
                res.statusCode=201;
                res.end(stat);
            }
            });    
            flag1=false;
            flag2=true;
            }
});

//API-3
app.post('/request', function (req, res) {
    var postData  = req.body;
    var flag1=true;
    var flag2=false;
    var count=0;

    for(var i=0;i<postData.length;i++){
         
            var stat = JSON.stringify({
                "Status":{
                    "code": 200,
                    "message": "successfully registered"}
                })           
            var query=connection.query('SELECT * FROM service WHERE ?',postData[i], function (error, results, fields) {  
            if (error) 
            {
                flag2=false;
                res.statusCode=406;
               res.end("Approver: "+(postData[count].name)+" record exists")
               // throw error;
                }
                count++;
                var result=JSON.stringify({
                    "Results": {
                        "RequestId": results[0].serviceId
                    }
                })
                res.write(result)
                if(flag1==false&& flag2==true && count==postData.length){
                    res.statusCode=201;
                    res.end(stat);
                }
            }); 
            flag1=false;
            flag2=true;
            }
        
});

//API-4 and 5
app.post('/approvals', function (req, res) {
    var postData  = req.body;
    var flag1=true;
    var flag2=false;
    var count=0;
    var last=0;
    for(var i=0;i<postData.length;i++){
         
            var stat = JSON.stringify({
                "Status":{
                    "code": 200,
                    "message": "successfully registered"}
                })         
            var query=connection.query('SELECT * FROM service,approver WHERE service.serviceId=? and approver.accesstoken=?',[postData[i].serviceId,postData[i].accessToken], function (error, results, fields) { 
                var array1 = JSON.parse( results[0].approvals);
                var role=results[0].role;
                if(array1.indexOf(role)>-1){
                var que=connection.query("select * from service,approver where approver.role=? and service.approvals=?",[role,results[0].approvals], function (error, resu, fields) { 
                    var now=new Date();
                    var date=dateformat(now,"yyyy/mm/dd")
                  
                    
                    if(last<req.body.length){
                    var query2=connection.query("update service SET approver_date=?,approver=? where serviceId=?",[date,resu[0].accesstoken,req.body[last].serviceId],function (error, ress, fields) {
                        last++;
                       
                        if (error) 
                        {
                            console.log("+Error+");
                        }
                    })
                }
                })
            }
            
            if (error) 
            {
                flag2=false;
                res.statusCode=406;
               res.end("Approver: "+(postData[count].name)+" record exists")
               // throw error;
                }
                count++;
                var result=JSON.stringify({
                    "Results": {
                        "RequestId": results[0].serviceId
                    }
                })
                res.write(result)
                if(flag1==false&& flag2==true && count==postData.length){
                    res.statusCode=201;
                    if(array1.indexOf(role)<=-1){
                        res.end("Level 1 not approved")
                    }
                    res.end(stat);
                }
            });
            flag1=false;
            flag2=true;
            }
        
});

//API-6
app.post('/status', function (req, res) {
    var postData  = req.body;
    var flag1=true;
    var flag2=false;
    var count=0;
    var last=0;
    for(var i=0;i<postData.length;i++){   
            var query=connection.query('SELECT * FROM service WHERE serviceId=?',[postData[i].requestToken], function (error, results, fields) { 
                var que=connection.query("select * from approver where approver.accesstoken=?",[results[0].approver], function (error, resu, fields) { 
            
                if (error) 
                {
                flag2=false;
                res.statusCode=406;
               res.end("Approver: "+(postData[count].name)+" record exists")
               // throw error;
                }
                count++;
        
                if(flag1==false&& flag2==true && count==postData.length){
                    res.statusCode=201;
                    res.json([{"Results":  {
                        "requestToken" : results[0].serviceId,
                        "approvals" : {
                         "stage" : resu[0].role,
                         "Approver" : resu[0].name,
                         "Approver date" : results[0].approver_date
                        }
                     }
                    },
                        {
                            "Status":{
                                "code": 200,
                                "message": "successfully approved"}
                            }
                        ]
                    )        

                }
                   
                })
            
            });
            flag1=false;
            flag2=true;
            }
        
});