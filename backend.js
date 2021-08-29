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
 * sets an error and renders the form page
 * @param res {Response} response variable to register form page with error message
 * @param user {user} user data structure
 * @param message {string} error message to display
 */
function formError(res, user, message) {
    res.render('pages/register', {message: message, user: user});
}

/**
 * handles register page
 */
app.get('/register',function(req,res){
    res.render('pages/register', {message: "", user: new User(null)});
})

/**
 * handles login forum
 */
app.post('/adminlogin', function(req,res){
    dbquery.adminLogin(res,req, adminResponse);
})

/**
 * handles admin page
 */
app.get('/admin',function(req,res){
    return res.render('pages/admin', {message: ""});
})


function adminResponse(response, request, results) {
    let redirect =
    Object.keys(results).forEach(function(key) {
        let row = results[key];
        if (row.uname === request.body.user && row.pass === request.body.pass) {
            return response.render('pages/display_users')
        }
    });
    if (!response.headersSent)
        return response.render('pages/admin', {message: "Invalid username or password"});
}

