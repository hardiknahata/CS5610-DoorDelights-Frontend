import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import Spinner from "../util/spinner/spinner";
import RestaurantInfo from "../components/RestaurantInfo";
import RestaurantItems from "../components/RestaurantItems";
import SearchBar from "../components/SearchBar";
import {fetchRestaurant} from "../redux/actions/dataActions";

export default function Restaurant(props) {
    const restId = props.location.state.restId;
    const {loading} = useSelector((state) => state.data);
    const restaurant = useSelector((state) => state.data.restaurant);
    const {items} = useSelector((state) => state.data.restaurant);
    const dispatch = useDispatch();

    useEffect(() => {
        if (items) {
            setItemsState(items);
            setFilteredItemsState(items);
        }
    }, [items]);

    const [itemsState, setItemsState] = useState(items ? [] : null);
    const [filteredItemsState, setFilteredItemsState] = useState(
        items ? [] : null
    );

    const handleSearch = (value) => {
        let currentList = [];
        let newList = [];
        if (value !== "") {
            currentList = itemsState;
            newList = currentList.filter((item) => {
                const lc = item.title.toLowerCase();
                const filter = value.toLowerCase();
                return lc.includes(filter);
            });
        } else {
            newList = itemsState;
        }
        setFilteredItemsState(newList);
    };

    useEffect(() => {
        console.log("in useEffect restaurant");
        dispatch(fetchRestaurant(restId));
    }, [])

    return (
        <>
            {loading ? (
                <Spinner/>
            ) : (
                <>
                    <RestaurantInfo {...restaurant} />
                    <div className="row" style={{marginTop: 40}}>
                        <div className="col-1"></div>
                        <div className="col-6">
                            {/* <p className="me-5" style={{fontSize: "16px"}}>Why starve when you have us
                                <span className="ms-3" role="img" aria-label="fries" style={{fontSize: 30}}>🍟</span>
                            </p> */}
                            <p className="me-5" style={{fontSize: "16px"}}>
                                Order from wide varieties of different available Items below
                            </p>
                        </div>
                        <div className="col-3 mt-5">
                            <SearchBar page="items" handleSearch={handleSearch}/>
                        </div>
                        <RestaurantItems items={filteredItemsState}/>
                    </div>
                </>
            )}
        </>
    );
}
