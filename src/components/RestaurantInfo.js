import React from "react";
import {useSelector} from "react-redux";
import Spinner from "../util/spinner/spinner";

function Restaurant(props) {
    const {loading} = useSelector((state) => state.data);
    const {
        name, imageUrl, tags, costForOne, minOrderAmount, payment, address,
    } = props;
    let paymentString;
    let phoneNo;
    let addressString;
    let finalImageUrl = `${process.env.REACT_APP_SERVER_URL}/${imageUrl}`;
    if (address) {
        phoneNo = address.phoneNo;
        addressString = `${address.aptName}, ${address.locality}, ${address.street}`;
    }

    if (payment ? payment.length === 1 : null) paymentString = `${payment[0].toUpperCase()}`;

    if (payment ? payment.length === 2 : null) paymentString = `${payment[0].toUpperCase()} & ${payment[1].toUpperCase()}`;

    return (<>
            {loading ? (<Spinner/>) : (<>
                    <div className="row">
                        <div className="col-1"></div>
                        <div className="col-5" style={{backgroundColor: "#1c2331"}}>
                            <p
                                style={{fontStyle: "bold", color: "white", fontSize: "250%"}}>
                                {name}
                            </p>
                            <p className="mt-2" style={{color: "#b5c9d5"}}>
                                Cuisine: <span style={{color: "white"}}>{tags}</span>
                            </p>
                            <p className="mt-2" style={{color: "#b5c9d5"}}>
                                Costs: <span style={{color: "white"}}>${costForOne} per person</span>
                            </p>
                            <p className="mt-2" style={{color: "#b5c9d5"}}>
                                Minimum order: <span style={{color: "white"}}>${minOrderAmount}</span>
                            </p>
                            <p className="mt-2" style={{color: "#b5c9d5"}}>
                                Payment Mode: <span style={{color: "white"}}>{paymentString}</span>
                            </p>
                            <p className="mt-2" style={{color: "#b5c9d5"}}>
                                Address: <span style={{color: "white"}}>{addressString}</span>
                            </p>
                            <p className="mt-2" style={{color: "#b5c9d5"}}>
                                Call: <span style={{color: "white"}}> +1{phoneNo}</span>
                            </p>
                        </div>
                        <div className="col-4" style={{backgroundColor: "#1c2331", paddingRight: "0"}}>
                            {imageUrl ? (
                                <img src={finalImageUrl} height="100%" width="100%" alt={finalImageUrl}/>) : null}
                        </div>

                    </div>
                </>)}

        </>);
}

export default React.memo(Restaurant);
