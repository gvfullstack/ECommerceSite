import React from "react";
import LoginButtons from "./LoginButtons";
import LoginInputFields from "./LoginInputFields";


class LoginPage extends React.Component{
    constructor(){
        super();
        this.state = {
            inputFields:[
                {label: "Your E-Mail Address*",
                 inputID: "email"}, 
                 {label: "Create Password*",
                 inputID: "password"},
                 {label: "Confirm Passwork*",
                 inputID: "passwordConfirm"},
                 {label: "First Name*",
                 inputID: "FName"},
                 {label: "Surename*",
                 inputID: "surename"},
                 {label: "Postal Code*",
                 inputID: "postcode"},
            ]
        };
        // this.displayInputFields = this.displayInputFields.bind(this)
    }

    // displayInputFields = ()=>{
    //     let inputFields = this.state.inputFields
    //     inputFields.map(field => console.log(field.label)
    //     <LoginButtons/>

    //     )            

    // }

    render(){
        let inputFields = this.state.inputFields
        

        return(
            <div>
                {inputFields.map((field) => {return <LoginInputFields label = {field.label} id={field.inputID} key={field.inputID}/>})}
                <LoginButtons/>
            </div>
        )
    }
}

export default LoginPage