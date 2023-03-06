import React from "react";  
import "../3-ShippingComponents/1.1-ShippingPage.css"

class ShippingSummaryTotals extends React.Component{
    render(){
        return(
            <div key = {this.props.index+"STS"}>
                <div className="subtotalShippingSummary">
                    <p>{this.props.fieldLabel}:</p>
                    <strong className = {"shipping"+ this.props.index}>${this.props.fieldTotal}</strong>
                </div>
            </div>
        )
    }

}


export default ShippingSummaryTotals;