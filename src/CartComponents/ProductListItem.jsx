import React from "react";
import '../CartComponents/cartPage.css';

class ProductListItem extends React.Component{
   
  

    calculateTotal = (e) =>{
        let total = (e.target.value * this.props.cartItem.cartItemPrice).toFixed(2)
        let shipping = (e.target.value * this.props.cartItem.unitShippingCost).toFixed(2)
        this.props.updateProductTotals(e.target.value, total, this.props.cartItem.key, shipping)
    }

   

    resetValues = () => this.props.resetCartValues(this.props.cartItem.key)

    render(){

        let quantitiesArr = (num) =>{
            let qtyArr = []
            for(let i = 0; i <= num; i++){
                qtyArr.push(<option key = {i} value={i}>{i}</option>)
            } return qtyArr
        }

        return(
            <div className = "mainCartContainer" key = {this.props.index}>
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
                    <div className="cartItemPrice">${this.props.cartItem.cartItemPrice}</div>
                </div>

                <div className="cartItemQuantityContainer">
                    <select name="selectQuantity" id="selectQuantity" onChange={this.calculateTotal} value = {this.props.cartItem.cartItemQuantity}>
                        {quantitiesArr(this.props.cartItem.maxItemQuantity)}
                    </select>
                </div>
                <div className ="cartItemTotalPriceContainer">
                    <p className="cartItemTotalPrice">${this.props.cartItem.cartItemTotalPrice}</p>
                </div>
        </div>
        )
}
}

export default ProductListItem

