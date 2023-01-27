import React from "react";
import "../CartComponents/cartPage.css"

class PromoCodeSection extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            userPromoCode: ""}
        }

    updatePromoState = (e) =>{
        this.props.updatePromoState(e.target.value)
        // this.setState({userPromoCode: e.target.value})
    }
        
    applyDiscount = () =>{
        this.props.setPromoStatus()
        }
        
    render(){
        return(

        <div className="promoSectionContainer">
            <p>Do you have a promo code? i.e. HAPPYCAMPER</p>

            <div className="promoCodeContainer">
                <input type="text" name="promoCode" 
                    id="promoCode" 
                    placeholder="Code" 
                    value = {this.props.userPromoCode} 
                    onChange= {this.props.updatePromoState}/>

                <div className="applyButtonContainer">
                    <button className="applyButton" onClick = {this.applyDiscount}>Apply</button>
                </div>
            </div>
        </div>
        )
    }

}

export default PromoCodeSection