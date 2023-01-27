import React from "react";
import "./ShippingPage.css"

let myFunctions = require("./shippingFieldsValidations.js")


class ShippingInputFields extends React.Component{
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
                case "nameError":
                    textMessage = myFunctions.nameValidation(value)
                    break;
                case "addressError": 
                    textMessage = myFunctions.addressValidation(value) 
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
 
    render(){
        const errorID = this.props.inputtype + "Error"
        
        let showError = this.props.showError

        return(
            <div>

            <div className = "divStyle" >
               
                <label className = "inputLabel" htmlFor={this.props.id}>
                    <div className="labelStyle">
                        {this.props.label}
                    </div>
                    <div className={this.props.index}>

                        <input 
                            onChange= {this.updateInputState} 
                            className={this.props.id} 
                            id = {this.props.id} 
                            data-type ={errorID}
                            value = {this.props.value}
                            onBlur = {this.runValidations}
                        />

                    </div>

                </label>
                
                    {showError && (<p className= "errorMessageStyle">{this.props.error}</p>)}
               
            </div>

            </div>
        )
    }

}

export default ShippingInputFields