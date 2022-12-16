import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import Spinner from "../util/spinner/spinner";
import {fetchRestaurantFromGoogle} from "../redux/actions/dataActions";
import GoogleRestaurantInfo from "../components/GoogleRestaurantInfo";

export default function Details(props) {
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

    useEffect(() => {
        console.log("in useEffect restaurant");
        dispatch(fetchRestaurantFromGoogle(restId));
    }, [])

    return (
        <>
            {loading ? (
                <Spinner/>
            ) : (
                <>
                    <GoogleRestaurantInfo {...restaurant} />
                </>
            )}
        </>
    );
}
