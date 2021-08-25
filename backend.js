/**
 * =====================================================================================================================
 * By: Benjamin Wilcox (bwilcox@ltu.edu)
 * merkle-software-engineering-assessment-project 8/24/21
 * =====================================================================================================================
 * Description:
 * Main file to handle backend operation of website
 * =====================================================================================================================
 */
// create app variables
const express = require("express");
const bodyParser = require("body-parser");
const dbquery = require("./dbquery");
const User = require('./user.js')
const app = express()
const mysql = require('mysql2');
const port = 3000

// create the connection to database
const connection = mysql.createConnection({
    host: '192.168.0.111',
    user: 'root',
    password: 'password',
    database: 'Users'
});

// configure app
app.use(require('sanitize').middleware);
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

// run app
app.listen(port)
console.log("server listening at port " + port);


/**
 * handles registration forum and enters data into the database
 */
app.post('/registeruser', function(req,res){
    let user = new User(req.body);
    // TODO validate responses with regex
    dbquery.addUser(connection, user)
    return res.redirect('signup_success.html');
})

/**
 * handles register page
 */
app.get('/register',function(req,res){
    res.set({'Access-control-Allow-Origin': '*'});
    return res.redirect('registration.html');
})

/**
 * handles login forum
 */
app.post('/adminlogin', function(req,res){
    // TODO: Logic
    return res.redirect('admin.html');
})

/**
 * handles admin page
 */
app.get('/admin',function(req,res){
    res.set({'Access-control-Allow-Origin': '*'});
    return res.redirect('admin.html');
})

