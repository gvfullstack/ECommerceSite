import React from "react";
import '../CartComponents/cartPage.css';
import ProductListItem from "../CartComponents/ProductListItem";
import CartSummary from "../CartComponents/CartSummary";


class CartPage extends React.Component{ 
    constructor(props){
        super(props)
        this.state = {
            discountCode: "HAPPYCAMPER",
            discountPercentage: -0.25,
            discountCodeEnabled: false,
            cartItems : [
                {key: "CP1",
                image: "https://media.istockphoto.com/id/1041992872/es/vector/dise%C3%B1o-abstracto-de-ciudad-de-nueva-york-con-estilo-t-shirts-y-prendas-de-vestir.jpg?s=2048x2048&w=is&k=20&c=ZMyRHOnGYhc4RIiiLiBPPifQsmV7zYFU1P1_fXIS0hc=", 
                cartItemGender :"Gender Neutral", 
                cartItemTitle : "NYC T-SHIRT" ,
                cartItemColor : "Black", 
                cartItemSize : "Large", 
                cartItemPrice : "29.99", 
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
                cartItemPrice : "39.99", 
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
                cartItemPrice : "29.99", 
                maxItemQuantity : "10",
                unitShippingCost : 3.99, 
                cartItemTotalPrice : 0,
                cartItemQuantity : 0,
                totalShippingCost: 0}
            ],

            cartFields : [{key: "CP4", fieldLabel:"Cart Subtotal", fieldTotal : "0.00", className: "subtotalContainer"}, 
                        {key: "CP5", fieldLabel:"Shipping & Handling", fieldTotal : "0.00", className: "shippingContainer"}, 
                        {key: "CP6",fieldLabel:"Discount", fieldTotal : "0.00", className: "discountContainer"}, 
                        {key: "CP7",fieldLabel:"Cart Total", fieldTotal : "0.00", className : "totalContainer", classNamePrice : "cartTotal"}
                    ],
            
            checkOutButtonDisabled: true,
            userPromoCode: "",
            cartCount: 0
        }
    }

    updateProductTotals = (quantity, total, key, shipping) =>{
        this.resetLocalStorage("cartItems")
        this.resetLocalStorage("cartFields")
        this.resetLocalStorage("checkOutButtonDisabled")
        this.resetLocalStorage("cartCount")


        this.setState({cartItems: this.state.cartItems.map((cartItem) => {
            if(key === cartItem.key){
                return {...cartItem, cartItemTotalPrice: total, cartItemQuantity: quantity, totalShippingCost: shipping}
            }
            else{return cartItem}
        })}, 
            () => {this.updateTotals()}
        )
    }

    updateTotals = () =>{
        const CP4Map = this.state.cartItems.reduce((acc, cartItem) => {return parseFloat(acc) + parseFloat(cartItem.cartItemTotalPrice)}, 0)
        const CP5Map = this.state.cartItems.reduce((acc, cartItem) => {return parseFloat(acc) + parseFloat(cartItem.totalShippingCost)}, 0)
        const CP6Map = CP4Map * (this.state.discountCodeEnabled ? this.state.discountPercentage : 0)
        const CP7 = (CP4Map + CP5Map + CP6Map).toFixed(2)
        const cartCount = this.state.cartItems.reduce((acc, cartItem) => {return parseInt(acc) + parseInt(cartItem.cartItemQuantity)}, 0)
        console.log("cartCount", cartCount)

        const cartFieldValues = [{CP4:CP4Map.toFixed(2)}, {CP5:CP5Map.toFixed(2)}, {CP6:CP6Map.toFixed(2)}, {CP7:CP7}]

        const checkOutButtonStatus = CP4Map > 0 ? false : true
           
        this.setState({...this.state, 
            cartCount: cartCount,
            checkOutButtonDisabled: checkOutButtonStatus, 
            cartFields: this.state.cartFields.map((cartField) => {
                for(let i = 0; i < cartFieldValues.length; i++){
                    if(cartField.key === Object.keys(cartFieldValues[i])[0]){
                        return {...cartField, fieldTotal: Object.values(cartFieldValues[i])[0]}
                    }
                }
                return cartField
            }
            )
        })
        }

    resetCartValues = (key) => {     
        this.setState({cartItems: this.state.cartItems.map((cartItem) => {
            if(key === cartItem.key){
            return {...cartItem, cartItemTotalPrice: 0, cartItemQuantity: 0, totalShippingCost: 0}}
            else{return cartItem}
        })}, () => this.updateTotals())}

    setPromoStatus = () =>{   
        this.setState({discountCodeEnabled: this.state.userPromoCode === this.state.discountCode}, () => this.applyDiscount())
    }
    
    applyDiscount = () => {

        const cartSubTotal = this.state.cartFields.filter((cartField) => cartField.key === "CP4")[0].fieldTotal
        const discountMultiplier = this.state.discountCodeEnabled ? this.state.discountPercentage : 0
        
        this.setState({cartFields: this.state.cartFields.map((item)=> {
            if(item.key === "CP6"){
                return {...item, fieldTotal: (cartSubTotal * discountMultiplier).toFixed(2)}
            }
            else{return item}})},
            () => this.updateTotals())
        }

    updatePromoState = (e) => {
        this.setState({userPromoCode: e.target.value})
    }

    handleSaveCart = () => {

        function saveToLocalStorage(key, value){
            localStorage.setItem(key, JSON.stringify(value))
        }

        saveToLocalStorage("cartItems", this.state.cartItems)
        saveToLocalStorage("cartFields", this.state.cartFields) 
        saveToLocalStorage("checkOutButtonDisabled", this.state.checkOutButtonDisabled)  
        saveToLocalStorage("cartCount", this.state.cartCount)
   
    }

    resetLocalStorage(key) {
        localStorage.removeItem(key);
        }

    componentDidMount() {
        let cartItemData = JSON.parse(localStorage.getItem("cartItems")) ? 
            JSON.parse(localStorage.getItem("cartItems")) : this.state.cartItems      

        let cartFieldsData = JSON.parse(localStorage.getItem("cartFields")) ? 
            JSON.parse(localStorage.getItem("cartFields")) : this.state.cartFields  

        let checkOutButtonDisabledData = JSON.parse(localStorage.getItem("checkOutButtonDisabled")) ? 
            true : false  
        
        let cartCountData = JSON.parse(localStorage.getItem("cartCount")) ? 
            JSON.parse(localStorage.getItem("cartCount")) : 0

        this.setState({...this.state, 
            checkOutButtonDisabled: checkOutButtonDisabledData, 
            cartItems: cartItemData, 
            cartFields: cartFieldsData,
            cartCount: cartCountData})
        }   


    render(){
        let random = ()=>Math.random()
        let headings = ["", "PRODUCT", "", "PRICE", "QUANTITY", "TOTAL"]
        let heading = headings.map((heading) => {return <p key={heading+random()}>{heading}</p>})
        let cartItems = this.state.cartItems.map((cartItem) => {
            return <ProductListItem 
                    key={cartItem.key} 
                    cartItem={cartItem} 
                    updateProductTotals={this.updateProductTotals}
                    resetCartValues = {this.resetCartValues}
                    setPromoStatus = {this.setPromoStatus}
                    />})
            

        return (
            <div className = "cartPageContainer">
               
                <div className = "cartPageContainerLeft">
                        <div className = "cartPageContainerHeadings">
                            {heading}
                        </div>
                            {cartItems}   
                </div>
                <div className = "cartPageContainerRight">
                <CartSummary 
                    cartFields = {this.state.cartFields} 
                    setPromoStatus = {this.setPromoStatus} 
                    discountCode = {this.state.discountCode}
                    checkOutButtonDisabled = {this.state.checkOutButtonDisabled}
                    userPromoCode = {this.state.userPromoCode}
                    updatePromoState = {this.updatePromoState}
                    openShippingPage = {this.props.openShippingPage}
                    handleSaveCart = {this.handleSaveCart}
                    />
                </div>
                
            </div>
        )
}
}


export default CartPage