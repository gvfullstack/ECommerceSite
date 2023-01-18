import React from "react";
import PromoCodeSection from "./PromoCode";
import CartSummaryTotals from "./CartSummaryTotals";

class CartSummary extends React.Component{
  

    render(){

        let cartSummaryFields = this.props.cartFields.map((field)=>{
            return (
            <CartSummaryTotals key = {field.key} cartField = {field}/>)
        })

        return(

            <div className="cartSummaryContainer">
                <div className="summaryContainer">
                    <p>SUMMARY</p>
                </div>

                    <PromoCodeSection />

                    {cartSummaryFields}

                <div className="checkoutButtonContainer">
                        <button className="checkoutButton">CHECKOUT</button>
                </div>
            </div>
               
        )   
    }
}

export default CartSummary