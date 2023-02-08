import React from "react";
import "../ShippingComponents/ShippingPage.css"


 class ShippingRadios extends React.Component{
     
     updateValue = (event) =>{
        this.props.onChange(event.target.value, event.target.index)
     }
     render(){
         return(
             <div className="shippingRadioContainer" key = {this.props.index}>
                <label htmlFor={this.props.id} className = "radioBox">             
                    <input 
                        type="radio" 
                        id={this.props.index} 
                        checked ={this.props.selectedShippingOption === this.props.value} 
                        value={this.props.value} 
                        onChange={this.updateValue}
                        className = {this.props.value + "Radio"}
                    />

                   <p className = {this.props.value + "Text"}>
                        <strong className = {this.props.value + "TextBold"}>
                            {this.props.text1}</strong> {this.props.text2}
                    </p>                                
                </label>
             </div>
         )
     }
 }

 export default ShippingRadios;