import React from "react";


class ShippingInfoDropdown extends React.Component{
    constructor(props){
        super(props);
        
    }
    updateValue = (event) =>{
        this.props.onChange(event.target.value, this.props.index)
    }
    render(){
        return(
            <div className="shippingInfoDropdown">
                <label className = "labelStyleDD">{this.props.label}</label>
                <select className = {this.props.id} value={this.props.value} 
                        onChange={this.updateValue}>
                    {this.props.selection.map((item, index) => {
                        return <option key={index} value={item}>{item}</option>
                    })}
                </select>
            </div>
        )
    }
}

export default ShippingInfoDropdown;

