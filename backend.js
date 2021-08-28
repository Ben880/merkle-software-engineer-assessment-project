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
    // check for valid inputs
    if (!user.isNameValid()) {formError(res, user, "Invalid name")}
    else if (!user.isAddr1Valid()) {formError(res, user, "Invalid address")}
    else if (!user.isCityValid()) {formError(res, user, "Invalid city")}
    else if (!user.isZipValid()) {formError(res, user, "Invalid zip code")}
    else if (!user.isStateValid()) {formError(res, user, "Invalid state")}
    else if (!user.isCountryValid()) {formError(res, user, "Invalid country")}
    else {
        dbquery.addUser(user.userData(), user.userDBString())
        res.render('pages/register_success');
    }
})

/**
 * sets an error and renders the page
 * @param message {string}
 */
function formError(res, user, message) {
    res.render('pages/register', {message: message, user: user});
}

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

