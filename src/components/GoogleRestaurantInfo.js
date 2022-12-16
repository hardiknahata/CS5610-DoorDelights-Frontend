import React from "react";
import {useSelector} from "react-redux";

import Spinner from "../util/spinner/spinner";

function GoogleRestaurant(props) {
    const {loading} = useSelector((state) => state.data);
    const {
        name,
        rating,
        formatted_address,
        photos,
        price_level,
        international_phone_number,
        editorial_summary,
        opening_hours,
    } = props;
    console.log(props)

    let phoneNo;
    let addressString = "";
    let description = "";
    let photos_url = ``;
    let photos_reference_link = ``;
    let priceStars = "";

    if (formatted_address) {
        addressString = `${formatted_address}`;
    }
    if (international_phone_number) {
        phoneNo = international_phone_number;
    }
    if (editorial_summary) {
        description = editorial_summary.overview
    }
    if (price_level) {
        for (let i = 0; i < price_level; i++) {
            priceStars += "$";
        }
    }

    if (photos) {
        photos_reference_link = photos[0].photo_reference;
        photos_url = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=` + photos_reference_link + `&key=AIzaSyAKQqq50lkrkea62KtAPTgHM_66NbsFvHQ`
    }
    let openNowStatus = "Status Unavailable";
    let stylingStatusClass = "grey"
    if (opening_hours) {
        openNowStatus = (opening_hours.open_now) ? "Open Now!" : "Currently Closed"
        stylingStatusClass = (opening_hours.open_now) ? "green" : "red"
    }

    return (<>
            {loading ? (<Spinner/>) : (<>
                    <div className="p-5">

                        <div className="row">
                            <div className="col-1"></div>
                            <div className="col-5" style={{backgroundColor: "#1c2331"}}>
                                <p
                                    style={{fontStyle: "bold", color: "#FFFAFA", fontSize: "250%"}}>
                                    {name}
                                </p>
                                <p className="mt-2"
                                   style={{color: "#eaf4fc", fontWeight: "bolder", fontSize: 22, fontStyle: "italic"}}>
                                    {description}
                                </p>

                                <p className="mt-2" style={{color: "#b5c9d5"}}>
                                    Address: <span style={{color: "white"}}>{addressString}</span>
                                </p>
                                {international_phone_number ? (<p className="mt-2" style={{color: "#b5c9d5"}}>
                                        Call: <span style={{color: "white"}}> {phoneNo}</span>
                                    </p>) : null}

                                <p className="mt-2" style={{color: "#b5c9d5"}}>
                                    Rating: <span style={{color: "white"}}>{rating}</span>
                                </p>
                                <p className="mt-2" style={{color: "#b5c9d5"}}>
                                    Price Level: <span style={{color: "white"}}>{priceStars}</span>
                                </p>

                                {opening_hours ? (<p className="mt-2" style={{color: stylingStatusClass,}}>
                                        {openNowStatus}
                                    </p>) : null}

                            </div>
                            {photos ? (<div className="col-5" style={{backgroundColor: "#1c2331", paddingRight: "0"}}>
                                    <img src={photos_url} alt="Image not available" width="100%" height="100%"></img>
                                </div>) : null}
                        </div>
                    </div>
                    <div className="row" style={{marginTop: 40}}>
                        <div className="col-1"></div>
                        <div className="col-6">
                            {/* <p className="me-5" style={{fontSize: "16px"}}>Why starve when you have us
                                <span className="ms-3" role="img" aria-label="fries" style={{fontSize: 30}}></span>
                            </p> */}
                        </div>
                    </div>
                </>)}
        </>);
}

export default React.memo(GoogleRestaurant);
