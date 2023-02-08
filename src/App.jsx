import React from "react";
import LoginPage from "./LoginComponents/LoginPage";
import CartPage from "./CartComponents/CartPage";
import ShippingPage from "./ShippingComponents/ShippingPage";


class App extends React.Component{ 
    constructor(props){
        super(props)
        this.state = {
            users: [], 
            pageDisplay: "cart",
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
                    <CartPage 
                        openShippingPage={this.updatePageDisplayed}/>
                </div>} 


            {(this.state.pageDisplay === "shipping") &&  
                <div>
                    <ShippingPage 
                        loggedInUser = {this.state.loggedInUser}
                        updatePageDisplayed={this.updatePageDisplayed}/>
                </div>}

            {(this.state.pageDisplay === "paymentPage") &&  
                <div>
                    HEWWO
                </div>}                   
            
            </div>
        )
}
}
export default App


