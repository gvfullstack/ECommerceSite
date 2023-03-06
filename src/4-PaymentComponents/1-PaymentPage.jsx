import React from "react";
import PaymentStatusGraphic from "./2-PaymentStatusGraphic";
import PaymentInputFields from "./3-PaymentInputFields";
import PaymentDropDownFields from "./4-PaymentDropDownInputFields";
import "./1.1-PaymentPage.css"
import ShippingSummaryTotals from "../3-ShippingComponents/ShippingSummaryTotals";
import ShippingCartSummary from "../3-ShippingComponents/ShippingCartSummary";


let myFunctions = require("./paymentFieldValidations.js")

class PaymentPage extends React.Component{
    constructor(props){
        super(props)
        this.state = { 
            paymentInputFields:[
                {key: "CH1", id:"cardHolderName", label: "Card Holder Name", value: "", error:"", showError: false, className: "TextInputField", secondClassName: "", maxLength: 40},
                {key: "CH2", id:"cardNumber", label: "Card Number", value: "", error:"", showError: false, className: "TextInputField", secondClassName: "CardNumber", maxLength: 24, cardType:"", cardImage:""},
                {key: "CH3", id:"CVV", label: "CVV", value: "", error:"", showError: false, className: "TextInputField", secondClassName: "CVV", maxLength: 4}
            ], 
            paymentDropDownFields: [
                {key: "CH4", id:"Year", label: "", value: "Year", selection:
                    ["Year", "2023", "2024", "2025"], 
                    error:"", showError: false, className: "DropDownField", secondClassName: "Year"},
                {key: "CH5", id: "Month", label: "Exp. Date", value: "", selection:
                    ["Month","January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                    error:"", showError: false, className: "DropDownField", secondClassName: "Month"}
                ],
            payButtonDisabled: true,
    }}

    setCardType = (cardNumber, key) => {
        let cardType = "";
        let cardImage = "";
        let visaCardImage = "data:image/png;base64,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";
        let masterCardImage = "data:image/png;base64,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";
        let amexCardImage = "data:image/png;base64,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"
        
        cardNumber = cardNumber.replace(/\D/g, "");
    
        if (/^4[0-9]{12}(?:[0-9]{3})?$/.test(cardNumber)) {
            cardType = "Visa";
            cardImage = visaCardImage
          } else if (/^5[1-5][0-9]{14}$/.test(cardNumber)) {
            cardType = "MasterCard";
            cardImage = masterCardImage
          } else if (/^3[47][0-9]{13}$/.test(cardNumber)) {
            cardType = "AMEX";
            cardImage = amexCardImage
          } else {
            cardType = "";
            cardImage = ""
          }

          this.setState(prevState => ({...prevState, paymentInputFields: prevState.paymentInputFields.map((field) => 
            key === field.key ? {...field, cardType: cardType, cardImage: cardImage} : field)}))
   }


    checkAllFieldsCompleted = () => {
        let allFields = [...this.state.paymentInputFields, ...this.state.paymentDropDownFields]

        let allFieldsCompleted = allFields.every((field) => 
            field.value !== "" 
            && field.value !== "Month" 
            && field.value !== "Year"
            && field.showError === false
            )
        
            console.log("allFieldsCompleted", allFieldsCompleted)
        this.setState(prevState => ({...prevState, payButtonDisabled: !allFieldsCompleted}))

    }

    handleInputValidations = (value, key, errorID)=>{
        let textMessage =""
        if(!value) {
            textMessage = "This field is required"
            this.setCardType(value, key)
            ; 
        }else{
            switch(errorID){
                case "cardHolderNameError":
                    textMessage = myFunctions.cardHolderNameValidation(value)  
                    break;
                case "cardNumberError":
                    this.setCardType(value, key)
                    textMessage = myFunctions.cardNumberValidation(value)
                    break;
                case "CVVError":
                    textMessage = myFunctions.CVVValidation(value)
                    break;
                case "YearError":
                    textMessage = myFunctions.YearValidation(value)
                    break;
                case "MonthError":
                    textMessage = myFunctions.MonthValidation(value)
                    break;
                default:
                    break;   
            }            
        }

        let display = myFunctions.displayValidation(textMessage) 

        this.updateError(key, textMessage, display) 
        this.checkAllFieldsCompleted()      
    }

    updateError = (key, textMessage, display) =>{
        if(key === "CH4" || key === "CH5"){
            this.setState(prevState => ({...prevState, paymentDropDownFields: prevState.paymentDropDownFields.map(
                (field)=>    {      
                return key === field.key ? {...field, error: textMessage, showError: display} : field}            
            )})
        )}

        else{
            this.setState(prevState => ({...prevState, paymentInputFields: prevState.paymentInputFields.map(
                (field)=>    {      
                return key === field.key ? {...field, error: textMessage, showError: display} : field}
            
            )})
            )}
    }

    formatCardNumber = (cardNumber) =>{
        const digitsOnly = cardNumber.replace(/\D/g, "");

        const regexPattern = /(\d{1,4})(\d{1,4})?(\d{1,4})?(\d{1,4})?(\d{1,4})?/

        const formattedNumber = digitsOnly.replace(regexPattern, function (match, group1, group2, group3, group4, group5) {
            return [group1, group2, group3, group4, group5].filter(Boolean).join(" ");
          });
          return formattedNumber
        }
    
    
    handleInputClick = (key, value) => {
        if(key === "CH2"){
            value = this.formatCardNumber(value)
        }
            this.setState(
                (prevState) => ({...prevState, paymentInputFields: prevState.paymentInputFields.map((field) => 
                    field.key === key ? {...field, value: value}: field
                    )})
            )
    }

    handleDropdownClick = (key, value) => {
        this.setState(
            (prevState) => ({...prevState, paymentDropDownFields: prevState.paymentDropDownFields.map((field) => 
                field.key === key ? {...field, value: value}: field
                )})
            )}
    
    saveToLocalStorage = (key, value) => {
        localStorage.setItem(key, JSON.stringify(value))
    }
   
    backToCart = (e) =>{
        this.saveToLocalStorage("paymentInputFields", this.state.paymentInputFields)
        this.saveToLocalStorage("paymentDropDownFields", this.state.paymentDropDownFields)   
        this.props.updatePageDisplayed("shipping")
    }

    openConfirmationScreen = () =>{
        this.saveToLocalStorage("paymentInputFields", this.state.paymentInputFields)
        this.saveToLocalStorage("paymentDropDownFields", this.state.paymentDropDownFields) 
        this.saveToLocalStorage("payButtonDisabled", this.state.payButtonDisabled) 

        this.props.updatePageDisplayed("confirmationPage")

    }

    componentDidMount() {    
        
        let paymentInputFields = JSON.parse(localStorage.getItem("paymentInputFields")) ? 
            JSON.parse(localStorage.getItem("paymentInputFields")) : this.state.paymentInputFields      

        let paymentDropDownFields = JSON.parse(localStorage.getItem("paymentDropDownFields")) ? 
            JSON.parse(localStorage.getItem("paymentDropDownFields")) : this.state.paymentDropDownFields  

        let payButtonDisabled = JSON.parse(localStorage.getItem("payButtonDisabled")) ? 
            JSON.parse(localStorage.getItem("payButtonDisabled")) : this.state.payButtonDisabled  
        

        this.setState(prevState => ({...prevState,
                paymentInputFields: paymentInputFields, 
                paymentDropDownFields: paymentDropDownFields, 
                payButtonDisabled: payButtonDisabled 
               }))
           
    }   

    render(){

        const paymentInputFields = this.state.paymentInputFields.map((field) => {
            return(
                <PaymentInputFields 
                    key = {field.key}
                    index = {field.key}
                    id = {field.id}
                    label = {field.label}
                    value = {field.value}
                    error = {field.error}
                    showerror = {field.showError}
                    className = {field.className}
                    onChange = {this.handleInputClick}
                    secondClassName = {field.secondClassName}
                    handleInputValidations = {this.handleInputValidations}
                    maxLength = {field.maxLength}
                    cardImage = {field.cardImage}
                />)
        })

        const paymentDropDownFields = this.state.paymentDropDownFields.map((field) => {
            return(
                <PaymentDropDownFields 
                    key = {field.key}
                    index = {field.key}
                    id = {field.id}
                    label = {field.label}
                    value = {field.value}
                    selection = {field.selection}
                    error = {field.error}
                    showerror = {field.showError}
                    className = {field.className}
                    onChange = {this.handleDropdownClick}
                    secondClassName = {field.secondClassName}
                    handleInputValidations = {this.handleInputValidations}
                />)
        })

        const allFields = [paymentInputFields[0], paymentInputFields[1], <div key = "13254s" className="paymentDD"> {paymentDropDownFields[1]} {paymentDropDownFields[0]}</div>, paymentInputFields[2]]

        const totalDue = JSON.parse(localStorage.getItem("cartFields")).filter((item) => item.key === "CP7")[0].fieldTotal
        
        let cartSummaryTotals = JSON.parse(localStorage.getItem("cartFields")).map((item)=>  
        
            <ShippingSummaryTotals 
                fieldLabel = {item.fieldLabel}
                fieldTotal = {item.fieldTotal}
                index = {item.key}
            />
                
            )

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
            
        let firstName = JSON.parse(localStorage.getItem("inputFieldsData")).filter((item) => item.key === "SH1")[0].value
        let surname = JSON.parse(localStorage.getItem("inputFieldsData")).filter((item) => item.key === "SH2")[0].value
        let address = JSON.parse(localStorage.getItem("inputFieldsData")).filter((item) => item.key === "SH3")[0].value
        let zipCode = JSON.parse(localStorage.getItem("inputFieldsData")).filter((item) => item.key === "SH4")[0].value
        let country = JSON.parse(localStorage.getItem("dropDownFieldsData")).filter((item) => item.key === "SH6")[0].value
        let city = JSON.parse(localStorage.getItem("dropDownFieldsData")).filter((item) => item.key === "SH7")[0].value
        let state = JSON.parse(localStorage.getItem("dropDownFieldsData")).filter((item) => item.key === "SH8")[0].value
        let shipmentMethod = JSON.parse(localStorage.getItem("selectedShippingOption"))
        let shipmentText1 = JSON.parse(localStorage.getItem("shippingRadioOptions")).filter((item) => item.value === shipmentMethod)[0].text1
        let shipmentText2 = JSON.parse(localStorage.getItem("shippingRadioOptions")).filter((item) => item.value === shipmentMethod)[0].text2
        
        let rightPayButtonClass = "payButton right " + this.state.payButtonDisabled
        let leftPayButtonClass = "payButton left " + this.state.payButtonDisabled

        return(
            <div className="paymentPageContainer">

                <div className = "leftPaymentPage">
                    <PaymentStatusGraphic />
                    <div className="paymentInformation">
                        <h3>PAYMENT INFORMATION <hr className="Hr"/></h3>
                            {allFields}

                    <div className="paymentButtonContainer">
                        <button 
                            type = "button" 
                            className= {leftPayButtonClass} 
                            onClick = {this.openConfirmationScreen}
                            >                        
                            {"PAY $" + totalDue}                            
                        </button>
                    </div>
                    
                    <div className="paymentBackButtonContainer">
                        <button type = "button" className="backButton" onClick= {this.backToCart}>BACK TO SHIPPING</button>
                    </div>  
                            
                    </div>
                </div> 

                <div className="rightShippingPage">
                    <h3>SUMMARY <hr className="Hr"/></h3>
                    <div className="itemsInBagContainer">
                        <strong>{JSON.parse(localStorage.getItem('cartCount'))} items</strong> in your bag.  
                        <hr className="Hr"/>  
                    </div>
                    <div className="shippingSummaryCartItemDiv">
                        {cartSummaryItems}
                        <hr className="Hr"/>  
                    </div>
                    <div className="shippingSummarySubTotalDiv">
                        {cartSummaryTotals}
                    </div>
                    <div className="shipmentAddressContainer">
                        <h3 className="shipAddressTitle">SHIPMENT ADDRESS</h3>
                        <p>{firstName} {surname}</p>
                        <p>{address}</p>
                        <p>{city}, {state} {zipCode} {country}</p>
                    </div>
                    <div className="shipmentMethodContainer">
                        <h3 className="shipMethodTitle">SHIPMENT METHOD</h3>
                        <p><strong>{shipmentText1}</strong></p>
                        <p>{shipmentText2}</p>
                    </div>
                    <div className="paymentButtonContainerRight">
                        <button 
                            type = "button" 
                            className= {rightPayButtonClass} 
                            disabled = {this.state.payButtonDisabled}
                            onClick = {this.openConfirmationScreen}
                            >                        
                            {"PAY $" + totalDue}                            
                        </button>
                    </div>

                </div>

            </div>
        )

    }
}

export default PaymentPage