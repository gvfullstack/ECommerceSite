import React from "react";
import LoginInputFields from "./LoginInputFields";
import ToggleButton from "./ToggleButton";


class LoginPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            user:{
                fName:"",
                email:"",
                password:"",
                passwordConfirm:"",
                postCode:"", 
                surename:""
            },
        selectedInitialOperation: "other" 
        }
        ;
        this.updateSelectedInitOpState = this.updateSelectedInitOpState.bind(this)
        this.updateInputState = this.updateInputState.bind(this)
    }
    
    updateSelectedInitOpState(val){
        this.setState({selectedInitialOperation: val})
        console.log(this.state.selectedInitialOperation)
    }


    updateInputState(inputID, inputValue){
        this.setState((prevState) => ({user: {...prevState.user, [inputID]: inputValue}}))
        setTimeout(() => console.log(this.state.user.email))
    }

    render(){
        let inputFields = [
            {label: "Your E-Mail Address*",
             inputID: "email"}, 
             {label: "Create Password*",
             inputID: "password"},
             {label: "Confirm Password*",
             inputID: "passwordConfirm", 
            },
             {label: "First Name*",
             inputID: "FName"},
             {label: "Surename*",
             inputID: "surename"},
             {label: "Postal Code*",
             inputID: "postcode"},
        ]
            

        return(
            <form>
                <ToggleButton 
                    selected = {this.state.selectedInitialOperation}
                    stateUpdater = {this.updateSelectedInitOpState}
                    label = "Test"
                    />

                {inputFields.map((field) => 
                    {return <LoginInputFields 
                        label = {field.label} 
                        id={field.inputID} 
                        key={field.inputID} 
                        value={this.state.value}
                        onChange ={this.updateInputState}
                        />})}

            </form>
        )
    }
}

export default LoginPage