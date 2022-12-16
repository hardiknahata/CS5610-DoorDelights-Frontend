import React from "react";
import {Link} from "react-router-dom";

import addRestaurantIcon from "../images/add-restaurant-1.png";
import orderTrackingIcon from "../images/live-order-tracking.png";
import fastDeliveryIcon from "../images/fast-delivery.png";


export default function DDFeatures() {
    return (
        <div className="row mt-5">
            <div className="col-sm text-center m-4">
                <>
                    <p style={{fontSize: "20px", fontWeight: "bold"}}>
                        Add your Restaurant
                    </p>
                    <img
                        src={addRestaurantIcon} width="175px" height="175px"
                        alt="add resaurant icon"/>

                    <p style={{fontSize: "18px"}}>
                        Join your Restaurant to our network of restaurants and deliver today!
                    </p>

                    <Link to="/addrestaurant">
                        <button className="btn btn-primary rounded-pill border-0" style={{backgroundColor: "#5cdb95"}}>ADD
                            RESTAURANT
                        </button>
                    </Link>
                </>
            </div>

            <div className="col-sm text-center m-4">
                <p style={{fontSize: "20px", fontWeight: "bold"}}>
                    Live Order Tracking
                </p>
                <img
                    src={orderTrackingIcon} width="175px" height="175px"
                    alt="live order tracking icon"
                />

                <p style={{textAlign: "center", fontSize: "18px"}}>
                    Know the status of your order at all times, from the restaurant to your doorstep
                </p>

                <Link to="/login">
                    <button className="btn btn-primary rounded-pill border-0" style={{backgroundColor: "#5cdb95"}}>LOGIN
                    </button>
                </Link>
            </div>

            <div className="col-sm text-center m-4">
                <p style={{fontSize: "20px", fontWeight: "bold"}}>
                    Lightning Fast Delivery
                </p>
                <img
                    src={fastDeliveryIcon} width="175px" height="175px"
                    alt="fast delivery icon"/>

                <p style={{fontSize: "18px"}}>
                    Experience DoorDelight's superfast delivery for food delivered fresh & on time</p>
                <Link to="/register">
                    <button className="btn btn-primary rounded-pill border-0" style={{backgroundColor: "#5cdb95"}}>SIGN
                        UP
                    </button>
                </Link>
            </div>
        </div>
    );
}
