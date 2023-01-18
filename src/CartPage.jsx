import React from "react";
import './cartPage.css';
import ProductListItem from "./ProductListItem";
import CartSummary from "./CartSummary";


class CartPage extends React.Component{ 
    constructor(props){
        super(props)
        this.state = {
            cartItems : [
                {key: "CP1",
                image: "https://media.istockphoto.com/id/1041992872/es/vector/dise%C3%B1o-abstracto-de-ciudad-de-nueva-york-con-estilo-t-shirts-y-prendas-de-vestir.jpg?s=2048x2048&w=is&k=20&c=ZMyRHOnGYhc4RIiiLiBPPifQsmV7zYFU1P1_fXIS0hc=", 
                cartItemGender :"Gender Neutral", 
                cartItemTitle : "NYC T-SHIRT" ,
                cartItemColor : "Black", 
                cartItemSize : "Large", 
                cartItemPrice : "$29.99", 
                maxItemQuantity : "10", 
                unitShippingCost : 3.99,
                cartItemTotalPrice : 0,
                cartItemQuantity : 0,
                totalShippingCost: 0},

                {key: "CP2",
                image: "https://media.istockphoto.com/id/963249362/es/vector/la-california-ocean-avenue-camiseta-y-ropa-de-dise%C3%B1o-tipograf%C3%ADa-impresi%C3%B3n-ilustraci%C3%B3n.jpg?s=2048x2048&w=is&k=20&c=vFumTCy8WqOQZm7qw7_TFYvYvZvxEaL4Zs4JURxc-TY=", 
                cartItemGender :"Gender Neutral", 
                cartItemTitle : "CA OCEAN T-SHIRT", 
                cartItemColor : "Black", 
                cartItemSize : "Large", 
                cartItemPrice : "$39.99", 
                maxItemQuantity : "10",
                unitShippingCost : 3.99, 
                cartItemTotalPrice : 0,
                cartItemQuantity : 0,
                totalShippingCost: 0},

                {key: "CP3",
                image: "https://media.istockphoto.com/id/1128542158/es/vector/surf-en-hawaii-t-gr%C3%A1fica-elegante-dise%C3%B1o-p%C3%B3ster-impresi%C3%B3n.jpg?s=2048x2048&w=is&k=20&c=HDcCGSY5KyeYCB6GM8hEuuv5DGRc1e82-8CU6GT8JR4=", 
                cartItemGender :"Gender Neutral", 
                cartItemTitle : "HAWAII T-SHIRT", 
                cartItemColor : "Black", 
                cartItemSize : "Large", 
                cartItemPrice : "$29.99", 
                maxItemQuantity : "10",
                unitShippingCost : 3.99, 
                cartItemTotalPrice : 0,
                cartItemQuantity : 0,
                totalShippingCost: 0}
            ],

            cartFields : [{key: "CP4", fieldLabel:"Cart Subtotal", fieldTotal : 0, className: "subtotalContainer"}, 
                        {key: "CP5", fieldLabel:"Shipping & Handling", fieldTotal : 0, className: "shippingContainer"}, 
                        {key: "CP6",fieldLabel:"Discount", fieldTotal : 0, className: "discountContainer"}, 
                        {key: "CP7",fieldLabel:"Cart Total", fieldTotal : 0, className : "totalContainer", classNamePrice : "cartTotal"}] 
        }
    }

    updateProductTotals = (quantity, total, key, shipping) =>{
        this.setState({cartItems: this.state.cartItems.map((cartItem) => {
            if(key === cartItem.key){
                return {...cartItem, cartItemTotalPrice: total, cartItemQuantity: quantity, totalShippingCost: shipping}
            }
            else{return cartItem}
        }),

        cartFields: this.state.cartFields.map((cartField) => {
            if(cartField.key === "CP4"){
                return {...cartField, fieldTotal: this.state.cartItems.reduce((acc, cartItem) => {return acc + cartItem.cartItemTotalPrice}, 0)}
            }
            else if(cartField.key === "CP5"){
                return {...cartField, fieldTotal: this.state.cartItems.reduce((acc, cartItem) => {return acc + cartItem.totalShippingCost}, 0)}
            }
            else if(cartField.key === "CP7"){
                let sumOfFields = this.state.cartFields.reduce((acc, cartField) => {
                    if(cartField.key !== "CP7"){
                        return acc + cartField.fieldTotal}
                    else{return acc}}, 0)

                return {...cartField, fieldTotal: sumOfFields }
                }
            else{return cartField}
        }
        )})}

    resetCartValues = () => {
        this.setState({cartItems: this.state.cartItems.map((cartItem) => {
            return {...cartItem, cartItemTotalPrice: 0, cartItemQuantity: 0}
        })})}


    render(){

        let random = ()=>Math.random()
        let headings = ["", "PRODUCT", "", "PRICE", "QUANTITY", "TOTAL"]
        let heading = headings.map((heading) => {return <p key={heading+random()}>{heading}</p>})
        let cartItems = this.state.cartItems.map((cartItem) => {
            return <ProductListItem 
                    key={cartItem.key} 
                    cartItem={cartItem} 
                    updateProductTotals={this.updateProductTotals}
                    resetCartValues = {this.resetCartValues}/>})

        return (
            <div className = "cartPageContainer">
                <div className = "cartPageContainerLeft">
                        <div className = "cartPageContainerHeadings">
                            {heading}
                        </div>
                            {cartItems}                    
                </div>
                <div className = "cartPageContainerRight">
                    <CartSummary cartFields = {this.state.cartFields}/>
                </div>
                
            </div>
        )
}
}


export default CartPage