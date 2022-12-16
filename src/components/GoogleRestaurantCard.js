import React from "react";
import {Link} from "react-router-dom";

export default function GoogleRestaurantCard(props) {
    const {
        name,
        photos,
        opening_hours,
        place_id,
    } = props;
    console.log(props)

    let restUrl = name.split(" ");
    restUrl = restUrl.join("-").toLowerCase();
    let openNowStatus = "Status Unavailable";
    let stylingStatusClass = "grey"
    if ('opening_hours' in props) {
        openNowStatus = (opening_hours.open_now) ? "Open Now!" : "Currently Closed"
        stylingStatusClass = (opening_hours.open_now) ? "green" : "red"
    }
    let photos_url = ``;
    let photos_reference_link = ``
    if ('photos' in props) {
        photos_reference_link = photos[0].photo_reference;
        photos_url = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=` +
            photos_reference_link + `&key=AIzaSyAKQqq50lkrkea62KtAPTgHM_66NbsFvHQ`
    }

    return (

        <div className="card">
            <div style={{backgroundColor: "#f5f5f5"}}>
                <div className="card-img">
                    <img src={photos_url} alt="Image not available" width="100%" height="200"></img>
                </div>
                <div className="card-body">
                    <div>
                        {name}
                    </div>
                    <div className="openstatus" style={{color: stylingStatusClass}}>
                        {openNowStatus}
                    </div>
                </div>
                <Link
                    to={{pathname: `details/${restUrl}`, state: {restId: place_id}}}>
                    <button className="btn btn-primary rounded btn-dark"
                            style={{
                                margin: "5%",
                                marginTop: "0",
                                backgroundColor: "#0a2879",
                                color: "white",
                            }}>
                        View Details
                    </button>
                </Link>
            </div>
        </div>

    );
}
