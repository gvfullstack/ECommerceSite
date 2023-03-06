import React from "react";


class PaymentInputFields extends React.Component{
    
    handleOnChange = (e) => {
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
            <div className="paymentInputContainer" key = {this.props.index}>
                <label htmlFor={this.props.id} className = {"container"+this.props.className}>
                    <div className="paymentLabelStyle">
                        {this.props.label}
                    </div>
                    <div className={this.props.className+this.props.secondClassName}>
                        {this.props.cardImage &&  (<div className="cardImageContainer">
                            <img className = "cardImage" src={this.props.cardImage} alt="" />
                        </div>)}
                        <input 
                            type = "text" 
                            name = {this.props.id} 
                            value = {this.props.value} 
                            onChange = {this.handleOnChange}
                            className ={"payInputItem"+this.props.secondClassName}
                            onBlur = {this.handleInputValidations}
                            data-type ={errorID}
                            maxLength = {this.props.maxLength}
                            />
                    </div>

                </label>
                <p className= "errorMessageStyle">{this.props.error}</p>
             </div>
        )
    }
}


export default PaymentInputFields