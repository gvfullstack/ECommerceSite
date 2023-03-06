import React from "react";
import ConfirmationStatusGraphic from "./2-ConfirmationStatusGraphic";
import "./1.1-ConfirmationPage.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons'
import ShippingSummaryTotals from "../3-ShippingComponents/ShippingSummaryTotals";
import ShippingCartSummary from "../3-ShippingComponents/ShippingCartSummary";

class ConfirmationPage extends React.Component {

    render(){
        
        let cartSummaryItems = JSON.parse(localStorage.getItem("cartItems")).filter((item)=>
            {return item.cartItemQuantity > 0}).map((item)=>{
                return (

                    <ShippingCartSummary 
                        index = {item.key}
                        image = {item.image}
                        title = {item.cartItemTitle}
                        color = {item.cartItemColor}
                        size = {item.cartItemSize}
                        quantity = {item.cartItemQuantity}
                        price = {item.cartItemTotalPrice}  
                    />
                )
            })   

        let cartSummaryTotals = JSON.parse(localStorage.getItem("cartFields")).map((item)=>  
        
            <ShippingSummaryTotals 
                fieldLabel = {item.fieldLabel}
                fieldTotal = {item.fieldTotal}
                index = {item.key}
            />
                
            )
        
        let totalPayment = JSON.parse(localStorage.getItem("cartFields")).filter(item => item.key === "CP7")[0].fieldTotal;
        
        let shipmentRadios =JSON.parse(localStorage.getItem("shippingRadioOptions"));
        console.log(shipmentRadios[0].value)
        let shipmentOption = JSON.parse(localStorage.getItem("selectedShippingOption"));
        let shipmentText1 = shipmentRadios.filter(item => item.value === shipmentOption)[0].text1;
        let shipmentText2 = shipmentRadios.filter(item => item.value === shipmentOption)[0].text2;
        let paymentMethod = JSON.parse(localStorage.getItem("paymentInputFields")).filter(item => item.key === "CH2")[0];
        let lastFourPayMethod = paymentMethod.value.replace(/\D/g, "").slice(-4);
       
        return (
            <div className="confirmationPageContainer">
                <div className = "leftConfirmationPage">
                    <ConfirmationStatusGraphic />
                    <div className="paymentInformation">
                        <h3>CONFIRMATION <hr className="Hr"/></h3>
                        <div className="paymentInformationS1">
                            <div className="checkIconImage">
                                <FontAwesomeIcon icon={faCheckCircle} 
                                className="redCheckRegular"/>
                            </div>
                            <div className="confirmationText">
                                <p className = "boldedCofirmationText">Congratulations.
                                <br/> Your order has been accepted.
                                </p>
                                <p className = "nonBoldConfirmationText">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ac fermentum dui. In erat nibh, efficitur at purus eu, scelerisque faucibus ligula. Sed elit ante, vestibulum ut nisl ultrices, gravida iaculis augue.
                                </p>
                            </div>
                            <div className="trackOrderButtonContainer">
                                <button type = "button" className="trackOrderButton">TRACK ORDER</button>
                            </div>
                            <div className="paymentBackButtonContainer">
                                <button type = "button" className="backButton">BACK TO HOME PAGE</button>
                            </div>  
                        </div>      
                    </div>
                </div> 

                <div className="rightConfirmationPage">
                    <h3>SUMMARY <hr className="Hr"/></h3>
                    
                    <div className="shippingSummaryCartItemDiv">
                        {cartSummaryItems}
                        <hr className="Hr"/>  
                    </div>
                    <div className="shippingSummarySubTotalDiv">
                        {cartSummaryTotals}
                    </div>
    
                    <hr className="Hr"/>  
    
                    <div className="shipmentMethodContainer">
                        <div className="shipMethodTitleContainer">
                            <h3 className="shipMethodTitle">SHIPPING</h3>
                            <a href="" className = "viewShipDetailsLink">View Shipping Details</a>                       
                       </div>
                        <div className="shipMethodDetailsContainer">
                            <p><strong>{shipmentText1}</strong></p>
                            <p>{shipmentText2}</p>
                        </div>
                    </div>

                    <hr className="Hr"/>  

                   <div className="paymentMethodContainer">
                        <div className="paymentMethodTitleContainer">
                            <h3 className="paymentMethodTitle">PAYMENT</h3>
                            <div className="payMethodDetailsContainer">
                                <div className="payMethodImageContainer">
                                    <img src={paymentMethod.cardImage} alt="" />
                                </div>
                                <p>{paymentMethod.cardType} ending in {lastFourPayMethod}</p>
                                <p>Total payment: ${totalPayment}</p>
                            </div>
                        </div>

                   </div>

                </div>

            </div>
        )
    }
    }

export default ConfirmationPage;