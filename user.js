/**
 * =====================================================================================================================
 * By: Benjamin Wilcox (bwilcox@ltu.edu)
 * merkle-software-engineering-assessment-project 8/24/21
 * =====================================================================================================================
 * Description:
 * data structure for a user and validation logic of data
 * =====================================================================================================================
 */

const dbquery = require("./dbquery");

/**
 * User data structure
 * variables are made not private for simplicity
 */
class user {
    constructor(reqBody) {
        this.fname = reqBody.fname;
        this.lname = reqBody.lname;
        this.uname = reqBody.uname;
        this.pass = reqBody.pass;
        this.email = reqBody.email;
        this.sex = reqBody.sex;
        this.birthMonth = reqBody.birthMonth;
        this.birthDate = reqBody.birthDate;
        this.birthYear = reqBody.birthYear
    }


    /**
     * Returns true if 1) fname contains only characters 2) lname contains only characters
     * @returns {boolean}
     */
    isNameValid() {
        return (/^[a-zA-Z]+$/.test(this.fname) && /^[a-zA-Z]+$/.test(this.lname))
    }

    /**
     *
     * @returns {boolean}
     */
    isUnameValid() {
        return true
    }

    /**
     * Returns true if:
     * 1) Contains at least 8 characters
     * 2) contains at least 1 number
     * 3) contains at least 1 lowercase character
     * 4) contains at least 1 uppercase character
     * 5) contains no special symbols
     * @returns {boolean}
     */
    isPassValid() {
        return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(this.pass)
    }

    /**
     * returns true if email follows pattern
     * regex taken from https://regexr.com/2rhq7
     * @returns {boolean}
     */
    isEmailValid() {
        const re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
        return re.test(String(this.email).toLowerCase());
    }

    /**
     * true if onlyNum && 0 < value < 32
     * @returns {boolean|boolean}
     */
    isBirthDateValid() {
        let num = Number(this.birthDate)
        let onlyNum = /^[0-9]+$/.test(this.birthDate)
        let validRange = num > 0 && num < 32
        return (onlyNum && validRange)
    }

    /**
     * true if onlyNum && 1900 < value <= current
     * @returns {boolean|boolean}
     */
    isBirthYearValid() {
        let num = Number(this.birthDate)
        let onlyNum = /^[0-9]+$/.test(this.birthDate)
        let validRange = num > 1900 && num < new Date().getFullYear()+1
        return (onlyNum && validRange)
    }

}


// export class
module.exports = user