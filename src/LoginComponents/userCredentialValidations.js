const passwordAgainValidation = (password, passwordAgain) => {
    return password === passwordAgain ? "" : "Passwords do not match."
}
const passwordSignInValidation = (signInPassword) => signInPassword !== "" ? "" : "Password cannot be blank."

const passwordCheck = password => {
    console.log(password)
    let errorMessages = ['Password should have between 6-13 characters.', 'Password should have one upper case letter.', 
    'Password should have one lower case letter.', "Password should have one number.", "Password should have no spaces." ]

    return(
    password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,13}$/) ? '' : errorMessages
    )
}

const emailValidation = (email) => email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/) ? "" : "Please enter a valid email."

const zipValidator = (zip) => zip.match(/^\d{5}?$/) ? "" : "Please enter a five digit zip code."

const displayValidation = (message) => message.length > 0 ? true : false 

const nameValidation = (fName) => fName.match(/^[a-zA-Z]+$/) ? "" : "No spaces, numbers, or special characters allowed."


module.exports = {passwordAgainValidation, passwordSignInValidation, passwordCheck, emailValidation, zipValidator, displayValidation, nameValidation}