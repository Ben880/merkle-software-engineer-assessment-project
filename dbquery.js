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
    let sqlQuery = 'INSERT INTO users ('+ userDBString +') ' + 'VALUES(?,?,?,?,?,?,?,?)';
    connection.query(sqlQuery, userdata,(error, results) => {
        if (error) throw error;
        console.log("Record inserted Successfully");
    });
}

// export methods
module.exports = { addUser }