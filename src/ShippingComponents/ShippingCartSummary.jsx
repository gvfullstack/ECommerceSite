import React from "react";


class ShippingCartSummary extends React.Component{
    
    render(){
        return(
        <div className="cartSummaryItemDiv">
            <div className="cartSummaryImgDiv">
                <img src={this.props.image} alt="" />
            </div>
            <div className="summaryDetailsSectionDiv">
                <div className="cartSummaryItemTitleDiv">
                    <strong>{this.props.title}</strong>
                </div>
                <p>Color: {this.props.color}</p>
                <p>Size: {this.props.size}</p>
                <p>Qty: {this.props.quantity}</p>
                <p id ="summaryPrice">${this.props.price}</p>
            </div>
        </div>        
        )
    }
}


export default ShippingCartSummary;