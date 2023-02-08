import React from "react";


class ShippingInfoDropdown extends React.Component{
  
    runValidation = (event) =>{
        this.props.handleDropDownValidation(event.target.value, this.props.index)
    }

    updateValue = (event) =>{
        this.props.onChange(event.target.value, this.props.index)
    }
    render(){
        return(
            <div className = "shippingInfoDropdownContainer">

                <div className="shippingInfoDropdown" key = {this.props.index}>
                    <label className = "labelStyleDD">{this.props.label}</label>
                    <select 
                        className = {this.props.id} 
                        value={this.props.value} 
                        onChange={this.updateValue}
                        onBlur={this.runValidation}>

                        {this.props.selection.map((item, index) => {
                            return <option key={index} value={item}>{item}</option>
                        })}
                    </select>
                </div>

                <div className="dropDownErrorMessageContainer">
                    {this.props.showError && (<p className= "dropDownErrorMessageStyle">{this.props.error}</p>)}
                </div>
             
             </div>

        )
    }
}

export default ShippingInfoDropdown;

