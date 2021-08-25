/**
 * =====================================================================================================================
 * By: Benjamin Wilcox (bwilcox@ltu.edu)
 * merkle-software-engineering-assessment-project 8/24/21
 * =====================================================================================================================
 * Description:
 * data structure for a user
 * =====================================================================================================================
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
}


// export class
module.exports = user