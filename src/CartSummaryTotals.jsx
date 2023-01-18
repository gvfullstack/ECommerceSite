import React from "react";
import "./cartPage.css"


class CartSummaryTotals extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            cartItems: [],
            total: 0
        }
    }

    render(){
        return(
            <div className="cartSummaryTotalsContainer">
                   <div className={this.props.cartField.className}>
                        <p>{this.props.cartField.fieldLabel}</p>
                        <p className={this.props.cartField.classNamePrice}>{this.props.cartField.fieldTotal}</p>
                    </div>
            </div>
        )
    }
}

export default CartSummaryTotals