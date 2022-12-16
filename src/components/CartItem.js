import React from "react";
import {useDispatch} from "react-redux";

import RemoveIcon from "@material-ui/icons/Remove";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";

import {addToCart, deleteCartItem, removeCartItem,} from "../redux/actions/dataActions";

export default function CartItem(props) {
    const {
        quantity,
        itemId: {title, price, description, imageUrl, _id},
    } = props;
    const imageUrlSplit = imageUrl.split("/");
    const finalImageUrl = `${process.env.REACT_APP_SERVER_URL}/${imageUrlSplit[0]}/${imageUrlSplit[1]}`;

    const dispatch = useDispatch();

    const handleAddItem = () => {
        const itemData = {
            itemId: _id,
        };
        dispatch(addToCart(itemData));
    };

    const handleDeleteItem = () => {
        const itemData = {
            itemId: _id,
        };
        dispatch(deleteCartItem(itemData));
    };

    const handleRemoveItem = () => {
        dispatch(removeCartItem(_id));
    };

    return (
        <>
            <div className="card">
                <div className="card-img">
                    <img src={finalImageUrl} height="184" width="180" alt="Item"/>
                </div>
                <div className="card-body">
                    <div className="mt-2 font-weight-bold">
                        {title}
                    </div>
                    <div className="mt-2 font-weight-bold">
                        {description}
                    </div>
                    <div className="mt-2 font-weight-bold">
                        ${price} x {quantity}
                    </div>
                    <div className="mt-2 font-weight-bold">
                        <button className="btn btn-link " onClick={handleRemoveItem}>
                            <RemoveIcon style={{color: "#f44336"}}/>
                        </button>
                        <button className="btn btn-link " onClick={handleAddItem}>
                            <AddIcon style={{color: "green"}}/>
                        </button>
                        <button className="btn btn-link " onClick={handleDeleteItem}>
                            <DeleteIcon style={{color: "#f44336"}}/>
                        </button>
                        <div className="mt-2 font-weight-bold">
                            Total: $ {price * quantity}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
