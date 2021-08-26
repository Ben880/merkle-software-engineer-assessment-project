/**
 * =====================================================================================================================
 * By: Benjamin Wilcox (bwilcox@ltu.edu)
 * merkle-software-engineering-assessment-project 8/24/21
 * =====================================================================================================================
 * Description:
 * data structure for a user and validation logic of data
 * =====================================================================================================================
 */

/**
 * User data structure
 * variables are made not private for simplicity
 */
class user {
    constructor(reqBody) {
        if (reqBody !== null)
        {
            this.fname = reqBody.fname;
            this.lname = reqBody.lname;
            this.addr1 = reqBody.addr1;
            this.addr2 = reqBody.addr2;
            this.city = reqBody.city;
            this.state = reqBody.state;
            this.zip = reqBody.zip;
            this.country = reqBody.country;
        } else {
            this.fname = "";
            this.lname = "";
            this.addr1 = "";
            this.addr2 = "";
            this.city = "";
            this.state = "MI";
            this.zip = "";
            this.country = "US";
        }
    }

    /**
     * returns array of data in order of database insertion
     * @returns {*[]}
     */
    userData() {
        return [this.fname, this.lname, this.addr1, this.addr2, this.city, this.state, this.zip, this.country];
    }

    /**
     * return string of db column names
     * @returns {string}
     */
    userDBString() {
        return "fname, lname, addr1, addr2, city, state, zip, country"
    }

    /**
     * Returns true if 1) fname contains only characters 2) lname contains only characters
     * @returns {boolean}
     */
    isNameValid() {
        return (/^[a-zA-Z]+$/.test(this.fname) && /^[a-zA-Z]+$/.test(this.lname));
    }


}

// export class
module.exports = user;