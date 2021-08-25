/**
 * =====================================================================================================================
 * By: Benjamin Wilcox (bwilcox@ltu.edu)
 * merkle-software-engineering-assessment-project 8/24/21
 * =====================================================================================================================
 * Description:
 * Handles queries to db
 * =====================================================================================================================
 */

const User = require('./user.js')

/**
 *
 * @param db
 * @param {User} user
 */
function addUser(db, user) {
    let sqlQuery = 'INSERT INTO users (fname, lname, uname, pass, email, sex, birthmonth, birthdate, birthyear) ' +
        'VALUES(?,?,?,?,?,?,?,?,?)';
    let sqlData = [user.fname, user.lname, user.uname, user.pass, user.email, user.sex, user.birthMonth,
        user.birthDate, user.birthYear]
    console.log("begin query");
    db.query(sqlQuery, sqlData,(error, results) => {
        if (error) throw error;
        console.log("Record inserted Successfully");
    });
}

/**
 * returns true if username in db
 * @param db
 * @param {string} uname username
 * @returns {boolean}
 */
function isUsername(db, uname) {
    let res = db.query("SELECT uname FROM users WHERE uname = '"+ uname +"'",(error, results) => {
        if (error) throw error;
        return (results.length !== 0)
    });
    return res
}


// export methods
module.exports = { addUser, isUsername }