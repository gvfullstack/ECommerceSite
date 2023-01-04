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
    constructor(props){
        super(props);

    }


    render(){
        return(
            <div style= {Styles.divStyle}>
                <label style={Styles.inputLabel} htmlFor={this.props.id}>{this.props.label}</label>
                <input styles={Styles.inputBox} type="text" id = {this.props.id}/>
            </div>
        )
    }

}

export default LoginInputFields