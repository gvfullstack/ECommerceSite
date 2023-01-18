import React from "react";
import "./cartPage.css"

class PromoCodeSection extends React.Component{

    render(){
        return(

        <div className="promoSectionContainer">
            <p>Do you have a promo code?</p>
            <div className="promoCodeContainer">
                <input type="text" name="promoCode" id="promoCode" placeholder="Code"/>
                <div className="applyButtonContainer">
                    <button className="applyButton">Apply</button>
                </div>
            </div>
        </div>
        )
    }

}

export default PromoCodeSection