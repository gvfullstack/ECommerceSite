import React from "react";
import './cartPage.css';

class ProductListItem extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            itemTotal: 0,
            quantity: 0
        }
    }

    calculateTotal = (e) =>{
        let total = e.target.value * this.props.cartItem.cartItemPrice.slice(1)
        this.setState({itemTotal: total, quantity: e.target.value})
    }

    resetValues = () =>{this.setState({itemTotal: 0, quantity: 0})}


// [    {image: "https://media.istockphoto.com/id/1041992872/es/vector/dise%C3%B1o-abstracto-de-ciudad-de-nueva-york-con-estilo-t-shirts-y-prendas-de-vestir.jpg?s=2048x2048&w=is&k=20&c=ZMyRHOnGYhc4RIiiLiBPPifQsmV7zYFU1P1_fXIS0hc=", 
//     cartItemGender :"Gender Neutral", 
//     cartItemTitle : "NYC T-SHIRT" ,
//     cartItemColor : "Black", 
//     cartItemSize : "Large", 
//     cartItemPrice : "$29.99", 
//     maxItemQuantity : "10", 
//     cartItemTotalPrice : ""}]


    render(){

        let quantitiesArr = (num) =>{
            let qtyArr = []
            for(let i = 0; i <= num; i++){
                qtyArr.push(<option value={i}>{i}</option>)
            } return qtyArr
        }

        return(
            <div className = "mainCartContainer">
                <div className = "xIconContainer">
                    <div className ="xIcon" onClick={this.resetValues}>X</div>
                </div>

                <div className="cartImageContainer">
                    <img className="cartImage" src={this.props.cartItem.image} alt="" />
                </div>
                <div className="cartItemDescriptionContainer">
                    <p className = "cartItemGender">{this.props.cartItem.cartItemGender}</p>
                    <p className="cartItemTitle">{this.props.cartItem.cartItemTitle}</p>
                    <p className="cartItemColor"> Color: <b>{this.props.cartItem.cartItemColor}</b></p>
                    <p className="cartItemSize"> Size: <b>{this.props.cartItem.cartItemSize}</b></p>
                </div>
                <div className="cartItemPriceContainer">
                    <div className="cartItemPrice">{this.props.cartItem.cartItemPrice}</div>
                </div>

                <div className="cartItemQuantityContainer">
                    <select name="selectQuantity" id="selectQuantity" onChange={this.calculateTotal} value = {this.state.quantity}>
                        {quantitiesArr(this.props.cartItem.maxItemQuantity)}
                    </select>
                </div>
                <div className ="cartItemTotalPriceContainer">
                    <p className="cartItemTotalPrice">${this.state.itemTotal}</p>
                </div>
        </div>
        )
}
}

export default ProductListItem

