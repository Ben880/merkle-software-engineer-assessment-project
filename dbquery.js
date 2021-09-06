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

/**
 * adds a user should not be called unless uname is not taken
 * @param {Array} userdata array of variables to insert into db
 * @param {String} userDBString name of columns to insert array into
 */
function addUser(userdata, userDBString) {
    connection = getConnection();
    let sqlQuery = 'INSERT INTO users ('+ userDBString +') ' + 'VALUES(?,?,?,?,?,?,?,?)';
    connection.query(sqlQuery, userdata,(error, results) => {
        if (error) throw error;
        console.log("Record inserted Successfully");
        connection.end();
    });
}

/**
 * get the table named users and call the response function
 * @param response {Response} page response
 * @param request {Request} page request
 * @param responseFunction {Function}  function to be called after query is complete
 */
function getTable(response, request, responseFunction) {
    connection = getConnection();
    let sqlQuery = "SELECT * FROM users";
    connection.query(sqlQuery, (error, results) => {
        responseFunction(response, request, results);
        connection.end();
    });
}

/**
 * get the table named admin and call the response function
 * @param response {Response} page response
 * @param request {Request} page request
 * @param responseFunction function to be called after query is complete
 */
function adminLogin(response, request, responseFunction) {
    connection = getConnection();
    let sqlQuery = "SELECT * FROM admin";
    connection.query(sqlQuery, (error, results) => {
        responseFunction(response, request, results);
        connection.end();
    });
}

function getConnection(){
    const connection = mysql.createConnection({
        host: '97.70.113.160',
        user: 'root',
        password: 'password',
        database: 'Users'
    });

    connection.on('error', function(err) {
        console.log("Error: " + err.code);
    });

    return connection;
}

// export methods
module.exports = { addUser, getTable, adminLogin }