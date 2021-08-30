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
    host: '97.70.113.160',
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
    let sqlQuery = 'INSERT INTO users ('+ userDBString +') ' + 'VALUES(?,?,?,?,?,?,?,?)';
    connection.query(sqlQuery, userdata,(error, results) => {
        if (error) throw error;
        console.log("Record inserted Successfully");
    });
}

function getTable(response, request, responseFunction) {
    let sqlQuery = "SELECT * FROM users";
    connection.query(sqlQuery, (error, results) => {
        responseFunction(response, request, results);
    });
}

function adminLogin(response, request, responseFunction) {
    let sqlQuery = "SELECT * FROM admin";
    connection.query(sqlQuery, (error, results) => {
        responseFunction(response, request, results);
    });
}

// export methods
module.exports = { addUser, getTable, adminLogin }