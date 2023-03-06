import React from "react";
import PromoCodeSection from "../2-CartComponents/PromoCode";
import CartSummaryTotals from "../2-CartComponents/CartSummaryTotals";


class CartSummary extends React.Component{

    openShippingPage = () => {
        this.props.openShippingPage("shipping")    
        this.props.handleSaveCart()
    }  

    

    render(){

        let buttonClassName = this.props.checkOutButtonDisabled ? "checkoutButtonDisabled" : "checkoutButton"

        let cartSummaryFields = this.props.cartFields.map((field)=>{
            return (
            <CartSummaryTotals 
                key = {field.key} 
                cartField = {field} 
                setPromoStatus = {this.props.setPromoStatus}/>)
        })

        return( 
            <div className="cartSummaryContainer">
                <div className="summaryContainer">
                    <p>SUMMARY</p>
                </div>

                    <PromoCodeSection 
                        setPromoStatus = {this.props.setPromoStatus} 
                        discountCode = {this.props.discountCode}
                        userPromoCode = {this.props.userPromoCode}
                        updatePromoState = {this.props.updatePromoState}
                        
                        />

                    {cartSummaryFields}

                <div className="checkoutButtonContainer">
                        <button 
                            className={buttonClassName} 
                            disabled={this.props.checkOutButtonDisabled}
                            onClick={this.openShippingPage}
                            >CHECKOUT</button>
                </div>
            </div>
               
        )   
    }
}

export default CartSummary