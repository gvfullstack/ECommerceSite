import React from "react";
import './cartPage.css';
import ProductListItem from "./ProductListItem";

class CartPage extends React.Component{ 
    constructor(props){
        super(props)
        this.state = {
            cartItems : [
                {image: "https://media.istockphoto.com/id/1041992872/es/vector/dise%C3%B1o-abstracto-de-ciudad-de-nueva-york-con-estilo-t-shirts-y-prendas-de-vestir.jpg?s=2048x2048&w=is&k=20&c=ZMyRHOnGYhc4RIiiLiBPPifQsmV7zYFU1P1_fXIS0hc=", 
                cartItemGender :"Gender Neutral", 
                cartItemTitle : "NYC T-SHIRT" ,
                cartItemColor : "Black", 
                cartItemSize : "Large", 
                cartItemPrice : "$29.99", 
                maxItemQuantity : "10", 
                cartItemTotalPrice : ""},

                {image: "https://media.istockphoto.com/id/963249362/es/vector/la-california-ocean-avenue-camiseta-y-ropa-de-dise%C3%B1o-tipograf%C3%ADa-impresi%C3%B3n-ilustraci%C3%B3n.jpg?s=2048x2048&w=is&k=20&c=vFumTCy8WqOQZm7qw7_TFYvYvZvxEaL4Zs4JURxc-TY=", 
                cartItemGender :"Gender Neutral", 
                cartItemTitle : "CA OCEAN T-SHIRT", 
                cartItemColor : "Black", 
                cartItemSize : "Large", 
                cartItemPrice : "$39.99", 
                maxItemQuantity : "10", 
                cartItemTotalPrice : ""},

                {image: "https://media.istockphoto.com/id/1128542158/es/vector/surf-en-hawaii-t-gr%C3%A1fica-elegante-dise%C3%B1o-p%C3%B3ster-impresi%C3%B3n.jpg?s=2048x2048&w=is&k=20&c=HDcCGSY5KyeYCB6GM8hEuuv5DGRc1e82-8CU6GT8JR4=", 
                cartItemGender :"Gender Neutral", 
                cartItemTitle : "HAWAII T-SHIRT", 
                cartItemColor : "Black", 
                cartItemSize : "Large", 
                cartItemPrice : "$29.99", 
                maxItemQuantity : "10", 
                cartItemTotalPrice : ""}
            ]
    
        }
    }

    render(){

        let headings = ["", "PRODUCT", "", "PRICE", "QUANTITY", "TOTAL"]
        let heading = headings.map((heading, index) => {return <p key={index}>{heading}</p>})
        let cartItems = this.state.cartItems.map((cartItem, index) => {return <ProductListItem key={index} cartItem={cartItem}/>})

        return (
            <div className = "cartPageContainer">
                <div className = "cartPageContainerLeft">
                        <div className = "cartPageContainerHeadings">
                            {heading}
                        </div>
                            {cartItems}                    
                </div>
                <div className = "cartPageContainerRight">
                    <div className="summaryContainer">
                        <p>SUMMARY</p>
                    </div>
                    <p>Do you have a promo code?</p>
                    <div className="promoCodeContainer">
                        <input type="text" name="promoCode" id="promoCode" placeholder="Code"/>
                        <div className="applyButtonContainer">
                            <button className="applyButton">Apply</button>
                        </div>
                    </div>
                    <div className="subtotalContainer">
                        <p>Cart Subtotal</p>
                        <p>$21.50</p>
                    </div>
                    <div className="shippingContainer">
                        <p>Shipping & Handling</p>
                        <p>$21.50</p>
                    </div>
                    <div className="discountContainer">
                        <p>Discount</p>
                        <p>$21.50</p>
                    </div>
                    <div className="totalContainer">
                        <p>Cart Total</p>
                        <p className="cartTotal">$21.50</p>
                    </div>
                    <div className="checkoutButtonContainer">
                        <button className="checkoutButton">CHECKOUT</button>
                    </div>
                </div>
            </div>
        )
}
}


export default CartPage