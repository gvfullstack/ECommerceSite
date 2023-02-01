import React from "react";
import ShippingStatusGraphic from "../ShippingComponents/ShippingStatusGraphic";
import ShippingInputFields from "../ShippingComponents/ShippingInputFields";
import ShippingInfoDropdown from "../ShippingComponents/ShippingInfoDropdown";
import "../ShippingComponents/ShippingPage.css"
import ShippingRadios from "../ShippingComponents/ShippingRadios";
import ShippingTelephoneFields from "../ShippingComponents/ShippingTelephoneFields";
import ShippingCartSummary from "./ShippingCartSummary";
import ShippingSummaryTotals from "./ShippingSummaryTotals";

class ShippingPage extends React.Component{
    constructor(props){ 
        super(props);
        this.state = {
            inputFieldsData: [
                {label: "Address Title", inputID: "aTitle", type: "name", masked:"text", value:"", error:"", showError:false, key:"SH1"}, 
                {label: "Name - Surname", inputID: "surname", type: "name", masked:"text", value:"", error:"", showError:false, key:"SH2"},
                {label: "Your Address", inputID: "address", type: "address", masked:"text", value:"", error:"", showError:false, key:"SH3"},
                {label: "Zip Code", inputID: "postCode", type:"zipCode",masked:"text", value:"", error:"", showError:false, key:"SH4"},
                ],
            
            dropDownFieldsData: [
                {key:'SH6', label: "Country", inputID: "country", value:"", selection:["Select", "USA", "Other"]},
                {key:'SH7', label: "City", inputID: "city", value:"", selection:["Select", "Los Angeles", "New York", "Other"]},
                {key:'SH8', label: "State", inputID: "state", value:"", selection:["Select", "CA", "NY", "Other"]}
            ],

            phoneFields:[
                {key:'SH9', label: "Cell Phone", inputID: "cellNumber", type:"phone", value : "", areaCode: "", countryCode:"0",  error:"", showError:false},
                {key:'SH10', label: "Telephone", inputID: "telNumber", type:"phone", value : "", areaCode: "", countryCode:"0", error:"", showError:false}
            ],
            shippingRadioOptions: [
                {key:"SH11", id:"standard", name:"shipping", value:"standard", text1:"STANDARD", text2:"Delivery in 4-6 Business Days - Free ($40 min.)"},
                {key:"SH12", id:"express", name:"shipping", value:"express", text1:"EXPRESS", text2:"Delivery in 1-3 Business Days - $5"}
            ]
            }
    }

    updatePhoneFieldsValueState = (value, index, fieldName) =>{
        this.setState({phoneFields: this.state.phoneFields.map((field)=>{
            if(index === field.key){
                return {...field, [fieldName]: value} 
            }
            else{return field}
        })}
        )

        console.log(this.state.phoneFields)
    }

    updatePhoneError = (key, textMessage, display) =>{
        this.setState({phoneFields: this.state.phoneFields.map((field)=>{
            if(key === field.key){
                return {...field, error: textMessage, showError: display} 
            }
            else{return field}
        })}
        )
    }

    updateShippingRadioValueState = (value, index)=>{
        this.setState({shippingRadioOptions: 
            this.state.shippingRadioOptions.map((field)=>{
                if(field.key === index){
                    return {...field, value: value}}
                else{return field}
            })})}

    updateDropdownValueState = (value, key) => {
        this.setState({dropDownFieldsData: this.state.dropDownFieldsData.map((field)=>{ 
            if(key === field.key){
                return {...field, value: value} 
            }
            else{return field}
        })})
    }

    updateInputFieldsValueState = (value, key) =>{
      
        this.setState({inputFieldsData: this.state.inputFieldsData.map((field, index)=>{
            if(key === field.key){
                return {...field, value: value} 
            }
            else{return field}
        })}
        )
        console.log(this.state.inputFieldsData)
    }

   

    updateError = (key, textMessage, display) =>{
        this.setState({inputFieldsData: this.state.inputFieldsData.map((field)=>{
            if(key === field.key){
                return {...field, error: textMessage, showError: display} 
            }
            else{return field}
        })}
        )
    }

 backToCart = () =>{
    this.props.backToCart()
}

    render(){
        let cartSummaryTotals = JSON.parse(localStorage.getItem("cartFields")).map((item)=>  
        
            <ShippingSummaryTotals 
                fieldLabel = {item.fieldLabel}
                fieldTotal = {item.fieldTotal}
                index = {item.key}
            />
                // <div className="subtotalShippingSummary">
                //     <p>{item.fieldLabel}:</p>
                //     <strong className = {"shipping"+ item.key}>${item.fieldTotal}</strong>
                // </div>
            
            )



        let cartSummaryItems = JSON.parse(localStorage.getItem("cartItems")).filter((item)=>
            {return item.cartItemQuantity > 0}).map((item)=>{
                return (

                    <ShippingCartSummary 
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
                /> 
        })
        
        let shippingRadios = this.state.shippingRadioOptions.map((field) =>{
            return <ShippingRadios 
                id = {field.id}
                name = {field.name}
                value = {field.value}
                text1 = {field.text1}
                text2 = {field.text2}
                key = {field.key}
                index = {field.key}
                onChange = {this.updateShippingRadioValueState}
                />
        })
        
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
                            </div>

                            <div>
                                <hr className="Hr"/>
                                <h3>SHIPPING METHOD </h3>
                                    <div className="shippingRadioSection">
                                        {shippingRadios}
                                    </div>
                            </div>

                            <div className="shippingLinkContainer">
                                <a className = "shipDetailLink" href="">View Shipping Details</a>
                            </div>
                                
                            <div className="backButtonContainer">
                                <button className="backButton" onClick= {this.backToCart}>BACK TO CART</button>
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
                        <button className="summaryShippingCheckOutButton">CHECK OUT</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default ShippingPage