import React from "react";
import {useSelector} from "react-redux";
import RestaurantCard from "./RestaurantCard";

const RestaurantContent = () => {
    const {restaurants} = useSelector((state) => state.data);
    const restaurantArray = restaurants.restaurants;
    console.log(restaurantArray);

    const getRestaurantCard = (restaurantObj) => {
        return (
            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-1 mb-3">
                <div className="card" key={restaurantObj._id}>
                    <RestaurantCard {...restaurantObj} />
                </div>
            </div>
        );
    };
    return (
        <>
            <br/>
            <div className="row">
                <p color="textPrimary"></p>
                {restaurantArray ? (
                    restaurantArray.length > 0 ? (
                        restaurantArray.map((restaurant) => getRestaurantCard(restaurant))
                    ) : (
                        <p>
                            No Restaurants currently available in your area, come back Later.
                        </p>
                    )
                ) : (
                    <h4></h4>
                )}
            </div>
        </>
    );
};

export default RestaurantContent;
