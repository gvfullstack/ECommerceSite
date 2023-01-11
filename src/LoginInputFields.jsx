import React from "react";
import "./loginFields.css"

import './index.css';
let myFunctions = require("./userCredentialValidations")


class LoginInputFields extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            error:"", 
            showError: false         
        }
        this.updateInputState = this.updateInputState.bind(this)
    }

    updateInputState = (e) => {
        let inputID = e.target.id
        let inputValue = e.target.value
        this.props.onChange(inputID, inputValue)
        
    }

    handleValidations = (errorID, value)=>{
        let textMessage =""
        switch(errorID){
            case "emailError": 
                textMessage = myFunctions.emailValidation(value) 
                break;
            case"passwordSignInError":
                textMessage = myFunctions.passwordSignInValidation(value, this.props.password)
                break;
            case "passwordError":
                let validationResult = myFunctions.passwordCheck(value) 
                textMessage = validationResult.length > 0 ? validationResult.map(errorMessage=><li>{errorMessage}</li>) : ''
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
        this.setState({error: textMessage, showError: display})
    }

    handleOnBlur = (e) =>{
        e.preventDefault()
        this.handleValidations(e.target.dataset.type, e.target.value)
    }

    render(){
        let visibility = this.props.visibility
        let toggleButton = this.props.toggleButton
        let errorID = this.props.inputtype + "Error"
     
        return(
            <div>

            {visibility === toggleButton &&
           ( <div className = "divStyle" >
               
                <label className = "inputLabel" htmlFor={this.props.id}>{this.props.label}</label>
                <input onChange= {this.updateInputState} className="inputBox" type="text" id = {this.props.id} onBlur = {this.handleOnBlur} data-type ={errorID}/>
                
                    {this.state.showError && (<p className= "errorMessageStyle">{this.state.error}</p>)}
               
            </div>)}

            </div>
        )
    }

}

export default LoginInputFields