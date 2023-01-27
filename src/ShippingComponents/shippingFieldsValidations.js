const phoneValidation = (SevenDigitNumber) => SevenDigitNumber.match(/\d{3}-\d{4}?$/) ? "" : "7 digit number should be in the format 123-4567."

const phoneAreaCodeError = (areaCode) => areaCode.match(/\d{3}?$/) ? "" : "Please enter 3 digit area code. No alphanumeric characters allowed."


const zipValidator = (zip) => zip.match(/^\d{5}?$/) ? "" : "Please enter a five digit zip code."


const displayValidation = (message) => message.length > 0 ? true : false 


module.exports = {phoneValidation, displayValidation, zipValidator, phoneAreaCodeError}