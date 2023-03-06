import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { faTruckFast } from '@fortawesome/free-solid-svg-icons'
import { faCreditCard } from '@fortawesome/free-solid-svg-icons'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import "../3-ShippingComponents/ShippingStatusGraphic.css"




class ShippingStatusGraphic extends React.Component{
    
    render(){
        const checkImg = <FontAwesomeIcon icon={faCheck}/>
        const truckImg = <FontAwesomeIcon icon={faTruckFast}/>
        const creditCardImg = <FontAwesomeIcon icon={faCreditCard}/>
        const checkOutImg = <FontAwesomeIcon icon={faCircleCheck}/>



        return (
            <div key = "12356as">
                <div className="statusGraphic">
                    <div className="circleBox">
                        <div className="circlesContainer">
                            <div className="circlesComplete">
                                <div className="cartCircle" >
                                    {checkImg}
                                </div>
                                <div className="deliveryCircle"  >
                                    {truckImg}
                                </div>
                            </div>
                            <div className="circlesIncomplete">
                                <div className="paymentCircle">
                                    {creditCardImg}
                                </div>
                                <div className="confirmationCircle">
                                    {checkOutImg}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="labelBox">
                        <div className="labelsContainer">
                            <div className="circleLabelsComplete">
                                <div className="cartLabel">
                                    Cart
                                </div>
                                <div className="deliveryLabel">
                                    Delivery
                                </div>
                            </div>
                            <div className="circleLabelsIncomplete">
                                <div className="paymentLabel">
                                    Payment
                                </div>
                                <div className="confirmationLabel">
                                    Confirmation
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ShippingStatusGraphic