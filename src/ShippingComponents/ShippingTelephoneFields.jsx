import React from "react";
import "./ShippingPage.css"

let myFunctions = require("./shippingFieldsValidations.js")

class ShippingTelephoneFields extends React.Component{

    updateInputState = (e) => {
        let fieldName = e.target.dataset.altfieldname === undefined ? "value" : e.target.dataset.altfieldname
        let inputValue = e.target.value
        let key = this.props.index
        console.log(fieldName, inputValue, key)
        this.props.onChange(inputValue, key, fieldName)
        }

    handleValidations = (e)=>{
        
        let countryCode = this.props.countryCode
        let areaCode = this.props.areaCode
        let phoneNumber = this.props.value
        let index = this.props.index
        const phoneProperties = [{value: this.props.countryCode, regEx: /\d{1}?$/, error: "Country code must be 1 digits"}, 
                                {value: this.props.areaCode, regEx: /\d{3}?$/, error: "Area code must be 3 digits"},
                                {value: this.props.value, regEx: /\d{3}-\d{4}?$/, error: "Phone number must be 7 digits in format: xxx-xxxx"}
                                ]

        let validationResults = phoneProperties.map((property)=>property.value.match(property.regEx) ? "" : property.error)
        let textMessage = validationResults.map((errorMessage)=> errorMessage.length > 0 ? <li key = {errorMessage}>{errorMessage}</li> : "")

        let display = textMessage.length > 0 ? true : false
            console.log(textMessage, display)
        this.props.updateError(index, textMessage, display)
    }

  
    render(){
        const errorID = this.props.inputtype + "Error"
        const errorIDAreaCode = this.props.inputtype + "AreaCodeError" //phoneAreaCodeError
        const errorIDCountryCode = this.props.inputtype + "CountryCodeError" //phoneCountryCodeError
        let showError = this.props.showError

        return(
            <div>

            <div className = "divStylePhone" >
               
                <label className = "inputLabelPhone" htmlFor={this.props.id}>
                    <div className="labelStylePhone">
                        {this.props.label}
                    </div>
                    <div className={this.props.index}>

                         <input 
                            onChange= {this.updateInputState} 
                            className={this.props.inputtype+"CountryCode"} //phoneCountryCode
                            id = {this.props.id} 
                            data-type = {errorIDCountryCode}
                            data-altfieldname = "countryCode"
                            value = {this.props.countryCode}
                            onBlur = {this.handleValidations}
                            ref = {this.props.countryCodeRef}
                        />
                        
                       
                         <input 
                            onChange= {this.updateInputState} 
                            className={this.props.inputtype+"AreaCode"} //phoneAreaCode 
                            id = {this.props.id} 
                            data-type ={errorIDAreaCode}
                            data-altfieldname = "areaCode"
                            value = {this.props.areaCode}
                            onBlur = {this.handleValidations}
                            ref = {this.props.areaCodeRef}
                        />

                        <input 
                            onChange= {this.updateInputState} 
                            className={this.props.inputtype} 
                            id = {this.props.id} 
                            data-type ={errorID}
                            value = {this.props.value}
                            onBlur = {this.handleValidations}
                            ref = {this.props.ref}
                        />

                    </div>

                </label>
                
                    {showError && (<p className= "errorMessageStyle">{this.props.error}</p>)}
               
            </div>

            </div>
        )
    }

}

export default ShippingTelephoneFields