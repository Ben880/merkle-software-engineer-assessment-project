/**
 * =====================================================================================================================
 * By: Benjamin Wilcox (bwilcox@ltu.edu)
 * merkle-software-engineering-assessment-project 8/24/21
 * =====================================================================================================================
 * Description:
 * Handles queries to db
 * =====================================================================================================================
 */

const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: '192.168.0.111',
    user: 'root',
    password: 'password',
    database: 'Users'
});

/**
 * adds a user should not be called unless uname is not taken
 * @param {Array} userdata array of variables to insert into db
 * @param {String} userDBString name of columns to insert array into
 */
function addUser(userdata, userDBString) {
    let sqlQuery = 'INSERT INTO users ('+ userDBString +') ' + 'VALUES(?,?,?,?,?,?,?,?,?)';
    connection.query(sqlQuery, userdata,(error, results) => {
        if (error) throw error;
        console.log("Record inserted Successfully");
    });
}

/**
 * checks if username taken and registers them, gives error message if not taken
 * @param {user} user user class
 * @param {Response<ResBody, Locals>} res
 */
function registerUser(user, res) {
        connection.query("SELECT uname FROM users WHERE uname = '"+ user.uname +"'",(error, results) => {
            if (error) throw error;
            if (results.length === 0) {
                console.log("res = 0 " + user.uname)
                addUser(user.userData())
                return res.redirect('signup_success.html');
            } else {
                console.log("res > 0")
                let message = "Username taken"
                return res.render('pages/register', {message: message});
            }
        });
}

// export methods
module.exports = { registerUser }