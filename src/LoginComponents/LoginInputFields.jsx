import React from "react";
import "../LoginComponents/loginFields.css"

let myFunctions = require("../LoginComponents/userCredentialValidations")


class LoginInputFields extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            
        }
        this.updateInputState = this.updateInputState.bind(this)
    }

    updateInputState = (e) => {
        let inputValue = e.target.value
        let key = this.props.index
     
        this.props.onChange(inputValue, key)
        }

    handleValidations = (errorID, value, key)=>{
        let textMessage =""
       
            switch(errorID){
                case "emailError": 
                    textMessage = myFunctions.emailValidation(value) 
                    break;
                case"passwordSignInError":
                    textMessage = myFunctions.passwordSignInValidation(value)
                    break;
                case "passwordError":
                    let validationResult = myFunctions.passwordCheck(value) 
                    textMessage = validationResult.length > 0 ? validationResult.map(errorMessage=><li key = {errorMessage}>{errorMessage}</li>) : ''
                    break;
                case "passwordConfirmError":
                    textMessage = myFunctions.passwordAgainValidation(value, this.props.password)
                    break;
                case "nameError":
                    textMessage = myFunctions.nameValidation(value, this.props.password)
                    break;
                case "zipCodeError":
                    textMessage = myFunctions.zipValidator(value)
                    break;
                default:
                    break;
            }
        
        let display = myFunctions.displayValidation(textMessage)
        this.props.updateError(key, textMessage, display)
    }

    runValidations = (e) => {
        this.handleValidations(e.target.dataset.type, e.target.value, this.props.index)
    }

    hideShowPW = () =>{
        this.state.passwordIconView === "text" ? 
            this.setState({passwordIconView: "password"}):
            this.setState({passwordIconView: "text"})
    }

    iconShow = () => this.props.icon ? true : false
    
    render(){
        let visibility = this.props.visibility
        let toggleButton = this.props.toggleButton
        const errorID = this.props.inputtype + "Error"
        let showError = this.props.showError
        return(
            <div>

            {visibility === toggleButton &&
           ( <div className = "divStyle" >
               
                <label className = "inputLabel" htmlFor={this.props.id}>
                    {this.props.label}
                    <div className="inputContainer">
                        <input 
                        onChange= {this.updateInputState} className="inputBox" 
                        type = {this.state.passwordIconView ? this.state.passwordIconView: this.props.masked}
                        id = {this.props.id} 
                        data-type ={errorID}
                        value = {this.props.value}
                        key = {this.props.key}
                        onBlur = {this.runValidations}
                        ref = {this.props.ref}
                        />

                        {this.iconShow && (<div className = "iconContainer" onClick = {this.hideShowPW}>{this.props.icon}</div>)}
                    </div>

                </label>
                
                    {showError && (<p className= "errorMessageStyle">{this.props.error}</p>)}
               
            </div>)}

            </div>
        )
    }

}

export default LoginInputFields