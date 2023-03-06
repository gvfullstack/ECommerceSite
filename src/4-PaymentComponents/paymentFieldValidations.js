const cardHolderNameValidation = (fName) => fName.match(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/) ? "" : "Please enter a valid card holder name. The name should contain only letters, spaces, and hyphens, and it can have a length of up to 26 characters."
const displayValidation = (message) => {return message.length > 0 ? true : false }
const cardNumberValidation = (cardNumber) => {
    cardNumber = cardNumber.replace(/\D/g, "")
    if (/^4[0-9]{12}(?:[0-9]{3})?$/.test(cardNumber) || /^5[1-5][0-9]{14}$/.test(cardNumber) || /^3[47][0-9]{13}$/.test(cardNumber)) {
        return ""
      }
        return "Please enter a valid card number."
    }
    
    const CVVValidation = (CVV) => CVV.match(/^\d{3,4}?$/) ? "" : "Please enter a valid CVV number. The CVV number should be 3-4 digits long."

    const YearValidation = (year) => year === "Year" ? "Please select a year." : ""
    const MonthValidation = (month) => month === "Month" ? "Please select a month." : ""

    //


module.exports = {cardHolderNameValidation, displayValidation, cardNumberValidation, CVVValidation, YearValidation, MonthValidation}