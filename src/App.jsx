import React from "react";
import LoginPage from "./LoginPage";
import CartPage from "./CartPage";


class App extends React.Component{ 
    constructor(props){
        super(props)
        this.state = {
            users: [], 
            pageDisplay: "signIn",
            loggedInUser: []
        }
    }

    handleNewUserAdd = (newUser) => {
        this.setState({users: [...this.state.users, newUser]})
        console.log(this.state.users)
    }
    
    updatePageDisplayed = (val)=>{
        this.setState({pageDisplay: val})
    }

    setLoggedInUser = (email) =>{
        this.setState({...this.state, pageDisplay: "cart", loggedInUser: 
            this.state.users.map((user)=>{
                if(user.email === email){
                    this.setState({loggedInUser: user})
                }})})}


    render(){
        return (
            <div>
                {(this.state.pageDisplay === "signIn" || this.state.pageDisplay === "create") && 
                    <div>
                        <LoginPage 
                            users = {this.state.users} 
                            userAdd = {this.handleNewUserAdd} 
                            pageDisplay = {this.state.pageDisplay} 
                            updatePageDisplayed = {this.updatePageDisplayed}
                            setLoggedInUser = {this.setLoggedInUser}/> 
                    </div>
                }

                {(this.state.pageDisplay === "cart") &&  
                <div>
                    <CartPage/>
                </div>}
            
            </div>
        )
}
}
export default App



// [
//     {label: "Your E-Mail Address*", inputID: "email", value:""}, 
//     {label: "Create Password*", inputID: "password", value:""},
//     {label: "Confirm Password*", inputID: "passwordConfirm", value:""},
//     {label: "First Name*", inputID: "fName", value:""},
//     {label: "Surename*", inputID: "surename", value:""},
//     {label: "Postal Code*", inputID: "postCode", value:""},
//     {label: "Sign In E-Mail*", inputID: "signInEmail", value:""},
//     {label: "Sign In Password*", inputID: "signInPassword", value:""}
// ]