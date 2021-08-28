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
     * Returns true if fname and lname !isEmptyCheck && isLettersOnlyCheck
     * @returns {boolean}
     */
    isNameValid() {
        return (
            !this.isEmptyCheck(this.fname) && !this.isEmptyCheck(this.lname) &&
            this.isLettersOnlyCheck(this.fname) && this.isLettersOnlyCheck(this.lname)
        )
    }

    /**
     * returns true if !isEmptyCheck && isThereALetterCheck && isThereANumberCheck
     * @returns {boolean}
     */
    isAddr1Valid() {
        return (
            !this.isEmptyCheck(this.addr1) && this.isThereALetterCheck(this.addr1) &&
            this.isThereANumberCheck(this.addr1)
        )
    }

    /**
     * returns true if !isEmptyCheck && isLettersOnlyCheck
     * @returns {boolean}
     */
    isCityValid() {
        return (
            !this.isEmptyCheck(this.city) && this.isLettersOnlyCheck(this.city)
        )
    }

    /**
     * returns true if isNumbersOnlyCheck && isZipLenCheck
     * @returns {boolean|boolean}
     */
    isZipValid() {
        return (
            this.isNumbersOnlyCheck(this.zip) && this.isZipLenCheck(this.zip)
        )
    }

    /**
     * returns true if matches a state
     * @returns {boolean}
     */
    isStateValid () {
        var states = [
            'AL','AK','AS','AZ','AR','CA','CO','CT','DE','DC','FM','FL','GA',
            'GU','HI','ID','IL','IN','IA','KS','KY','LA','ME','MH','MD','MA',
            'MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND',
            'MP','OH','OK','OR','PW','PA','PR','RI','SC','SD','TN','TX','UT',
            'VT','VI','VA','WA','WV','WI','WY'
        ];
        return states.includes(this.state)
    }

    /**
     * returns true if country is US
     * @returns {boolean}
     */
    isCountryValid() {
        return (this.country === "US")
    }


    // checks
    /**
     * return true if testStr contains at least 1 letter
     * @param testStr {string} string to test
     * @returns {boolean}
     */
    isThereALetterCheck(testStr) {
        return /.*[a-zA-Z].*/.test(testStr)
    }

    /**
     * return true if testStr contains at least 1 number
     * @param testStr {string} string to test
     * @returns {boolean}
     */
    isThereANumberCheck(testStr) {
        return /.*[0-9].*/.test(testStr)
    }

    /**
     * return true if testStr is length 5 or 9
     * @param testStr {string} string to test
     * @returns {boolean}
     */
    isZipLenCheck(testStr) {
        let len = testStr.length
        return len === 5 || len === 9
    }

    /**
     * return true if testStr contains only numbers
     * @param testStr {string} string to test
     * @returns {boolean}
     */
    isNumbersOnlyCheck(testStr) {
        return /^\d+$/.test(testStr)
    }

    /**
     * return true if testStr is length 0
     * @param testStr {string} string to test
     * @returns {boolean}
     */
    isEmptyCheck(testStr) {
        return testStr.length === 0
    }

    /**
     * return true if testStr contains only letters
     * @param testStr {string} string to test
     * @returns {boolean}
     */
    isLettersOnlyCheck(testStr) {
        return /^[a-zA-Z\s]+$/.test(testStr)
    }
}

// export class
module.exports = user;