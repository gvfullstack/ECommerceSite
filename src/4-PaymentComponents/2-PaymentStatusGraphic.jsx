import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { faTruckFast } from '@fortawesome/free-solid-svg-icons'
import { faCreditCard } from '@fortawesome/free-solid-svg-icons'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import "../4-PaymentComponents/2.1-PaymentStatusGraphic.css"




class PaymentStatusGraphic extends React.Component{
    
    render(){
        const checkImg = <FontAwesomeIcon icon={faCheck}/>
        const truckImg = <FontAwesomeIcon icon={faTruckFast}/>
        const creditCardImg = <FontAwesomeIcon icon={faCreditCard}/>
        const checkOutImg = <FontAwesomeIcon icon={faCircleCheck}/>



        return (
            <div key = "12356as">
                <div className="pstatusGraphic">
                    <div className="pcircleBox">
                        <div className="pcirclesContainer">
                            <div className="pcirclesComplete">
                                <div className="pcartCircle" >
                                    {checkImg}
                                </div>
                                <div className="pdeliveryCircle"  >
                                    {truckImg}
                                </div>
                                <div className="ppaymentCircle">
                                    {creditCardImg}
                                </div>
                            </div>
                            <div className="pcirclesIncomplete">
                              
                                <div className="pconfirmationCircle">
                                    {checkOutImg}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="plabelBox">
                        <div className="plabelsContainer">
                            <div className="pcircleLabelsComplete">
                                <div className="pcartLabel">
                                    Cart
                                </div>
                                <div className="pdeliveryLabel">
                                    Delivery
                                </div>
                                <div className="ppaymentLabel">
                                    Payment
                                </div>
                            </div>
                            <div className="pcircleLabelsIncomplete">                     
                                <div className="pconfirmationLabel">
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

export default PaymentStatusGraphic