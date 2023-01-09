import React from "react";

class ToggleButton extends React.Component{
    constructor(props){
        super(props);

        this.updateSelection = this.updateSelection.bind(this)
    }

    updateSelection(e){
        e.preventDefault()
        this.props.stateUpdater(e.target.value)
        console.log(this.props.label)
    }

    render(){
        return(
            <div>
                <label htmlFor="signIn">
                    <input 
                        type = "radio" 
                        id = "signIn" 
                        value = "signIn" 
                        checked = {this.props.selected === "signIn" }
                        onChange = {this.updateSelection} 
                        />
                    SIGN IN 
                </label>
                <label htmlFor = "create">
                    <input 
                        type = "radio" 
                        id = "create" 
                        value = "create" 
                        checked = {this.props.selected==="create" }
                        onChange = {this.updateSelection}/>
                    CREATE ACCOUNT
                </label>
            </div>
        )
    }

}

export default ToggleButton

