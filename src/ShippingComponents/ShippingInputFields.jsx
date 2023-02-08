import React from "react";
import "./ShippingPage.css"



class ShippingInputFields extends React.Component{

    updateInputState = (e) => {
       
        let inputValue = e.target.value
        let key = this.props.index
        this.props.onChange(inputValue, key)
        }

    runValidations = (e) => {
        this.props.handleValidations(e.target.dataset.type, e.target.value, this.props.index)
    }
 
    render(){
        const errorID = this.props.inputtype + "Error"
        
        let showError = this.props.showError

        return(
            <div key = {this.props.index}>

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