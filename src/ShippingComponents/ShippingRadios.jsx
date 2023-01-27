import React from "react";
import "../ShippingComponents/ShippingPage.css"


 class ShippingRadios extends React.Component{
     
     updateValue = (event) =>{
         this.props.onChange(event.target.value, this.props.index)
     }
     render(){
         return(
             <div className="shippingRadioContainer">
                <label htmlFor={this.props.id} className = "radioBox">             
                    <input type="radio" 
                    id={this.props.id} 
                    name={this.props.name} 
                    value={this.props.value} 
                    onChange={this.updateValue}
                    className = {this.props.name + "Radio"}
                    />

                   <p className = {this.props.name + "Text"}>
                        <strong className = {this.props.name + "TextBold"}>
                            {this.props.text1}</strong> {this.props.text2}
                    </p>                                
                </label>
             </div>
         )
     }
 }

 export default ShippingRadios;