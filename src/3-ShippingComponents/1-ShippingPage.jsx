import React from "react";
import ShippingStatusGraphic from "../3-ShippingComponents/ShippingStatusGraphic";
import ShippingInputFields from "../3-ShippingComponents/ShippingInputFields";
import ShippingInfoDropdown from "../3-ShippingComponents/ShippingInfoDropdown";
import "../3-ShippingComponents/1.1-ShippingPage.css"
import ShippingRadios from "../3-ShippingComponents/ShippingRadios";
import ShippingTelephoneFields from "../3-ShippingComponents/ShippingTelephoneFields";
import ShippingCartSummary from "./ShippingCartSummary";
import ShippingSummaryTotals from "./ShippingSummaryTotals";


let myFunctions = require("./shippingFieldsValidations.js")

class ShippingPage extends React.Component{
    constructor(props){ 
        super(props);
        this.state = {
            inputFieldsData: [
                {label: "Address Title", inputID: "aTitle", type: "name", masked:"text", value: "", error:"", showError:false, key:"SH1"}, 
                {label: "Name - Surname", inputID: "surname", type: "name", masked:"text", value: "" , error:"", showError:false, key:"SH2"},
                {label: "Your Address", inputID: "address", type: "address", masked:"text", value: "", error:"", showError:false, key:"SH3"},
                {label: "Zip Code", inputID: "postCode", type:"zipCode",masked:"text", value: "", error:"", showError:false, key:"SH4"},
                ],
            
            dropDownFieldsData: [
                {key:'SH6', label: "Country", inputID: "country", value:"Select", selection:["Select", "USA", "Other"], error:"", showError:false},
                {key:'SH7', label: "City", inputID: "city", value:"Select", selection:["Select", "Los Angeles", "New York", "Other"], error:"", showError:false},
                {key:'SH8', label: "State", inputID: "state", value:"Select", selection:["Select", "CA", "NY", "Other"], error:"", showError:false}
            ],

            phoneFields:[
                {key:'SH9', label: "Cell Phone", inputID: "cellNumber", type:"phone", value : "", areaCode: "", countryCode:"0",  error:[""], showError:false},
                {key:'SH10', label: "Telephone", inputID: "telNumber", type:"phone", value : "", areaCode: "", countryCode:"0", error:[""], showError:false}
            ],

            selectedShippingOption: "standard",

            shippingRadioOptions: [
                {key:"SH11", value:"standard", text1:"STANDARD", text2:"Delivery in 4-6 Business Days - Free ($40 min.)"},
                {key:"SH12", value:"express", text1:"EXPRESS", text2:"Delivery in 1-3 Business Days - $5"}
            ],
            checkOutButtonStatusDisabled: true, 
            displayFinalError: false,    
            }
    }

    handleInputValidations = (errorID, value, key)=>{
        let textMessage =""
        if(!value) {textMessage = "This field is required"; 
        }else{
            switch(errorID){
                case "nameError":
                    textMessage = myFunctions.nameValidation(value)

                    break;
                case "addressError": 
                    textMessage = myFunctions.addressValidation(value) 

                    break;
                case "zipCodeError":
                    textMessage = myFunctions.zipValidator(value)

                    break;
                default:
                    break;
            }
        }

        let display = myFunctions.displayValidation(textMessage)

        this.updateError(key, textMessage, display)
        this.checkEnableCheckOutButton()

    }

    checkEnableCheckOutButton = () =>{
        
        let inputFieldsBool = this.state.inputFieldsData.map((field)=> field.value.length > 0 && !field.showError ? true: false)
        //result is an array of booleans i.e. [true, true, true, true] or [true, true, true, false]
        let dropDownFieldsBool = this.state.dropDownFieldsData.map((field)=> {
        return field.value !== "Select"  && !field.showError ? true: false})
        //result is an array of booleans i.e. [true, true, true, true] or [true, true, true, false]
        let phoneFieldsBool = this.state.phoneFields.map((field)=> {
            return field.value.length > 0 && field.areaCode.length > 0 
            && field.countryCode.length > 0 && !field.showError ? true: false})

        let allFieldsBool = [...inputFieldsBool, ...dropDownFieldsBool, ...phoneFieldsBool]
        
        if(allFieldsBool.every((item)=> item === true)){
            this.setState(prevState => ({...prevState, checkOutButtonStatusDisabled: false, displayFinalError: false}))
        }else{this.setState(prevState => ({...prevState, checkOutButtonStatusDisabled: true}))}    
    }

    handlePhoneValidations = (value, phone, index, countryCode, areaCode)=>{
        let textMessage = []
        let display = ""

        if(!value) {textMessage = ["All three fields required"]; 
                display = true}
        else{        
            const phoneProperties = [{value: countryCode, regEx: /^\d{1}$/, error: "Country code must be 1 digits"}, 
                                    {value: areaCode, regEx: /^\d{3}?$/, error: "Area code must be 3 digits"},
                                    {value: phone, regEx: /^\d{3}-\d{4}?$/, error: "Phone number must be 7 digits in format: xxx-xxxx"}
                                    ]

            let validationResults = phoneProperties.map((property)=>
                property.value.match(property.regEx) ? "" : property.error)
            
            validationResults.forEach((errorMessage)=> 
                errorMessage.length > 0 ? textMessage.push(errorMessage): null)
            
            display = textMessage.length > 0 ? true : false
            }

        this.updatePhoneError(index, textMessage, display)
        this.checkEnableCheckOutButton()

    }

    updatePhoneFieldsValueState = (value, index, fieldName) =>{
        this.resetLocalStorage("phoneFields")
        this.setState(prevState => ({phoneFields: prevState.phoneFields.map((field)=>
            index === field.key ? {...field, [fieldName]: value} : field
        )})
        )
    }

    updatePhoneError = (key, textMessage, display) =>{
        this.setState(prevState => ({...prevState, phoneFields: prevState.phoneFields.map((field)=>
            key === field.key ? {...field, error: textMessage, showError: display} : field
        )})
        )
    }

    

    updateShippingRadioValueState = (value)=>{
        this.resetLocalStorage("selectedShippingOption")
        this.setState({selectedShippingOption: value})
    }

    updateDropdownValueState = (value, key) => {
        this.resetLocalStorage("dropDownFieldsData")
        this.setState(prevState => ({dropDownFieldsData: prevState.dropDownFieldsData.map((field)=> 
            key === field.key ? {...field, value: value} : field
        )}))
    }

    updateInputFieldsValueState = (value, key) =>{
        this.resetLocalStorage("inputFieldsData")
        this.setState(prevState => ({inputFieldsData: prevState.inputFieldsData.map((field)=>
            key === field.key ? {...field, value: value} : field
        )})
        )
    }

    resetLocalStorage(key) {
        localStorage.removeItem(key);
        }

    updateError = (key, textMessage, display) =>{
        this.setState(prevState => ({...prevState, inputFieldsData: prevState.inputFieldsData.map(
            (field)=>          
            key === field.key ? {...field, error: textMessage, showError: display} : field
       )})
        )
    }

    backToCart = (e) =>{
        this.saveToLocalStorage("inputFieldsData", this.state.inputFieldsData)
        this.saveToLocalStorage("phoneFields", this.state.phoneFields)  
        this.saveToLocalStorage("selectedShippingOption", this.state.selectedShippingOption)
        this.saveToLocalStorage("dropDownFieldsData", this.state.dropDownFieldsData) 
        this.saveToLocalStorage("shippingRadioOptions", this.state.shippingRadioOptions) 
        this.saveToLocalStorage("checkOutButtonStatusDisabled", this.state.checkOutButtonStatusDisabled) 

        this.props.updatePageDisplayed("cart")
    }

    openPaymentPage = (e) => {  
        e.preventDefault()

        this.state.inputFieldsData.forEach((field)=>{
            const errorID = field.type + "Error"
            const value = field.value ? field.value : ""
            this.handleInputValidations(errorID, value, field.key)
            })

        this.state.phoneFields.forEach((field)=>{
            this.handlePhoneValidations(field.value, field.value, field.key, field.countryCode, field.areaCode)
            this.handlePhoneValidations(field.countryCode, field.value, field.key, field.countryCode, field.areaCode)
            this.handlePhoneValidations(field.areaCode, field.value, field.key, field.countryCode, field.areaCode)
        })

        this.state.dropDownFieldsData.forEach((field)=>{
            this.handleDropDownValidation(field.value, field.key) })

        setTimeout(() => {
            let allDataFields = [...this.state.inputFieldsData, ...this.state.phoneFields, ...this.state.dropDownFieldsData]
            let errorCount = 0;
            console.log(errorCount)
            allDataFields.forEach((field)=>{
               return field.showError === true ? errorCount++ : errorCount
}                )
            if(errorCount > 0){
                this.setState(prevState => ({...prevState, displayFinalError: true}))
            }
            else{
                this.setState({displayFinalError: false})
                
                this.saveToLocalStorage("inputFieldsData", this.state.inputFieldsData)
                this.saveToLocalStorage("phoneFields", this.state.phoneFields)  
                this.saveToLocalStorage("selectedShippingOption", this.state.selectedShippingOption)
                this.saveToLocalStorage("dropDownFieldsData", this.state.dropDownFieldsData) 
                this.saveToLocalStorage("shippingRadioOptions", this.state.shippingRadioOptions) 
                this.saveToLocalStorage("checkOutButtonStatusDisabled", this.state.checkOutButtonStatusDisabled) 
                this.props.updatePageDisplayed("paymentPage")
            }
            }, 0)
        
    }

    saveToLocalStorage(key, value){
        localStorage.setItem(key, JSON.stringify(value))
    }

    handleDropDownValidation = (value, index) => {
        this.setState(prevState => ({
          dropDownFieldsData: prevState.dropDownFieldsData.map(field => {
            let errorMessage = value === "Select" ? "Please select a " + field.label : "";
            let showError = value === "Select" ? true : false;
            if (index === field.key) {
              return { ...field, error: errorMessage, showError: showError };
            } else {
              return field;
            }
          }),
        }));
        this.checkEnableCheckOutButton()
      };

    componentDidMount() {

        let inputFieldsData = JSON.parse(localStorage.getItem("inputFieldsData")) ? 
            JSON.parse(localStorage.getItem("inputFieldsData")) : this.state.inputFieldsData      

        let dropDownFieldsData = JSON.parse(localStorage.getItem("dropDownFieldsData")) ? 
            JSON.parse(localStorage.getItem("dropDownFieldsData")) : this.state.dropDownFieldsData  

        let phoneFields = JSON.parse(localStorage.getItem("phoneFields")) ? 
            JSON.parse(localStorage.getItem("phoneFields")) : this.state.phoneFields  
        
        let selectedShippingOption = JSON.parse(localStorage.getItem("selectedShippingOption")) ? 
            JSON.parse(localStorage.getItem("selectedShippingOption")) : this.state.selectedShippingOption

        let checkOutButtonStatusDisabled = JSON.parse(localStorage.getItem("checkOutButtonStatusDisabled")) ? 
            JSON.parse(localStorage.getItem("checkOutButtonStatusDisabled")) : this.state.checkOutButtonStatusDisabled 

        this.setState(prevState => ({...prevState,
                inputFieldsData: inputFieldsData, 
                dropDownFieldsData: dropDownFieldsData, 
                phoneFields: phoneFields, 
                selectedShippingOption: selectedShippingOption,
                checkOutButtonStatusDisabled: checkOutButtonStatusDisabled}))
           
    }   

    render(){
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

        let inputFields = this.state.inputFieldsData.map((field) => 
             {return <ShippingInputFields 
                    key = {field.key} 
                    index = {field.key}
                    label = {field.label} 
                    id={field.inputID}
                    inputtype={field.type}
                    onChange = {this.updateInputFieldsValueState}
                    value = {field.value}
                    ref = {this.inputRef}
                    error = {field.error}
                    showError = {field.showError}
                    updateError = {this.updateError}
                    handleValidations = {this.handleInputValidations}
                
                />})

        let phoneFields = this.state.phoneFields.map((field) => 
            {return <ShippingTelephoneFields 
                    key = {field.key} 
                    index = {field.key}
                    label = {field.label} 
                    id={field.inputID}
                    inputtype={field.type}
                    onChange = {this.updatePhoneFieldsValueState}
                    value = {field.value}
                    error = {field.error}
                    showError = {field.showError}
                    updateError = {this.updatePhoneError} 
                    areaCode = {field.areaCode}
                    countryCode = {field.countryCode}
                    phone = {field.value}
                    handlePhoneValidations = {this.handlePhoneValidations}
                />})

        let dropDownFields = this.state.dropDownFieldsData.map((field) =>{
            return <ShippingInfoDropdown 
                label = {field.label} 
                id={field.inputID} 
                index = {field.key}
                key = {field.key} 
                onChange = {this.updateDropdownValueState}
                value = {field.value}
                error = {field.error}
                showError = {field.showError}
                updateError = {this.updateError}
                selection = {field.selection}
                handleDropDownValidation = {this.handleDropDownValidation}
                /> 
        })
        
        let shippingRadios = this.state.shippingRadioOptions.map((field) =>{
            return <ShippingRadios 
                value = {field.value}
                text1 = {field.text1}
                text2 = {field.text2}
                key = {field.key}
                index = {field.key}
                onChange = {this.updateShippingRadioValueState}
                selectedShippingOption = {this.state.selectedShippingOption}
                />
        })
        
        let checkoutButtonClass = this.state.checkOutButtonStatusDisabled ? "summaryShippingCheckOutButtonDisabled" : "summaryShippingCheckOutButtonEnabled" 

        return (
            <div className="shippingPageContainer">

                <div className = "leftShippingPage">
                    <ShippingStatusGraphic />
                    <div className="shippingInformation">
                        <h3>SHIPPING INFORMATION <hr className="Hr"/></h3>
                            <div className="inputShippingContainer">
                                {inputFields}
                            </div>

                            <div className="dropdownContainer">
                                {dropDownFields}
                            </div>

                            <div className="phoneContainer">
                                {phoneFields}
                                <hr className="Hr"/>
                            </div>

                            <h3 className="shipMethodTitle">SHIPPING METHOD </h3>
                            <div className = "shippingMethodSection">
                                <div className="shippingMethodSectionRight">
                                    <div className="shippingRadioSection">
                                        {shippingRadios}
                                    </div>
                                </div>
                                
                                <div className="shippingMethodSectionLeft">
                                    <div className="shippingLinkContainer">
                                        <p className = "shipDetailLink">View Shipping Details</p>
                                    </div>
                                </div>
                            </div>
                                    
                                <div className="backButtonContainer">
                                    <button type = "button" className="backButton" onClick= {this.backToCart}>BACK TO CART</button>
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
                    <div className="summaryShippingCheckOutButtonDiv">
                    {this.state.displayFinalError && (<p className="allErrorsCheck">Please fill in all fields and correct all errors before moving on. </p>)}
                        <button 
                            disabled = {this.state.checkOutButtonStatusDisabled}
                            className= {checkoutButtonClass}
                            onClick = {this.openPaymentPage}>
                                CHECK OUT
                        </button>
                    </div>
                </div>

            </div>
        )
    }
}

export default ShippingPage