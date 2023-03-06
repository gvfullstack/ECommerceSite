import React from "react";  

class PaymentDropDownFields extends React.Component{
  
    updateInputState = (e) => {
        let inputValue = e.target.value
        let key = this.props.index
        this.props.onChange(key, inputValue)
    }

    handleInputValidations = (e) => {
        let value = e.target.value
        let key = this.props.index
        let errorID = e.target.dataset.type

        this.props.handleInputValidations(value, key, errorID)
    }

    render(){

        let errorID = this.props.id + "Error"

        return(
            <div className="paymentDropdownParentContainer">
                <div className="paymentDropdownContainer" key = {"container"+this.props.index}>
                    <label htmlFor={this.props.id} className = {"container"+this.props.className}>
                        <div className={"paymentLabelStyle"+this.props.secondClassName}>
                            {this.props.label}
                        </div>
                        <div className={this.props.className}>

                            <select 
                                name = {this.props.id} 
                                id = {this.props.id}
                                key = {this.props.index}  
                                value = {this.props.value}
                                onChange = {this.updateInputState}
                                className = "dropDownItem" 
                                onBlur = {this.handleInputValidations}
                                data-type ={errorID}
                                >
                                    {this.props.selection.map((selection) => {
                                        return(
                                            <option key = {selection} value={selection} >{selection}</option>
                                        )
                                    })}
                            </select>
                        </div>
                    </label>
                </div>
                    <p className= {"errorMessageStyleDate"+this.props.id}>{this.props.error}</p>
            </div>
        )
    }


}

export default PaymentDropDownFields