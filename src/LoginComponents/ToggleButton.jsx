import React from "react";
import "../LoginComponents/loginFields.css"


class ToggleButton extends React.Component{
    constructor(props){
        super(props);

        this.updateSelection = this.updateSelection.bind(this)  
    }

    updateSelection(e){
        this.props.stateUpdater(e.target.value)
    }


    render(){
        return(
            <div className = "toggleButtons">
                <label htmlFor="signIn" className = "toggleButton">
                    <input 
                        type = "radio" 
                        id = "signIn" 
                        value = "signIn" 
                        checked = {this.props.toggleButton === "signIn" }
                        onChange = {this.updateSelection} 
                        />
                   <span>SIGN IN</span> 
                </label>
                <label htmlFor = "create"  className = "toggleButton">
                    <input 
                        type = "radio" 
                        id = "create" 
                        value = "create" 
                        checked = {this.props.toggleButton==="create" }
                        onChange = {this.updateSelection}/>
                    <span>CREATE ACCOUNT</span>
                    
                </label>
            </div>
        )
    }

}

export default ToggleButton

