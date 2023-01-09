import React from "react";

const Styles = {
    divStyle:{
        display: "flex", 
        flexDirection:"column",
        width: "50%"
    },
    inputLabel:{
        lineHeight: "2rem"
    },
    inputBox:{
        
    }
    
}

class LoginInputFields extends React.Component{

    onChange =(e)=> {
        e.preventDefault();
        let inputID = e.target.id
        let inputValue = e.target.value
        this.props.onChange(inputID, inputValue)
    }

    render(){
        return(
            <div style= {Styles.divStyle}>
                <label style={Styles.inputLabel} htmlFor={this.props.id}>{this.props.label}</label>
                <input onChange={this.onChange} styles={Styles.inputBox} type="text" id = {this.props.id}/>
            </div>
        )
    }

}

export default LoginInputFields