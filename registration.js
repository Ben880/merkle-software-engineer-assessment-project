const express=require("express");
const bodyParser=require("body-parser");
const mysql = require('mysql2');
const sanitizer = require('sanitize')();
const router = express.Router()
const port = 3000
const app = express()

// create the connection to database
const connection = mysql.createConnection({
    host: '192.168.0.111',
    user: 'root',
    password: 'password',
    database: 'Users'
});


app.use("/", router);
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.post('/registeruser', function(req,res){
    console.log("begin query");
    let sqlQuery = 'INSERT INTO users (fname, lname, uname, pass, email, sex, birthmonth, birthdate, birthyear) ' +
        'VALUES(?,?,?,?,?,?,?,?,?)';
    let sqlData = [req.body.fname, req.body.lname, req.body.uname, req.body.pass, req.body.email, req.body.sex,
        req.body.birthMonth, req.body.birthDate, req.body.birthYear ]

    connection.query(sqlQuery, sqlData,(error, results) => {
        if (error) throw error;
        console.log("Record inserted Successfully");
    });

    return res.redirect('signup_success.html');
})

app.get('/register',function(req,res){
    res.set({
        'Access-control-Allow-Origin': '*'
    });
    return res.redirect('registration.html');
})


app.post('/adminlogin', function(req,res){
    // TODO: Logic
    return res.redirect('admin.html');
})


app.get('/admin',function(req,res){
    res.set({
        'Access-control-Allow-Origin': '*'
    });
    return res.redirect('admin.html');
})


app.listen(port)
console.log("server listening at port " + port);