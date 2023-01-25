import React from "react";
import LoginPage from "./LoginPage";
import CartPage from "./CartPage";
import ShippingPage from "./ShippingPage";


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
    
    openShippingPage = () =>{
        this.setState({pageDisplay: "shipping"})
        console.log(this.state.pageDisplay)
    }


    render(){
        return (
            <div>
                 {/* {(this.state.pageDisplay === "signIn" || this.state.pageDisplay === "create") && 
                    <div>
                        <LoginPage 
                            users = {this.state.users} 
                            userAdd = {this.handleNewUserAdd} 
                            pageDisplay = {this.state.pageDisplay} 
                            updatePageDisplayed = {this.updatePageDisplayed}
                            setLoggedInUser = {this.setLoggedInUser}/> 
                    </div>
                } */}
{/* 
                {(this.state.pageDisplay === "cart") &&  
                    <div>
                        <CartPage openShippingPage={this.openShippingPage}/>
                    </div>} 


                {(this.state.pageDisplay === "shipping") &&  
                    <div>
                        <ShippingPage/>
                    </div>} */}
                    <ShippingPage/>

            
            </div>
        )
}
}
export default App


