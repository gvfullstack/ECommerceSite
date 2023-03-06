import React from "react";
import LoginInputFields from "../1-LoginComponents/LoginInputFields";
import ToggleButton from "../1-LoginComponents/ToggleButton";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import {ReactComponent as FacebookLogo} from '../images/facebook-square.svg';
import "../1-LoginComponents/loginFields.css"

const element = <FontAwesomeIcon icon={faEye} />

class LoginPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {       
            inputRef : React.createRef(),
            inputFieldsData: [
                {key:"LP1",label: "Your E-Mail Address*", inputID: "email", visibility:"create", type: "email", masked:"text", value:"", error:"", showError:false}, 
                {key:"LP2",label: "Create Password*", inputID: "password", visibility:"create", type: "password", icon:element, masked:"password", value:"", error:"", showError:false},
                {key:"LP3",label: "Confirm Password*", inputID: "passwordConfirm", visibility:"create", type: "passwordConfirm", icon:element, masked:"password", value:"", error:"", showError:false},
                {key:"LP4",label: "First Name*", inputID: "fName", visibility:"create", type:"name",masked:"text", value:"", error:"", showError:false},
                {key:"LP5",label: "Surename*", inputID: "surename", visibility:"create", type:"name", masked:"text", value:"", error:"", showError:false},
                {key:"LP6",label: "Postal Code*", inputID: "postCode", visibility:"create", type: "zipCode", masked:"text", value:"", error:"", showError:false},
                {key:"LP7",label: "Sign In E-Mail*", inputID: "signInEmail", visibility:"signIn", type: "email", masked:"text", value:"", error:"", showError:false},
                {key:"LP8",label: "Sign In Password*", inputID: "signInPassword", visibility:"signIn", type: "passwordSignIn", icon:element, masked:"password", value:"", error:"", showError:false}
            ],
            saveUserError: "",
            signInError: ""
        }

        this.updateToggleButton = this.updateToggleButton.bind(this)
        this.updateInputFieldsValueState = this.updateInputFieldsValueState.bind(this)
        this.getSpecificField = this.getSpecificField.bind(this);

    }


    updateToggleButton(val){
        this.props.updatePageDisplayed(val)
    }

    updateInputFieldsValueState = (value, key) =>{
        this.setState({inputFieldsData: this.state.inputFieldsData.map((field, index)=>{
            if(key === index){
                return {...field, value: value} 
            }
            else{return field}
        })}
        )
    }

    updateError = (key, textMessage, display) =>{
        this.setState({inputFieldsData: this.state.inputFieldsData.map((field, index)=>{
            if(key === index){
                return {...field, error: textMessage, showError: display} 
            }
            else{return field}
        })}
        )
    }

    handleSaveUser = (e)=>{
        e.preventDefault()
        
        let validationErrorsExist = this.state.inputFieldsData.map((field)=>{
            if(field.visibility === "create"){return (field.error !== "" || field.value === "") ? true: false}
                else{return false}})

        let errorMesage = "";

        let users = JSON.parse(localStorage.getItem("users")) || [];
            console.log(users)
        if(validationErrorsExist.includes(true)){
            errorMesage = "Please correct all the errors before saving"
            this.setState({saveUserError: errorMesage}) 
        }       
        
        else if(users.map((user)=>{
            let email = this.getSpecificField("email")
            return user.email === email ? true: false
        }).includes(true)){
            errorMesage = "This E-Mail address already exists"
            this.setState({saveUserError: errorMesage})
            }

        else{
            this.setState({saveUserError: ""})
            let newUserObj = {};
            
            this.state.inputFieldsData.forEach((field)=>{
                let newPair = {[field.inputID]: field.value}
                Object.assign(newUserObj, newPair)
            })
            
            this.setState({inputFieldsData: this.state.inputFieldsData.map((field)=> {
                        return {...field, value:"", error:"", showError:false}
                    })
            })

            users.push(newUserObj)
            localStorage.setItem("users", JSON.stringify(users));
        }
    }

  
    handleSignIn = (e) =>{
        e.preventDefault()
        let email = this.getSpecificField("signInEmail")
        let password = this.getSpecificField("signInPassword")
        let users = JSON.parse(localStorage.getItem("users")) || [];
        let user = users.filter((user)=>{
            return user.email === email && user.password === password ? true: false
        })

        if(user.length === 0){
            this.setState({signInError: "Wrong E-Mail or Password"})
        }
        else{
            // this.setState({inputFieldsData: this.state.inputFieldsData.map((field)=> {
            //     return {...field, value:"", error:"", showError:false}
            //       })
            //  })
            this.props.updatePageDisplayed("cart")
        }
    }

    getSpecificField = (fieldID) => {for (const element of this.state.inputFieldsData) {
        if(element.inputID === fieldID){
            return element.value
        }
        }
    }
   

    render(){ 
        let inputFieldsData = this.state.inputFieldsData


        let inputFields = inputFieldsData.map((field, index) => 
        {
                return <LoginInputFields 
                        label = {field.label} 
                        id={field.inputID}
                        uniqueId = {field.key} 
                        index={index} 
                        toggleButton =  {this.props.pageDisplay}
                        visibility = {field.visibility}
                        inputtype = {field.type}
                        onChange = {this.updateInputFieldsValueState}
                        password = {this.getSpecificField("password")}
                        icon = {field.icon}
                        masked = {field.masked}
                        value = {field.value}
                        ref = {this.inputRef}
                        error = {field.error}
                        showError = {field.showError}
                        updateError = {this.updateError}
                    />})                                                    


        return(
            <div >
                <div className = "loginPage">

                    <ToggleButton 
                            toggleButton = {this.props.pageDisplay}
                            stateUpdater = {this.updateToggleButton}/>

                    <p>{inputFieldsData[0].value}</p>
                    <p>{inputFieldsData[1].value}</p>

                    <div className="errorMessageContainer">
                            {this.saveUserError !== "" &&
                            this.props.pageDisplay==="create"
                            && (<p className="errorMessageButtonClick">{this.state.saveUserError}</p>)}
                            
                            {this.signInError !== "" &&
                            this.props.pageDisplay==="signIn"
                            && (<p className="errorMessageButtonClick">{this.state.signInError}</p>)}                    
                    </div>
                        
                    <form>
                        {inputFields} 
                        <div className = "buttonContainer">
                        {this.props.pageDisplay==="create" && (<button className = "saveButton" onClick={this.handleSaveUser}>SAVE</button>)}
                        {this.props.pageDisplay==="signIn" && (<button className = "signInButton" onClick={this.handleSignIn}>SIGN IN</button>)}
                        {this.props.pageDisplay==="create" && (<div className="separatorDiv"><p className="separator">or</p></div>)}
                        {this.props.pageDisplay==="create" && (<button className = "facebookButton">
                                <div ><FacebookLogo className="fbIcon"/></div>
                                <div>SIGN IN WITH FACEBOOK</div>
                            </button>)}
                       
                        <p className = "cancel">Cancel</p>

                        <div className = "privacyDiv">
                            <p className="privacyItem">Privacy Policy and Cookies</p>
                            <p className="privacyItem">Terms of Sale and Use</p>
                        </div>
                        </div>

                    </form>

                </div>
            </div>
        )
    }
}

export default LoginPage