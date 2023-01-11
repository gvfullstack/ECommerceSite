import React from "react";

class ToggleButton extends React.Component{
    constructor(props){
        super(props);

        this.updateSelection = this.updateSelection.bind(this)  // why do we need to bind the function here but not in LoginInputFields.jsx 
    }

    updateSelection(e){
        // e.preventDefault() why is prevent default not needed here. 
        this.props.stateUpdater(e.target.value)
    }


    render(){
        return(
            <div>
                <label htmlFor="signIn">
                    <input 
                        type = "radio" 
                        id = "signIn" 
                        value = "signIn" 
                        checked = {this.props.toggleButton === "signIn" }
                        onChange = {this.updateSelection} 
                        />
                    SIGN IN 
                </label>
                <label htmlFor = "create">
                    <input 
                        type = "radio" 
                        id = "create" 
                        value = "create" 
                        checked = {this.props.toggleButton==="create" }
                        onChange = {this.updateSelection}/>
                    CREATE ACCOUNT
                </label>
            </div>
        )
    }

}

export default ToggleButton

