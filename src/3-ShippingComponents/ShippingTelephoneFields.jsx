import React from "react";
import "./1.1-ShippingPage.css"


class ShippingTelephoneFields extends React.Component{

    updateInputState = (e) => {
        let fieldName = e.target.dataset.altfieldname === undefined ? "value" : e.target.dataset.altfieldname
        let inputValue = e.target.value
        let key = this.props.index
        this.props.onChange(inputValue, key, fieldName)
        }

    handlePhoneValidations = (e)=>{
            this.props.handlePhoneValidations(e.target.value, this.props.phone, this.props.index, this.props.countryCode, this.props.areaCode)        
    }

  
    render(){
        const errorID = this.props.inputtype + "Error"
        const errorIDAreaCode = this.props.inputtype + "AreaCodeError" //phoneAreaCodeError
        const errorIDCountryCode = this.props.inputtype + "CountryCodeError" //phoneCountryCodeError
        let displayedErrors = this.props.error.map((error)=>{
            return <li className = "errorMessageStyle" key = {error}>{error}</li>
        } )

        return(
            <div key = {this.props.index}>

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
                                onBlur = {this.handlePhoneValidations}
                                ref = {this.props.countryCodeRef}
                            />
                            
                        
                            <input 
                                onChange= {this.updateInputState} 
                                className={this.props.inputtype+"AreaCode"} //phoneAreaCode 
                                id = {this.props.id} 
                                data-type ={errorIDAreaCode}
                                data-altfieldname = "areaCode"
                                value = {this.props.areaCode}
                                onBlur = {this.handlePhoneValidations}
                                ref = {this.props.areaCodeRef}
                            />

                            <input 
                                onChange= {this.updateInputState} 
                                className={this.props.inputtype} 
                                id = {this.props.id} 
                                data-type ={errorID}
                                value = {this.props.value}
                                onBlur = {this.handlePhoneValidations}
                                ref = {this.props.ref}
                            />

                        </div>

                    </label>
                        {this.props.showError  &&
                        <div>
                            {displayedErrors}
                        </div>
                            }
                </div>

            </div>
        )
    }

}

export default ShippingTelephoneFields