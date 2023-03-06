import React from "react";
import LoginPage from "./1-LoginComponents/1-LoginPage";
import CartPage from "./2-CartComponents/1-CartPage";
import ShippingPage from "./3-ShippingComponents/1-ShippingPage";
import PaymentPage from "./4-PaymentComponents/1-PaymentPage";
import ConfirmationPage from "./5-ConfirmationComponents/1-ConfirmationPage";

class App extends React.Component{ 
    constructor(props){
        super(props)
        this.state = {
            pageDisplay: "signIn",
            loggedInUser: []
        }
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
                        updatePageDisplayed = {this.updatePageDisplayed}></LoginPage>
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
                    <PaymentPage 
                        updatePageDisplayed={this.updatePageDisplayed}/>

                </div>} 
            {(this.state.pageDisplay === "confirmationPage") &&  
                <div>
                    <ConfirmationPage 
                        updatePageDisplayed={this.updatePageDisplayed}/>

                </div>}                   
            
            </div>
        )
}
}
export default App


