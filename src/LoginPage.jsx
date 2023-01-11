import React from "react";
import LoginInputFields from "./LoginInputFields";
import ToggleButton from "./ToggleButton";


class LoginPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {  
            user:{
                fName : "",
                email : "",
                password : "",
                passwordConfirm : "",
                postCode : "", 
                surename : "" 
            },       
            toggleButton: "signIn" 
        }
        ;
        this.updateToggleButton = this.updateToggleButton.bind(this)
        this.updateInputState = this.updateInputState.bind(this)

    }
    
    updateToggleButton(val){
        this.setState({toggleButton: val})
        console.log(this.state.toggleButton)
    }

    updateInputState = (inputID, inputValue) => {
        this.setState((prevState) => ({user: {...prevState.user, [inputID]: inputValue}}))
    }

    render(){
        let inputFieldsData = [
            {label: "Your E-Mail Address*", inputID: "email", visibility:"create", type: "email"}, 
            {label: "Create Password*", inputID: "password", visibility:"create", type: "password"},
            {label: "Confirm Password*", inputID: "passwordConfirm", visibility:"create", type: "passwordConfirm"},
            {label: "First Name*", inputID: "FName", visibility:"create", type:"name"},
            {label: "Surename*", inputID: "surename", visibility:"create", type:"name"},
            {label: "Postal Code*", inputID: "postcode", visibility:"create", type: "zipCode"},
            {label: "Sign In E-Mail*", inputID: "signInEmail", visibility:"signIn", type: "email"},
            {label: "Sign In Password*", inputID: "signInPassword", visibility:"signIn", type: "passwordSignIn"}
        ]
            
        let inputFields = inputFieldsData.map((field) => 
            {return <LoginInputFields 
                label = {field.label} 
                id={field.inputID} 
                key={field.inputID} 
                value={this.state.value}
                toggleButton =  {this.state.toggleButton}
                visibility = {field.visibility}
                inputtype = {field.type}
                onChange = {this.updateInputState}
                password = {this.state.user.password}
                />})

        return(
            <div>
        
            <ToggleButton 
                    toggleButton = {this.state.toggleButton}
                    stateUpdater = {this.updateToggleButton}
                    />
            <form>
                {inputFields} 
                           
            </form>
            </div>
        )
    }
}

export default LoginPage