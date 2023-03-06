
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { faTruckFast } from '@fortawesome/free-solid-svg-icons'
import { faCreditCard } from '@fortawesome/free-solid-svg-icons'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import "./2.1-ConfirmationStatusGraphic.css"


class ConfirmationStatusGraphic extends React.Component{
    
    render(){
        const checkImg = <FontAwesomeIcon icon={faCheck}/>
        const truckImg = <FontAwesomeIcon icon={faTruckFast}/>
        const creditCardImg = <FontAwesomeIcon icon={faCreditCard}/>
        const checkOutImg = <FontAwesomeIcon icon={faCircleCheck}/>



        return (
            <div key = "1235665as">
                <div className="cstatusGraphic">
                    <div className="ccircleBox">
                        <div className="ccirclesContainer">
                            <div className="ccirclesComplete">
                                <div className="ccartCircle" >
                                    {checkImg}
                                </div>
                                <div className="cdeliveryCircle"  >
                                    {truckImg}
                                </div>
                                <div className="cpaymentCircle">
                                    {creditCardImg}
                                </div>
                                <div className="cconfirmationCircle">
                                    {checkOutImg}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="clabelBox">
                        <div className="clabelsContainer">
                            <div className="ccircleLabelsComplete">
                                <div className="ccartLabel">
                                    Cart
                                </div>
                                <div className="cdeliveryLabel">
                                    Delivery
                                </div>
                                <div className="cpaymentLabel">
                                    Payment
                                </div>
                                <div className="cconfirmationLabel">
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

export default ConfirmationStatusGraphic