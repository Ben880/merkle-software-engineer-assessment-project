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
 *
 * @param {Array} userdata
 */
function addUser(userdata) {

    let sqlQuery = 'INSERT INTO users (fname, lname, uname, pass, email, sex, birthmonth, birthdate, birthyear) ' +
        'VALUES(?,?,?,?,?,?,?,?,?)';
    connection.query(sqlQuery, userdata,(error, results) => {
        if (error) throw error;
        console.log("Record inserted Successfully");
    });
}




// export methods
module.exports = { addUser }