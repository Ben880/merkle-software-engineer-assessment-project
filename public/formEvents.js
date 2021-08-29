/**
 * =====================================================================================================================
 * By: Benjamin Wilcox (bwilcox@ltu.edu)
 * merkle-software-engineering-assessment-project 8/24/21
 * =====================================================================================================================
 * Description:
 * handles client side form events and validation 
 * =====================================================================================================================
 */

// element IDs
const INVALID_MESSAGE = "invalidMessage"
const FIRST_NAME = "fname"
const LAST_NAME = "lname"
const ADDRESS1 = "addr1"
const CITY = "city"
const ZIP = "zip"

const ADDRESS2 = "addr2"
const STATE = "state"
const COUNTRY = "country"

// error messages
const NAME_EMPTY = "Name cannot be blank";
const NAME_SPECIALCHAR = "Name cannot contain special characters or numbers";
const ADDR1_EMPTY = "Address 1 cannot be empty";
const ADDR1_NAME = "Address must contain a street name";
const ADDR1_ADDR = "Address must contain a street address";
const CITY_EMPTY = "City cannot be empty";
const CITY_SPECIALCHAR = "City cannot contain special characters";
const ZIP_EMPTY = "Zip code cannot be blank";
const ZIP_NUMBERS = "Zip code must only contain numbers";
const ZIP_LEN = "Zip code must be 5 or 9 digits";

// track selected element for error message
let currentElement = FIRST_NAME;

// events
document.getElementById (FIRST_NAME).addEventListener ("blur", checkIssues, false);
document.getElementById (FIRST_NAME).addEventListener ("input", checkIssues, false);
document.getElementById (FIRST_NAME).addEventListener ("focus", focus, false);
document.getElementById (LAST_NAME).addEventListener ("blur", checkIssues, false);
document.getElementById (LAST_NAME).addEventListener ("input", checkIssues, false);
document.getElementById (LAST_NAME).addEventListener ("focus", focus, false);
document.getElementById (ADDRESS1).addEventListener ("blur", checkIssues, false);
document.getElementById (ADDRESS1).addEventListener ("input", checkIssues, false);
document.getElementById (ADDRESS1).addEventListener ("focus", focus, false);
document.getElementById (CITY).addEventListener ("blur", checkIssues, false);
document.getElementById (CITY).addEventListener ("input", checkIssues, false);
document.getElementById (CITY).addEventListener ("focus", focus, false);
document.getElementById (ZIP).addEventListener ("blur", checkIssues, false);
document.getElementById (ZIP).addEventListener ("input", checkIssues, false);
document.getElementById (ZIP).addEventListener ("focus", focus, false);

document.getElementById (ADDRESS2).addEventListener ("focus", focus, false);
document.getElementById (STATE).addEventListener ("focus", focus, false);
document.getElementById (COUNTRY).addEventListener ("focus", focus, false);

/**
 * updates current element for error message logic
 * @param event
 */
function focus(event)
{
    currentElement = event.target.id;
    checkIssues();
}

/**
 * checks for issues in fields before currently selected field
 * if issue found set error message and return
 */
function checkIssues () {
    // name
    if (currentElement === FIRST_NAME || currentElement === LAST_NAME)
        return clearIssue();
    if (isEmptyCheck(FIRST_NAME) || isEmptyCheck(LAST_NAME))
        return setIssue(NAME_EMPTY);
    if (!isLettersOnlyCheck(FIRST_NAME) || !isLettersOnlyCheck(LAST_NAME))
        return setIssue(NAME_SPECIALCHAR);
    // address
    if (currentElement === ADDRESS1)
        return clearIssue()
    if (isEmptyCheck(ADDRESS1))
        return setIssue(ADDR1_EMPTY);
    if (!isThereALetterCheck(ADDRESS1))
        return setIssue(ADDR1_NAME);
    if (!isThereANumberCheck(ADDRESS1))
        return setIssue(ADDR1_ADDR);
    // city
    if (currentElement === CITY || currentElement === ADDRESS2)
        return clearIssue()
    if (isEmptyCheck(CITY))
      return setIssue(CITY_EMPTY);
    if (!isLettersOnlyCheck(CITY))
        return setIssue(CITY_SPECIALCHAR);
    // zip check
    if (currentElement === ZIP || currentElement === STATE)
        return clearIssue()
    if (isEmptyCheck(ZIP))
        return setIssue(ZIP_EMPTY);
    if (!isNumbersOnlyCheck(ZIP))
        return setIssue(ZIP_NUMBERS);
    if (!isZipLenCheck(ZIP))
        return setIssue(ZIP_LEN)
    clearIssue()
}

/**
 * sets issue message
 */
function setIssue(message) {
    document.getElementById(INVALID_MESSAGE).innerHTML = message;
}

/**
 * clears issue message
 */
function clearIssue() {
    document.getElementById(INVALID_MESSAGE).innerHTML = "&nbsp;";
}

/**
 * return true if element contains at least 1 letter
 * @param elementId id of element to check value of
 * @returns {boolean}
 */
function isThereALetterCheck(elementId) {
    return /.*[a-zA-Z].*/.test(document.getElementById(elementId).value)
}

/**
 * return true if element contains at least 1 number
 * @param elementId id of element to check value of
 * @returns {boolean}
 */
function isThereANumberCheck(elementId) {
    return /.*[0-9].*/.test(document.getElementById(elementId).value)
}

/**
 * return true if element is length 5 or 9
 * @param elementId id of element to check value of
 * @returns {boolean}
 */
function isZipLenCheck(elementId) {
    let len = document.getElementById(elementId).value.length
    return len === 5 || len === 9
}

/**
 * return true if element contains only numbers
 * @param elementId id of element to check value of
 * @returns {boolean}
 */
function isNumbersOnlyCheck(elementId) {
    return /^\d+$/.test(document.getElementById(elementId).value)
}

/**
 * return true if element is length 0
 * @param elementId id of element to check value of
 * @returns {boolean}
 */
function isEmptyCheck(elementId) {
    return document.getElementById(elementId).value.length === 0
}

/**
 * return true if element contains only letters
 * @param elementId id of element to check value of
 * @returns {boolean}
 */
function isLettersOnlyCheck(elementId) {
    return /^[a-zA-Z\s]+$/.test(document.getElementById(elementId).value)
}

