import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";


import Spinner from "../util/spinner/spinner";
import RestaurantContent from "../components/RestaurantContent";
import {fetchRestaurants} from "../redux/actions/dataActions";

export default function AdminDashboard() {
    const [err, setErr] = useState('');
    const {loading} = useSelector((state) => state.data);
    let restaurantMarkup = loading ? <Spinner/> : <RestaurantContent/>;
    const [locationStatus, setLocationStatus] = useState({
            data: []
        }
    )
    const dispatch = useDispatch();

    async function getRestaurants() {
        try {
            const response = dispatch(fetchRestaurants());
            if (!response.ok) {
                throw new Error(`Error! status: ${response.status}`);
            }
            const result = await response.json();
            setLocationStatus(result);
        } catch (err) {
            setErr(err.message);
        }
    }

    return (
        <>
            <div className="row mt-3 ml-3 justify-content-center">
                <button className="btn btn-primary rounded-pill btn-dark " onClick={getRestaurants}>Get all
                    Restaurants
                </button>
            </div>
            <div className="row">
                <div className="col-10">
                    <div className="container">
                        <div>
                            {locationStatus &&
                                restaurantMarkup
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
