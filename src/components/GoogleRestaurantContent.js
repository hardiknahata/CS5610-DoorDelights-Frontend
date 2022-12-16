import React from "react";
import {useSelector} from "react-redux";

import GoogleRestaurantCard from "./GoogleRestaurantCard";

const GoogleRestaurantContent = () => {
    const {restaurants} = useSelector((state) => state.data);
    const restaurantArray = restaurants.results;

    const getRestaurantCard = (restaurantObj) => {
        return (
            <div className="col-3 mr-1 mb-3" key={restaurantObj._id}>
                <GoogleRestaurantCard {...restaurantObj} />
            </div>
        );
    };


    return (
        <>
            <h4>
                Order from your favourite Eatery -
            </h4>
            <br/>
            <div className="row" style={{margin: "10px"}}>
                {restaurantArray ? (
                    restaurantArray.length > 0 ? (
                        restaurantArray.map((restaurant) => getRestaurantCard(restaurant))
                    ) : (
                        <p>
                            No Restaurants currently available in your area, come back Later.
                        </p>
                    )
                ) : (
                    <p>Enter your address to view nearby partner restaurants</p>
                )}
            </div>
        </>
    );
};

export default GoogleRestaurantContent;
