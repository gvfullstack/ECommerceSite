const passwordCheck = password => {
    let errorMessages = ['Password should have between 6-13 characters.', 'Password should have one upper case letter.', 
    'Password should have one lower case letter.', "Password should have one number.", "Password should have no spaces." ]

    return(
    password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,13}$/) ? '' : errorMessages
    )
}
export default passwordCheck