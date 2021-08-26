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
const port = 3000

// configure app
app.use(require('sanitize').middleware);
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

// run app
app.listen(port)
console.log("server listening at port " + port);


/**
 * handles registration forum and enters data into the database
 */
app.post('/registeruser', function(req,res){
    let user = new User(req.body);
    let message = ""
    // check for valid inputs
    if (!user.isNameValid()) {message = "Invalid name"}
    else if (!user.isAddr1Valid()) {message = "Invalid address 1"}
    else if (!user.isAddr2Valid()) {message = "Invalid address 2"}
    else if (!user.isCityValid()) {message = "Invalid city"}
    else if (!user.isZipValid()) {message = "Invalid zip code"}
    // if there is a message send error message
    if (message !== "") {
        res.render('pages/register', {message: message, user: user});
    // else check uname and register
    } else {
        dbquery.addUser(user.userData(), user.userDBString())
        res.render('pages/register_success');
    }
})

/**
 * handles register page
 */
app.get('/register',function(req,res){
    let message = ""
    let user = new User(null);
    res.render('pages/register', {message: message, user: user});
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

